import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useRoomStore } from "./RoomStore";
import { useSceneStore } from './SceneStore';
import { usePointStore } from './PointStore';
import { PointUtils } from '@/scripts/utils/PointUtils';
import type { IPoint } from '@/scripts/config/Point';
import { LineUtils } from "@/scripts/utils/LineUtils";

export const useProcessStore = defineStore('ProcessStore', () => {

    const errorText = ref('');
    const length = ref<number[]>([]);

    const result = computed(() => {
        const r: { length: number, count: number }[] = [];
        const c: Map<number, number> = new Map();
        length.value?.forEach(( length, i ) => {
            let count = 1;
            if( c.has( length ) ){
                count += 1;
            }
            else c.set( length, 0 );
            
            r.push({ length, count })
        })
        return r;
    });

    async function process(){

        length.value = [];

        errorText.value = '';
        const sceneStore = useSceneStore();

        sceneStore.clearPO();
        sceneStore.clearRO();
        sceneStore.clearLO();
        sceneStore.clearMO();

        const roomStore = useRoomStore();
        roomStore.generateRomm();

        const pointStore = usePointStore();
        pointStore.visPoints();

        const outP = pointStore.getOutPoint();
        if( outP === undefined ) { _error('Точка слива не задана'); return; }

        const inPArr = pointStore.getInPoints();
        if( inPArr.length === 0 ) { _error('Точки подключения не заданы'); return; }

        if( !PointUtils.checkHeight( outP, inPArr ) ) { _error('Одна из точек подключения ниже уровня слива'); return; }
        
        const roomBox = roomStore.roomBox;
        if( roomBox === undefined ) { _error('Внутренняя ошибка алгоритма: box помещения не задан'); return; }
        
        if( !_isAnyPointWallIntersect( pointStore.pointsArr, roomBox ) ) { _error('Точки находятся снаружи помещения'); return; }

        const room = roomStore.room;

        const { sidePoint: outSidePoint, downPoint: outDownPoint } = PointUtils.boxClosestPoint( roomBox, outP, room.offset, 3 );

        const CCWFlatPoints = PointUtils.offsetRect( room.length, room.width, room.offset );
        const CWFlatPoints = CCWFlatPoints.map( v => v ).reverse();
        
        const CCWPoints = LineUtils.remapPoints( CCWFlatPoints, outP.position );
        const CWPoints = LineUtils.remapPoints( CWFlatPoints, outP.position );

        const CCWLines = LineUtils.createLine3Arr( CCWPoints );
        const CWLines = LineUtils.createLine3Arr( CWPoints );

        const sidePoints = [];
        const endPoints = [];
        for( let i = 0; i < inPArr.length; i++ ){
            const inP = inPArr[i];
            const { sidePoint: sP, downPoint: dP } = PointUtils.boxClosestPoint( roomBox, inP, room.offset, -3 );
            sidePoints.push( sP );
            endPoints.push( dP );
        }

        let dataArr = [];
        const CCWDataArr = [];
        const CWDataArr = [];
        let CCWLength = 0;
        let CWLength = 0;
        for( let i = 0; i < endPoints.length; i++ ){
            const CCWData = LineUtils.trimPoints( CCWLines, endPoints[i] );
            const CWData = LineUtils.trimPoints( CWLines, endPoints[i] );
            CCWDataArr.push( CCWData );
            CWDataArr.push( CWData );
            CCWLength += CCWData.lineLength;
            CWLength += CWData.lineLength;
        }
        dataArr = CCWLength > CWLength ? CCWDataArr : CWDataArr;

        const pointsArr = [];
        for( let i = 0; i < dataArr.length; i++ ){
            const outArr = [ outDownPoint, outSidePoint, ...dataArr[i].pointsArr ];
            outArr.push( sidePoints[i], inPArr[i].position );
            pointsArr.push( outArr );
        }

        for( let i = 0; i < pointsArr.length; i++ ){
            length.value.push( ...LineUtils.calcLength( pointsArr[i] ));
            const lineMesh = LineUtils.createLineMesh( pointsArr[i] );
            sceneStore.lO.add( lineMesh );
        }


    }

    function _error( text: string ){
        errorText.value = text;
        console.warn( text );
    }

    function _isAnyPointWallIntersect( p: IPoint[], box: THREE.Box3 ): boolean {
        const room = useRoomStore().room;

        let isWallIntersection = false;
        for( let i = 0; i < p.length; i++ ){
            if( box.containsPoint( p[i].position ) ){
                isWallIntersection = true;
                break;
            }
        }
        return isWallIntersection;
    }

    return { errorText, process, result }
})
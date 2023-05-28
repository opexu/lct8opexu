import { defineStore } from "pinia";
import { ref } from "vue";
import { useRoomStore } from "./RoomStore";
import { useSceneStore } from './SceneStore';
import { usePointStore } from './PointStore';
import { PointUtils } from '@/scripts/utils/PointUtils';
import type { IPoint } from '@/scripts/config/Point';

export const useProcessStore = defineStore('ProcessStore', () => {

    const errorText = ref('');

    function process(){

        errorText.value = '';
        const sceneStore = useSceneStore();

        const scene = sceneStore.scene;
        sceneStore.clearPO();
        sceneStore.clearRO();

        useRoomStore().generateRomm();

        const pointStore = usePointStore();
        pointStore.visPoints();
        
        const outP = pointStore.getOutPoint();
        if( outP === undefined ) { _error('Точка слива не задана'); return; }

        const inPArr = pointStore.getInPoints();
        if( inPArr.length === 0 ) { _error('Точки подключения не заданы'); return; }

        if( !PointUtils.checkHeight( outP, inPArr ) ) { _error('Одна из точек подключения ниже уровня слива'); return; }
        
        const roomBox = useRoomStore().roomBox;
        if( roomBox === undefined ) { _error('Внутренняя ошибка алгоритма: box помещения не задан'); return; }
        
        if( _isAnyPointWallIntersect( pointStore.pointsArr, roomBox ) ) { _error('Точки находятся внутри помещения'); return; }

        
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

    return { errorText, process }
})
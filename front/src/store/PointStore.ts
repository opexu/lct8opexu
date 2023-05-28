import { PointType, type IPoint } from "@/scripts/config/Point";
import { defineStore } from "pinia";
import *  as THREE from "three";
import { ref } from "vue";
import { useSceneStore } from "./SceneStore";

export const usePointStore = defineStore('PointsStore', () => {

    const pointsArr = ref<IPoint[]>([]);

    function isDuplicate( pointName: string, pointType: PointType ){
        if( pointType === PointType.Output ){
            return pointsArr.value.findIndex( p => p.name === pointName || p.pointType === pointType ) !== -1 ? true : false;
        }
        return pointsArr.value.findIndex( p => p.name === pointName ) !== -1 ? true : false;
    }

    function getOutPoint(){
        return pointsArr.value.find( p => p.pointType === PointType.Output );
    }

    function getInPoints(){
        return pointsArr.value.filter( p => p.pointType === PointType.Input );
    }

    function visPoints(){
        const pO = useSceneStore().pO;

        for( let i = 0; i < pointsArr.value.length; i++ ){
            const ip = pointsArr.value[i];
            const ipv = ip.position;
            const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color( ip.pointColor ) });
            const geo = new THREE.SphereGeometry( 0.2, 12, 12 );
            const mesh = new THREE.Mesh( geo, mat );
            mesh.position.set( ipv.x, ipv.y, ipv.z );
            pO.add( mesh );
        }
    }

    return { pointsArr, isDuplicate, getOutPoint, getInPoints, visPoints }
})
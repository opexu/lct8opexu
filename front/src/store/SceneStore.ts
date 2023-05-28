import * as THREE from 'three';
import { defineStore } from "pinia";

export const useSceneStore = defineStore('SceneStore', () => {

    const scene = new THREE.Scene();
    
    const uO = new THREE.Object3D();
    uO.name = 'uO';
    scene.add( uO );

    const gridHelper = new THREE.GridHelper( 50, 50 );
    uO.add( gridHelper );

    const axesHelper = new THREE.AxesHelper( 10 );
    uO.add( axesHelper );

    const pO = new THREE.Object3D();
    pO.name = 'pO';
    scene.add( pO );
    function clearPO(){
        for( let i = 0; i < pO.children.length; i++ ){
            pO.remove( pO.children[i] );
        }
    }

    const rO = new THREE.Object3D();
    rO.name = 'rO';
    scene.add( rO );
    function clearRO(){
        for( let i = 0; i < rO.children.length; i++ ){
            rO.remove( rO.children[i] );
        }
    }

    return {
        scene, uO, pO, rO, clearPO, clearRO,
    }
})
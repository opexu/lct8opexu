import { defineStore } from "pinia"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export const useCameraStore = defineStore('CameraStore', () => {

    let orbitControls: OrbitControls | null = null;
    const perspectiveCamera = new THREE.PerspectiveCamera( 50, 1, 0.01, 1000 );
    perspectiveCamera.position.set( 10, 10, 10);

    function setAspect( width: number, height: number ){
        perspectiveCamera.aspect = width / height;
        perspectiveCamera.updateProjectionMatrix();
        orbitControls?.update();
    }

    function initControls( container: HTMLDivElement ){
        orbitControls = new OrbitControls( perspectiveCamera, container );
        orbitControls.enableDamping = true;
    }

    function updateControls(){
        orbitControls?.update();
    }

    return { perspectiveCamera, updateControls, setAspect, initControls }
})
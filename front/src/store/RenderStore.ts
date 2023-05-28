import * as THREE from 'three';
import { defineStore } from "pinia";
import { useSceneStore } from './SceneStore';
import { useCameraStore } from './CameraStore';
import { toRaw } from 'vue';

export const useRenderStore = defineStore('RenderStore', () => {

    let renderer: THREE.WebGLRenderer | null = null;

    function initRenderer( container: HTMLDivElement ){
        renderer = new THREE.WebGLRenderer()
        renderer.setSize( container.offsetWidth, container.offsetHeight );
        renderer.setPixelRatio( window.devicePixelRatio );
        container.appendChild( renderer.domElement );
        
        window.addEventListener( 'resize', () => {
            setSize( container.offsetWidth, container.offsetHeight );
            useCameraStore().setAspect( container.offsetWidth, container.offsetHeight );
        });

        animate();

        function animate(){
            requestAnimationFrame( animate );
	        render();
        }
    }

    function setSize( width: number, height: number ){
        renderer?.setSize( width, height );
    }

    function render(){
        const cameraStore = useCameraStore();
        const scene = toRaw( useSceneStore().scene );
        const camera = toRaw( cameraStore.perspectiveCamera );
        cameraStore.updateControls();
        renderer?.render( scene, camera );
    }

    return { renderer, initRenderer, setSize, render }
})
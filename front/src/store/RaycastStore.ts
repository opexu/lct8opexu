import * as THREE from 'three';
import { defineStore } from "pinia";

export const useRaycastStore = defineStore('RaycastStore', () => {

    const raycaster = new THREE.Raycaster();

    return { raycaster }
})
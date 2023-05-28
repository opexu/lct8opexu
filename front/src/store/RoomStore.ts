import * as THREE from 'three';
import { defineStore } from "pinia";
import { ref } from "vue";
import { useSceneStore } from './SceneStore';

export const useRoomStore = defineStore('RoomStore', () => {

    const room = ref({
        length: 15,
        width: 5,
        height: 2,
        offset: 0.15
    })

    const roomBox = ref<THREE.Box3>();

    function generateRomm(){
        
        const rW = room.value.width;
        const rL = room.value.length;
        const rH = room.value.height;

        const rG = new THREE.BoxGeometry( 1, 1, 1 );
        const rM = new THREE.Mesh( rG, [
            new THREE.MeshBasicMaterial({ color: new THREE.Color( 0x444444 ), side: THREE.DoubleSide, }),
            new THREE.MeshBasicMaterial({ color: new THREE.Color( 0x555555 ), side: THREE.DoubleSide, }),
            new THREE.MeshBasicMaterial({ color: new THREE.Color( 0x000000 ), side: THREE.DoubleSide, opacity: 0, alphaTest: 0.1 }), // cM
            new THREE.MeshBasicMaterial({ color: new THREE.Color( 0xbbbbbb ), side: THREE.DoubleSide, }), // fM
            new THREE.MeshBasicMaterial({ color: new THREE.Color( 0x666666 ), side: THREE.DoubleSide, }),
            new THREE.MeshBasicMaterial({ color: new THREE.Color( 0x777777 ), side: THREE.DoubleSide, }),
        ])
        rM.position.set( 0, 0.5, 0 );

        const rO = useSceneStore().rO;
        rO.add( rM );
        rO.scale.set( rL, rH, rW );
        
        const minV = new THREE.Vector3( -room.value.length / 2, 0, -room.value.width / 2 );
        const maxV = new THREE.Vector3( room.value.length / 2, room.value.height, room.value.width / 2);
        roomBox.value = new THREE.Box3( minV, maxV );
    }

    return { room, roomBox, generateRomm }
})
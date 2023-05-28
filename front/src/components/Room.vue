<template>
<div class="w-full h-fit p-4 flex flex-col space-y-2 border rounded-md bg-blue-50">
    
    <div class="w-full h-fit flex flex-row">
        <p>Габариты помещения</p>
    </div>

    <div class="w-full h-fit flex flex-row space-x-2">
        <div class="w-full h-fit flex flex-row space-x-2 justify-center items-center">
            <label for="room-length">Д</label>
            <input id="room-length" type="number" step="0.1" class="w-full h-fit p-2 border rounded-md"
            :value="roomStore.room.length"
            @change="onRoomLength"
            />
        </div>

        <div class="w-full h-fit flex flex-row space-x-2 justify-center items-center">
            <label for="room-width">Ш</label>
            <input id="room-width" type="number" step="0.1" class="w-full h-fit p-2 border rounded-md"
            :value="roomStore.room.width"
            @change="onRoomWidth"
            />
        </div>

        <div class="w-full h-fit flex flex-row space-x-2 justify-center items-center">
            <label for="room-height">В</label>
            <input id="room-height" type="number" step="0.1" class="w-full h-fit p-2 border rounded-md"
            :value="roomStore.room.height"
            @change="onRoomHeight"
            />
        </div>

        <div class="w-full h-fit flex flex-row space-x-2 justify-center items-center">
            <label for="room-offset">О</label>
            <input id="room-offset" type="number" step="0.01" class="w-full h-fit p-2 border rounded-md"
            :value="roomStore.room.offset"
            @change="onRoomOffset"
            />
        </div>
    </div>
    
</div>
</template>

<script setup lang="ts">
import { useProcessStore } from '@/store/ProcessStore';
import { useRoomStore } from '@/store/RoomStore';
import { ref } from 'vue';

const roomStore = useRoomStore();
const processStore = useProcessStore();

function onRoomLength( event: Event ){
    if( !(event.target instanceof HTMLInputElement) ) return;
    roomStore.room.length = parseFloat( event.target.value );
}

function onRoomWidth( event: Event ){
    if( !(event.target instanceof HTMLInputElement) ) return;
    roomStore.room.width = parseFloat( event.target.value );
}

function onRoomHeight( event: Event ){
    if( !(event.target instanceof HTMLInputElement) ) return;
    roomStore.room.height = parseFloat( event.target.value );
}

function onRoomOffset( event: Event ){
    if( !(event.target instanceof HTMLInputElement) ) return;
    roomStore.room.offset = parseFloat( event.target.value );
}
</script>
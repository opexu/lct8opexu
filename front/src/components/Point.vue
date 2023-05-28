<template>
<div class="w-full h-fit flex flex-row space-x-2">
    <div class="w-full p-2 flex flex-col space-y-2 border rounded-md">
        <div class="w-full h-fit flex flex-row space-x-2">
            <p>{{ name }}</p>
            <p>{{ type }}</p>
        </div>
        <div class="w-full h-fit flex flex-row space-x-2">
            <p>x: {{ position?.x }}</p>
            <p>y: {{ position?.y }}</p>
            <p>z: {{ position?.z }}</p>
        </div>
    </div>
    <button type="button" class="w-fit p-2 border rounded-md justify-center content-center common-handler-btn-blue"
    @click="onDelete"
    >
        <p>X</p>
    </button>
</div>
</template>

<script setup lang="ts">
import { usePointStore } from '@/store/PointStore';
import { Vector3 } from 'three';

const props = defineProps({
    index: {
        required: true,
        type: Number,
    },
    name: String,
    type: String,
    position: Vector3
})

function onDelete(){
    const pointStore = usePointStore();
    pointStore.pointsArr.splice( props.index, 1 );
}
</script>
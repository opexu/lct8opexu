<template>
<div class="w-full p-4 flex flex-col space-y-2 bg-blue-50">
    
    <div class="w-full h-fit p-4 border border-red-500 rounded-md bg-red-200 text-red-700"
    v-if="processStore.errorText"
    >
        <p>{{ processStore.errorText }}</p>
    </div>

    <Point
    v-for="( point, i ) in pointStore.pointsArr" :key="i"
    :index="i"
    :name="point.name"
    :type="point.pointType"
    :position="point.position"
    />

    <button class="w-full h-fit p-2 flex flex-row justify-center items-center bg-white common-handler-btn-blue"
    @click="Process"
    >
        Рассчитать
    </button>
</div>
</template>

<script setup lang="ts">
import { usePointStore } from '@/store/PointStore';
import Point from './Point.vue';
import { useProcessStore } from '@/store/ProcessStore';

const pointStore = usePointStore();
const processStore = useProcessStore();

function Process(){
    processStore.process();
}
</script>
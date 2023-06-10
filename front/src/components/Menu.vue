<template>
<div class="w-full h-fit p-4 flex flex-col space-y-4 text-sm select-none">
    <Room/>
    <AddPointVue/>
    <PointsContainer/>
    <ResultContainer/>
</div>
</template>

<script setup lang="ts">
import AddPointVue from './AddPoint.vue';
import PointsContainer from './PointsContainer.vue';
import ResultContainer from './ResultContainer.vue';
import Room from './Room.vue';


</script>
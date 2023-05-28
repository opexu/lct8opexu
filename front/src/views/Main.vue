<template>
<div class="w-full h-full flex justify-center items-center">
    
    <div class="w-1/3 h-full flex flex-row">
        <Menu></Menu>
    </div>
    
    <div ref="container" class="w-2/3 h-full">
    </div>

</div>
</template>

<script setup lang="ts">
import Menu from '@/components/Menu.vue'
import { useCameraStore } from '@/store/CameraStore';
import { useRenderStore } from '@/store/RenderStore';
import { onMounted, ref } from 'vue';

const cameraStore = useCameraStore();
const renderStore = useRenderStore();

const container = ref<HTMLDivElement>();

onMounted(() => {
    if( container.value ){
        console.log('container: ', container.value);
        cameraStore.initControls( container.value );
        renderStore.initRenderer( container.value );
    }
    else {
        console.warn('Контейнер не инициализирован');
    }
})
</script>
<template>
    <div class="w-full p-4 flex flex-col space-y-2 bg-blue-50">
        <Result
        v-for="( result, i ) in processStore.result" :key="i"
        :length="result.length"
        :count="result.count"
        />
    </div>
    </template>
    
    <script setup lang="ts">
    import { useProcessStore } from '@/store/ProcessStore';
    import Result from './Result.vue';
    
    const processStore = useProcessStore();
    </script>
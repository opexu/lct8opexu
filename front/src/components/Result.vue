<template>
    <div class="w-full h-fit flex flex-row space-x-2">
        <div class="w-full p-2 flex flex-row space-x-2 border rounded-md">
            <div class="w-full h-fit flex flex-row space-x-2">
                <p>Точка: </p>
                <p>{{ length?.toFixed( 2 ) }}</p>
            </div>

            <div class="w-full h-fit flex flex-row space-x-2">
                <p>Длина: </p>
                <p>{{ length?.toFixed( 2 ) }}</p>
            </div>
            <div class="w-full h-fit flex flex-row space-x-2">
                <p>Кол-во: </p>
                <p>{{ count }}</p>
            </div>
        </div>
    </div>
    </template>
    
    <script setup lang="ts">
    const props = defineProps({
        length: Number,
        count: Number,
    })
    </script>
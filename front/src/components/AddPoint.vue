<template>
<div class="w-full h-fit p-4 flex flex-col space-y-2 bg-blue-50">
    
    <div class="w-full h-fit flex flex-col space-y-2">
        <div class="w-full h-fit flex flex-row space-x-2 justify-center items-center">
            <label for="point-x">Название</label>
            <input id="point-x" type="text" class="w-full h-fit p-2 border rounded-md" :value="pointName"
            @input="setPointName"
            />
        </div>
    </div>

    <div class="w-full h-fit flex flex-col space-y-2">
        <div class="w-full h-fit flex flex-row space-x-2 justify-center items-center">
            <label for="point-x">Тип</label>
            <select id="point-x" class="w-full h-fit p-2 border rounded-md"
            :value="pointType"
            @input="setPointType"
            >
                <option>{{ PointType.Input }}</option>
                <option>{{ PointType.Output }}</option>
            </select>
        </div>
    </div>

    <div class="w-full h-fit flex flex-row space-x-2">
        <div class="w-full h-fit flex flex-row space-x-2 justify-center items-center">
            <label for="point-x">X</label>
            <input id="point-x" type="number" class="w-full h-fit p-2 border rounded-md" :value="pX"
            @input="setPointX"
            />
        </div>

        <div class="w-full h-fit flex flex-row space-x-2 justify-center items-center">
            <label for="point-y">Y</label>
            <input id="point-y" type="number" class="w-full h-fit p-2 border rounded-md" :value="pY"
            @input="setPointY"
            />
        </div>

        <div class="w-full h-fit flex flex-row space-x-2 justify-center items-center">
            <label for="point-z">Z</label>
            <input id="point-z" type="number" class="w-full h-fit p-2 border rounded-md" :value="pZ"
            @input="setPointZ"
            />
        </div>
    </div>

    <button class="w-full h-fit p-2 flex flex-row border rounded-md justify-center items-center bg-white common-handler-btn-blue"
    @click="addPoint"
    :disabled="isDisabled"
    >
        Добавить точку
    </button>
    
</div>
</template>

<script setup lang="ts">
import { Vector3 } from 'three';
import { computed, ref } from 'vue';
import { PointColor, type IPoint } from '@/scripts/config/Point'
import { PointType, IntersectType } from '@/scripts/config/Point';
import { usePointStore } from '@/store/PointStore';

const isDisabled = computed(() => {
    if( !pX.value || !pY.value || !pZ.value || !pointName.value ) return true;
    return false;
})

const pointName = ref('');
function setPointName( event: Event ){
    if( !(event.target instanceof HTMLInputElement) ) return;
    pointName.value = event.target.value.trim();
}

const pointType = ref( PointType.Output );
function setPointType( event: Event ){
    if( !(event.target instanceof HTMLSelectElement) ) return;
    pointType.value = event.target.value as PointType;
}

const pX = ref(0)
function setPointX( event: Event ){
    if( !(event.target instanceof HTMLInputElement) ) return;
    pX.value = parseFloat( event.target.value );
}

const pY = ref(0)
function setPointY( event: Event ){
    if( !(event.target instanceof HTMLInputElement) ) return;
    pY.value = parseFloat( event.target.value );
}

const pZ = ref(0)
function setPointZ( event: Event ){
    if( !(event.target instanceof HTMLInputElement) ) return;
    pZ.value = parseFloat( event.target.value );
}

function addPoint(){
    const pointStore = usePointStore();

    if( pointStore.isDuplicate( pointName.value, pointType.value ) ) return;

    const point: IPoint = {
        index: pointStore.pointsArr.length,
        name: pointName.value,
        position: new Vector3( pX.value, pY.value, pZ.value ),
        intersectType: IntersectType.None,
        pointType: pointType.value,
        pointColor: pointType.value === PointType.Output ? PointColor.Red : PointColor.Blue,
    }
    
    pointStore.pointsArr.push( point );
}
</script>
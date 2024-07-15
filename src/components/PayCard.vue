<script setup lang="ts" >
    interface Props {
        itemImg:{
            img: string
            class:string
        }
    }

    const props = defineProps<Props>()
</script>

<template>
    <div class="container-transaction">
        <div class="container-img">
            <img :src="props.itemImg.img" alt="" :class="`${props.itemImg.class} w-auto object-contain`">
        </div>
    </div>
</template>

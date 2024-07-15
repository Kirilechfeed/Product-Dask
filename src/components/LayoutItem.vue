<script setup lang="ts">

interface Props {
  itemBoard: any
  activeElem: any
}
const props = defineProps<Props>()

</script>

<template>
  
  <div
    @click="$router.push({ path: `/${itemBoard.path}`, query: props.itemBoard.query })"
    class="cursor-pointer py-4 lg:py-0 lg:h-auto "
  >
    <div class="flex items-center justify-center lg:justify-stretch activeHover lg:text-lg h-2.5 w-10 lg:h-auto lg:w-auto">
      <i :class="`fi flex items-center fi-rr-${props.itemBoard.imgName}`" class="lg:mt-[2px] lg:mr-5 duration-300 mr-0 mt-0 items-center"></i>
      <span :class="`${props.activeElem}`" class="active duration-150 hidden text-lg tracking-tight lg:flex">{{ props.itemBoard.label }}</span>
    </div>
  </div>
</template>

<style scoped>
.activeHover:hover .active{
  margin-left: 12px;
}
</style>


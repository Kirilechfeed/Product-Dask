<script setup lang="ts">

interface IItemProduct {
  orderId: string
  image: string;
  name: string;
  marketPrice: number;
  newlyAdded: boolean,
  store: string,
  wholesalePrice?: number;
  profit?: number;
}

interface Props {
  itemProduct: IItemProduct
  isActive: boolean
}

const props = defineProps<Props>()
const profit = props.itemProduct?.profit ?? 0;
</script>

<template>
  <div class="flex flex-wrap items-center justify-between text-xs font-normal text-primary p-2 gap-y-2">
    <div class="flex-1 flex">
      <div class="w-full flex-1 flex items-center gap-x-2">
        <div class="w-[32px] h-[32px]">
          <img :src="props.itemProduct.image" alt="" class="w-full h-full object-contain" />
        </div>
        <div class="flex-1">
          <span class="font-medium text-xs] text-zinc-800 leading-4 line-clamp-2">{{ props.itemProduct.name }}</span>
        </div>
      </div>
      <div v-if="props.isActive" class="hidden lg:flex w-1/2 px-2 items-center gap-x-2">
        <span class="text-xs text-zinc-400">{{ props.itemProduct.orderId }}</span>
        <i class="text-[0.6rem] bg-zinc-200 text-zinc-400 rounded h-4 w-4 cursor-pointer fi fi-rr-up-right-from-square"></i>
      </div>
    </div>
    <div class="flex items-center">
      <div v-if="props.isActive" class="hidden lg:block w-28 lg:w-36">
        <span class="font-medium text-[10px] bg-mLime/10  text-mLime border border-mLime px-1 rounded">{{ props.itemProduct.store }}</span>
      </div>
      <div v-if="props.isActive" class="w-20 lg:w-36 text-center" >
        <span class="font-semibold text-zinc-800 text-xs ">${{ props.itemProduct.marketPrice.toFixed(2) }}</span>
      </div>
      <div class="w-20 lg:w-36 flex" :class="props.isActive ? 'justify-center':'justify-end'">
        <div class="bg-gradient-to-tr from-[#61E199] to-[#7DEBB8] w-full lg:w-20 rounded-xl shadow-lg px-6 py-1 flex justify-center">
          <span class=" font-semibold drop-shadow-md text-sm text-white">${{ profit.toFixed(2) }}</span>
        </div>
      </div>
    </div>
    <div v-if="props.isActive" class="w-full flex gap-x-2 lg:hidden">
      <span class="font-bold">Store:</span>
      <span class="font-medium text-[10px] bg-mLime/10 text-mLime border border-mLime px-1 rounded">{{ props.itemProduct.store }}</span>
    </div>
    <div v-if="props.isActive" class="w-full flex gap-x-2 lg:hidden">
      <span class="font-bold">Order ID:</span>
      <span class="text-xs text-zinc-400">{{ props.itemProduct.orderId }}</span>
      <i class="text-[0.5rem] bg-zinc-200 text-zinc-400 rounded h-4 w-4 cursor-pointer fi fi-rr-up-right-from-square"></i>
    </div>
  </div>
</template>

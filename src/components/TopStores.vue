<script setup lang="ts">
import store from '@/store';
import { ref, watch,computed, onMounted } from 'vue'
interface Props {
 itemStore: any
}



const props = defineProps<Props>()


const currentCount = ref(props.itemStore.sales.profit);
const formattedCount = computed(() => {
  return currentCount.value.toLocaleString('en-US',{ minimumFractionDigits: 2, maximumFractionDigits: 2 });
});

const widthProgressProfit = ref(0);
const widthProgressCount = ref(0);


const updateProgress = () => {
  store.commit('widthProgressBarProfit', store.state.stores)
  store.commit('widthProgressBarSalesCount', store.state.stores)
  widthProgressProfit.value = (props.itemStore.sales.profit / store.state.maxPriceProfit) * 100;
  widthProgressCount.value = (props.itemStore.sales.salesCount / store.state.maxPriceSalesCount) * 100;

    };
onMounted(() => {
  updateProgress();
});

watch(
  () => props.itemStore.sales.profit,
  (newCount) => {
    updateProgress()
    store.commit('updateProgress', props.itemStore)
    const startValue = currentCount.value;
    const endValue = newCount;
    const duration = 1000; 
    const frameDuration = 1000 / 60;
    const totalFrames = duration / frameDuration;
    let frame = 0;

    function animate() {
      frame++;
      const progress = frame / totalFrames;
      currentCount.value = startValue + (endValue - startValue) * progress;
      if (frame < totalFrames) {
        requestAnimationFrame(animate);
      }
    }

    animate();
  },
  { immediate: true }
);
</script>

<template>
  <div class="relative flex py-3 border-b border-dashed border-zinc-300 last:border-none">
    <div class="flex-1 flex flex-col gap-y-2 lg:gap-y-4">
      <div class="flex items-center gap-2 lg:gap-4 w-full">
        <i class="hidden lg:flex w-12 h-12 items-center justify-center bg-mLime/10 text-mLime rounded-lg fi fi-rr-globe"></i>
        <div class="flex flex-col">
          <div class="font-semibold text-zinc-800 flex  gap-2">
            <span class="font-bold">{{props.itemStore.name}}</span>
            <i class="text-xs bg-zinc-200 text-zinc-600 rounded h-5 w-5 cursor-pointer fi fi-rr-up-right-from-square"></i>
          </div>
          <div class="flex items-center gap-x-2">
            <span class="text-xs text-zinc-600 font-bold">ID:</span>
            <span class="text-xs text-zinc-500">{{props.itemStore.id}}</span>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-1">
        <div class="relative py-1">
          <div class="absolute top-0 left-0 h-full bg-gradient-to-r rounded from-[#61E199] to-[#7DEBB8] transition-all duration-300" :style="{width: widthProgressCount + '%'}"></div>
          <div class="w-fit relative ml-1 px-1 bg-white/50 rounded leading-3">
            <span class="text-sm text-zinc-500 mr-1">Sales:</span>
            <span class="text-sm font-semibold text-zinc-700">{{props.itemStore.sales.salesCount}}</span>
          </div>
        </div>
        <div class="relative py-1">
          <div class="absolute top-0 left-0 h-full bg-gradient-to-r rounded from-[#61E199] to-[#7DEBB8] transition-all duration-300" :style="{width: widthProgressProfit + '%'}"></div>
          <div class="w-fit relative ml-1 px-1 bg-white/50 rounded leading-3">
            <span class="text-sm text-zinc-500 mr-1">Profit:</span>
            <span class="text-sm font-semibold text-zinc-700">${{formattedCount}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

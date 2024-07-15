<script setup lang="ts" >
import { ref, watch, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import TodayPrice from '@/components/TodayPrice.vue'
import TopStores from '@/components/TopStores.vue'
import ItemProduct from '@/components/ItemProduct.vue'
interface IStore{
  id: number
  name: string,
  sales: {
    salesCount: number
    profit: number
  },
}

const store = useStore()
const topStore = ref<IStore[]>([]);
let progressBar = ref()


function insertTop3(arr: IStore[], item: IStore) {
  if (arr.length < 3) {
    arr.push(item);
  } else {
    let minIndex = 0;
    for (let i = 1; i < arr.length; i++) {
      if (arr[i].sales.profit < arr[minIndex].sales.profit) {
        minIndex = i;
      }
    }
    if (item.sales.profit > arr[minIndex].sales.profit) {
      arr[minIndex] = item;
    }
  }
}

const getTopStores = (stores: IStore[])=>{
  for (let i = 0; i < stores.length; i++) {
    insertTop3(topStore.value, stores[i]);
  }
  topStore.value.sort((a, b)=>{return b.sales.profit - a.sales.profit})
}
onMounted(()=>{

  getTopStores(store.state.stores)
  store.commit('updateInitial', store.state.stores)
  store.commit('updateProcent')
  store.dispatch('startProgress')
})

let circumference = computed(() => 2 * Math.PI * 20);
let dashOffset = computed(() => circumference.value * (1 - store.state.procent / 100));


const currentCount = ref(store.state.todayPrice.profit);

const formattedCount = computed(() => {
  return currentCount.value.toLocaleString('en-US',{ minimumFractionDigits: 2, maximumFractionDigits: 2 });
});

watch(
  () => store.state.todayPrice.profit,
  (newCount) => {
     dashOffset = computed(() => circumference.value * (1 - store.state.procent / 100));
    progressBar.value = 100 / store.state.target * store.state.todayPrice.profit
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
  <div class="main-section">
    <div class="flex justify-between items-center flex-col lg:flex-row">
      <h1 class="font-bold text-2xl font-secondary text-zinc-600 pl-3">Dashboard</h1>
      <div class="flex w-full lg:w-[66.66%] mt-6 lg:mt-0">
        <TodayPrice :img="'globe'" :title="'Online Stores'" :price="store.state.todayPrice.webSite"  />
        <TodayPrice :img="'shopping-cart'" :title="'Sales'" :price="store.state.todayPrice.initialSales" />
        <TodayPrice :img="'sack-dollar'" :title="'Profit'" :price="store.state.todayPrice.profit" :class="'border-r-0'"/>
      </div>
    </div>
    <div class="flex flex-col">
      <div class="bg-white w-screen lg:w-auto lg:h-[570px] gap-4 rounded-lg p-2 lg:p-5 flex flex-col lg:grid lg:grid-cols-3 lg:flex-row">
        <div class="shadow-3xl h-[500px] lg:h-full rounded w-full bg-white overflow-hidden relative">
          <div class="absolute h-20 w-full bottom-0 z-10 bg-gradient-to-b from-transparent to-85% to-white"></div>
          <div class="flex justify-between items-center py-3">
            <h2 class="text-zinc-600 font-secondary font-semibold text-lg  pl-3">Recent Sales</h2>
          </div>
          <div class="p-2 border-t border-zinc-300  w-full flex flex-col pb-10">
            <div class="flex  border-b border-zinc-300  py-2 mx-4">
              <h3 class="font-semibold w-[50%] text-zinc-500 text-xs leading-3">Product</h3>
              <div class="flex w-1/2 justify-end">
                <h3 class="font-semibold text-zinc-500 text-xs leading-3 w-20 lg:w-36 text-center lg:text-right">Commission</h3>
              </div>
            </div>
            <transition-group name="list" tag="div" class="max-h-full">
              <div
                v-for="itemProduct in store.state.products"
                :key="itemProduct.id"
                class="transition-transform transition-opacity duration-500 ease-in-out"
                @transitionend="itemProduct.newlyAdded = false"
              >
                <ItemProduct :item-product="itemProduct" :isActive="false"/>
              </div>
            </transition-group>
          </div>
        </div>
        <div class="shadow-3xl rounded w-full bg-white flex flex-col">
          <h2 class="text-zinc-600 font-secondary font-semibold text-lg py-3  pl-3">Top Stores</h2>
          <div class="p-2 border-t bt-mDarkGrey flex flex-col flex-1 justify-around px-2 lg:px-4">
             <TopStores v-for="itemStore in topStore" :key="itemStore.id" :itemStore="itemStore" />
          </div>
        </div>
        <div class="shadow-3xl rounded w-full bg-white">
          <h2 class="text-zinc-600 font-secondary font-semibold text-lg py-3  pl-3">Profit Target
          </h2>
          <div class="p-2 border-t bt-mDarkGrey flex flex-col items-center pb-[40px]">
            <div class="relative h-[350px] w-[350px]">
              <div class="relative w-full h-full">
                <svg class="w-full h-full rotate-[-90deg]" viewBox="25 25 50 50">
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style="stop-color: #7debb8; stop-opacity: 1" />
                      <stop offset="100%" style="stop-color: #61e199; stop-opacity: 1" />
                    </linearGradient>
                  </defs>
                  <circle
                    class="fill-none stroke-[#E6E6E6BF] stroke-[4]"
                    cx="50"
                    cy="50"
                    r="20"
                  ></circle>
                  <circle
                    class="fill-none stroke-[url(#gradient)] stroke-[6]"
                    :stroke-dasharray="circumference"
                    :stroke-dashoffset="dashOffset"
                    stroke-linecap="round"
                    cx="50"
                    cy="50"
                    r="20"
                  ></circle>
                </svg>
                <div
                  class="absolute w-[135px] h-[135px] bg-[#ffffff] rounded-full left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] flex flex-col text-center justify-center align-center"
                >
                  <span class="font-semibold text-5xl font-firsty text-zinc-800">{{ Math.floor(store.state.procent)}}%</span>
                  <span class="font-medium text-zinc-400 tracking-wide  ">${{formattedCount}}</span>
                </div>
              </div>
            </div>
            <div class="flex flex-col text-center">
              <span class="font-medium text-center text-sm text-zinc-500 mt-2">Monthly Sale Target</span>
              <span class="font-bold text-2xl text-center text-zinc-800 mt-2">${{ store.state.target.toLocaleString('en-US') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from {
  transform: translateY(-20px);
  opacity: 0;
  border-radius: 0;
  background-color: rgb(47 218 122);
}
.list-enter-to {
  transform: translateY(0);
  opacity: 1;
  border-radius: 20px;
  background-color: white;
}
.list-leave-from {
  transform: translateY(0);
  opacity: 1;
  border-radius: 20px;
  background-color: white;
}
.list-leave-to  {
  transform: translateY(-20px);
  opacity: 0;
  border-radius: 0;
  background-color: rgb(47 218 122);
}
</style>

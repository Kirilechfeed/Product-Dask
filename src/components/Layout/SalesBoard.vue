
<script setup lang="ts" >
import { ref, watch,  onMounted } from 'vue'
import { useStore } from 'vuex'
import TodayPrice from '@/components/TodayPrice.vue'
import ItemProduct from '@/components/ItemProduct.vue'

const store = useStore()

let procent = ref(100 / store.state.target * store.state.amount)
let progressBar = ref(procent.value)


onMounted(()=>{
  store.commit('updateInitial', store.state.stores)
  store.commit('updateProcent')
  store.dispatch('startProgress')
})


const currentCount = ref(store.state.todayPrice.profit);

watch(
  () => store.state.todayPrice.profit,
  (newCount) => {
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
    <div class="flex justify-between  items-center flex-col lg:flex-row">
      <h1 class="font-bold text-2xl font-secondary text-zinc-600 pl-3">Sales</h1>
      <div class="flex w-full lg:w-[66.66%] mt-6 lg:mt-0">
        <TodayPrice :img="'globe'" :title="'Online Stores'" :price="store.state.todayPrice.webSite"  />
        <TodayPrice :img="'shopping-cart'" :title="'Sales'" :price="store.state.todayPrice.initialSales" />
        <TodayPrice :img="'sack-dollar'" :title="'Profit'" :price="store.state.todayPrice.profit" :class="'border-r-0'"/>
      </div>
    </div>
    <div class="flex flex-col">
        <div class="bg-white w-screen lg:w-auto lg:overflow-auto overflow-scroll lg:h-[460px] rounded-lg p-2 lg:p-5 flex flex-col lg:flex-row">
          <div class="shadow-3xl min-h-[460px] lg:min-h-[0px] lg:h-[460px] rounded bg-white lg:max-h-full w-full overflow-hidden">
            <div class="flex justify-between items-center py-3">
              <h2 class="text-zinc-600 font-secondary font-semibold text-lg  pl-3">Recent Sales</h2>
            </div>
            <div class="p-2 border-t border-zinc-300  w-full flex flex-col pb-10">
              <div class="flex border-b border-zinc-300  py-2 mx-4">
                <div class="flex-1 flex">
                  <h3 class="font-semibold w-1/2 text-zinc-500 text-xs leading-3">Product</h3>
                  <h3 class="hidden lg:block font-semibold w-1/2 text-zinc-500 text-xs leading-3 px-2 ">Order ID</h3>
                </div>
                <div class="flex">
                  <h3 class="hidden lg:block font-semibold text-zinc-500 text-xs leading-3 w-28 lg:w-36">Store</h3>
                  <h3 class="font-semibold text-zinc-500 text-xs leading-3 w-20 lg:w-36 text-center">Price</h3>
                  <h3 class="font-semibold text-zinc-500 text-xs leading-3 w-20 lg:w-36 text-center">Commission</h3>
                </div>
              </div>
              <transition-group name="list" tag="div" class="max-h-full">
                <div 
                  v-for="itemProduct in store.state.products"
                  :key="itemProduct.id"
                  class="transition-transform transition-opacity duration-500 ease-in-out"
                  @transitionend="itemProduct.newlyAdded = false"
                >
                  <ItemProduct :item-product="itemProduct" :isActive="true"/>
                </div>
              </transition-group>
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

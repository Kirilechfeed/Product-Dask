<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import TodayPrice from '@/components/TodayPrice.vue';
import PayCard from '@/components/PayCard.vue';
import ImgPay from '@/assets/transitions'

const store = useStore();
onMounted(() => {
  store.commit('updateInitial', store.state.stores);
  store.commit('updateProcent');
  store.dispatch('startProgress');
});


const currentCount = ref(0);
const setActivePay = (indx: number) => {
  currentCount.value = indx;
};
</script>

<template>
  <div class="main-section">
    <div class="flex justify-between items-center flex-col lg:flex-row">
      <h1 class="font-bold text-2xl font-secondary text-zinc-600 pl-3">Transaction</h1>
      <div class="flex w-full lg:w-[66.66%] mt-6 lg:mt-0">
        <TodayPrice :img="'globe'" :title="'Online Stores'" :price="store.state.todayPrice.webSite" />
        <TodayPrice :img="'shopping-cart'" :title="'Sales'" :price="store.state.todayPrice.initialSales" />
        <TodayPrice :img="'sack-dollar'" :title="'Profit'" :price="store.state.todayPrice.profit" :class="'border-r-0'" />
      </div>
    </div>
    <div class="bg-white rounded-lg p-2 lg:p-5 flex flex-col gap-y-5">
      <div class="flex flex-col shadow-3xl rounded-lg w-full">
        <div class="w-full flex flex-col justify-center">
          <div class="flex flex-col lg:flex-row items-center p-4 bg-white rounded-lg w-full justify-center gap-2">
            <div class="relative w-full lg:w-1/4 flex items-center">
              <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                <i class="fi fi-rr-dollar flex items-center text-mLime"></i>
              </span>
              <input type="text" placeholder="Enter amount" class="pl-10 pr-3 py-2 border border-mLime w-full rounded-lg focus:outline-none focus:ring-2 focus:mLime" />
            </div>
            <div class="relative w-full lg:w-auto flex-1">
              <input type="text" placeholder="Enter your withdrawal details" class="placeholder-transition w-full p-2 border border-mLime rounded-lg focus:outline-none focus:ring-2 focus:input-focused" />
            </div>
            <div class="flex gap-x-2 justify-center w-full lg:w-auto h-10 lg:h-full items-center cursor-pointer hover:bg-mLime/5 bg-mLime/10 px-2 lg:px-3 py-1 lg:py-2 text-mLime text-sm font-semibold rounded-lg border border-mLime">
              <i class="fi fi-rr-bill-arrow flex items-center text-mLime text-lg"></i>
              <div class="font-bold">Withdraw funds</div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full flex-1 grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4">
        <PayCard v-for="(itemImg, indx) in ImgPay" :key="indx" @click="setActivePay(indx)" :itemImg="itemImg" :class="indx == currentCount ? 'border-mLime':''" />
      </div>
    </div>
  </div>
</template>

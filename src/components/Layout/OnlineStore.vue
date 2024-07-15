<script setup lang="ts">
import { useStore } from 'vuex'
import TodayPrice from '@/components/TodayPrice.vue'
import StoreItem from '@/components/StoreItem.vue'
import { onMounted } from 'vue';
const store = useStore()
  onMounted(()=>{
  store.commit('updateInitial', store.state.stores)
  store.commit('updateProcent')
  store.dispatch('startProgress')
})

const addNewBebsite = () => {
    store.commit('coldouwNewStore')
    store.dispatch('openModal')
}
</script>

<template>
   <div class="main-section">
    <div class="flex justify-between items-center flex-col lg:flex-row">
        <h1 class="font-bold text-2xl font-secondary text-zinc-600 pl-3">Online Stores</h1>
        <div class="flex w-full lg:w-[66.66%] mt-6 lg:mt-0">
            <TodayPrice :img="'globe'" :title="'Online Stores'" :price="store.state.todayPrice.webSite"  />
            <TodayPrice :img="'shopping-cart'" :title="'Sales'" :price="store.state.todayPrice.initialSales" />
            <TodayPrice :img="'sack-dollar'" :title="'Profit'" :price="store.state.todayPrice.profit" :class="'border-r-0'"/>
        </div>
    </div>
    <div class="bg-[#ffffff] rounded-lg p-2 lg:p-5 flex overflow-y-scroll">
      <div class="flex flex-col shadow-3xl rounded-lg w-full h-max">
          <div class="flex items-center justify-between p-2 lg:p-4 border-b border-zinc-300">
              <h2 class="text-zinc-600 font-secondary font-semibold text-lg my-2">Online Stores List</h2>
              <div class="flex gap-x-2 items-center cursor-pointer bg-mLime/10 px-2 lg:px-3 py-1 lg:py-2 text-mLime text-xs font-semibold rounded-lg border border-mLime" @click="addNewBebsite">
                  <i class="fi fi-rr-add mt-1 mr-1"></i>
                  <div class="font-bold">Create New Website</div>
              </div>
          </div> 
          <div class="flex flex-col px-2 lg:px-4">
              <StoreItem v-for="itemStore in store.state.stores" :key="itemStore.id" :itemStore="itemStore" />
          </div>
      </div>
    </div>
</div>

</template>

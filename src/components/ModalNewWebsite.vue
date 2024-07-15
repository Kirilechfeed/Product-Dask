<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import store from '@/store';
import GridLoader from 'vue-spinner/src/GridLoader.vue'
import { stores } from '@/product'

interface IStore{
  id: string
  name: string,
  sales: {
    salesCount: number
    profit: number
  },
}
   let successfully = ref(false)
   const color = '#2FDA7A'
   const size = ['20px', '20px'] 
   function getRandomNewStore(): IStore {
    let newItem: IStore | null = null;
    let nameStore = stores[Math.floor(Math.random() * stores.length)];

    for (const elem of store.state.stores) {
        if (elem.name !== nameStore) {
            newItem = { id: crypto.randomUUID(), name: nameStore, sales: { profit: 0, salesCount: 0 } };
            break; 
        }
    }
    if (!newItem) {
        return getRandomNewStore();
    }

    return newItem;
}
onBeforeMount(() => {
    const newStore = getRandomNewStore();
    if (newStore) {
        store.commit('addNewStore', newStore);
    } else {
        console.error('Failed to generate a new store.'); 
    }
});
   setTimeout(()=>{
    successfully.value = true
   },3000)
</script>

<template>
  <div class="absolute top-0 right-0 h-full w-full bg-black/50 backdrop-blur z-50 flex justify-center items-center">
       <div class="px-10 py-6 rounded-lg bg-white shadow-2xl rounded-lg  text-center">
            <div  class="flex flex-col items-center">
                <h2 v-if="!successfully"  class="font-bold text-2xl">Hold on...</h2>
                <h2 v-else class="font-bold text-2xl">Done</h2>

                <p v-if="!successfully" class="text-lg text-gray-500 mt-2">We are customizing your web site</p>
                <p v-else class="text-lg text-gray-500 mt-2">Your new site is ready!</p>


                <div v-if="!successfully" class="max-w-1/2  flex flex-col py-10" ref="listCircke">
                    <GridLoader  :visible="'true'" :size="size" :color="color"></GridLoader>
                </div>
                <div v-else class="flex py-10 items-center">
                     <i class="text-6xl text-mLime mt-2  fi fi-rr-badge-check"></i>
                </div>
            </div> 
       </div>
  </div>
</template>


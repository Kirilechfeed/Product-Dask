<script setup lang="ts">
import LayoutItem from '@/components/LayoutItem.vue';
import { ref, computed, onBeforeMount } from 'vue';
import { stores } from '@/product';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
interface ILayoutBoard{
  imgName: string
  label: string
  path: string
}


const route = useRoute();
const store = useStore();

const randomStores = ref<string[]>([]);

const layoutBoard = [
  { imgName: 'apps', label: 'Dashboard', path: 'dashboard' },
  { imgName: 'globe', label: 'Online Stores', path: 'onlineStore' },
  { imgName: 'order-history', label: 'Sales', path: 'sales' },
  { imgName: 'bill-arrow', label: 'Transaction', path: 'transaction' },
];

const activeIndex = ref();


const currentPath = computed(() => {
  return route.path.startsWith('/') ? route.path.slice(1) : route.path;
});

function setActive(index: number) {
  activeIndex.value = index;
}



onBeforeMount(() => {
  const getStore = () => {
    for (let index = 0; index < store.state.todayPrice.webSite; index++) {
      const [name] = stores.splice(Math.floor(Math.random() * stores.length), 1);
      randomStores.value.push(name);
    }
    let newStores = distributeValues(10000, randomStores.value);
    store.commit('addStores', newStores);
  };
  getStore();
});

function getActiveLink(index:number, item: ILayoutBoard, clTrue: string | [string, string], clFalse: string | [string, string]): string | [string, string] {
  if (activeIndex.value == index || currentPath.value == item.path) {
    return clTrue;
  } else return clFalse;
}

function distributeValues(totalProfit: number, randomStores: string[]) {
  let weights = Array.from({ length: randomStores.length }, () => Math.random());

  let sumWeights = weights.reduce((a, b) => a + b, 0);
  let normalizedWeights = weights.map(w => w / sumWeights);

  let profits = normalizedWeights.map(w => w * totalProfit);
  let sales = profits.map(p => p / (0.5 + Math.random()));

  return randomStores.map((store: string, index: number) => ({
    id: crypto.randomUUID(),
    name: store,
    sales: {
      salesCount: Math.round(sales[index]),
      profit: profits[index],
    },
  }));
}
</script>

<template>
  <div class="flex fixed bottom-0 z-20 lg:relative w-full lg:w-60 h-12 lg:h-full bg-gradient-to-b from-white to-zinc-100 px-5 lg:py-24 shadow-2xl lg:shadow-none">
    <div class="flex w-full lg:flex-col items-center lg:items-stretch justify-around lg:justify-stretch gap-y-8">
      <LayoutItem
        v-for="(item, indx) in layoutBoard"
        :key="indx"
        :item-board="item"
        :activeElem="getActiveLink(indx, item, 'ml-3', 'ml-0')"
        :class="getActiveLink(indx, item, ['text-zinc-800', 'text-2xl'], ['text-zinc-400', 'text-xl'])"
        @click="setActive(indx)"
      />
    </div>
  </div>
</template>

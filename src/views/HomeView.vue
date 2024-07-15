<script setup lang="ts">
import MenuTop from '@/components/MenuTop.vue'
import LayoutBoard from '@/components/LayoutBoard.vue'
import ModalNewWebsite from '@/components/ModalNewWebsite.vue'
import store from '@/store';
import {stores} from '@/product'
import { onBeforeMount } from 'vue';

interface Props {
  params: {
      type: Object,
      required: true
  }
}
const props = defineProps<Props>()
  onBeforeMount(()=>{
  store.commit('getColStores',props.params)
  store.commit('updateProcent')
})

</script>

<template>
  <ModalNewWebsite v-if="store.state.modal" :allStores="stores"/>
  <div class="font-display flex flex-col gap-y-2 h-dvh w-screen relative bg-gToColor">
    <MenuTop class="sticky top-0 z-10" />
    <div class="flex-1 flex flex-col-reverse lg:flex-row bg-gToColor overflow-auto w-screen">
      <LayoutBoard />
      <RouterView />
    </div>
  </div>
  
</template>


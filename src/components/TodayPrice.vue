<script setup lang="ts">
import { ref, watch, computed } from 'vue';
interface Props {
  img: string
  price: number
  title: string
}

const props = defineProps<Props>()

const currentCount = ref(props.price);

const formattedCount = computed(() => {
  return currentCount.value.toLocaleString('en-US');
});

watch(
  () => props.price,
  (newCount) => {
    const startValue = currentCount.value;
    const endValue = newCount;
    const duration = 1000; 
    const frameDuration = 1000 / 60;
    const totalFrames = duration / frameDuration;
    let frame = 0;

    function animate() {
      frame++;
      const progress = frame / totalFrames;
      currentCount.value = Math.round(startValue + (endValue - startValue) * progress);
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
  <div class=" flex items-center w-[33%] lg:pl-[30px] border-r border-zinc-300">
    <div class="flex items-center w-full lg:w-auto flex-col lg:flex-row text-center lg:text-stretch">
      <div class="lg:mr-[25px]">
        <i :class="`text-xl lg:text-2xl text-zinc-500 bg-zinc-300 p-2.5 rounded-lg flex items-center justify-center fi fi-rr-${$props.img}`"></i>
      </div>
      <div class="w-full flex flex-1 ">
        <div class="flex flex-col items-center lg:items-start w-full">
          <span class="text-2xl font-bold mt-2 lg:mt-0 text-primary text-mLime block "
            >{{props.title == 'Profit' ? '$':''}}{{ formattedCount  }}</span
          >
          <span class="text-xs text-zinc-400" >{{ title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

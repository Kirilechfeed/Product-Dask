<script setup lang="ts"></script>

<template>
  <div class="bg-gradient-to-r from-gFromColor via-gMidleColor to-gToColor py-3 flex max-w-full">
    <div class="flex justify-between mx-5 w-full">
      <span class="font-oxanium text-2xl mt-1 ml-1  bg-gradient-to-r from-zinc-800 from-20% to-zinc-400 bg-clip-text text-transparent select-none"><i class="font-extrabold not-italic">AI</i>Revolution</span>
      <div class="flex gap-x-2.5 items-center">
        <i class="text-xl cursor-pointer rounded-lg transition-all hover:bg-zinc-200 p-2 flex justify-center items-center fi fi-rr-bell"></i>
        <div class="relative">
          <i class="text-xl cursor-pointer rounded-lg transition-all hover:bg-zinc-200 p-2 flex justify-center items-center fi fi-rr-comment-alt"></i>
          <span class="absolute -top-2 lg:-top-3 -right-2 w-4 h-4 bg-zinc-800 rounded-full flex items-center justify-center text-white text-xs">2</span>
        </div>
        <img src="@/assets/persone.svg" alt="" class="w-[40px] h-[40px] hidden lg:block ml-4" />
        <i class="fi fi-rr-menu-burger block pl-4 lg:hidden"></i>
      </div>
    </div>
  </div>
</template>

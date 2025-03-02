<template>
  <div class="w-full flex flex-col">
    <div class="w-full h-screen relative flex flex-col gap-4 items-center overflow-hidden">

      <div class="w-[60vw] h-[60vw] -top-[45vw] rounded-full blur-3xl bg-gradient-to-b from-blue-200 from-80% absolute">
      </div>

      <div class="flex-1 flex flex-col justify-center items-center text-center pt-40 z-10">
        <span class="text-[5vw] h-[5vw]">Shop Online in <span class="font-extrabold text-blue-700">Iraq</span> </span>

        <span class="text-lg lg:max-w-lg">Register and load your account balance to start shopping online tax free
          today.</span>
      </div>

      <div class="max-w-[60vw] h-full max-h-[40vh] relative">


        <img src="@/assets/pics/box01.png" class="absolute w-32 lg:w-52 -top-12 -right-12 lg:-top-24 lg:-right-24 "
          alt="">



        <img src="@/assets/pics/plane.png" class="absolute w-60 -right-12 bottom-20 lg:-right-32" alt="">
        <div
          class="w-full  h-full bg-slate-100 border-t border-x border-white rounded-t-2xl px-3 pt-3 relative shadow-2xl shadow-blue-200">
          <div class="w-full h-full rounded-t-lg overflow-hidden z-10">
            <img src="@/assets/pics/capture01.png" alt="">
          </div>
        </div>



        <img src="@/assets/pics/drop.png" class="absolute w-32 lg:w-96 -top-12 -left-12 lg:-top-40 lg:-left-40 z-0"
          alt="">

      </div>




      <div class="w-full h-60 bg-gradient-to-t from-20% from-white to-trensparent bottom-0 absolute blur"></div>

    </div>

    <div class="w-full h-40 bg-white">
      <div class="overflow-hidden relative">

        <div class="w-60 h-full absolute right-0 bg-gradient-to-l from-white to-transparent z-10">

        </div>



        <div class="w-60 h-full absolute left-0 bg-gradient-to-r from-white to-transparent z-10">

        </div>

        <div class="flex gap-8 w-max animate-roll" :class="{ 'animate-roll-slow': isHovered }">
          <span v-for="item in 20" :key="item"
            class="w-32 h-32 bg-slate-200 flex items-center justify-center">logo</span>
        </div>
      </div>
    </div>

    <div class="w-full py-24 flex flex-col gap-12 justify-center items-center px-6">
      <div class="w-full h-fit max-w-screen-xl grid lg:grid-cols-2 gap-16 lg:gap-3">

        <div class="lg:w-96 xl:h-96 relative">

          <div class="w-full h-full absolute bg-gradient-to-br from-secondary to-blue-700 blur-2xl z-0">
          </div>

          <div class="w-full h-full  overflow-hidden z-10 absolute inset-0">

            <img src="@/assets/pics/ship.jpg" class="w-full h-full object-cover  rounded-2xl" alt="">
          </div>



          <div
            class="w-32 h-32 bg-gradient-to-br from-secondary to-blue-700 absolute rounded-2xl -top-6 -right-16 rotate-12 shadow-xl flex items-center justify-center z-10">
            <parcel-icon class="w-16 h-16 fill-white" />
          </div>

          <div
            class="w-24 h-24 small-bg-glass-effect absolute rounded-2xl -top-6 -left-16 -rotate-12 shadow-xl flex items-center justify-center z-10">
            <creditCardIcon class="w-12 h-12 fill-blue-700" />
          </div>



          <div
            class="w-24 h-24  small-bg-glass-effect absolute rounded-2xl -bottom-6 -right-2 -rotate-45 shadow-xl flex items-center justify-center z-10">
            <CartIcon class="w-12 h-12 fill-blue-700" />
          </div>

        </div>


        <div class="w-full h-fit flex flex-col gap-4 my-auto">
          <span class="text-4xl font-bold text-primary">what's worldship</span>
          <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos sequi incidunt dolor consequuntur debitis
            sint voluptas ea dolores eaque. Iure nobis dolorem porro debitis reiciendis consequatur, quia veritatis
            dolor omnis.</span>
          <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos sequi incidunt dolor consequuntur debitis
            sint voluptas ea dolores eaque. Iure nobis dolorem porro debitis reiciendis consequatur, quia veritatis
            dolor omnis.</span>
          <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos sequi incidunt dolor consequuntur debitis
            sint voluptas ea dolores eaque. Iure nobis dolorem porro debitis reiciendis consequatur, quia veritatis
            dolor omnis.</span>
          <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos sequi incidunt dolor consequuntur debitis
            sint voluptas ea dolores eaque. Iure nobis dolorem porro debitis reiciendis consequatur, quia veritatis
            dolor omnis.</span>
          <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos sequi incidunt dolor consequuntur debitis
            sint voluptas ea dolores eaque. Iure nobis dolorem porro debitis reiciendis consequatur, quia veritatis
            dolor omnis.</span>
        </div>
      </div>


      <div class="w-full py-24 flex flex-col max-w-screen-xl justify-center items-center gap-12 px-6">
        <span class="text-4xl font-bold text-primary">Our Features</span>

        <div class="w-full flex flex-wrap gap-x-10 gap-y-20 justify-center">
          <div v-for="item in 5" :key="item" class="w-96 h-fit flex flex-col gap-3">
            <span class="pixa-title">item {{ item }}</span>
            <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae eaque minus laudantium est eligendi.
              Eum, similique, ut nihil iure officia architecto consequatur dolor rerum voluptates, doloribus fuga
              accusantium praesentium molestiae.</span>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full h-96 overflow-hidden flex items-center relative">
      <div class="w-full h-full bg-blue-600/70 absolute inset-0 flex justify-center">
        <div class="w-full h-full max-w-[600px] px-6 flex flex-col text-white gap-6 items-center justify-center">
          <span class="text-4xl font-bold text-center">why worldship</span>
          <span class=" text-center">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex, autem dolorum. Iure
            delectus libero quam
            nisi iusto ipsam consectetur illo vel reiciendis. Odit delectus soluta porro! Eius dolore reprehenderit
            ab. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex, autem dolorum. Iure
            delectus libero quam
            nisi iusto ipsam consectetur illo vel reiciendis. Odit delectus soluta porro! Eius dolore reprehenderit
            ab.</span>
        </div>
      </div>
      <img src="@/assets/pics/ship01.jpg" class="w-full object-cover" alt="">
    </div>

    <div class="w-full py-24 flex flex-col gap-12 justify-center items-center px-6">
      <div class="w-full py-24 flex flex-col max-w-screen-xl justify-center items-center gap-12 px-6">
        <span class="text-4xl font-bold text-primary">payment types</span>

        <div class="w-full max-w-2xl flex">
          <span class="text-center">
            To use Boombeene, you must have money in your account balance. To load your account balance, you can come to
            any of our locations to pay by cash or you can use Nass Wallet and Zain Cash.</span>
        </div>

        <div class="flex gap-6">
          <div class="w-80 h-80 bg-slate-200"></div>
          <div class="w-80 h-80 bg-slate-200"></div>
          <div class="w-80 h-80 bg-slate-200"></div>
        </div>

      </div>

      <div class="w-full py-24 flex flex-col max-w-screen-xl justify-center items-center gap-12 px-6">
        <span class="text-4xl font-bold text-primary">Let’s talk</span>

        <div class="w-full max-w-2xl flex flex-col gap-12">
          <span class="text-center">
            We are ready to assist you with shopping online. If you have any questions before getting started, please
            feel free to contact us. </span>

          <div class="w-full h-96 small-bg-glass-effect"></div>
        </div>


      </div>
    </div>

  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import parcelIcon from '@/assets/icons/parcelIcon.vue';
import creditCardIcon from '@/assets/icons/creditCardIcon.vue';
import CartIcon from '@/assets/icons/cartIcon.vue';


const isHovered = ref(false);
</script>

<style lang="scss" scoped>
@keyframes roll {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}

.animate-roll {
  animation: roll 20s linear infinite;
}

.animate-roll-slow {
  animation-duration: 40s;
  /* Slower speed on hover */
}

/* Pause animation when container is hovered */
.group:hover .animate-roll {
  animation-play-state: paused;
}
</style>

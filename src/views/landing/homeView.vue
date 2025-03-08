<template>
  <div class="w-full flex flex-col">
    <div class="w-full h-fit relative flex flex-col gap-4 items-center overflow-hidden">

      <div class="w-[60vw] h-[60vw] -top-[45vw] rounded-full blur-3xl bg-gradient-to-b from-blue-200 from-80% absolute">
      </div>

      <div class="flex-1 flex flex-col justify-center items-center text-center pt-40 z-10 mt-20">
        <span class="text-[5vw] h-[5vw]">Ship from the <span class="font-extrabold text-blue-700">U.S.</span> to
        </span>

        <span class="text-[5vw] h-[5vw] mt-4">
          <span class="font-extrabold text-blue-700">Kurdistan</span>
          and
          <span class="font-extrabold text-blue-700">Iraq</span>
        </span>

        <span class="lg:text-lg max-w-md px-4 lg:px-0 lg:max-w-xl mt-8 lg:mt-0">The safest and most reliable shipping
          service.
          Register
          for a
          free
          account and
          start shipping today.</span>


        <div class="max-w-[60vw] h-fit relative">


          <img src="@/assets/pics/box01.png" class="absolute w-32 lg:w-52 -top-12 -right-12 lg:-right-24 " alt="">



          <img src="@/assets/pics/plane.png" class="absolute w-60 -right-12 bottom-10 lg:-right-32" alt="">

          <div
            class="w-full max-w-[70vw] h-fit bg-slate-100 bg-glass-effect px-3 pt-3 relative shadow-2xl shadow-blue-200 my-28 grid grid-cols-4 gap-4  font-semibold">

            <div class="flex flex-col items-center justify-center gap-2 my-6 min-w-48">
              <span class="text-3xl text-primary">232</span>
              <span>clients</span>
            </div>
            <div class="flex flex-col items-center justify-center gap-2 my-6">
              <span class="text-3xl text-primary">521</span>
              <span>prjects</span>
            </div>
            <div class="flex flex-col items-center justify-center gap-2 my-6">
              <span class="text-3xl text-primary">1453</span>
              <span>support</span>
            </div>
            <div class="flex flex-col items-center justify-center gap-2 my-6">
              <span class="text-3xl text-primary">32</span>
              <span>workers</span>
            </div>

          </div>



          <img src="@/assets/pics/drop.png" class="absolute w-32 lg:w-96 -top-12 -left-12 lg:-top-20 lg:-left-48 z-0"
            alt="">


        </div>

      </div>


    </div>

    <div class="w-full h-40 bg-white">
      <div class="overflow-hidden relative">

        <div class="w-60 h-full absolute right-0 bg-gradient-to-l from-white to-transparent z-10">

        </div>



        <div class="w-60 h-full absolute left-0 bg-gradient-to-r from-white to-transparent z-10">

        </div>
        <div class="relative overflow-hidden group py-8">
          <div ref="slider" class="flex w-[fit-content] gap-16"
            :style="`transform: translateX(${offset}%); transition-duration: ${transitionDuration}ms`"
            @mouseenter="handleHover(true)" @mouseleave="handleHover(false)">
            <span v-for="item in logos" :key="item.id"
              class="w-32 h-32  shrink-0 flex items-center justify-center object-contain px-6"
              style="aspect-ratio : 3/2">
              <img :src="item.logo" alt="">
            </span>
          </div>
        </div>

      </div>
    </div>

    <div class="w-full py-24 flex flex-col gap-12 justify-center items-center px-6">
      <div class="w-full h-fit max-w-screen-xl grid lg:grid-cols-2 gap-16 lg:gap-3">

        <div class="lg:w-96 xl:h-96 relative my-auto">

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
          <span class="text-4xl font-bold text-primary">about worldship</span>
          <span>Shipping services is a registered company located in Nashville, Tennessee (USA).
            We provide shop and ship and direct shipping services to Kurdistan and cities across Iraq.
            <br><br>
            Once registered, you will be provided with a U.S. shipping address at our warehouse that can be used to shop
            anywhere online.</span>

          <div class="w-full flex flex-col gap-2">
            <div class="w-16 h-16 mt-4 flex items-center justify-center">
              <support-user-icon class="w-8 h-8 fill-primary" />
            </div>
            <span class="pixa-title">Customer Support</span>
            <span>Our support staff is available by phone and email during business hours to ensure a positive
              experience.</span>

            <div class="w-16 h-16 mt-4  flex items-center justify-center">
              <WalletIcon class="w-8 h-8 fill-primary" />
            </div>
            <span class="pixa-title">
              Affordable</span>
            <span>We offer the lowest shipping rates to Kurdistan and cities across Iraq compared to DHL, USPS, and
              Fedex.</span>

            <div class="w-16 h-16 mt-4  flex items-center justify-center">
              <shield-icon class="w-8 h-8 fill-primary" />
            </div>
            <span class="pixa-title">Safe & Reliable</span>
            <span>Shipments are consolidated on pallets for extra security and we handle our own clearances at Erbil
              airport.</span>
          </div>
        </div>
      </div>


      <div class="w-full py-24 flex flex-col max-w-screen-xl justify-center items-center gap-12 px-6">
        <span class="text-4xl font-bold text-primary">Our services</span>

        <div class="w-full flex flex-wrap gap-x-10 gap-y-20 justify-center">
          <div v-for="item in services" :key="item.id" class="w-96 h-fit flex flex-col gap-3">
            <span class="pixa-title">{{ item.title }}</span>
            <span>{{ item.text }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full h-96 overflow-hidden flex items-center relative">
      <div class="w-full h-full bg-blue-600/70 absolute inset-0 flex justify-center">
        <div class="w-full h-full max-w-[600px] px-6 flex flex-col text-white gap-6 items-center justify-center">
          <span class="text-4xl font-bold text-center">READY TO START?</span>
          <span class=" text-center">Manage your inbox items by logging into your account or by using our mobile apps.
            You can ship your items to any of our branches in Kurdistan & Iraq or return items to a U.S. address.</span>
        </div>
      </div>
      <img src="@/assets/pics/ship01.jpg" class="w-full object-cover" alt="">
    </div>


    <div class="w-full py-24 flex flex-col gap-12 justify-center items-center px-6">



      <div class="w-full py-24 flex flex-col max-w-screen-xl justify-center items-center gap-12 px-6">
        <span class="text-4xl font-bold text-primary">Pricing</span>

        <div class="w-full max-w-2xl flex flex-col gap-12">
          <span class="text-center">
            We are ready to assist you with shopping online. If you have any questions before getting started, please
            feel free to contact us. </span>

          <div class="w-full h-fit small-bg-glass-effect flex flex-col gap-4 p-4">
            <div class="grid grid-cols-4 gap-4">
              <label class="form-control w-full col-span-3">
                <div class="label">
                  <span class="label-text uppercase">weight</span>
                </div>
                <input type="text" required
                  class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
              </label>
              <commun-combobox class="mt-auto"
                :list="[{ id: 'lbs', designation: 'lbs' }, { id: 'kg', designation: 'kg' }]" />
            </div>


            <div class="grid grid-cols-4 gap-4">
              <label class="form-control w-full">
                <div class="label">
                  <span class="label-text uppercase">l </span>
                </div>
                <input type="text" required
                  class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
              </label>

              <label class="form-control w-full">
                <div class="label">
                  <span class="label-text uppercase">w </span>
                </div>
                <input type="text" required
                  class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
              </label>

              <label class="form-control w-full">
                <div class="label">
                  <span class="label-text uppercase">h </span>
                </div>
                <input type="text" required
                  class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
              </label>


              <commun-combobox class="mt-auto"
                :list="[{ id: 'in', designation: 'in' }, { id: 'cm', designation: 'cm' }]" />
            </div>




            <label class="form-control w-full">
              <div class="label">
                <span class="label-text uppercase">city </span>
              </div>
              <commun-combobox class="mt-auto"
                :list="[{ id: 'erbil', designation: 'erbil' }, { id: 'baghdad', designation: 'baghdad' }]" />
            </label>

            <label class="form-control w-full">
              <div class="label">
                <span class="label-text uppercase">insurance</span>
              </div>
              <input type="text" required
                class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
            </label>

            <div class="w-full h-fit bg-slate-50 rounded-xl my-6 grid grid-cols-2 p-4 gap-4 uppercase">
              <span>Chargeable Weight</span>
              <span>80 kg</span>
              <span>Shipping Cost</span>
              <span>$20.00</span>
              <span>Package Request Fee</span>
              <span>$5.00</span>
              <span class="font-semibold">Total Cost</span>
              <span class="font-semibold">$120.00</span>
            </div>

            <button class="btn btn-sm pixa-btn btn-primary">calculate shipping</button>
          </div>
        </div>


      </div>

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

          <div class="w-full h-fit small-bg-glass-effect flex flex-col gap-4 p-4">
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text uppercase">full name </span>
              </div>
              <input type="text" required
                class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
            </label>

            <label class="form-control w-full">
              <div class="label">
                <span class="label-text uppercase">email </span>
              </div>
              <input type="text" required
                class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
            </label>

            <label class="form-control w-full">
              <div class="label">
                <span class="label-text uppercase">message </span>
              </div>
              <textarea type="text" required class="pixa-textarea " />
            </label>

            <button class="btn btn-sm pixa-btn btn-primary">contact us</button>
          </div>
        </div>


      </div>
    </div>

  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import parcelIcon from '@/assets/icons/parcelIcon.vue';
import creditCardIcon from '@/assets/icons/creditCardIcon.vue';
import CartIcon from '@/assets/icons/cartIcon.vue';
import communCombobox from '@/components/commun/communCombobox.vue';
import supportUserIcon from '@/assets/icons/supportUserIcon.vue';
import shieldIcon from '@/assets/icons/shieldIcon.vue';
import WalletIcon from '@/assets/icons/walletIcon.vue';


const offset = ref(0);
const speed = ref(1);
const isHovered = ref(false);
const transitionDuration = ref(3000); // Adjust base speed here
const slider = ref(null);
const services = ref(
  [
    {
      id: 1,
      title: 'shop & ship',
      text: 'Shop online and ship your items to your USA “Boombinere” address. We will receive your packages from merchants and check them into your online inbox.'
    }, {
      id: 2,
      title: 'Ship Direct',
      text: 'Ship your own packages to your Boombinere address in Nashville, TN using couriers such as UPS, FedEx, and USPS. We will add all contents of your package to your online inbox.'
    }, {
      id: 3,
      title: 'Pro Members',
      text: 'Upgrade to a Pro Membership to receive discounted shipping rates and fees, and the ability to add up to 10 suite addresses to your main account. Save on annual plans!'
    }, {
      id: 4,
      title: 'Nashville Post Office',
      text: 'We serve as local post office for customers located in Nashville, TN. Bring your goods to our office and we will handle the packaging and documentation. '
    }, {
      id: 5,
      title: 'Air Cargo',
      text: 'All customers will receive discounted rates for all shipments over 500 LBs. Save even more when you ship over 1000 LBs+. Use our shipping calculator to view rates. '
    }, {
      id: 6,
      title: 'Buy for Me',
      text: 'We can shop for you if you do not have the ability to shop yourself. Sign up on Boombeene and connect your account to your Boombinere suite. '
    },
  ]
)

const logos = ref(
  [
    {
      id: 1,
      logo: new URL('@/assets/pics/zara.svg', import.meta.url).href
    }, {
      id: 2,
      logo: new URL('@/assets/pics/adidas.svg', import.meta.url).href
    }, {
      id: 3,
      logo: new URL('@/assets/pics/lacoste.svg', import.meta.url).href
    }, {
      id: 4,
      logo: new URL('@/assets/pics/walmart.svg', import.meta.url).href
    }, {
      id: 5,
      logo: new URL('@/assets/pics/apple.svg', import.meta.url).href
    }, {
      id: 6,
      logo: new URL('@/assets/pics/asus.svg', import.meta.url).href
    }, {
      id: 7,
      logo: new URL('@/assets/pics/best.svg', import.meta.url).href
    }, {
      id: 8,
      logo: new URL('@/assets/pics/blackberry.svg', import.meta.url).href
    }, {
      id: 9,
      logo: new URL('@/assets/pics/amazon.svg', import.meta.url).href
    }, {
      id: 10,
      logo: new URL('@/assets/pics/sony.svg', import.meta.url).href
    }, {
      id: 11,
      logo: new URL('@/assets/pics/ray.svg', import.meta.url).href
    }, {
      id: 12,
      logo: new URL('@/assets/pics/north.svg', import.meta.url).href
    }, {
      id: 13,
      logo: new URL('@/assets/pics/levis.svg', import.meta.url).href
    }, {
      id: 14,
      logo: new URL('@/assets/pics/ey.svg', import.meta.url).href
    }, {
      id: 15,
      logo: new URL('@/assets/pics/guinness.svg', import.meta.url).href
    }, {
      id: 16,
      logo: new URL('@/assets/pics/ebay.svg', import.meta.url).href
    }, {
      id: 17,
      logo: new URL('@/assets/pics/chanel.svg', import.meta.url).href
    },
  ]
)


// Animation logic
let animationFrame;

const animate = () => {
  if (!isHovered.value) {
    offset.value -= 0.02 * speed.value;

    // Reset offset when halfway through
    if (offset.value <= -50) {
      offset.value = 0;
    }
  }

  animationFrame = requestAnimationFrame(animate);
};

const handleHover = (hoverState) => {
  isHovered.value = hoverState;
  speed.value = hoverState ? 0.3 : 1; // Adjust slowdown factor here
};

onMounted(() => {
  animate();
});

// Cleanup animation frame
onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrame);
});
</script>

<style lang="scss" scoped>
/* Smooth transition for hover effect */
div {
  transition-timing-function: linear;
  transition-property: transform, opacity;
}
</style>

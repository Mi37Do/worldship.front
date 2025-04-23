<template>
  <input type="checkbox" :checked="useWidget.addCard" class="modal-toggle" />
  <div class="modal modal-bottom md:modal-middle" role="dialog">
    <div class="w-full max-w-lg h-fit modal-box flex flex-col p-4">
      <div class="w-full h-14 flex items-center justify-between pb-4">
        <span class="pixa-title">Add Card</span>
        <div class="flex gap-2">
          <button @click="() => { useWidget.addCard = false }" class="btn btn-sm pixa-btn w-10 pixa-btn-nofloat p-0">
            <times-icon class="w-5 h-5" />
          </button>
        </div>
      </div>

      <div class="flex">
        <div class="w-full bg-white p-6">
          <!-- Card Preview -->
          <div class="mb-6">
            <div class="relative w-full h-48 rounded-xl text-white p-6 overflow-hidden transition-all duration-300"
              :class="{
                'bg-gradient-to-r from-indigo-500 to-purple-600': !isCardFlipped,
                'bg-gradient-to-r from-gray-700 to-gray-900': isCardFlipped
              }">
              <!-- Front Side -->
              <div v-if="!isCardFlipped" class="h-full flex flex-col justify-between">
                <div class="flex justify-between items-start">
                  <img
                    src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png"
                    class="h-8">
                  <img
                    :src="'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/' + getCardType + '.png'"
                    v-if="getCardType" class="h-8">
                </div>

                <div class="text-xl tracking-widest">
                  <span v-for="(n, index) in generateCardNumberMask" :key="index">
                    <span v-if="cardNumber.length > index && n.trim() !== ''">
                      {{ index > 4 && index < 15 ? '*' : cardNumber[index] }} </span>
                        <span v-else>{{ n }}</span>
                    </span>
                </div>

                <div class="flex justify-between items-center text-sm">
                  <div>
                    <div class="uppercase text-xs opacity-70">Card Holder</div>
                    <div class="font-semibold tracking-wider">
                      {{ cardName || 'FULL NAME' }}
                    </div>
                  </div>
                  <div>
                    <div class="uppercase text-xs opacity-70">Expires</div>
                    <div class="font-semibold tracking-wider">
                      {{ cardMonth || 'MM' }}/{{ cardYear ? String(cardYear).slice(2, 4) : 'YY' }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Back Side -->
              <div v-else class="h-full flex flex-col justify-between">
                <div class="h-8 bg-black w-full mt-4"></div>
                <div class="bg-gray-200 h-8 rounded flex items-center justify-end px-2">
                  <span class="text-gray-800 font-bold">
                    <span v-for="(n, index) in cardCvv" :key="index">*</span>
                  </span>
                </div>
                <div class="flex justify-end">
                  <img
                    :src="'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/' + getCardType + '.png'"
                    v-if="getCardType" class="h-8">
                </div>
              </div>
            </div>
          </div>

          <!-- Form -->
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div>
              <label class="block text-gray-700 mb-1">Card Number</label>
              <input type="text" v-model="cardNumber" @focus="focusInput" @blur="blurInput" data-ref="cardNumber"
                :placeholder="getCardType === 'amex' ? '1234 567890 12345' : '1234 5678 9012 3456'"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300" />
            </div>

            <div>
              <label class="block text-gray-700 mb-1">Card Holder</label>
              <input type="text" v-model="cardName" @focus="focusInput" @blur="blurInput" data-ref="cardName"
                placeholder="Full Name"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300" />
            </div>

            <div class="flex gap-4">
              <div class="flex-1">
                <label class="block text-gray-700 mb-1">Expiration Date</label>
                <div class="flex gap-2">
                  <select v-model="cardMonth" @focus="focusInput" @blur="blurInput" data-ref="cardDate"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300">
                    <option value="" disabled selected>Month</option>
                    <option v-for="n in 12" :value="n < 10 ? '0' + n : n" :disabled="n < minCardMonth" :key="n">
                      {{ n < 10 ? '0' + n : n }} </option>
                  </select>
                  <select v-model="cardYear" @focus="focusInput" @blur="blurInput" data-ref="cardDate"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300">
                    <option value="" disabled selected>Year</option>
                    <option v-for="(n, index) in 12" :value="index + minCardYear" :key="n">
                      {{ index + minCardYear }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="flex-1">
                <label class="block text-gray-700 mb-1">CVV</label>
                <input type="text" v-model="cardCvv" @focus="flipCard(true)" @blur="flipCard(false)" maxlength="4"
                  placeholder="123"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300" />
              </div>
            </div>

            <button type="submit"
              class="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium">
              Add Payment Method
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useWidgetStore } from '@/stores/widget';
import timesIcon from '@/assets/icons/timesIcon.vue';

const useWidget = useWidgetStore();

// Card data
const currentCardBackground = ref(Math.floor(Math.random() * 25 + 1));
const cardName = ref("");
const cardNumber = ref("");
const cardMonth = ref("");
const cardYear = ref("");
const cardCvv = ref("");
const minCardYear = ref(new Date().getFullYear());
const amexCardMask = ref("#### ###### #####");
const otherCardMask = ref("#### #### #### ####");
const isCardFlipped = ref(false);
const focusElementStyle = ref(null);
const isInputFocused = ref(false);

// Refs for DOM elements
const cardNumberRef = ref(null);
const cardNameRef = ref(null);
const cardDateRef = ref(null);

// Computed properties
const getCardType = computed(() => {
  let number = cardNumber.value.replace(/\s/g, '');
  let re = new RegExp("^4");
  if (number.match(re) != null) return "visa";

  re = new RegExp("^(34|37)");
  if (number.match(re) != null) return "amex";

  re = new RegExp("^5[1-5]");
  if (number.match(re) != null) return "mastercard";

  re = new RegExp("^6011");
  if (number.match(re) != null) return "discover";

  re = new RegExp('^9792');
  if (number.match(re) != null) return 'troy';

  return "visa"; // default type
});

const generateCardNumberMask = computed(() => {
  return getCardType.value === "amex" ? amexCardMask.value : otherCardMask.value;
});

const minCardMonth = computed(() => {
  if (cardYear.value === minCardYear.value) return new Date().getMonth() + 1;
  return 1;
});

// Methods
const flipCard = (status) => {
  isCardFlipped.value = status;
};

const focusInput = (e) => {
  isInputFocused.value = true;
  let targetRef = e.target.dataset.ref;
  let target;

  if (targetRef === 'cardNumber') target = cardNumberRef.value;
  else if (targetRef === 'cardName') target = cardNameRef.value;
  else if (targetRef === 'cardDate') target = cardDateRef.value;

  if (target) {
    focusElementStyle.value = {
      width: `${target.offsetWidth}px`,
      height: `${target.offsetHeight}px`,
      transform: `translateX(${target.offsetLeft}px) translateY(${target.offsetTop}px)`
    };
  }
};

const blurInput = () => {
  setTimeout(() => {
    if (!isInputFocused.value) {
      focusElementStyle.value = null;
    }
  }, 300);
  isInputFocused.value = false;
};

const handleSubmit = () => {
  // Handle form submission
  console.log('Card submitted:', {
    number: cardNumber.value,
    name: cardName.value,
    expiry: `${cardMonth.value}/${cardYear.value}`,
    cvv: cardCvv.value,
    type: getCardType.value
  });
  useWidget.addCard = false;
};

// Watchers
watch(cardYear, () => {
  if (cardMonth.value < minCardMonth.value) {
    cardMonth.value = "";
  }
});

// Lifecycle hooks
onMounted(() => {
  // Initialize refs after component is mounted
  cardNumberRef.value = document.querySelector('[data-ref="cardNumber"]');
  cardNameRef.value = document.querySelector('[data-ref="cardName"]');
  cardDateRef.value = document.querySelector('[data-ref="cardDate"]');
});
</script>

<style scoped>
/* Transition styles for card flipping */
.card-item__side {
  backface-visibility: hidden;
  transition: all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);
}

/* Focus element animation */
.card-item__focus {
  transition: all 0.35s cubic-bezier(0.71, 0.03, 0.56, 0.85);
}

/* Slide animations for card number items */
.slide-fade-up-enter-active {
  transition: all 0.25s ease-in-out;
  transition-delay: 0.1s;
  position: relative;
}

.slide-fade-up-leave-active {
  transition: all 0.25s ease-in-out;
  position: absolute;
}

.slide-fade-up-enter {
  opacity: 0;
  transform: translateY(15px);
  pointer-events: none;
}

.slide-fade-up-leave-to {
  opacity: 0;
  transform: translateY(-15px);
  pointer-events: none;
}

.slide-fade-right-enter-active {
  transition: all 0.25s ease-in-out;
  transition-delay: 0.1s;
  position: relative;
}

.slide-fade-right-leave-active {
  transition: all 0.25s ease-in-out;
  position: absolute;
}

.slide-fade-right-enter {
  opacity: 0;
  transform: translateX(10px) rotate(45deg);
  pointer-events: none;
}

.slide-fade-right-leave-to {
  opacity: 0;
  transform: translateX(-10px) rotate(45deg);
  pointer-events: none;
}
</style>

<template>
  <input type="checkbox" :checked="useWidget.addCard" class="modal-toggle" />
  <div class="modal modal-bottom md:modal-middle" role="dialog">
    <div class="w-full max-w-lg h-fit modal-box flex flex-col p-4">
      <div class="w-full h-14 flex items-center justify-between pb-4">
        <span class="pixa-title">new address</span>
        <div class="flex gap-2">
          <button @click="() => {
            useWidget.addCard = false
          }" class="btn btn-sm pixa-btn w-10 pixa-btn-nofloat p-0">
            <times-icon class="w-5 h-5" />
          </button>
        </div>

      </div>

      <div>
        <form id="payment-form">

          <label class="form-control w-full mb-4">
            <div class="label">
              <span class="label-text uppercase">card name </span>
            </div>
            <input type="text" required v-model="tempName"
              class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
          </label>
          <div id="card-container"></div>
          <button type="submit" :disabled="isProcessing" class="btn btn-sm pixa-btn btn-primary w-full">add
            card</button>
        </form>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <p v-if="successMessage" class="success">{{ successMessage }}</p>
      </div>

    </div>

  </div>
</template>

<script setup>
import { useWidgetStore } from '@/stores/widget';
import timesIcon from '@/assets/icons/timesIcon.vue';
import communCombobox from '../commun/communCombobox.vue';

import { onMounted, reactive, ref, watch } from 'vue';
import { useProfileStore } from '@/stores/profile';
import { useInvoicesStore } from '@/stores/invoices';
import axios from 'axios';

// Square application ID and location ID
const squareApplicationId = 'sq0idp-3sEmmXl4U6Kl2lVsuoql-g';
const squareLocationId = 'R3QJ1KXV3V27J';

// Refs for state management
const isProcessing = ref(false);
const errorMessage = ref('');
const successMessage = ref('');
const useInvoices = useInvoicesStore()
const tempName = ref('')
const useProfile = useProfileStore()

const useWidget = useWidgetStore()
const loadingSave = ref(false)
const loading = ref(true)

// Load Square Web Payments SDK
const loadSquareSDK = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://web.squarecdn.com/v1/square.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Square SDK'));
    document.head.appendChild(script);
  });
};

// Initialize Square Card
let card;
const initializeSquareCard = async () => {
  try {
    await loadSquareSDK();

    const payments = window.Square.payments(squareApplicationId, squareLocationId);
    card = await payments.card();
    await card.attach('#card-container');
  } catch (error) {
    errorMessage.value = 'Failed to initialize Square Card.';
    console.error(error);
  }
};

// Handle form submission
const handlePayment = async (event) => {
  event.preventDefault();
  if (isProcessing.value) return;

  isProcessing.value = true;
  errorMessage.value = '';
  successMessage.value = '';

  try {
    const result = await card.tokenize();
    console.log(result)

    let fordata = new FormData()

    fordata.append('token', result.token)
    fordata.append('card_name', tempName.value)

    let response = await axios.post(`/Dashboard/add_card_API/${localStorage.getItem('ws-user-id')}`, {
      token: result.token,
      card_name: tempName.value
    })

    console.log(response);


    await useInvoices.getCards(localStorage.getItem('ws-user-id'))

    if (result.status === 'OK') {
      // Send the token to your server to process the payment
      const paymentResult = await processPaymentOnServer(result.token);
      if (paymentResult.success) {
        successMessage.value = 'Payment successful!';
      } else {
        errorMessage.value = 'Payment failed. Please try again.';
      }
    } else {
      errorMessage.value = 'Card tokenization failed.';
    }
  } catch (error) {
    errorMessage.value = 'An error occurred during payment processing.';
    console.error(error);
  } finally {
    isProcessing.value = false;
  }
};

// Mock function to simulate server-side payment processing
const processPaymentOnServer = async (token) => {
  // Replace this with your actual server-side API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true }); // Simulate a successful payment
    }, 1000);
  });
};

// Initialize the Square Card when the component mounts
onMounted(() => {
  console.log(useProfile.webConfig);

  initializeSquareCard();
  document.getElementById('payment-form').addEventListener('submit', handlePayment);

});
</script>

<style lang="scss" scoped>
.error {
  color: red;
}

.success {
  color: green;
}
</style>

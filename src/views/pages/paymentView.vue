<template>
  <div>
    <form id="payment-form">
      <div id="card-container"></div>
      <button type="submit" :disabled="isProcessing" class="btn btn-sm pixa-btn btn-primary w-full">Pay
        Now</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success">{{ successMessage }}</p>
  </div>
</template>

<script setup>
import { useProfileStore } from '@/stores/profile';
import { ref, onMounted } from 'vue';

const useProfile = useProfileStore()
// Square application ID and location ID
const squareApplicationId = useProfile.profile.app_id;
const squareLocationId = useProfile.profile.location_id;

// Refs for state management
const isProcessing = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

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
  initializeSquareCard();
  document.getElementById('payment-form').addEventListener('submit', handlePayment);

});
</script>

<style>
.error {
  color: red;
}

.success {
  color: green;
}
</style>

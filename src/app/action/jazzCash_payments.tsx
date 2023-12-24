// utils/jazzcash.js
import axios from 'axios';

const merchantId = process.env.JAZZCASH_MERCHANT_ID;
const secretKey = process.env.JAZZCASH_SECRET_KEY;
const jazzCashApiUrl = 'https://sandbox.jazzcash.com.pk/ApplicationAPI/API/Payment/DoTransaction'; // Replace with the actual API URL

export async function initiatePayment(orderId, amount) {
  try {
    const response = await axios.post(
      `${jazzCashApiUrl}`,
      {
        merchantId,
        secretKey,
        orderId,
        amount,
      }
    );

    // Handle the response and return relevant information
    return response.data;
  } catch (error) {
    console.error('Error initiating payment:', error.message);
    throw new Error('Failed to initiate payment');
  }
}

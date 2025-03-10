import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import CheckoutFormProvider from '@/contexts/checkout-context';
import CheckoutStepIndicator from '@/components/CheckoutStepIndicator';

export default function RootLayout() {
  return (
    <CheckoutFormProvider>
      <CheckoutStepIndicator />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="personal" options={{ title: 'Personal' }} />
        <Stack.Screen name="payment" options={{ title: 'Payment' }} />
        <Stack.Screen name="confirm" options={{ title: 'Confirm' }} />
      </Stack>
      <StatusBar style="auto" />
    </CheckoutFormProvider>
  );
}

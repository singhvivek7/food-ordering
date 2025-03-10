import { StyleSheet, View } from 'react-native';
import React from 'react';
import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';
import { KeyboardAvoidingScrollView } from '@/components/KeyboardAvoidingScrollView';
import { CustomTextInput } from '@/components/CustomTextInput';
import { FormProvider, useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCheckoutForm } from '@/contexts/checkout-context';
import CustomCheckbox from '@/components/CustomCheckbox';
import CustomSwitch from '@/components/CustomSwitch';

const formSchema = z.object({
  cardNumber: z
    .string()
    .min(1, 'Card number is required')
    .length(16, 'Card number must be at least 16 characters long'),
  cardExpiry: z
    .string()
    .regex(
      /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
      'Please add expiry date in MM/YY format'
    ),
  cardCvv: z.coerce
    .number()
    .min(100, 'CVV is required')
    .max(999, 'CVV must be at most 3 characters long')
    .refine(value => value < 999 && value > 100, 'CVV must be at least 1'),
  rememberMe: z.boolean().optional(),
  switchValue: z.boolean().optional(),
});

export type IPaymentForm = z.infer<typeof formSchema>;

export default function PaymentScreen() {
  const { setPaymentInfo, paymentInfo } = useCheckoutForm();

  const form = useForm<IPaymentForm>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: paymentInfo || {
      cardNumber: '',
      cardExpiry: '',
      cardCvv: 0,
      rememberMe: true,
      switchValue: true,
    },
  });

  const handleNext = (data: IPaymentForm) => {
    setPaymentInfo(data);
    // navigate to confirm
    router.push('/checkout/confirm');
  };

  return (
    <KeyboardAvoidingScrollView>
      <FormProvider {...form}>
        <CustomTextInput
          name="cardNumber"
          label="Card Number"
          placeholder="0000 0000 0000 0000"
          inputMode="numeric"
        />
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
          }}>
          <CustomTextInput
            name="cardExpiry"
            label="Expiry"
            placeholder="MM/YY"
            containerStyle={{ flex: 1 }}
          />
          <CustomTextInput
            name="cardCvv"
            label="CVV"
            placeholder="123"
            containerStyle={{ flex: 1 }}
          />
        </View>
        <View
          style={{
            gap: 10,
            alignItems: 'flex-start',
            width: '100%',
          }}>
          <CustomCheckbox name="rememberMe" label="Remember me" />
          <CustomSwitch name="switchValue" label="Switch Yes or No?" />
        </View>
        {/* <View>
          <Checkbox accessibilityElementsHidden />
          <Text>Remember me</Text>
        </View> */}

        <CustomButton
          title="Next"
          style={styles.button}
          onPress={form.handleSubmit(handleNext)}
        />
      </FormProvider>
    </KeyboardAvoidingScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  button: { marginTop: 'auto' },
});

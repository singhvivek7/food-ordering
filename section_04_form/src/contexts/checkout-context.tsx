import { IPaymentForm } from '@/app/checkout/payment';
import { IPersonalForm } from '@/app/checkout/personal';
import { router } from 'expo-router';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

type CheckoutFormContext = {
  personalInfo: IPersonalForm | undefined;
  setPersonalInfo: (data: IPersonalForm) => void;
  paymentInfo: IPaymentForm | undefined;
  setPaymentInfo: (data: IPaymentForm) => void;
  submit: () => void;
};

const CheckoutFormContext = createContext<CheckoutFormContext>({
  personalInfo: undefined,
  setPersonalInfo: () => {},
  paymentInfo: undefined,
  setPaymentInfo: () => {},
  submit: () => {},
});

export default function CheckoutFormProvider({ children }: PropsWithChildren) {
  const [personalInfo, setPersonalInfo] = useState<IPersonalForm>();
  const [paymentInfo, setPaymentInfo] = useState<IPaymentForm>();

  const submit = () => {
    if (!personalInfo || !paymentInfo) {
      alert('Please fill all the fields');
      return;
    }
    console.log({ personalInfo, paymentInfo });
    setPersonalInfo(undefined);
    setPaymentInfo(undefined);

    router.dismissAll(); // dismiss all screens
    router.back(); // navigate to home
  };

  return (
    <CheckoutFormContext.Provider
      value={{
        personalInfo,
        setPersonalInfo,
        paymentInfo,
        setPaymentInfo,
        submit,
      }}>
      {children}
    </CheckoutFormContext.Provider>
  );
}

export const useCheckoutForm = () => {
  if (!CheckoutFormContext) {
    throw new Error(
      'useCheckoutForm must be used within a CheckoutFormProvider'
    );
  }
  return useContext(CheckoutFormContext);
};

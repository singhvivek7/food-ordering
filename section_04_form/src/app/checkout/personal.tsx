import { View, StyleSheet } from 'react-native';
import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';
import { CustomTextInput } from '@/components/CustomTextInput';
import { KeyboardAvoidingScrollView } from '@/components/KeyboardAvoidingScrollView';
import { useForm, FormProvider } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCheckoutForm } from '@/contexts/checkout-context';
import countries from '@/assets/countries.json';
import CustomPicker from '@/components/CustomPicker';
import CustomDateTimePicker from '@/components/CustomDateTimePicker';

const formSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .min(3, 'Full name must be at least 3 characters long')
    .max(100, 'Full name must be at most 100 characters long'),
  address: z
    .string()
    .min(1, 'Address is required')
    .min(3, 'Address must be at least 3 characters long')
    .max(255, 'Address must be at most 255 characters long'),
  city: z
    .string()
    .min(1, 'City is required')
    .min(3, 'City must be at least 3 characters long')
    .max(100, 'City must be at most 100 characters long'),
  pinCode: z
    .string()
    .min(1, 'Pin code is required')
    .min(6, 'Pin code must be at least 6 characters long')
    .max(6, 'Pin code must be at most 6 characters long'),
  country: z.string().optional(),
  phoneNumber: z
    .string()
    .min(1, 'Phone number is required')
    .min(10, 'Phone number must be at least 10 characters long')
    .max(10, 'Phone number must be at most 10 characters long')
    .regex(/^[0-9]+$/, 'Enter a valid phone number')
    .refine(
      value =>
        value.startsWith('9') ||
        value.startsWith('8') ||
        value.startsWith('7') ||
        value.startsWith('6'),
      'Phone number is not valid'
    ),
  birthDate: z
    .date()
    .min(new Date(1900, 0, 1), 'Birth date is required')
    .max(new Date(), 'Birth date is not valid'),
});

export type IPersonalForm = z.infer<typeof formSchema>;

const defaultValues: IPersonalForm = {
  fullName: '',
  address: '',
  city: '',
  pinCode: '',
  country: '',
  phoneNumber: '',
  birthDate: new Date(),
};

export default function PersonalScreen() {
  const { setPersonalInfo, personalInfo } = useCheckoutForm();

  const form = useForm<IPersonalForm>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: personalInfo || defaultValues,
  });

  const handleNext = (data: IPersonalForm) => {
    // navigate to payment
    setPersonalInfo(data);
    router.push('/checkout/payment');
  };

  return (
    <KeyboardAvoidingScrollView>
      <FormProvider {...form}>
        {/* <Controller
          control={form.control}
          name="fullName"
          render={({ field: { onChange, ...rest } }) => (
            <CustomTextInput
              {...rest}
              placeholder="Full name"
              label="Full name"
              onChangeText={onChange}
            />
          )}
        /> */}

        <CustomTextInput
          name="fullName"
          placeholder="Full name"
          label="Full name"
        />

        <CustomTextInput
          name="address"
          label="Address"
          placeholder="Address"
          multiline
        />
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
          }}>
          <CustomTextInput
            name="city"
            label="City"
            placeholder="City"
            containerStyle={{ flex: 1 }}
          />
          <CustomTextInput
            name="pinCode"
            label="Pin Code"
            placeholder="123456"
            containerStyle={{ flex: 1 }}
          />
        </View>
        <CustomPicker
          items={countries.map(country => ({
            label: country.name,
            value: country.code,
          }))}
          name="country"
          label="Country"
        />
        <CustomTextInput
          name="phoneNumber"
          label="Phone Number"
          placeholder="9876543210"
          inputMode="tel"
        />

        <CustomDateTimePicker name="birthDate" />

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
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  button: { marginTop: 'auto' },
});

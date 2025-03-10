import { Text, StyleSheet, View } from 'react-native';
import React from 'react';
import CustomButton from '@/components/CustomButton';
import { Link } from 'expo-router';
import { KeyboardAvoidingScrollView } from '@/components/KeyboardAvoidingScrollView';
import { useCheckoutForm } from '@/contexts/checkout-context';

export default function ConfirmScreen() {
  const { personalInfo, paymentInfo, submit } = useCheckoutForm();

  return (
    <KeyboardAvoidingScrollView>
      <View style={{ gap: 20 }}>
        {personalInfo && (
          <View style={styles.container}>
            <Link
              href="/checkout/personal"
              style={{
                marginLeft: 'auto',
                color: '#007AFF',
                fontWeight: 'bold',
              }}>
              Edit
            </Link>
            {Object.entries(personalInfo).map(([key, value]) => (
              <View key={key} style={{ flexDirection: 'row', gap: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>
                  {key.charAt(0).toUpperCase() + key.slice(1)} :
                </Text>
                <Text>
                  {typeof value === 'string'
                    ? value
                    : value?.toLocaleDateString('en-IN')}
                </Text>
              </View>
            ))}
          </View>
        )}

        {paymentInfo && (
          <View style={styles.container}>
            <Link
              href="/checkout/payment"
              style={{
                marginLeft: 'auto',
                color: '#007AFF',
                fontWeight: 'bold',
              }}>
              Edit
            </Link>
            {Object.entries(paymentInfo).map(([key, value]) => (
              <View key={key} style={{ flexDirection: 'row', gap: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>
                  {key.charAt(0).toUpperCase() + key.slice(1)} :
                </Text>
                <Text>
                  {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
      <CustomButton title="Confirm" style={styles.button} onPress={submit} />
    </KeyboardAvoidingScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    // card
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: { marginTop: 'auto' },
});

import { useSegments } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const steps = [
  { key: 'personal', title: 'Personal' },
  { key: 'payment', title: 'Payment' },
  { key: 'confirm', title: 'Confirm' },
];

export default function CheckoutStepIndicator() {
  const segments = useSegments();
  const currentStep = segments.at(-1) ?? 'personal';
  const stepIdx = steps.findIndex(step => step.key === currentStep);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {steps.map((step, idx) => (
        <View
          key={step.key}
          style={[
            styles.stepContainer,
            { borderColor: stepIdx >= idx ? '#005055' : 'gray' },
          ]}>
          <Text
            style={[
              styles.step,
              { color: stepIdx >= idx ? '#005055' : 'gray' },
            ]}>
            {step.title}
          </Text>
        </View>
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    height: 110,
    padding: 10,
  },
  stepContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
    borderBottomWidth: 3,
  },
  step: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
    paddingBottom: 10,
  },
});

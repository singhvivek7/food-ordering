import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import QuizScreen from '@/app/QuizScreen';
import { QuizProvider } from '@/context/QuizContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <QuizProvider>
        <QuizScreen />
      </QuizProvider>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}

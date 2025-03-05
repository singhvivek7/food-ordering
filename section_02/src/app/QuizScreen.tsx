import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import Header from '@/components/Header';
import QuestionCard from '@/components/QuestionCard';
import { QUESTIONS } from '@/constants/questions';
import CustomButton from '@/components/CustomButton';
import { useQuizContext } from '@/context/QuizContext';

const QuizScreen = () => {
  const {
    quizData: { currentQuestionIndex },
    handelNextPress,
    handleRestart,
  } = useQuizContext();

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.page}>
      <View style={styles.container}>
        <Header />
        <QuestionCard />
        <View style={styles.buttons}>
          {currentQuestionIndex < QUESTIONS.length ? (
            <CustomButton
              title="Next"
              onPress={handelNextPress}
              rightIcon={<AntDesign name="arrowright" size={24} color="#fff" />}
            />
          ) : (
            <CustomButton
              title="Restart"
              onPress={handleRestart}
              leftIcon={<AntDesign name="reload1" size={24} color="#fff" />}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'space-between',
  },
  buttons: {
    flexDirection: 'column',
    gap: 15,
  },
});

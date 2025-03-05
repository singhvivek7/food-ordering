import { useQuizContext } from '@/context/QuizContext';
import { View, Text, StyleSheet } from 'react-native';

const Header = () => {
  const {
    quizData: { currentQuestionIndex, totalQuestions },
  } = useQuizContext();

  if (currentQuestionIndex + 1 > totalQuestions) {
    return (
      <View>
        <Text style={styles.text}>Completed</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Question {currentQuestionIndex + 1}/{totalQuestions}
      </Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    padding: 15,
    borderRadius: 100,
  },
  text: {
    color: '#0D4715',
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'center',
  },
});

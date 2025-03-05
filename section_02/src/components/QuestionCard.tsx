import { View, Text, StyleSheet } from 'react-native';
import AnswerOption from './AnswerOption';
import Card from './Card';
import { useQuizContext } from '@/context/QuizContext';
import { useEffect } from 'react';
import LottieView from 'lottie-react-native';
import { useTimer } from '@/hooks/useTimer';

const QuestionCard = () => {
  const {
    quizData: { question, totalQuestions },
    selectedOption,
    setSelectedOption,
    score,
    highestScore,
    handelNextPress,
  } = useQuizContext() || {};
  const { timeLeft, startTimer, stopTimer } = useTimer(20);

  useEffect(() => {
    startTimer();

    return () => {
      stopTimer();
    };
  }, [question]);

  useEffect(() => {
    if (timeLeft <= 0) {
      handelNextPress();
    }
  }, [timeLeft]);

  return question ? (
    <>
      <Card title={question.question}>
        <View style={styles.options}>
          {question.options.map(option => (
            <AnswerOption
              key={option}
              option={option}
              isSelected={selectedOption === option}
              setSelectedOption={setSelectedOption}
            />
          ))}
        </View>
      </Card>
      <View>
        <Text style={styles.timer}>{timeLeft} sec</Text>
      </View>
    </>
  ) : (
    <>
      <LottieView
        style={StyleSheet.absoluteFill}
        autoPlay
        loop={false}
        source={require('../../assets/party.json')}
      />
      <Card title="Well Done!">
        <View style={styles.result}>
          <Text> You've completed the quiz!</Text>
          <Text>
            {' '}
            {score}/{totalQuestions} questions correct
          </Text>
          <Text>Best score: {highestScore}</Text>
        </View>
      </Card>
    </>
  );
};

export default QuestionCard;

const styles = StyleSheet.create({
  result: {
    flexDirection: 'column',
    gap: 20,
  },
  options: {
    flexDirection: 'column',
    gap: 10,
  },

  timer: {
    fontSize: 18,
    fontWeight: '500',
    color: '#0D4715',
    textAlign: 'center',
  },
});

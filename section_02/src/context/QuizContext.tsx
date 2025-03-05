import { IQuestion, QUESTIONS } from '@/constants/questions';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IQuizContext {
  quizData: {
    question?: IQuestion;
    currentQuestionIndex: number;
    totalQuestions: number;
  };
  selectedOption: string;
  score: number;
  highestScore: number;
  setSelectedOption: (option: string) => void;
  updateCurrentIndex: (idx: number) => void;
  handelNextPress: () => void;
  handleRestart: () => void;
}

const defaultValue = {
  quizData: {
    question: QUESTIONS[0],
    currentQuestionIndex: 0,
    totalQuestions: QUESTIONS.length,
  },
  score: 0,
  highestScore: 0,
  selectedOption: '',
  setSelectedOption: () => {},
  updateCurrentIndex: () => {},
  handelNextPress: () => {},
  handleRestart: () => {},
};

const quizContext = createContext<IQuizContext>(defaultValue);

export const QuizProvider = ({ children }: PropsWithChildren) => {
  const [quizData, setQuizData] = useState(defaultValue.quizData);
  const [score, setScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');

  const saveHighestScore = async () => {
    try {
      await AsyncStorage.setItem('highestScore', JSON.stringify(score));
    } catch (e) {
      console.log(e);
    }
  };

  const getHighestScore = async () => {
    try {
      const highestScore = await AsyncStorage.getItem('highestScore');
      return highestScore ? JSON.parse(highestScore) : 0;
    } catch (e) {
      console.log(e);
      return 0;
    }
  };

  const handelNextPress = () => {
    if (selectedOption === quizData.question?.answer) {
      setScore(prev => prev + 1);
    }
    updateCurrentIndex(quizData.currentQuestionIndex + 1);
  };

  const handleRestart = () => {
    updateCurrentIndex(0);
    setScore(0);
    setSelectedOption('');
  };

  const updateCurrentIndex = (idx: number) => {
    setQuizData(prev => {
      return {
        ...prev,
        currentQuestionIndex: idx,
        question: QUESTIONS[idx],
      };
    });
  };

  useEffect(() => {
    if (score > highestScore) {
      setHighestScore(() => score);
      saveHighestScore();
    }
  }, [score]);

  useEffect(() => {
    getHighestScore().then(highestScore => setHighestScore(highestScore));
  }, []);

  return (
    <quizContext.Provider
      value={{
        quizData,
        updateCurrentIndex,
        score,
        highestScore,
        handelNextPress,
        handleRestart,
        selectedOption,
        setSelectedOption,
      }}>
      {children}
    </quizContext.Provider>
  );
};

export const useQuizContext = () => {
  if (!quizContext) {
    throw new Error('useQuizContext must be used within a QuizProvider');
  }
  return useContext(quizContext);
};

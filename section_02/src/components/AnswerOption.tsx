import { Text, Pressable, StyleSheet } from 'react-native';

interface IProps {
  option: string;
  isSelected: boolean;
  setSelectedOption: (option: string) => void;
}

const AnswerOption = ({ option, isSelected, setSelectedOption }: IProps) => {
  return (
    <Pressable
      key={option}
      style={[
        styles.option,
        { backgroundColor: isSelected ? '#CCDF92' : '#fff' },
      ]}
      onPress={() => setSelectedOption(option)}>
      <Text>{option}</Text>
    </Pressable>
  );
};

export default AnswerOption;

const styles = StyleSheet.create({
  option: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 100,
    padding: 20,
  },
});

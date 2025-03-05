import { PropsWithChildren } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface IProps {
  title: string;
}

const Card = ({ children, title }: PropsWithChildren<IProps>) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 20,
    gap: 20,

    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
  },
});

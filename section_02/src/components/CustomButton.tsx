import { Text, StyleSheet, Pressable, View } from 'react-native';
import { PropsWithChildren, ReactNode, ComponentProps } from 'react';

interface IProps extends ComponentProps<typeof Pressable> {
  title: string;
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
}

const CustomButton = ({
  title,
  rightIcon,
  leftIcon,
  ...props
}: PropsWithChildren<IProps>) => {
  return (
    <Pressable style={styles.container} {...props}>
      {!!leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
      <Text style={styles.text}>{title}</Text>
      {!!rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#0D4715',
    padding: 15,
    borderRadius: 100,
    position: 'relative',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1.2,
  },
  leftIcon: {
    position: 'absolute',
    left: 10,
  },
  rightIcon: {
    position: 'absolute',
    right: 10,
  },
});

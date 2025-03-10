import Checkbox from 'expo-checkbox';
import { ComponentProps, forwardRef } from 'react';
import { useController } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';

interface IProps extends ComponentProps<typeof Checkbox> {
  label?: string;
  name: string;
}

const CustomCheckbox = forwardRef<ComponentProps<typeof Checkbox>, IProps>(
  (props, ref) => {
    const {
      field: { onChange, value },
    } = useController({
      name: props.name,
    });

    return (
      <View style={styles.container}>
        <Checkbox {...props} value={value} onValueChange={onChange} />
        <Text style={styles.label}>{props.label}</Text>
      </View>
    );
  }
);

CustomCheckbox.displayName = 'CustomCheckbox';

export default CustomCheckbox;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
});

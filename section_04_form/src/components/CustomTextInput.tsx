import { ComponentProps, forwardRef } from 'react';
import { useController } from 'react-hook-form';
import { TextInput, StyleSheet, Text, View } from 'react-native';

interface IProps extends ComponentProps<typeof TextInput> {
  name: string;
  label?: string;
  containerStyle?: ComponentProps<typeof View>['style'];
}

export const CustomTextInput = forwardRef<TextInput, IProps>(
  ({ containerStyle = {}, style = {}, label, name, ...rest }, ref) => {
    const {
      field: { value, onChange, onBlur },
      fieldState: { error },
    } = useController({
      name: name,
    });

    return (
      <View style={[styles.container, containerStyle]}>
        {!!label && <Text style={styles.label}>{label}</Text>}
        <TextInput
          {...rest}
          style={[styles.input, error?.message && styles.errorInput, style]}
          ref={ref}
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
        />
        <Text numberOfLines={1} style={styles.error}>
          {error?.message}
        </Text>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'gainsboro',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: 'dimgrey',
    marginBottom: 5,
  },
  errorInput: {
    borderColor: 'crimson',
  },
  error: {
    color: 'crimson',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 5,
    height: 17,
  },
  container: {},
});

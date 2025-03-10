import { ComponentProps, forwardRef, PropsWithChildren } from 'react';
import { useController } from 'react-hook-form';
import { StyleSheet, Text, View, Platform } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

interface IProps
  extends Omit<ComponentProps<typeof RNPickerSelect>, 'onValueChange'> {
  name: string;
  label?: string;
}

const CustomPicker = forwardRef<RNPickerSelect, PropsWithChildren<IProps>>(
  ({ name, label, ...rest }, ref) => {
    const {
      field: { value, onChange, onBlur },
      fieldState: { error },
    } = useController({
      name: name,
    });

    return (
      <View style={styles.container}>
        {label && <Text style={styles.label}>{label}</Text>}

        <RNPickerSelect
          ref={ref}
          {...rest}
          onValueChange={onChange}
          value={value}
          onClose={onBlur}
          style={{
            viewContainer: {
              ...styles.inputContainer,
              ...(error ? styles.errorContainer : {}),
            },
            inputIOS: {
              ...styles.input,
              ...styles.inputIOS,
              ...(error ? styles.errorInput : {}),
            },
            inputAndroid: {
              ...styles.input,
              ...styles.inputAndroid,
              ...(error ? styles.errorInput : {}),
            },
            placeholder: {
              color: '#a0a0a0',
            },
          }}
        />

        <Text numberOfLines={1} style={styles.error}>
          {error?.message}
        </Text>
      </View>
    );
  }
);

export default CustomPicker;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    width: '100%',
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: Platform.select({
      ios: 12,
      android: 0,
    }),
    backgroundColor: 'white',
  },
  input: {
    fontSize: 16,
    color: '#333',
    paddingVertical: Platform.select({
      ios: 12,
      android: 8,
    }),
  },
  inputIOS: {
    height: 44,
  },
  inputAndroid: {
    height: 48,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: 'dimgrey',
    marginBottom: 5,
  },
  errorContainer: {
    borderColor: 'crimson',
  },
  errorInput: {
    color: 'crimson',
  },
  error: {
    color: 'crimson',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
});

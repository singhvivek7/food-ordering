import { ComponentProps, forwardRef } from 'react';
import { useController } from 'react-hook-form';
import { StyleSheet, Text, View, Switch } from 'react-native';

interface IProps extends ComponentProps<typeof Switch> {
  label?: string;
  name: string;
}

const CustomSwitch = forwardRef<ComponentProps<typeof Switch>, IProps>(
  (props, ref) => {
    const {
      field: { onChange, value },
    } = useController({
      name: props.name,
    });

    return (
      <View style={styles.container}>
        <Switch {...props} value={value} onValueChange={onChange} />
        <Text style={styles.label}>{props.label}</Text>
      </View>
    );
  }
);

CustomSwitch.displayName = 'CustomSwitch';

export default CustomSwitch;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
});

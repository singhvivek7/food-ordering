import { PropsWithChildren } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const KeyboardAvoidingScrollView = ({ children }: PropsWithChildren) => {
  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    //   keyboardVerticalOffset={110}
    //   style={{ flex: 1, backgroundColor: '#fff' }}>
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: '#fff',
        padding: 10,
      }}
      keyboardShouldPersistTaps="handled">
      <SafeAreaView
        edges={['bottom']}
        style={{ flex: 1, backgroundColor: '#fff' }}>
        {children}
      </SafeAreaView>
    </ScrollView>
    // </KeyboardAvoidingView>
  );
};

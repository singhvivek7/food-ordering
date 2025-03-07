import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['bottom', 'top']} style={styles.container}>
        <Stack
          screenOptions={{
            headerTintColor: '#0096C8',
          }}>
          <Stack.Screen
            name="index"
            options={{ headerShown: false, title: 'Home' }}
          />
          <Stack.Screen
            name="camera"
            options={{ headerShown: false, title: 'Camera' }}
          />
        </Stack>

        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  floatingButtonLeft: {
    backgroundColor: '#0096C8',
    padding: 10,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  floatingButtonRight: {
    backgroundColor: '#0096C8',
    padding: 10,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  image: {
    height: 100,
    width: 100,
    borderWidth: 1,
    borderColor: '#0096C8',
  },
});

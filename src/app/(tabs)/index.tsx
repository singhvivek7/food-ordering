import { Image, StyleSheet, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome6 } from '@expo/vector-icons';

import profileImg from '@/assets/images/profile.avif';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://images.pexels.com/photos/268941/pexels-photo-268941.jpeg',
        }}
        style={styles.backgroundImage}
      />
      <Image source={profileImg} style={styles.photo} />
      <Text style={styles.name}>Vivek Singh</Text>
      <Text style={styles.description}>Web Developer</Text>

      <View style={styles.socialContainer}>
        <FontAwesome6 name="github" size={16} color="black" />
        <FontAwesome6 name="linkedin" size={16} color="black" />
        <FontAwesome6 name="x-twitter" size={16} color="black" />
        <FontAwesome6 name="instagram" size={16} color="black" />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#353636',
  },
  description: {
    fontSize: 16,
  },
  photo: {
    height: 200,
    width: 200,
    borderRadius: 100,
    marginTop: -100,
    borderWidth: 5,
    borderColor: '#fff',
  },
  backgroundImage: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  socialContainer: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 8,
  },
});

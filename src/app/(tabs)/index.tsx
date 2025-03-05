import {
  Image,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Button,
  GestureResponderEvent,
  Linking,
} from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ProjectCard } from '@/src/components/Projects/ProjectCard';
import { PROJECTS } from '@/src/constants/Projects';

export default function HomeScreen() {
  const onContactMe = (_: GestureResponderEvent) => {
    Linking.openURL('mailto:info@gmail.com');
  };

  return (
    <SafeAreaView style={{ backgroundColor: 'red' }} edges={['bottom']}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Image
            source={{
              uri: 'https://images.pexels.com/photos/268941/pexels-photo-268941.jpeg',
            }}
            style={styles.backgroundImage}
          />
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61',
            }}
            style={styles.photo}
          />
          <Text style={styles.name}>Vivek Singh</Text>
          <Text style={styles.description}>Software Developer</Text>

          <View style={styles.socialContainer}>
            <FontAwesome6 name="github" size={16} color="black" />
            <FontAwesome6 name="linkedin" size={16} color="black" />
            <FontAwesome6 name="x-twitter" size={16} color="black" />
            <FontAwesome6 name="instagram" size={16} color="black" />
          </View>

          <Button title="Contact Me" onPress={onContactMe} />

          <Text style={styles.longText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            molestie urna id sem vehicula dictum.
          </Text>

          <Text style={styles.heading}>My Projects</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 10, paddingHorizontal: 10 }}>
            {PROJECTS.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#353636',
    marginVertical: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    backgroundColor: '#fff',
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
  longText: {
    padding: 10,
    color: '#353636',
    fontSize: 16,
    lineHeight: 20,
  },
});

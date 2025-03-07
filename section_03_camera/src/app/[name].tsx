import { MaterialIcons } from '@expo/vector-icons';
import { Link, router, Stack, useLocalSearchParams } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import * as FileSystem from 'expo-file-system';

export default function ImageDetailsScreen() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const fullUri = FileSystem.documentDirectory + name;

  const handleDelete = async () => {
    await FileSystem.deleteAsync(fullUri);
    router.back();
  };

  return (
    <>
      <View style={styles.container}>
        <Stack.Screen
          options={{
            title: 'Media',
            headerRight: () => (
              <MaterialIcons
                name="delete"
                size={24}
                color="#0096C8"
                onPress={handleDelete}
              />
            ),
          }}
        />

        <Text style={{ fontWeight: 'bold', fontSize: 24 }}>
          Image Details Screen
        </Text>
        <Image source={{ uri: fullUri }} alt={name} style={styles.image} />
        <Text>{name}</Text>
      </View>
      <View>
        <Link href="/" asChild>
          <Pressable style={styles.floatingButtonLeft}>
            <MaterialIcons name="home" size={24} color="white" />
          </Pressable>
        </Link>
        <Link href="/camera" asChild>
          <Pressable style={styles.floatingButtonRight}>
            <MaterialIcons name="camera-alt" size={24} color="white" />
          </Pressable>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    height: '100%',
    width: '100%',
  },
});

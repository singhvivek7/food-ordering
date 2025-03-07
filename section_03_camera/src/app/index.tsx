import { MaterialIcons } from '@expo/vector-icons';
import { Link, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import { getMediaType, MediaType } from '@/utils/media';
import { ResizeMode, Video } from 'expo-av';

interface Media {
  uri: string;
  name: string;
  type: MediaType;
}

export default function HomeScreen() {
  const [media, setMedia] = useState<Media[]>([]);

  const loadFiles = async () => {
    if (FileSystem.documentDirectory) {
      const res = await FileSystem.readDirectoryAsync(
        FileSystem.documentDirectory
      );
      setMedia(
        res
          .map(r => ({
            name: r,
            uri: FileSystem.documentDirectory + r,
            type: getMediaType(r),
          }))
          .reverse()
      );
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadFiles();
    }, [])
  );

  return (
    <>
      <View style={styles.container}>
        <Text style={{ fontWeight: 'bold', fontSize: 24, marginVertical: 10 }}>
          Home Screen
        </Text>

        <FlatList
          data={media}
          numColumns={3}
          contentContainerStyle={{ gap: 2 }}
          columnWrapperStyle={{ gap: 2 }}
          renderItem={({ item }) => (
            <Link key={item.name} href={item.name} asChild>
              <Pressable>
                {item.type === 'image' ? (
                  <Image source={item} alt={item.name} style={styles.image} />
                ) : (
                  <Video
                    source={{ uri: item.uri }}
                    style={styles.video}
                    resizeMode={ResizeMode.COVER}
                  />
                )}
              </Pressable>
            </Link>
          )}></FlatList>
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
  imagesContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    padding: 10,
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
    width: 100,
    aspectRatio: 7 / 8,
    borderRadius: 5,
  },
  video: {
    width: 100,
    aspectRatio: 7 / 8,
    borderRadius: 5,
  },
});

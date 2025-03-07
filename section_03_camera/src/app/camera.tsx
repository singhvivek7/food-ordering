import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  useCameraPermissions,
  CameraView,
  CameraType,
  CameraCapturedPicture,
} from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as path from 'path';
import * as FileSystem from 'expo-file-system';
import { Video } from 'expo-av';

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [picture, setPicture] = useState<CameraCapturedPicture>();
  const [video, setVideo] = useState<string>();
  const [isRecording, setIsRecording] = useState(false);

  const camera = useRef<CameraView>(null);

  const [permission, requestPermission] = useCameraPermissions();

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };
  const takePicture = async () => {
    const result = await camera.current?.takePictureAsync();
    setPicture(result);
  };

  const onPress = () => {
    if (isRecording) {
      camera.current?.stopRecording();
      setIsRecording(false);
    } else {
      takePicture();
    }
  };

  const recordVideo = async () => {
    setIsRecording(true);
    const res = await camera.current?.recordAsync({
      maxDuration: 60, // 60 sec
    });
    setVideo(res?.uri);
    setIsRecording(false);
  };

  const saveFile = async (uri: string) => {
    const fileName = path.parse(uri).base;
    await FileSystem.copyAsync({
      from: uri,
      to: FileSystem.documentDirectory + fileName,
    });
    setPicture(undefined);
    setVideo(undefined);
    router.back();
  };

  useEffect(() => {
    if (permission && !permission.granted && permission.canAskAgain) {
      requestPermission();
    }
  }, [permission]);

  if (!permission?.granted) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  if (picture || video) {
    return (
      <View style={styles.container}>
        {!!picture && (
          <Image
            source={{
              uri: picture.uri,
            }}
            alt="Picture"
            style={{
              width: picture.height || '100%',
              height: picture.width || '100%',
            }}
          />
        )}
        {!!video && (
          <Video
            source={{ uri: video }}
            shouldPlay
            isLooping
            style={{ width: '100%', flex: 1 }}
          />
        )}

        <Pressable
          onPress={() => saveFile(picture?.uri || video || '')}
          style={styles.saveBtn}>
          <Text>Save</Text>
        </Pressable>
        <MaterialIcons
          name="arrow-back-ios"
          size={24}
          color="white"
          style={styles.closeBtn}
          onPress={() => {
            setPicture(undefined);
            setVideo(undefined);
          }}
        />
      </View>
    );
  }

  if (video) {
    return (
      <View style={styles.container}>
        <Video source={{ uri: video }} />
        <Pressable onPress={() => saveFile(video)} style={styles.saveBtn}>
          <Text>Save</Text>
        </Pressable>
        <MaterialIcons
          name="arrow-back-ios"
          size={24}
          color="white"
          style={styles.closeBtn}
          onPress={() => {
            setPicture(undefined);
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={camera}>
        <View style={styles.footer}>
          <View />
          <Pressable
            style={[
              styles.recordBtn,
              { backgroundColor: isRecording ? 'crimson' : 'white' },
            ]}
            onPress={onPress}
            onLongPress={recordVideo}
          />
          <MaterialIcons
            name="flip-camera-ios"
            size={24}
            color="white"
            onPress={toggleCameraFacing}
          />
        </View>
      </CameraView>
      <MaterialIcons
        name="arrow-back-ios"
        size={24}
        color="white"
        style={styles.closeBtn}
        onPress={() => {
          router.back();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    height: '100%',
    width: '100%',
  },
  closeBtn: {
    position: 'absolute',
    top: 30,
    left: 20,
    color: '#0096C8',
  },
  footer: {
    marginTop: 'auto',
    padding: 20,
    paddingBottom: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#00000099',
  },
  recordBtn: {
    backgroundColor: '#fff',
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  saveBtn: {
    backgroundColor: '#0096C8',
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    position: 'absolute',
    top: 25,
    right: 20,
    borderRadius: 50,
  },
});

import { IProject } from '@/src/constants/Projects';
import { Image, StyleSheet, Text, View } from 'react-native';

export const ProjectCard = ({
  project: { image, name },
}: {
  project: IProject;
}) => {
  return (
    <View>
      <Image
        style={styles.projectImage}
        alt={name}
        source={{
          uri: image,
        }}
      />
      <Text style={styles.projectName}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  projectImage: {
    width: 300,
    aspectRatio: 2 / 1,
    borderRadius: 10,
  },
  projectName: {
    color: 'dimgray',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
  },
});

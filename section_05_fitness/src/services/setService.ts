import * as Crypto from 'expo-crypto';
import { ExerciseSet } from '@/types/models';

export const getBestSet = (sets: ExerciseSet[]) => {
  return sets.reduce((bestSet: ExerciseSet | null, set) => {
    return (set?.oneRM || 0) > (bestSet?.oneRM || 0) ? set : bestSet;
  }, null);
};

export const getSetTotalWeight = (set: ExerciseSet) => {
  return (set.weight || 0) * (set.reps || 0);
};

export const createSet = (exerciseId: string) => {
  const newSet: ExerciseSet = {
    id: Crypto.randomUUID(),
    exerciseId,
  };

  return newSet;
};

export const updateSet = (
  set: ExerciseSet,
  updatedFields: Pick<ExerciseSet, 'weight' | 'reps'>
) => {
  const { reps, weight } = updatedFields;
  const updatedSet = { ...set };

  if (weight !== undefined) {
    updatedSet.weight = weight;
  }
  if (reps !== undefined) {
    updatedSet.reps = reps;
  }

  const oneRM =
    (weight || set.weight) && (reps || set.reps)
      ? (weight || set.weight || 0) * (36.0 / (37.0 - (reps || set.reps || 0)))
      : undefined;

  updatedSet.oneRM = oneRM;

  return updatedSet;
};

const isSetCompleted = (set: ExerciseSet) => {
  return set.reps && set.reps > 0;
};

export const clearSet = (sets: ExerciseSet[]) => {
  return sets.filter(isSetCompleted);
};

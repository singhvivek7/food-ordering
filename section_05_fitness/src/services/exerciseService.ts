import * as Crypto from 'expo-crypto';
import { ExerciseWithSets } from '@/types/models';
import { clearSet, createSet, getSetTotalWeight } from '@/services/setService';

export const getExerciseTotalWeight = (exercise: ExerciseWithSets) => {
  return exercise.sets.reduce(
    (totalSetWeight, set) => totalSetWeight + getSetTotalWeight(set),
    0
  );
};

export const createExercise = (name: string, workoutId: string) => {
  const newExercise: ExerciseWithSets = {
    id: Crypto.randomUUID(),
    name,
    sets: [],
    workoutId,
  };

  newExercise.sets.push(createSet(newExercise.id));

  return newExercise;
};

export const cleanExercise = (exercise: ExerciseWithSets) => {
  const cleanedSets = clearSet(exercise.sets);

  if (cleanedSets.length === 0) {
    return null;
  }

  return {
    ...exercise,
    sets: cleanedSets,
  };
};

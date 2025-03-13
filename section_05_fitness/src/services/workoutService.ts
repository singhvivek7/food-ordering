import { WorkoutWithExercises } from '@/types/models';
import {
  cleanExercise,
  getExerciseTotalWeight,
} from '@/services/exerciseService';
import * as Crypto from 'expo-crypto';

export const getWorkoutTotalWeight = (workout: WorkoutWithExercises) => {
  return workout.exercises.reduce(
    (total, exercise) => total + getExerciseTotalWeight(exercise),
    0
  );
};

export const newWorkout = () => {
  const newWorkout: WorkoutWithExercises = {
    id: Crypto.randomUUID(),
    createdAt: new Date(),
    exercises: [],
    finishedAt: null,
  };

  return newWorkout;
};

export const finishWorkout = (workout: WorkoutWithExercises) => {
  const cleanedWorkout = cleanWorkout(workout);

  const finishedWorkout = {
    ...cleanedWorkout,
    finishedAt: new Date(),
  };
  return finishedWorkout;
};

export const cleanWorkout = (workout: WorkoutWithExercises) => {
  const cleanedExercises = workout.exercises
    .map(cleanExercise)
    .filter(ex => !!ex);

  return {
    ...workout,
    exercises: cleanedExercises,
  };
};

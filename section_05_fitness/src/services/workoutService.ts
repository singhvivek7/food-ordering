import { Workout, WorkoutWithExercises } from '@/types/models';
import {
  addSetsToExercise,
  cleanExercise,
  getExerciseTotalWeight,
} from '@/services/exerciseService';
import * as Crypto from 'expo-crypto';
import { getCurrentWorkout, getWorkouts, saveWorkout } from '@/db/workout';
import { getExercise } from '@/db/exercises';

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

  // Save to database
  saveWorkout(newWorkout);

  return newWorkout;
};

export const finishWorkout = (workout: WorkoutWithExercises) => {
  const cleanedWorkout = cleanWorkout(workout);

  const finishedWorkout = {
    ...cleanedWorkout,
    finishedAt: new Date(),
  };

  saveWorkout(finishedWorkout);

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

const addExercisesToWorkout = async (
  workout: Workout
): Promise<WorkoutWithExercises> => {
  const exercises = await getExercise(workout.id);
  const exercisesWithSets = await Promise.all(exercises.map(addSetsToExercise));
  return {
    ...workout,
    exercises: exercisesWithSets,
  };
};

export const getCurrentWorkoutWithExercises =
  async (): Promise<WorkoutWithExercises | null> => {
    const workout = await getCurrentWorkout();

    if (!workout) return null;

    return await addExercisesToWorkout(workout);
  };

export const getWorkoutsWithExercises = async (): Promise<
  WorkoutWithExercises[]
> => {
  const workouts = await getWorkouts();
  return Promise.all(workouts.map(addExercisesToWorkout));
};

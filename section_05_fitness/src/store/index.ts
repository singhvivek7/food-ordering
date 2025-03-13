import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { ExerciseSet, WorkoutWithExercises } from '@/types/models';
import {
  finishWorkout,
  getCurrentWorkoutWithExercises,
  getWorkoutsWithExercises,
  newWorkout,
} from '@/services/workoutService';
import { createExercise } from '@/services/exerciseService';
import { createSet, updateSet } from '@/services/setService';
import { current } from 'immer';
import { deleteSet } from '@/db/sets';

interface State {
  currentWorkout: WorkoutWithExercises | null;
  workouts: WorkoutWithExercises[];
}

interface Actions {
  loadWorkouts: () => void;
  startWorkout: () => void;
  finishWorkout: () => void;
  addExercise: (name: string) => void;
  addSet: (exerciseId: string) => void;
  updateSet: (
    setId: string,
    updatedFields: Pick<ExerciseSet, 'weight' | 'reps'>
  ) => void;
  deleteSet: (setId: string) => void;
}

export const useWorkouts = create<State & Actions>()(
  immer((set, get) => ({
    // State
    currentWorkout: null,
    workouts: [], // History

    // Actions
    loadWorkouts: async () => {
      const currentWorkout = await getCurrentWorkoutWithExercises();

      set({
        currentWorkout,
        workouts: await getWorkoutsWithExercises(),
      });
    },
    startWorkout: () => {
      set({ currentWorkout: newWorkout() });
    },

    finishWorkout: () => {
      const { currentWorkout } = get();
      if (!currentWorkout) return;

      const finishedWorkout = finishWorkout(currentWorkout);

      set(state => {
        state.currentWorkout = null;
        state.workouts.unshift(finishedWorkout);
      });
    },

    addExercise: name => {
      const { currentWorkout } = get();
      if (!currentWorkout) return;
      const exercise = createExercise(name, currentWorkout.id);

      set(state => {
        state.currentWorkout?.exercises.push(exercise);
      });
    },
    addSet: exerciseId => {
      const newSet = createSet(exerciseId);

      set(({ currentWorkout }) => {
        if (!currentWorkout) return;

        const exercise = currentWorkout.exercises.find(
          e => e.id === exerciseId
        );

        exercise?.sets.push(newSet);
      });
    },
    updateSet: (setId, updatedFields) => {
      set(state => {
        const { currentWorkout } = state;
        if (!currentWorkout) return;

        const exercise = currentWorkout.exercises.find(ex =>
          ex.sets.some(s => s.id === setId)
        );

        const setIndex = exercise?.sets.findIndex(s => s.id === setId);

        if (!exercise || setIndex === undefined || setIndex < 0) return;

        const updatedSet = updateSet(
          current(exercise.sets[setIndex]),
          updatedFields
        );

        exercise.sets[setIndex] = updatedSet;
      });
    },
    deleteSet: setId => {
      deleteSet(setId); // Delete from database

      set(state => {
        const { currentWorkout } = state;
        if (!currentWorkout) return;

        const exercise = currentWorkout.exercises.find(ex =>
          ex.sets.some(s => s.id === setId)
        );

        const setIndex = exercise?.sets.findIndex(s => s.id === setId);

        if (!exercise || setIndex === undefined || setIndex < 0) return;

        exercise.sets = exercise.sets.filter(s => s.id !== setId);

        if (exercise.sets.length === 0) {
          // Remove the exercise if it has no sets
          currentWorkout.exercises = currentWorkout.exercises.filter(
            ex => ex.id !== exercise.id
          );
        }
      });
    },
  }))
);

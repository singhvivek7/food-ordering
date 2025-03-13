import { Exercise } from '@/types/models';
import { getDB } from '.';
import { DbExercise } from '@/types/db';

export const saveExercise = async (exercise: Exercise) => {
  try {
    const db = await getDB();
    await db.runAsync(
      'INSERT OR REPLACE INTO exercises (id, workout_id, name) VALUES (?, ?, ?)',
      exercise.id,
      exercise.workoutId,
      exercise.name
    );
  } catch (e) {
    console.log(e);
  }
};

const parseDbExercise = (dbExercise: DbExercise): Exercise => ({
  id: dbExercise.id,
  workoutId: dbExercise.workout_id,
  name: dbExercise.name,
});

export const getExercise = async (workout_id: string): Promise<Exercise[]> => {
  try {
    const db = await getDB();
    const exercises = await db.getAllAsync<DbExercise>(
      'SELECT * FROM exercises WHERE workout_id = ?',
      workout_id
    );

    return exercises.map(parseDbExercise);
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const deleteExercise = async (exerciseId: string) => {
  try {
    const db = await getDB();
    await db.runAsync('DELETE FROM exercises WHERE id = ?', exerciseId);
  } catch (e) {
    console.log(e);
  }
};

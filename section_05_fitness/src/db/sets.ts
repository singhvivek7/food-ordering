import { ExerciseSet } from '@/types/models';
import { getDB } from '.';
import { DbExerciseSet } from '@/types/db';

export const saveSet = async (set: ExerciseSet) => {
  try {
    const db = await getDB();
    await db.runAsync(
      'INSERT OR REPLACE INTO sets (id, exercise_id, reps, weight, one_rm) VALUES (?, ?, ?, ?, ?);',
      set.id,
      set.exerciseId,
      set.reps ?? null,
      set.weight ?? null,
      set.oneRM ?? null
    );
  } catch (error) {
    console.error(error);
  }
};

const parseSet = (set: DbExerciseSet): ExerciseSet => {
  return {
    id: set.id,
    exerciseId: set.exercise_id,
    reps: set.reps,
    weight: set.weight,
    oneRM: set.one_rm,
  };
};

export const getSets = async (exerciseId: string): Promise<ExerciseSet[]> => {
  try {
    const db = await getDB();
    const result = await db.getAllAsync<DbExerciseSet>(
      `SELECT * FROM sets WHERE exercise_id = ?;`,
      exerciseId
    );

    return result.map(parseSet);
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const deleteSet = async (id: string) => {
  const db = await getDB();
  await db.runAsync('DELETE FROM sets WHERE id = ?;', id);
};

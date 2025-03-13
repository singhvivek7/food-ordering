import { Workout } from '@/types/models';
import { getDB } from '.';
import { DbWorkout } from '@/types/db';

export const saveWorkout = async (workout: Workout) => {
  try {
    const db = await getDB();
    const res = await db.runAsync(
      'INSERT OR REPLACE INTO workouts (id, created_at, finished_at) VALUES (?, ?, ?)',
      workout.id,
      workout.createdAt.toISOString(),
      workout.finishedAt?.toISOString() || null
    );

    return res;
  } catch (e) {
    console.log(e);
  }
};

const parseDbWorkout = (dbWorkout: DbWorkout): Workout => ({
  id: dbWorkout.id,
  createdAt: new Date(dbWorkout.created_at),
  finishedAt: dbWorkout.finished_at ? new Date(dbWorkout.finished_at) : null,
});

export const getCurrentWorkout = async (): Promise<Workout | null> => {
  try {
    const db = await getDB();
    const workout = await db.getFirstAsync<DbWorkout>(
      `
      SELECT * FROM workouts
      WHERE finished_at IS NULL
      ORDER BY created_at DESC
      LIMIT 1
      `
    );
    if (!workout) return null;

    return parseDbWorkout(workout);
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getWorkouts = async (): Promise<Workout[]> => {
  try {
    const db = await getDB();
    const workouts = await db.getAllAsync<DbWorkout>(
      `
      SELECT * FROM workouts
      WHERE finished_at IS NOT NULL
      ORDER BY created_at DESC
      `
    );

    return workouts.map(parseDbWorkout);
  } catch (e) {
    console.log(e);
    return [];
  }
};

import * as SQLite from 'expo-sqlite';

var db: SQLite.SQLiteDatabase | null = null;
export const dbName = 'workoutTracker.db';

export const createWorkoutsTableQuery = `
  CREATE TABLE IF NOT EXISTS workouts (
    id TEXT PRIMARY KEY, 
    created_at TEXT, 
    finished_at TEXT
  );`;

export const createExercisesTableQuery = `
  CREATE TABLE IF NOT EXISTS exercises (
    id TEXT PRIMARY KEY, 
    workout_id TEXT, 
    name TEXT, 
    FOREIGN KEY (workout_id) REFERENCES workouts (id)
  );`;

export const createSetsTableQuery = `
  CREATE TABLE IF NOT EXISTS sets (
    id TEXT PRIMARY KEY, 
    exercise_id TEXT, 
    reps INTEGER, 
    weight REAL,
    one_rm REAL,
    FOREIGN KEY (exercise_id) REFERENCES exercises (id)
  );`;

export const getDB = async () => {
  if (db) return db;

  db = await SQLite.openDatabaseAsync(dbName);

  // Setup tables
  // create txn
  await db.withTransactionAsync(async () => {
    if (!db) return;

    await db.execAsync(createWorkoutsTableQuery);
    await db.execAsync(createExercisesTableQuery);
    await db.execAsync(createSetsTableQuery);
  });
  return db;
};

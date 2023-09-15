import fs from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const __dirname = dirname(filename);

const DB_PATH = join(__dirname, "../db.json");

export const getDB = async () => {
  try {
    let db = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(db);
  } catch (error) {
    console.error(error);
  }
};

export const saveDB = async (db) => {
  try {
    await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
    return db;
  } catch (error) {
    console.error(error);
  }
};

export const insertNote = async (data) => {
  try {
    const db = await getDB();
    db.notes.push(data);
    await saveDB(db);
    return data;
  } catch (error) {
    console.error(error);
  }
};

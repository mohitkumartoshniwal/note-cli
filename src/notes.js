import { getDB, insertNote, saveDB } from "./db.js";

export const addNote = async (content) => {
  let newNote = {
    id: Date.now(),
    content,
  };

  await insertNote(newNote);
  return newNote;
};
export const getAllNotes = async () => {
  let db = await getDB();
  return db.notes;
};
export const findNotes = async (filter) => {
  let notes = await getAllNotes();
  return notes.filter((note) =>
    note.content.toLowerCase().includes(filter.toLowerCase())
  );
};
export const removeNoteById = async (id) => {
  let notes = await getAllNotes();

  let match = notes.find((note) => note.id === Number(id));

  if (match) {
    const newNotes = notes.filter((note) => note.id !== Number(id));
    await saveDB({ notes: newNotes });
    return id;
  }
};
export const removeAllNotes = () => saveDB({ notes: [] });

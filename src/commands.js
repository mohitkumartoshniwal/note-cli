import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import {
  addNote,
  findNotes,
  getAllNotes,
  removeAllNotes,
  removeNoteById,
} from "./notes.js";

function formatNotes(notes) {
  notes.forEach((note) => {
    console.log(`Note Id: ${note.id}`);
    console.log(`Note Content: ${note.content}\n`);
  });
}

yargs(hideBin(process.argv))
  .command(
    "new <note>",
    "creates a new note",
    (yargs) => {
      return yargs.positional("note", {
        type: "string",
        describe: "Content of the note",
      });
    },
    async (argv) => {
      let newNote = await addNote(argv.note);
      console.log(`Note added: ${newNote.id}`);
    }
  )
  .command(
    "all",
    "get all notes",
    () => {},
    async (argv) => {
      const notes = await getAllNotes();
      formatNotes(notes);
    }
  )
  .command(
    "find <filter>",
    "get matching notes",
    () => {},
    async (argv) => {
      let notes = await findNotes(argv.filter);
      formatNotes(notes);
    }
  )
  .command(
    "remove <id>",
    "remove note using an id",
    () => {},
    async (argv) => {
      let id = await removeNoteById(argv.id);
      if (id) {
        console.log(`Note Removed: ${id}`);
      } else {
        console.log(`Note not found`);
      }
    }
  )
  .command(
    "clean",
    "remove all notes",
    () => {},
    async (argv) => {
      await removeAllNotes();
      console.log("All Notes are removed");
    }
  )
  .demandCommand(1)
  .parse();

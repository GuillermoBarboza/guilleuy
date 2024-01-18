import { useState, useEffect } from "react";
import { useAppContext } from "../lib/contextLib";
import { NoteType } from "../types/note"
import { API } from "aws-amplify";
import { onError } from "../lib/errorLib";

export default function Home() {
  const [notes, setNotes] = useState<Array<NoteType>>([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onLoad();
  }, [isAuthenticated]);

  async function onLoad() {
      if (!isAuthenticated) {
        return;
      }
  
      try {
        const notes = await loadNotes();
        setNotes(notes);
      } catch (e) {
        onError(e);
      }
  
      setIsLoading(false);
  }

  function formatDate(str: undefined | string) {
    return !str ? "" : new Date(str).toLocaleString();
  }

  function loadNotes() {
    return API.get("notes", "/notes", {});
  }
  
  function renderNotesList(notes: { [key: string]: any }) {
    return (
      <>
      <a href="/notes/new" >
        <span >Create a new note</span>
      </a>
      <ul>
        {Object.values(notes).map(({ noteId, content, createdAt }) => (
          <li key={noteId}>
            <a href={`/notes/${noteId}`}>
              <span >{content.trim().split("\n")[0]}</span>
              <br />
              <span >
                Created: {formatDate(createdAt)}
              </span>
            </a>
          </li>
        ))}
      </ul>
      </>
    );
  }

  function renderLander() {
    return (
      <div >
        <h1>Scratch</h1>
        <p >A simple note taking app</p>
      </div>
    );
  }

  function renderNotes() {
    return (
      <div >
        <h2 >Your Notes</h2>
        {!isLoading && renderNotesList(notes)}
      </div>
    );
  }

  return (
    <div className="Home">
      {isAuthenticated ? renderNotes() : renderLander()}
    </div>
  );
}
import React, { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API, Storage } from "aws-amplify";
import { onError } from "../lib/errorLib";
import config from "../config";
import { NoteType } from "../types/note";
import LoaderButton from "../Components/LoaderButton";
import { s3Upload, s3Delete } from "../lib/awsLib";

export default function Notes() {
  const file = useRef<null | File>(null)
  const { id } = useParams();
  const nav = useNavigate();
  const [note, setNote] = useState<null | NoteType>(null);
  const [content, setContent] = useState("");
  const [attachment, setAttachment] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    function loadNote() {
      return API.get("notes", `/notes/${id}`, {});
    }

    async function onLoad() {
      try {
        const note = await loadNote();
        const { content, attachment } = note;

        if (attachment) {
          note.attachmentURL = await Storage.vault.get(attachment);
          setAttachment(attachment)
        }

        setContent(content);
        setNote(note);
      } catch (e) {
        onError(e);
      }
    }

    onLoad();
  }, [id]);

  function validateForm() {
  return content.length > 0;
}

function formatFilename(str: string) {
  return str.replace(/^\w+-/, "");
}

function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
  if (event.currentTarget.files === null) return;
  file.current = event.currentTarget.files[0];
}

function saveNote(note: NoteType) {
  return API.put("notes", `/notes/${id}`, {
    body: note,
  });
}

async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  let attachment;

  event.preventDefault();

  if (file.current && file.current.size > config.s3.MAX_ATTACHMENT_SIZE) {
    alert(
      `Please pick a file smaller than ${
        config.s3.MAX_ATTACHMENT_SIZE / 1000000
      } MB.`
    );
    return;
  }

  setIsLoading(true);

  try {
    if (file.current) {
      attachment = await s3Upload(file.current);
    } else if (note && note.attachment) {
      attachment = note.attachment;
    }

    await saveNote({
      content: content,
      attachment: attachment,
    });
    nav("/");
  } catch (e) {
    onError(e);
    setIsLoading(false);
  }
}

function deleteNote() {
  return API.del("notes", `/notes/${id}`, {});
}

async function handleDelete(event: React.FormEvent<HTMLModElement>) {
  event.preventDefault();

  const confirmed = window.confirm(
    "Are you sure you want to delete this note?"
  );

  if (!confirmed) {
    return;
  }

  setIsDeleting(true);

  try {
    await deleteNote();

    // Now delete the file from S3
    await s3Delete(attachment);

    nav("/");
  } catch (e) {
    onError(e);
    setIsDeleting(false);
  }
}

return !isLoading ? (
  <div className="Notes">
    {note && (
      <form onSubmit={handleSubmit} >
        <div > 
          <div >
            <textarea
             
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div >
            <label>Attachment</label>
            {note.attachment && (
              <p>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={note.attachmentURL}
                >
                  {formatFilename(note.attachment)}
                </a>
              </p>
            )}
            <input onChange={handleFileChange} type="file" className="YourFileInputClass" /> {/* Apply your custom file input class */}
          </div>
          <div > 
            <LoaderButton
              disabled={!validateForm()}
            >
              Save
            </LoaderButton>
            <LoaderButton
              onClick={handleDelete}
              disabled={isDeleting}
            >
              Delete
            </LoaderButton>
          </div>
        </div>
      </form>
    )}
  </div>
) : "Loading...";
}
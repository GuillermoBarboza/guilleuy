import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoaderButton from "../Components/LoaderButton";
import config from "../config";
import { API } from "aws-amplify";
import { NoteType } from "../types/types";
import { onError } from "../lib/errorLib";
import { s3Upload } from "../lib/awsLib";

export default function Create() {
  const file = useRef<null | File>(null);
  const nav = useNavigate();
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return content.length > 0;
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.currentTarget.files === null) return;
    file.current = event.currentTarget.files[0];
  }

  function createNote(note: NoteType) {
    return API.post("notes", "/notes", {
      body: note,
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
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
      const attachment = file.current
        ? await s3Upload(file.current)
        : undefined;

      await createNote({ content, attachment });
      nav("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  return (
    <div className="NewNote">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <label htmlFor="file">Attachment</label>
          <input onChange={handleFileChange} type="file" />
        </div>
        <LoaderButton
          type="submit"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Create
        </LoaderButton>
      </form>
    </div>
  );
}

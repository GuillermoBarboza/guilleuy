import { useState, useEffect } from "react";
import { WorkType } from "../types/types";
import { API } from "aws-amplify";
import { onError } from "../lib/errorLib";
import { HomeGrid } from "../Components/HomeGrid";

export default function Home() {
  const [works, setWorks] = useState<Array<WorkType>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      const works = await loadWorks();
      setWorks(works);
      console.log(works);
    } catch (e) {
      onError(e);
    }

    setIsLoading(false);
  }

  function formatDate(str: undefined | string) {
    return !str ? "" : new Date(str).toLocaleString();
  }

  function loadWorks() {
    return API.get("notes", "/works", {});
  }

  function renderNotesList(works: { [key: string]: any }) {
    return (
      <>
        <ul>
          {Object.values(works).map(({ workId, description, createdAt }) => (
            <li key={workId}>
              <a href={`/work/${workId}`}>
                <span>{description.trim().split("\n")[0]}</span>
                <br />
                <span>Created: {formatDate(createdAt)}</span>
              </a>
            </li>
          ))}
        </ul>
        <HomeGrid></HomeGrid>
      </>
    );
  }

  function renderNotes() {
    return (
      <div>
        <h2>Your Notes</h2>
        {!isLoading && renderNotesList(works)}
      </div>
    );
  }

  return <div className="Home">{renderNotes()}</div>;
}

import { useEffect, useState } from "react";
import { WorkType } from "../types/types";
import { API } from "aws-amplify";

export default function Portfolio() {
  const [works, setWorks] = useState<Array<WorkType>>([]);

  useEffect(() => {
    function loadPortfolio() {
      return API.get("notes", `/works`, {});
    }

    async function onLoad() {
      try {
        const works = await loadPortfolio();
        setWorks(works);
      } catch (error) {
        console.log(error);
      }
    }

    onLoad();
  }, []);

  return (
    <div className="NotFound text-center">
      <h3>Portfolio</h3>
    </div>
  );
}

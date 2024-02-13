import { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { WorkType } from "../../types/types";
import { CreateForm } from "./Forms/Create";
import { AdminTable } from "../../Components/AdminTable";

export default function AdminPortfolio() {
  const [works, setWorks] = useState<Array<WorkType>>([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    function loadPortfolio() {
      return API.get("notes", `/works`, {});
    }

    async function onLoad() {
      try {
        const works = await loadPortfolio();
        console.log(works);
        setWorks(works);
      } catch (error) {
        console.log(error);
      }
    }

    onLoad();
  }, []);

  return (
    <div className="text-center">
      <h3>Portfolio</h3>
      <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Open regular modal
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <CreateForm />
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      {isLoading ? <AdminTable data={works} /> : "Loading Works..."}
    </div>
  );
}

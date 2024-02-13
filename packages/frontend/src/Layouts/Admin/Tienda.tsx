import { useEffect, useState } from "react";
import { WorkType } from "../../types/types";
import { CreateForm } from "./Forms/CreateProduct";
import { API } from "aws-amplify";
import { AdminTable } from "../../Components/AdminTable";

export default function AdminTienda() {
  const [products, setProducts] = useState<Array<WorkType>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    function loadPortfolio() {
      return API.get("notes", `/products`, {});
    }

    async function onLoad() {
      try {
        const products = await loadPortfolio();
        setProducts(products);
        setIsLoading(false);
        console.log("products", products);
      } catch (error) {
        console.log(error);
      }
    }

    onLoad();
  }, []);

  function deleteProduct(productId) {
    console.log("deleting", productId);
    return API.del("notes", `/products/${productId}`, {});
  }

  function editProduct(productId, body) {
    return API.put("notes", `/products/${productId}`, { body });
  }

  return (
    <div className="text-center">
      <h3>Tienda</h3>
      <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        + Agregar Producto
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto sticky inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <button
                  className="absolute top-2 right-4 z-10"
                  onClick={() => setShowModal(false)}
                >
                  <svg
                    className="h-10 w-10"
                    width="800px"
                    height="800px"
                    viewBox="0 -0.5 8 8"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>close icon</title>
                    <desc>Button to close the modal.</desc>
                    <defs></defs>
                    <g
                      id="Page-1"
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <g
                        id="Dribbble-Light-Preview"
                        transform="translate(-385.000000, -206.000000)"
                        fill="#000000"
                      >
                        <g
                          id="icons"
                          transform="translate(56.000000, 160.000000)"
                        >
                          <polygon
                            id="close_mini-[#1522]"
                            points="334.6 49.5 337 51.6 335.4 53 333 50.9 330.6 53 329 51.6 331.4 49.5 329 47.4 330.6 46 333 48.1 335.4 46 337 47.4"
                          ></polygon>
                        </g>
                      </g>
                    </g>
                  </svg>
                </button>

                <CreateForm />
              </div>
            </div>
          </div>
          <div className="opacity-25 sticky inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {!isLoading ? (
        <AdminTable
          headers={["title", "slug", "imagenPrincipal"]}
          data={products}
          edit={editProduct}
          deleteItem={deleteProduct}
        />
      ) : (
        "Loading Products..."
      )}
    </div>
  );
}

import React, { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API, Storage } from "aws-amplify";
import { onError } from "../lib/errorLib";
import { useAppContext } from "../lib/contextLib";
import config from "../config";
import { NoteType } from "../types/types";

export default function Producto() {
  const { productSlug } = useParams();
  const { itemId } = useAppContext();
  const nav = useNavigate();
  const [product, setProduct] = useState<null | NoteType>(null);
  const [content, setContent] = useState("");
  const [attachment, setAttachment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    console.log(productSlug);
    function loadNote() {
      return API.get("notes", `/products/${itemId}`, {});
    }

    async function onLoad() {
      try {
        const note = await loadNote();
        console.log(note);
        const { content, attachment } = note;

        if (attachment) {
          note.attachmentURL = await Storage.vault.get(attachment);
          setAttachment(attachment);
        }

        setContent(content);
        setProduct(note);
      } catch (e) {
        onError(e);
      }
    }

    onLoad();
  }, []);

  return (
    <div className="max-w-4xl mx-auto my-8 p-4">
      <div className="flex flex-col md:flex-row md:space-x-6">
        <div className="md:w-1/2">
          <img
            src="/placeholder.svg"
            alt="Serie Clorofila / Graptopetalum"
            className="rounded shadow-lg"
            width="300"
            height="400"
            style={{ aspectRatio: "300 / 400", objectFit: "cover" }}
          />
          <p className="text-sm mt-2">(Oferta!)</p>
        </div>
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold">
            Serie Clorofila / Graptopetalum
          </h1>
          <div className="space-y-2">
            <p className="text-xl font-semibold line-through text-gray-500">
              $350,00
            </p>
            <p className="text-4xl font-bold text-green-600">$250,00</p>
          </div>
          <p className="text-lg">1 disponibles</p>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-black text-white">
            Añadir al carrito
          </button>
          <p className="text-lg font-medium">Categoría: Serigrafía Clorofila</p>
        </div>
      </div>
      <div className="mt-6">
        <p className="text-lg">Una de las versiones de la Serie Clorofila</p>
        <p className="mt-2 text-gray-700">
          Serigrafías artesanales de Cactus y Suculentas que hice para una
          muestra en conjunto con Clorofila Pocitos.
        </p>
        <p className="mt-2 text-gray-700">
          Ilustración estampada sobre mancha de tinta tipo acuarela, logrando
          unas combinaciones de colores que cada pieza es única en su
          combinación, son todas 1/1
        </p>
        <p className="mt-2 text-gray-700 italic">
          NOTA: el precio es sólo de la imagen sin marco
        </p>
      </div>
    </div>
  );
}

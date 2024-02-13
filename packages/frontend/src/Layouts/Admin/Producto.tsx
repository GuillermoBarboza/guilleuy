import React, { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API, Storage } from "aws-amplify";
import { onError } from "../../lib/errorLib";
import { ProductType } from "../../types/types";
import config from "../../config";
import { NoteType } from "../../types/types";

export default function Producto() {
  const { productSlug } = useParams();
  const nav = useNavigate();
  const [product, setProduct] = useState();
  const imagenPrincipalNueva = useRef<null | File>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formState, setFormState] = useState({
    title: "",
    subtitle: "",
    slug: "",
    description: "",
    imagenPrincipal: "",
    price: "",
    categories: [""],
    quantity: "",
    enOferta: true,
    precioOferta: "",
    additionalInfo: "",
  });

  useEffect(() => {
    function loadNote() {
      return API.get("notes", `/products/${productSlug}`, {});
    }

    async function onLoad() {
      try {
        const note = await loadNote();
        console.log(note);
        setProduct(note);
        setFormState(note);
      } catch (e) {
        onError(e);
      }
    }

    onLoad();
  }, []);

  function updateProduct(work: ProductType) {
    return API.put("notes", `/products/${product["productId"]}`, {
      body: work,
    });
  }

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormState({ ...formState, [id]: newValue });
  };

  function handleImagenPrincipalChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    if (event.currentTarget.files === null) return;
    imagenPrincipalNueva.current = event.currentTarget.files[0];
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (
      imagenPrincipalNueva.current &&
      imagenPrincipalNueva.current.size > config.s3.MAX_ATTACHMENT_SIZE
    ) {
      alert(
        `File ${
          imagenPrincipalNueva.current.name
        } is Too large. Please pick a file smaller than ${
          config.s3.MAX_ATTACHMENT_SIZE / 1000000
        } MB.`
      );
      return;
    }

    setIsLoading(true);

    try {
      console.log({
        title: formState.title,
        subtitle: formState.subtitle,
        description: formState.description,
        slug: formState.slug,
        imagenPrincipal: "imagenPrincipalLink",
        price: formState.price,
        categories: formState.categories,
        quantity: formState.quantity,
        enOferta: formState.enOferta,
        precioOferta: formState.precioOferta,
        additionalInfo: formState.additionalInfo,
      });
      /*  const imagenPrincipalLink = imagenPrincipal.current
        ? await s3Upload(imagenPrincipal.current)
        : undefined; */

      await updateProduct({
        title: formState.title,
        subtitle: formState.subtitle,
        description: formState.description,
        slug: formState.slug,
        imagenPrincipal: "imagenPrincipalLink",
        price: formState.price,
        categories: formState.categories,
        quantity: formState.quantity,
        enOferta: formState.enOferta,
        precioOferta: formState.precioOferta,
        additionalInfo: formState.additionalInfo,
      });
      // nav("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto my-8 p-4">
      <button
        onClick={handleSubmit}
        className="inline-flex flex-end  items-center justify-center whitespace-nowrap rounded-md text-m font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gray-200  hover:bg-gray-300 h-10 px-7 py-3 m-auto"
      >
        Guardar
      </button>
      <div className="flex flex-col md:flex-row md:space-x-6">
        <div className="md:w-1/2">
          <img
            src={formState.imagenPrincipal}
            alt="Serie Clorofila / Graptopetalum"
            className="rounded shadow-lg mb-6"
            width="300"
            height="400"
            style={{ aspectRatio: "300 / 400", objectFit: "cover" }}
          />
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "
            htmlFor="imagenPrincipalNueva"
          >
            Upload a New Main Image
            <input
              onChange={handleImagenPrincipalChange}
              className="flex rounded-md border border-input bg-white px-3 py-4 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="imagenPrincipalNueva"
              type="file"
            />
          </label>
          <p className="text-sm mt-2">(Oferta!)</p>
        </div>
        <div className="md:w-1/2 space-y-4">
          <label className="text-3xl font-bold flex flex-row">
            Product title:
            <input
              type="text"
              value={formState.title}
              id="title"
              onChange={handleChange}
            />
          </label>
          <label
            className="text-sm flex flex-row font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="slug"
          >
            Slug
            <input
              onChange={handleChange}
              value={formState.slug}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="slug"
              placeholder="Enter the product slug"
            />
          </label>
          <div className="space-y-2">
            <label
              className="text-sm flex flex-row font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="price"
            >
              Precio Regular
              <input
                onChange={handleChange}
                value={formState.price}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="price"
                type="number"
                placeholder="Enter the product price"
              />
            </label>
            <p className="text-xl font-semibold line-through text-gray-500">
              UYU${formState.price}
            </p>
            <label
              className="text-sm flex flex-row font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="precioOferta"
            >
              Precio Regular
              <input
                onChange={handleChange}
                value={formState.precioOferta}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="precioOferta"
                type="number"
                placeholder="Enter the product price"
              />
            </label>
            <p className="text-3xl font-bold text-green-600">
              UYU${formState.precioOferta} Precio de Oferta
            </p>
          </div>
          <label
            className="text-sm flex flex-row font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="quantity"
          >
            Cantidad disponibles
            <input
              onChange={handleChange}
              value={formState.quantity}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="quantity"
              type="number"
              placeholder="Enter the product quantity"
            />
          </label>
          <p className="text-lg">{formState.quantity} disponibles</p>
          <p className="text-lg font-medium">
            Categorias: {formState.categories}
          </p>
        </div>
      </div>
      <div className="mt-6">
        <div>
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="subtitle"
          >
            Subtitulo
            <input
              value={formState.subtitle}
              onChange={handleChange}
              className="flex w-full h-20 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
              id="subtitle"
              placeholder="Enter the product description"
            ></input>
          </label>
        </div>
        <div>
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="description"
          >
            Description
            <textarea
              value={formState.description}
              onChange={handleChange}
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
              id="description"
              placeholder="Enter the product description"
            ></textarea>
          </label>
        </div>
        <div>
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Additional Information
            <textarea
              onChange={handleChange}
              value={formState.additionalInfo}
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
              id="additionalInfo"
              placeholder="Enter additional information"
            ></textarea>
          </label>
        </div>
      </div>
    </div>
  );
}

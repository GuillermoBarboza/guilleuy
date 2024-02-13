import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../../config";
import { API } from "aws-amplify";
import { ProductType } from "../../../types/types";
import { onError } from "../../../lib/errorLib";
import { s3Upload } from "../../../lib/awsLib";

export function CreateForm() {
  const imagenPrincipal = useRef<null | File>(null);
  const imagenesAdicionales = useRef<null | FileList>(null);

  const [formState, setFormState] = useState({
    title: "",
    subtitle: "",
    slug: "",
    description: "",
    imagenPrincipal,
    price: "",
    categories: [""],
    quantity: "",
    enOferta: true,
    precioOferta: "",
    additionalInfo: "",
  });

  const nav = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return content.length > 0;
  }

  function handleImagenPrincipalChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    if (event.currentTarget.files === null) return;
    imagenPrincipal.current = event.currentTarget.files[0];
  }

  // Define handleChange function
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormState({ ...formState, [id]: newValue });
  };

  function createNote(work: ProductType) {
    return API.post("notes", "/products", {
      body: work,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (
      imagenPrincipal.current &&
      imagenPrincipal.current.size > config.s3.MAX_ATTACHMENT_SIZE
    ) {
      alert(
        `File ${
          imagenPrincipal.current.name
        } is Too large. Please pick a file smaller than ${
          config.s3.MAX_ATTACHMENT_SIZE / 1000000
        } MB.`
      );
      return;
    }

    setIsLoading(true);

    try {
      console.log(imagenPrincipal.current);
      /*  const imagenPrincipalLink = imagenPrincipal.current
        ? await s3Upload(imagenPrincipal.current)
        : undefined; */

      await createNote({
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
    <>
      <div className="rounded-lg border bg-gray-300 shadow-sm w-80">
        <div className="flex flex-col space-y-2 p-6">
          <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
            Product Information
          </h3>
          <p className="text-sm text-muted-foreground">
            Enter the product details below
          </p>
        </div>
        <div className="p-6 flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-5">
            <div>
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="title"
              >
                Title
              </label>
              <input
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="title"
                placeholder="Enter the product title"
              />
            </div>
            <div>
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="subtitle"
              >
                Subtitle
              </label>
              <input
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="subtitle"
                placeholder="Enter the product subtitle"
              />
            </div>
            <div>
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="slug"
              >
                Slug
              </label>
              <input
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="slug"
                placeholder="Enter the product slug"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-10">
            <div className="col-span-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="imagenPrincipal"
              >
                Main Image
              </label>
              <input
                onChange={handleImagenPrincipalChange}
                className="flex h-full w-full rounded-md border border-input bg-white px-3 py-4 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="imagenPrincipal"
                type="file"
              />
            </div>

            <div>
              <div>
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="price"
                >
                  Price
                </label>
                <input
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="price"
                  type="number"
                  placeholder="Enter the product price"
                />
              </div>
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Categories
              </label>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-5">
            <div>
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="quantity"
              >
                Quantity
              </label>
              <input
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="quantity"
                type="number"
                placeholder="Enter the product quantity"
              />
            </div>
            <div>
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                On Sale
              </label>
              <input
                onChange={handleChange}
                type="checkbox"
                className="peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
                id="enOferta"
              />
            </div>
            <div>
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="sale-price"
              >
                Sale Price
              </label>
              <input
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="precioOferta"
                type="number"
                placeholder="Enter the sale price"
                /* disabled="" */
              />
            </div>
          </div>

          <div>
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              onChange={handleChange}
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
              id="description"
              placeholder="Enter the product description"
            ></textarea>
          </div>
          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Additional Information
            </label>
            <textarea
              onChange={handleChange}
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
              id="additionalInformation"
              placeholder="Enter additional information"
            ></textarea>
          </div>
          <div className="flex items-center p-6">
            <button
              onClick={handleSubmit}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-m font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gray-200  hover:bg-gray-300 h-10 px-7 py-3 m-auto"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

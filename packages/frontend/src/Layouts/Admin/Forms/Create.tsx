import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../../config";
import { API } from "aws-amplify";
import { WorkType } from "../../../types/types";
import { onError } from "../../../lib/errorLib";
import { s3Upload } from "../../../lib/awsLib";

export function CreateForm() {
  const imagenPrincipal = useRef<null | File>(null);
  const imagenesAdicionales = useRef<null | FileList>(null);

  const [formState, setFormState] = useState({
    title: "",
    description: "",
    imagenPrincipal,
    imagenesAdicionales,
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

  function handleImagenesAdicionalesChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    if (event.currentTarget.files === null) return;
    imagenesAdicionales.current = event.currentTarget.files;
  }

  function handleChange(event) {
    console.log([event.target.name], event.target.value);
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  }

  function createNote(work: WorkType) {
    return API.post("notes", "/works", {
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

    if (imagenesAdicionales.current) {
      for (const image of imagenesAdicionales.current) {
        if (image && image.size > config.s3.MAX_ATTACHMENT_SIZE) {
          alert(
            `File ${image.name} is Too large. Please pick a file smaller than ${
              config.s3.MAX_ATTACHMENT_SIZE / 1000000
            } MB.`
          );
          return;
        }
      }
    }

    setIsLoading(true);

    try {
      console.log(imagenPrincipal.current);
      const imagenPrincipalLink = imagenPrincipal.current
        ? await s3Upload(imagenPrincipal.current)
        : undefined;

      console.log(imagenesAdicionales.current);
      const imagenesAdicionalesLinks = [];
      if (imagenesAdicionales.current) {
        for (const image of imagenesAdicionales.current) {
          const link = await s3Upload(image);
          imagenesAdicionalesLinks.push(link);
        }
      }
      console.log("work data", {
        title: formState.title,
        description: formState.description,
        imagenPrincipalLink,
        imagenesAdicionalesLinks,
      });
      await createNote({
        title: formState.title,
        description: formState.description,
        imagenPrincipalLink,
        imagenesAdicionalesLinks,
      });
      // nav("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
            Publica un nuevo trabajo.
          </h3>
          <p className="text-sm text-muted-foreground">
            Fill in the details of your work.
          </p>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="title"
              >
                Titulo:
              </label>
              <input
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="title"
                name="title"
                placeholder="Titulo"
                required={true}
              />
            </div>
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="description"
              >
                Descripcion del trabajo:
              </label>
              <textarea
                onChange={handleChange}
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="description"
                placeholder="Este trabajo consistio en..."
                name="description"
                required={true}
              ></textarea>
            </div>
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="year"
              >
                Fecha
              </label>
              <input
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="year"
                placeholder="Fecha"
                name="year"
                required={true}
                type="date"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Imagen Principal
              </label>
              <input
                onChange={handleImagenPrincipalChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                type="file"
              />
              <div>Accepted file types: .jpg, .png, .gif</div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Imagenes adicionales.
              </label>
              <input
                onChange={handleImagenesAdicionalesChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                type="file"
                multiple
              />
              <div>Accepted file types: .jpg, .png, .gif</div>
            </div>
          </div>
        </div>
        {/* submit */}
        <div className="flex items-center p-6">
          <button
            onClick={handleSubmit}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 ml-auto"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export interface NoteType {
    noteId?: string;
    content: string;
    createdAt?: string;
    attachment?: string;
    attachmentURL?: string;
  }


export interface WorkType {
    workId?: string;
    title: string;
    description: string;
    createdAt?: string;
    imagenPrincipalLink?: string;
    imagenesAdicionalesLinks?: string[];
  }

export interface ProductType {
  productId?: string,
  title: string,
  subtitle: string,
  slug: string,
  description: string,
  imagenPrincipal?: string,
  price: string,
  categories?: string[],
  quantity: string,
  enOferta: boolean,
  precioOferta: string,
  additionalInfo: string,
}
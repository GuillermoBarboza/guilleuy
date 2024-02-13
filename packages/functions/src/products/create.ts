import * as uuid from "uuid";
import { Table } from "sst/node/table";
import handler from "@notes/core/handler";
import dynamoDb from "@notes/core/dynamodb";

export const main = handler(async (event) => {
  let data = {
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
  };

  if (event.body != null) {
    data = JSON.parse(event.body);
  }

  const params = {
    TableName: Table.Products.tableName,
    Item: {
      // The attributes of the item to be created
      userId: event.requestContext.authorizer?.iam.cognitoIdentity.identityId, // The id of the author
      productId: uuid.v1(), // A unique uuid
      title: data.title,
      subtitle: data.subtitle,
      slug: data.slug,
      description: data.description,
      imagenPrincipal: data.imagenPrincipal,
      price: data.price,
      categories: data.categories,
      quantity: data.categories,
      enOferta: data.enOferta,
      precioOferta: data.precioOferta,
      additionalInfo: data.additionalInfo,
      createdAt: Date.now(), // Current Unix timestamp
    },
  };

  await dynamoDb.put(params);

  return JSON.stringify(params.Item);
});

import { Table } from "sst/node/table";
import handler from "@notes/core/handler";
import dynamoDb from "@notes/core/dynamodb";

export const main = handler(async (event) => {
  const data = JSON.parse(event.body || "{}");

  const params = {
    TableName: Table.Notes.tableName,
    Key: {
      // The attributes of the item to be created
      productId: event?.pathParameters?.id, // The id of the note from the path
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET title = :title, subtitle = :subtitle, slug = :slug, description = :description, imagenPrincipal = :imagenPrincipal, price = :price, categories = :categories, quantity = :quantity, enOferta = :enOferta, precioOferta = :precioOferta, additionalInfo = :additionalInfo",
    ExpressionAttributeValues: {
      ":title": data.title || null,
      ":subtitle": data.subtitle || null,
      ":slug": data.slug || null,
      ":description": data.description || null,
      ":imagenPrincipal": data.imagenPrincipal || null,
      ":price": data.price || null,
      ":categories": data.categories || null,
      ":quantity": data.quantity || null,
      ":enOferta": data.enOferta || null,
      ":precioOferta": data.precioOferta || null,
      ":additionalInfo": data.additionalInfo || null,
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: "ALL_NEW",
  };

  await dynamoDb.update(params);

  return JSON.stringify({ status: true });
});
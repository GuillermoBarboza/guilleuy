import * as uuid from "uuid";
import { Table } from "sst/node/table";
import handler from "@notes/core/handler";
import dynamoDb from "@notes/core/dynamodb";

export const main = handler(async (event) => {
  let data = {
    title: "",
    subtitle: "",
    description: "",
    fecha: "",
    client: "",
    category: "",
    imagenPrincipal: '',
    imagenesAdicionales: [''],
    media: [""],
  };

  if (event.body != null) {
    data = JSON.parse(event.body);
  }

  const params = {
    TableName: Table.Works.tableName,
    Item: {
      // The attributes of the item to be created
      userId: event.requestContext.authorizer?.iam.cognitoIdentity.identityId, // The id of the author
      workId: uuid.v1(), // A unique uuid
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
      fecha: data.fecha,
      client: data.client,
      category: data.category,
      imagenPrincipal: data.imagenPrincipal,
      imagenesAdicionales: data.imagenesAdicionales,
      media: data.media,
      createdAt: Date.now(), // Current Unix timestamp
    },
  };
  
  try {

    await dynamoDb.put(params);

    return JSON.stringify(params.Item);
  } catch(e) {
    return JSON.stringify({error: e});
  }

});

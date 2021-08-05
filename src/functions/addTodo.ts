import { document } from "../utils/dynamodbClient";
import { v4 as uuidV4 } from "uuid"
import { APIGatewayProxyHandler } from "aws-lambda";
import * as dayjs from "dayjs";

interface ICreateTodo {
title: string;
deadline: string;
}

export const handle: APIGatewayProxyHandler = async (event) => {
  const { id } = event.pathParameters;
  const { title, deadline } = JSON.parse(event.body) as ICreateTodo;

  if (!title || !deadline) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "missing content"
      })
    }
  }

  await document.put({
    TableName: "todos",
    Item: {
      id: uuidV4(),
      user_id: id,
      title,
      done: false,
      deadline: dayjs(deadline).format(),
      createdAt: dayjs().format(),
      updatedAt: null
    }
  })
  .promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Todo created!",
    }),
    headers: {
      "Content-type": "application/json"
    }
  }


}
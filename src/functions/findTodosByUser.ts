import { document } from "../utils/dynamodbClient";

export const handle = async (event, _context, callback) => {
  const { id } = event.pathParameters;

  const params = {
    TableName: 'todos',
    key: {
      user_id: id
    }
  };

  await document.scan(params).promise().then(result => {

    const response = {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(result.Items)
    }

    callback(null, response);

  }).catch(error => {
    console.log(error)
    callback(null, {
      statusCode: error.statusCode || 501,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: 'Couldn\'t fetch the todo items.'
      }),
    });

  })
}
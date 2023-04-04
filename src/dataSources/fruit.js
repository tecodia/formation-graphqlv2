import { RESTDataSource } from '@apollo/datasource-rest';

export class FruitAPI extends RESTDataSource {
  baseURL = 'https://fruits-api.netlify.app';

  async getFruits() {
    const data = await this.post('/graphql', {
      body: {
        query: `{
            fruits {
                id
                name: fruit_name
            }
            }`,
      },
    });

    return data.data.fruits;
  }

  async getFruit(id) {
    const data = await this.post('/graphql', {
      body: {
        query: `query GETFRUITBYID($id: ID!) {
  fruit(id: $id) {
    id
    name: fruit_name
  }
}
`,
        variables: {
          id,
        },
      },
    });

    return data.data.fruit;
  }
}

import gql from 'graphql-tag';

export const fruitTypeDefs = gql`
  extend type Fruit {
    monid: String
  }
`;

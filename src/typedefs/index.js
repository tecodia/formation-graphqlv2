import { mergeTypeDefs } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';

export const typeDefs = () => {
  const schema = loadFilesSync('./**/*', { extensions: ['graphql'] });
  return mergeTypeDefs(schema);
};

function authDirective(directiveName, getUserFn: (token) => { hasRole: (role: string) => boolean }) {
  const typeDirectiveArgumentMaps: Record<string, any> = {};
  return {
    authDirectiveTypeDefs: `directive @${directiveName}(
        requires: Role = ADMIN,
      ) on OBJECT | FIELD_DEFINITION

      enum Role {
        ADMIN
        REVIEWER
        USER
        UNKNOWN
      }`,
    authDirectiveTransformer: (schema: GraphQLSchema) =>
      mapSchema(schema, {
        [MapperKind.TYPE]: (type) => {
          const authDirective = getDirective(schema, type, directiveName)?.[0];
          if (authDirective) {
            typeDirectiveArgumentMaps[type.name] = authDirective;
          }
          return undefined;
        },
        [MapperKind.OBJECT_FIELD]: (fieldConfig, _fieldName, typeName) => {
          const authDirective =
            getDirective(schema, fieldConfig, directiveName)?.[0] ?? typeDirectiveArgumentMaps[typeName];
          if (authDirective) {
            const { requires } = authDirective;
            if (requires) {
              const { resolve = defaultFieldResolver } = fieldConfig;
              fieldConfig.resolve = function (source, args, context, info) {
                const user = getUserFn(context.headers.authToken);
                if (!user.hasRole(requires)) {
                  throw new Error('not authorized');
                }
                return resolve(source, args, context, info);
              };
              return fieldConfig;
            }
          }
        },
      }),
  };
}

import { GraphQLObjectType } from 'graphql';

const _inheritFields = (config) => {
  let currentFields = config.fields;
  if (typeof config.fields === 'function') {
    currentFields = config.fields();
  }
  const { parent } = config;
  delete config.parent;
  const parentFields = parent.getFields();
  Object.keys(parentFields).forEach((field) => {
    // Deprecation
    if (parentFields[field].isDeprecated && !parentFields[field].deprecationReason) {
      parentFields[field].deprecationReason = `${field} is deprecated.`;
    }
    delete parentFields[field].isDeprecated;

    // Arguments
    const newArgs = {};
    parentFields[field].args.forEach((arg) => {
      newArgs[arg.name] = {
        type: arg.type,
        defaultValue: arg.defaultValue,
        description: arg.description,
        astNode: arg.astNode,
      };
    });
    parentFields[field].args = newArgs;
  });
  return () => ({
    ...parentFields,
    ...currentFields,
  });
};

class GraphQLChildObjectType extends GraphQLObjectType {
  constructor(config) {
    const fields = _inheritFields(config);
    super({ ...config, fields })
  }
}

export default GraphQLChildObjectType;

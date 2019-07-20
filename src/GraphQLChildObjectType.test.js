import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql';
import GraphQLChildObjectType from './GraphQLChildObjectType';

describe('GraphQLChildObjectType', () => {
  it('should create GraphQLObjectType', () => {
    const Car = new GraphQLObjectType({
      name: 'Car',
      fields: () => ({
        wheels: {
          type: GraphQLInt,
        },
        color: {
          type: GraphQLString,
        },
      }),
    });

    const Tesla = new GraphQLChildObjectType({
      name: 'Tesla',
      parent: Car,
      fields: () => ({
        battery: {
          type: GraphQLString,
        },
      }),
    });

    expect(Tesla instanceof GraphQLObjectType).toBe(true);
  });

  it('should have Car\'s fields', () => {
    const Car = new GraphQLObjectType({
      name: 'Car',
      fields: () => ({
        wheels: {
          type: GraphQLInt,
          args: {
            test: {
              type: GraphQLString,
              defaultValue: 'test',
              description: 'testdesc',
            },
          },
        },
        color: {
          type: GraphQLString,
        },
      }),
    });

    const Tesla = new GraphQLChildObjectType({
      name: 'Tesla',
      parent: Car,
      fields: () => ({
        battery: {
          type: GraphQLString,
        },
      }),
    });

    const fields = Tesla.getFields();
    expect(fields).toHaveProperty('wheels');
  })
});
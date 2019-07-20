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

  it('should have Car\'s fields and it\'s own', () => {
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
    expect(fields).toHaveProperty('color');
    expect(fields).toHaveProperty('battery');
  });

  it('should have the inherited type\'s field arguments', () => {
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
    expect(fields.wheels.args[0].name).toBe('test');
    expect(fields.wheels.args[0].defaultValue).toBe('test');
    expect(fields.wheels.args[0].description).toBe('testdesc');
  });
});
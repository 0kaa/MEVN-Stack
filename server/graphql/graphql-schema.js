import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLString, GraphQLID } = require("graphql");
import { getProducts } from "../controllers/products.js";
const wordType = new GraphQLObjectType({
  name: "Word",
  description: "This is word description",
  fields: {
    lang: {
      type: GraphQLString,
      description: "lang desc",
    },
    word: {
      type: GraphQLString,
      description: "word desc",
    },
    type: {
      type: GraphQLString,
      description: "type desc",
    },
    synonym: {
      type: new GraphQLList(GraphQLString),
      description: "synonym desc",
    },
    pronounce: {
      type: GraphQLString,
      description: "pronounce desc",
    },
    description: {
      type: GraphQLString,
      description: "description desc",
    },
    soundURL: {
      type: GraphQLString,
      description: "soundURL desc",
    },
    images: {
      type: GraphQLString,
      description: "images desc",
    },
    examples: {
      type: GraphQLString,
      description: "examples desc",
    },
    videos: {
      type: GraphQLString,
      description: "videos desc",
    },
    tags: {
      type: GraphQLString,
      description: "tags desc",
    },
  },
});
const productType = new GraphQLObjectType({
  name: "ProductType",
  description: "this is product type schema",
  fields: {
    title: {
      type: GraphQLString,
      description: "product title",
    },
    user: {
      type: GraphQLString,
      description: "this user type",
    },
  },
});
const queryType = new GraphQLObjectType({
  name: "Query",
  description: "this is query description",
  fields: {
    products: {
      type: new GraphQLList(productType),
      description: "this product type query",
      resolve: (_, args) => {
        return getProducts();
      },
    },
    words: {
      type: new GraphQLList(wordType),
      description: "this",
      resolve: (_, args) => {
        return [{ pronounce: "a-b-cs" }, { pronounce: "a-b-cswewe" }];
      },
    },
    word: {
      type: wordType,
      description: "this",
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve: (_, args) => {
        return [{ pronounce: "qwewq" }];
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: queryType,
});

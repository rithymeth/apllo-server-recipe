const { gql } = require("apollo-server-express");

module.exports = gql`
  type Recipe {
    name: String
    ingredients: String
    instructions: String
    imageUrl: String
    createdAt: String
    updatedAt: String
  }

  input RecipeInput {
    name: String
    ingredients: String
    instructions: String
    imageUrl: String
  }
  input editRecipe {
    name: String
    ingredients: String
    instructions: String
    imageUrl: String
  }
  type Query {
    getRecipe: Recipe
    recipe(ID: ID!): Recipe!
    getRecipes(amout: Int): [Recipe]
  }

  type Mutation {
    createRecipe(recipeInput: RecipeInput): Recipe!
    editRecipe(id: ID!, input: RecipeInput!): Recipe
    deleteRecipe(id: ID!): Boolean
  }
`;

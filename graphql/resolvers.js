const Recipe = require("../models/Recipe");

module.exports = {
  Query: {
    async recipe(_, { ID }) {
      return await Recipe.findById(ID);
    },
    async getRecipe(_, { amount }) {
      return await Recipe.find().sort({ createAt: -1 }).limit(amount);
    },
  },

  Mutation: {
    async createRecipe(
      _,
      { recipeInput: { name, instructions, ingredients, imageUrl } }
    ) {
      const createdRecipe = new Recipe({
        name: name,
        instructions: instructions,
        ingredients: ingredients,
        imageUrl: imageUrl,
        createdAt: new Date().toISOString(),
      });
      const res = await createdRecipe.save();
      console.log(res._doc);
      return {
        id: res.id,
        ...res._doc,
      };
    },
    async deleteRecipe(_, { ID }) {
      const wasDeleted = (await Recipe.deleteOne({ _id: ID })).deletedCount;
      return wasDeleted;
    },
    async editRecipe(
      _,
      { ID, recipeInput: { name, instructions, ingredients, imageUrl } }
    ) {
      const wasEdited = await Recipe.update(
        { _id: ID },
        {
          name: name,
          instructions: instructions,
          ingredients: ingredients,
          imageUrl: imageUrl,
          updatedAt: new Date().toISOString(),
        }
      ).modifiedCound;
      return wasEdited;
    },
  },
};

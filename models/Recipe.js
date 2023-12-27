const { models, Schema, mongoose} = require('mongoose')

const recipeSchema = new Schema({
    name: String,
    ingredients: String,
    instructions: String,
    imageUrl: String,
    createdAt: String,
    updatedAt: String,

})

module.exports = mongoose.model('Recipe', recipeSchema);
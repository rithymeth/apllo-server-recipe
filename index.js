const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const mongoose = require("mongoose");

const MONGODB = "mongodb+srv://admin:admin@cluster0.76upfhv.mongodb.net/?retryWrites=true&w=majority";

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.start().then(() => {
  server.applyMiddleware({ app });
  return mongoose.connect(MONGODB, { useNewUrlParser: true });
})
  .then(() => {
    console.log("MongoDB Connection Successful");
    const PORT = 4000;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}${server.graphqlPath}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

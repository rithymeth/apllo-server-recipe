const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const mongoose = require("mongoose");

const MONGODB = "mongodb+srv://admin:admin@cluster0.76upfhv.mongodb.net/";

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
    app.listen({ port: process.env.PORT || 4000 }, () => {
      console.log(`Server is running on http://localhost:${process.env.PORT || 4000}${server.graphqlPath}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

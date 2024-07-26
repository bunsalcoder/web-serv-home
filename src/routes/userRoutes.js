const express = require("express");
const userRoutes = express.Router();
const userController = require("../controllers/userController");

userRoutes.get("/users", userController.getAllUserController);

userRoutes.get("/users/:id", userController.getUserByIdController);

userRoutes.post("/users", userController.createNewUserController);

module.exports = userRoutes;

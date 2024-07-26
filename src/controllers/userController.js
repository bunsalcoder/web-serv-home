const users = require('../models/users') || [];
const Response = require('../responseBody/Response');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getAllUserController = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching users' });
  }
};

const createNewUserController = (req, res) => {
  const body = req.body;
  const { username, password } = body;
  const newUser = {
    id: users.length + 1,
    username,
    password,
  };
  users.push(newUser);
  res.send(newUser);
};

const getUserByIdController = (req, res) => {
  try {
    const { params } = req;
    console.log({ params });
    const { id } = undefined;
    const foundUsers = users.filter((user) => {
      return user.id == id;
    });
    console.log({ foundUsers });
    new Response(res).setResponse(foundUsers[0]).send();
  } catch (error) {
    console.log(error);
    new Response(res).setStatusCode(500).setCustomCode(10000).send();
  }
};

module.exports = {
  getAllUserController,
  createNewUserController,
  getUserByIdController,
};

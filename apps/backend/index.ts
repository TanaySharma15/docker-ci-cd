import express from "express";
import { prismaClient } from "db/client";

const app = express();

app.use(express.json());

app.get("/user", async (req, res) => {
  try {
    const user = await prismaClient.user.findMany();
    res.status(200).json({
      message: "Users fetched",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal error",
    });
  }
});

app.post("/user", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ error: "Username and password are required" });
      return;
    }

    const user = await prismaClient.user.create({
      data: {
        username,
        password,
      },
    });
    res.status(200).json({
      message: "User created",
      user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Internal error",
    });
  }
});

app.listen(8081, () => {
  console.log("server is listening on 8081");
});

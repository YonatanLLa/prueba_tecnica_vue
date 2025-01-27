import { Router } from "express";
import User from "../models/User";

const router = Router();

router.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.get("/users/:id", async (req: any, res: any) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
});

router.post("/users", async (req, res) => {
  const { password } = req.body;
  const newUser = await User.create({ password });
  res.status(201).json(newUser);
});

router.put("/users/:id", async (req: any, res: any) => {
  const { id } = req.params;
  const { password } = req.body;
  const user = await User.findByPk(id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  user.password = password;
  await user.save();
  res.json(user);
});

router.delete("/users", async (req, res) => {
  await User.destroy({ truncate: true });
  res.json({ message: "Users deleted successfully" });
});

router.delete("/users/:id", async (req: any, res: any) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  await user.destroy();
  res.json({ message: "User deleted successfully" });
});

export default router;

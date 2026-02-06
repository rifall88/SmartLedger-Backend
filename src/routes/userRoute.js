import express from "express";
import {
  register,
  login,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import {
  validateRegister,
  validateLogin,
  validateUpdate,
} from "../validators/userValidator.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.get("/by-id", authenticate, getUserById);
router.put("/by-id", authenticate, validateUpdate, updateUser);

export default router;

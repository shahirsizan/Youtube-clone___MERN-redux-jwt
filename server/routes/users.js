import express from "express";
import { test } from "../controllers/user.js";
// don't write "../controllers/user", this will render `ERR_MODULE_NOT_FOUND`

const router = express.Router();

export default router;

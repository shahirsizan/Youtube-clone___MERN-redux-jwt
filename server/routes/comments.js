import express from "express";
import {} from "../controllers/comment.js";
// don't write "../controllers/user", this will render `ERR_MODULE_NOT_FOUND`

const router = express.Router();

export default router;

import express from "express";
import {
	addVideo,
	updateVideo,
	deleteVideo,
	addView,
	getByTag,
	getVideo,
	random,
	search,
	sub,
	trend,
} from "../controllers/video.js";
// don't write "../controllers/user", this will render `ERR_MODULE_NOT_FOUND`
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//create a video
router.post("/", verifyToken, addVideo);
router.put("/:id", verifyToken, updateVideo);
router.delete("/:id", verifyToken, deleteVideo);
router.get("/find/:id", getVideo);
router.put("/view/:id", addView);
router.get("/trend", trend);
router.get("/random", random);
router.get("/sub", verifyToken, sub);
router.get("/tags", getByTag);
router.get("/search", search);

export default router;

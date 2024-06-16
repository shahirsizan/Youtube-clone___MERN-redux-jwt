import User from "../models/User.js";
import Video from "../models/Video.js";
import { createError } from "../error.js";

export const addVideo = async (req, res, next) => {
	const newVideo = new Video({ userId: req.user.id, ...req.body });
	try {
		const savedVideo = await newVideo.save();
		res.status(200).json(savedVideo);
	} catch (err) {
		next(err);
	}
};

export const updateVideo = async (req, res, next) => {
	try {
		const video = await Video.findById(req.params.id);
		if (!video) return next(createError(404, "Video not found!"));

		if (req.user.id === video.userId) {
			const updatedVideo = await Video.findByIdAndUpdate(
				req.params.id,
				{
					$set: req.body,
				},
				{ new: true }
			);
			res.status(200).json(updatedVideo);
		} else {
			return next(createError(403, "You can update only your video!"));
		}
	} catch (err) {
		next(err);
	}
};

export const deleteVideo = async (req, res, next) => {
	try {
		const video = await Video.findById(req.params.id);
		if (!video) return next(createError(404, "Video not found!"));

		if (req.user.id === video.userId) {
			await Video.findByIdAndDelete(req.params.id);
			res.status(200).json("The video has been deleted.");
		} else {
			return next(createError(403, "You can delete only your video!"));
		}
	} catch (err) {
		next(err);
	}
};

export const getVideo = async (req, res, next) => {
	try {
		const video = await Video.findById(req.params.id);
		res.status(200).json(video);
	} catch (err) {
		next(err);
	}
};

export const addView = async (req, res, next) => {
	try {
		await Video.findByIdAndUpdate(req.params.id, {
			$inc: { views: 1 },
		});
		res.status(200).json("The view has been increased.");
	} catch (err) {
		next(err);
	}
};

export const random = async (req, res, next) => {
	try {
		const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
		res.status(200).json(videos);
	} catch (err) {
		next(err);
	}
};

export const trend = async (req, res, next) => {
	try {
		const videos = await Video.find().sort({ views: -1 });
		res.status(200).json(videos);
	} catch (err) {
		next(err);
	}
};

export const sub = async (req, res, next) => {
	try {
		const user = await User.findById(req.user.id);
		const subscribedChannels = user.subscribedUsers;
		//user.subscribedUsers is assumed to be an array of IDs representing the channels that the user is subscribed to.
		const list = await Promise.all(
			subscribedChannels.map(async (channelId) => {
				return await Video.find({ userId: channelId });
			})
		);
		//This line creates an array of promises, where each promise fetches the videos for a particular subscribed channel.
		// subscribedChannels.map iterates over each channel ID and returns a promise that resolves to the list of videos
		// for that channel. `Promise.all` waits for all these promises to resolve and returns a list of arrays of videos.
		res.status(200).json(
			list.flat().sort((a, b) => b.createdAt - a.createdAt)
			// list.flat() merges the array of arrays into a single array of videos.
			// .sort((a, b) => b.createdAt - a.createdAt) sorts the videos by their creation date in descending order.
			// res.status(200).json() sends the sorted list of videos back to the client with a 200 OK status.
		);
	} catch (err) {
		next(err);
	}
};

export const getByTag = async (req, res, next) => {
	// console.log(req);
	const tags = req.query.tags.split(",");
	// console.log(tags); //[ 'js', 'py', 'c' ]
	try {
		const videos = await Video.find({ tags: { $in: tags } }).limit(20);
		res.status(200).json(videos);
	} catch (err) {
		next(err);
	}
};

export const search = async (req, res, next) => {
	const query = req.query.q;
	try {
		const videos = await Video.find({
			title: { $regex: query, $options: "i" },
		}).limit(40);
		res.status(200).json(videos);
	} catch (err) {
		next(err);
	}
};

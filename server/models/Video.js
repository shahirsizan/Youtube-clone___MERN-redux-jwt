import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		desc: {
			type: String,
			required: true,
		},
		imgUrl: {
			type: String,
			required: true,
		},
		videoUrl: {
			//we'll be storing the videos in firebase
			type: String,
			required: true,
		},
		views: {
			type: Number,
			default: 0,
		},
		tags: {
			type: [String],
			default: [],
		},
		likes: {
			type: [String],
			default: [],
		},
		dislikes: {
			type: [String],
			default: [],
		},
	},
	{ timestamps: true }
);

export default mongoose.model("Video", VideoSchema);
// give a `singular` name so the collection name in the db will be rendered as `plural`

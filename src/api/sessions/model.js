import mongoose from "mongoose";
import sessionStatics from "./statics";
import { jwt } from "~/config";

const Schema = mongoose.Schema;

/**
 * Session Schema
 * DOC: https://mongoosejs.com/docs/guide.html
 * */
const sessionSchema = Schema(
	{
		jwtid: {
			type: String,
			required: true,
		},
		author: { type: Schema.Types.ObjectId, ref: "User" },
		createdAt: { type: Date, expires: jwt.sign.expiresIn },
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

sessionSchema.plugin(sessionStatics);

export default mongoose.model("Session", sessionSchema);

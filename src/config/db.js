import mongoose from "mongoose";

const connect = (url, options) =>
	new Promise((resolve, reject) => {
		mongoose.connect(
			url,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			},
			(error) => (error ? reject(error) : resolve(mongoose))
		);
	});

export default connect;

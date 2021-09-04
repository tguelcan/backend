import got from "got";

const provider = {
	google: async (access_token) => {
		const response = await got(
			"https://www.googleapis.com/userinfo/v2/me",
			{
				searchParams: { access_token },
			}
		).json();

		return response;
	},
	microsoft: async (access_token) => {
		const response = await got("https://graph.microsoft.com/v1.0/me", {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		}).json();

		return response;
	},
};

export default provider;

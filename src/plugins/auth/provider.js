import got from "got";

const provider = {
	/**
	 * Google graph login provider
	 * */
	google: async (access_token) => {
		const { id, name, email, picture } = await got(
			"https://www.googleapis.com/userinfo/v2/me",
			{
				searchParams: { access_token },
			}
		).json();

		// Todo: Serializate
		return {
			id,
			service: "google",
			displayName: name,
			email,
			picture: picture,
		};
	},
	/**
	 * Microsoft graph login provider
	 * */
	microsoft: async (access_token) => {
		const { id, displayName, mail, userPrincipalName } = await got(
			"https://graph.microsoft.com/v1.0/me",
			{
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			}
		).json();

		// Todo: Serializate
		return {
			id,
			service: "microsoft",
			displayName,
			email: mail || userPrincipalName,
		};
	},
};

export default provider;

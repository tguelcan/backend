import nock from "nock";
import User from "~/api/users/model";
import provider from "~/plugins/auth/provider";

const microsoftUser1 = {
	"@odata.context":
		"https://graph.microsoft.com/v1.0/$metadata#users/$entity",
	displayName: "Tayfun Gülcan",
	surname: "Gülcan",
	givenName: "Tayfun",
	id: "d2037e550e368de4",
	userPrincipalName: "tayfunmobile@googlemail.com",
	businessPhones: [],
	jobTitle: null,
	mail: null,
	mobilePhone: null,
	officeLocation: null,
	preferredLanguage: null,
};

export const createUsers = async (t) => {
	nock("https://graph.microsoft.com/v1.0")
		.get("/me")
		.query(true)
		.reply(200, microsoftUser1);
	const microsoftUser1Response = await provider.microsoft();

	const user1 = await User.createFromService(microsoftUser1Response);
	const token = await t.context.server.jwt.sign({
		_id: user1._id,
		role: user1.role,
	});
	// Bind Users
	t.context.users = {
		user1: {
			token,
			...microsoftUser1Response,
		},
	};
};

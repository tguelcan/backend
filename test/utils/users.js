import nock from "nock";
import User from "~/api/users/model";
import Session from "~/api/sessions/model";
import provider from "~/plugins/auth/provider";
import { jwt } from "~/config";

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
	/**
	 * Nock graph
	 * */
	nock("https://graph.microsoft.com/v1.0")
		.get("/me")
		.query(true)
		.reply(200, microsoftUser1);

	/**
	 * Get mock response
	 * */
	const microsoftUser1Response = await provider.microsoft();

	const jwtid = "123456";
	const user1 = await User.createFromService(microsoftUser1Response);
	const token = await t.context.server.jwt.sign({
		_id: user1._id,
		role: user1.role,
		jwtid,
	});

	/**
	 * Create session and count sessions ststic
	 * */
	await Session.createAndtruncateSessions({
		jwtid,
		author: user1._id,
		maxSessionCount: jwt.maxSessionCount,
	});

	// Bind Users
	t.context.users = {
		user1: {
			userId: user1._id,
			token,
			...microsoftUser1Response,
		},
	};
};

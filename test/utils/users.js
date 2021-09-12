import nock from "nock";
import User from "~/api/users/model";
import Session from "~/api/sessions/model";
import provider from "~/plugins/auth/provider";
import { jwt } from "~/config";

/**
 * Microsoft User
 * */

const createUser1 = async (t) => {
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
	/**
	 * Nock graph microsoft
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
	const microsoftUser = await User.createFromService(microsoftUser1Response);
	const token = await t.context.server.jwt.sign({
		_id: microsoftUser._id,
		role: microsoftUser.role,
		jwtid,
	});

	/**
	 * Create session and count sessions ststic
	 * */
	await Session.createAndtruncateSessions({
		jwtid,
		author: microsoftUser._id,
		maxSessionCount: jwt.maxSessionCount,
	});

	// Bind Users
	return {
		userId: microsoftUser._id,
		token,
		...microsoftUser1Response,
	};
};

/**
 * Google User
 * */

const createUser2 = async (t) => {
	const googleUser1 = {
		id: "105469436411611728872",
		email: "tayfun.guelcan@googlemail.com",
		verified_email: true,
		name: "Tayfun Gülcan",
		given_name: "Tayfun",
		family_name: "Gülcan",
		picture:
			"https://lh3.googleusercontent.com/a-/AOh14Gid9RuVB8Hn-TMZupPXTy1mGaymLG36gsj0zO_N=s96-c",
		locale: "de",
	};

	/**
	 * Nock graph google
	 * */
	nock("https://www.googleapis.com/userinfo/v2")
		.get("/me")
		.query(true)
		.reply(200, googleUser1);

	/**
	 * Get mock response
	 * */
	const googleUser1Response = await provider.google();

	const jwtid = "654321";
	const googleUser = await User.createFromService(googleUser1Response);
	const token = await t.context.server.jwt.sign({
		_id: googleUser._id,
		role: googleUser.role,
		jwtid,
	});

	/**
	 * Create session and count sessions ststic
	 * */
	await Session.createAndtruncateSessions({
		jwtid,
		author: googleUser._id,
		maxSessionCount: jwt.maxSessionCount,
	});

	// Bind Users
	return {
		userId: googleUser._id,
		token,
		...googleUser1Response,
	};
};

export const createUsers = async (t) => {
	t.context.users = {
		user1: await createUser1(t),
		user2: await createUser2(t),
	};
};

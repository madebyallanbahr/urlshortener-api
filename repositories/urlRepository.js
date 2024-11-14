import { createHash } from "node:crypto";

export class urlRepository {
	static urlIdentifier = () => {
		let hash = "";
		const characters =
			"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		const charactersLength = characters.length;
		let counter = 0;
		while (counter <= 9) {
			hash += characters.charAt(Math.floor(Math.random() * charactersLength));
			counter += 1;
		}

		return hash;
	};

	static hashedUserId = (ip) => {
		return createHash("sha256").update(ip).digest("hex");
	};
}

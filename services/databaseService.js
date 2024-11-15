import { LowSync } from "lowdb";
import { JSONFilePreset, JSONFileSync } from "lowdb/node";

export class databaseService {
	constructor() {
		if (databaseService.instance) {
			return databaseService.instance;
		}

		this.init();
		databaseService.instance = this;
	}

	init = async () => {
		this.db = await JSONFilePreset("./db/database.json", { urls: {} });
		this.db.read();
	};

	insertInto = (data) => {
		if (!data || !data.shortUrl) return;

		const payload = this.makePayload(data);

		this.db.data.urls[data.shortUrl] = payload;
		this.db.write();
	};

	makePayload = (data) => {
		if (!data) return null;

		return {
			userId: data.userId,
			fullUrl: data.fullUrl,
		};
	};

	findByUserId = (userId) => {
		if (!userId) return null;

		return Object.entries(this.db.data.urls)
			.filter(([_, value]) => value.userId === userId)
			.map(([shortUrl, value]) => ({ shortUrl, ...value }));
	};
	findByShortUrl = (shortUrl) => {
		if (!shortUrl) return null;

		return this.db.data.urls[shortUrl] || null;
	};
}

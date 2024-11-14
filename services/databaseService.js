import * as adapter from "lowdb/node";

export class databaseService {
	constructor() {
		if (this.instance != null) {
			return this.instance;
		}

		this.init();
	}
	init = () => {
		this.instance = adapter.JSONFileSyncPreset("../db/database.json");
	};

	insertInto = (data) => {
		if (!data) return;

		const payload = this.makePayload(data);
		this.instance.write(payload);
	};

	makePayload = (data) => {
		if (!data) return;

		return (data.userId = {
			shortUrl: data.shortUrl,
			fullUrl: data.fullUrl,
		});
	};
}

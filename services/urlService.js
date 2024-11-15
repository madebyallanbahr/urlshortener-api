import { urlRepository } from "../repositories/urlRepository.js";
import { databaseService } from "./databaseService.js";

const services = { repo: urlRepository, db: new databaseService() };
export class urlService {
	shortUrl = (userId, url) => {
		if (!userId || !url) return;

		const identifier = services.repo.urlIdentifier();
		const user = services.repo.hashedUserId(userId);

		services.db.insertInto({
			shortUrl: identifier,
			fullUrl: url,
			userId: user,
		});

		return {
			shortUrl: identifier,
		};
	};

	retrieveUrl = (urlId) => {
		if (!urlId) return;

		const link = services.db.findByShortUrl(urlId);

		if (!link) return;

		return {
			link: link,
		};
	};
}

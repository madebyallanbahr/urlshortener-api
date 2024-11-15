import * as urlService from "../services/urlService.js";
import * as databaseService from "../services/databaseService.js";

const services = {
	url: new urlService.urlService(),
	db: new databaseService.databaseService(),
};

/**
 * @description Generate a URL Short
 */
export const generateURL = (req, res, next) => {
	const userId = req.socket.remoteAddress ?? null;
	const bodyUrl = req.body.url;

	const url = services.url.shortUrl(userId, bodyUrl);

	return res.json(url);
};

/**
 * @description Redirect to the URL
 */
export const redirectURL = (req, res, next) => {
	const urlId = req.params.urlID;

	const url = services.url.retrieveUrl(urlId);

	if (!url) return res.status(422).json({ error: "Link inválido" });

	const redirectUrl =
		url.link.fullUrl.startsWith("http://") ||
		url.link.fullUrl.startsWith("https://")
			? url.link.fullUrl
			: `http://${url.link.fullUrl}`;

	return res.redirect(redirectUrl);
};

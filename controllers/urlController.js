import * as urlService from "../services/urlService.js";
import * as databaseService from "../services/databaseService.js";

/**
 * @description Generate a URL Short
 */
export const generateURL = (req, res, next) => {
	const userId = req; // IP ? Unique Key?;
	const bodyUrl = req.body.url;

	urlService.shortUrl(userId, bodyUrl);
	return res.json(data);
};

/**
 * @description Redirect to the URL
 */
export const redirectURL = (req, res, next) => {
	const urlId = req.params.urlID;

	urlService.retrieveUrl(urlId);

	return res.redirect(url);
};

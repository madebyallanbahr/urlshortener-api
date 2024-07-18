const crypto = require("crypto");

class Url {
  fullUrl;
  shortUrl;
  userId;
  constructor() {
    this.fullUrl = undefined;
    this.shortUrl = undefined;
    this.userId = undefined;
  }
  generateShortUrl = () => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter <= 7) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    this.shortUrl = result;
  };
  generateUserId = (ip) => {
    const hash = crypto.createHash("sha256");
    hash.update(ip);
    this.userId = hash.digest("hex");
  };
  setFullUrl = (url) => {
    this.fullUrl = url;
  };
  returnData = () => {
    return {
      fullUrl: this.fullUrl,
      shortUrl: this.shortUrl,
      userId: this.userId,
    };
  };
}

module.exports = Url;

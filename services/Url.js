class Url {
  fullUrl;
  shortUrl;
  constructor(fullUrl) {
    this.fullUrl = fullUrl;
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
  returnUrl = () => {
    return {
      fullUrl: this.fullUrl,
      shortUrl: this.shortUrl,
    };
  };
}

module.exports = Url;

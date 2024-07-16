class Url {
  fullUrl;
  shortUrl;
  constructor() {
    this.fullUrl = undefined;
    this.shortUrl = undefined;
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
  setFullUrl = (url) => {
    this.fullUrl = url;
  }
  returnUrl = () => {
    return {
      fullUrl: this.fullUrl,
      shortUrl: this.shortUrl,
    };
  };
}

module.exports = Url;

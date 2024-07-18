const db = require("file-system-db");
class Database {
  __path;
  __pool;
  __backup;
  constructor(path) {
    this.__path = path;
    this.__pool = null;
  }
  init = () => {
    this.__pool = new db.FSDB(this.__path);
  };
  insert = (url) => {
    let data = {
      fullUrl: url.fullUrl,
      shortUrl: url.shortUrl,
    };
    if (!this.__pool.has("urls")) {
      this.__pool.set("urls", []);
    }
    this.__pool.push("urls", {
      fullUrl: data.fullUrl,
      shortUrl: data.shortUrl,
    });
  };

  ifExistsReturn = (short) => {
    let urls = this.__pool.get("urls");
    if (urls) {
      for (let url of urls) {
        if (url.shortUrl === short) {
          return url.fullUrl;
        }
      }
    }
    return false;
  };
}

module.exports = Database;

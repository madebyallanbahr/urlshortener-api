const db = require("file-system-db");
const fs = require("fs");
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

    this.__pool.set(data.shortUrl, data.fullUrl);
  };

  ifExistsReturn = (id) => {
    if (this.__pool.has(id)) {
      return this.__pool.get(id);
    } else {
      return false;
    }
  };
}

module.exports = Database;

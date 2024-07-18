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
      userId: url.userId,
    };
    if (!this.hasUser(data.userId)) {
      this.__pool.set(data.userId, []);
    }
    this.__pool.push(data.userId, { short: data.shortUrl, full: data.fullUrl });
  };

  ifExistsReturn = async (id) => {
    let result = await this.__pool.getAll().find((value) => {
      return value.value.some((url) => url.short === id);
    });

    if (result) {
      let url = result.value.find((url) => url.short === id);
      return url.full;
    } else {
      return null;
    }
  };
  hasUser = (id) => {
    if (this.__pool.has(id)) {
      return true;
    } else {
      return false;
    }
  };
}

module.exports = Database;

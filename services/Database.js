const db = require("file-system-db");

class Database {
  __path;
  __pool;
  __backup;
  constructor(path, backup) {
    this.__path = path;
    this.__pool = null;
    this.__backup = backup;
  }
  init = () => {
    this.__pool = new db.FSDB(this.__path, false);
  };
  insert = (url) => {
    let data = {
      fullUrl: url.fullUrl,
      shortUrl: url.shortUrl,
    };

    this.__pool.set(data.shortUrl, data.fullUrl);
  };
  all = () => {
    return this.__pool.getAll();
  };

  ifExistsReturn = (id) => {
    if (this.__pool.has(id)) {
      return this.__pool.get(id);
    } else {
      return false;
    }
  };

  backup = () => {
    this.__pool.backup(this.__backup);
  };
}

module.exports = Database;

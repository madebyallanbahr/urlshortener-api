const db = require('file-system-db');
const pathSolver = require('node:path');

class Database {
    __path
    __pool
    __backup
    constructor(path, backup){
        this.__path = pathSolver.resolve(__dirname + path);
        this.__pool = null;
        this.__backup = pathSolver.resolve(__dirname + backup); 
    }
    init = () => {
        this.__pool = new db.FSDB(this.__path);
    }
    backup = () => {
        this.__pool.backup(this.__backup);
    }   
} 
const mysql = require("mysql");
const { promisify } = require("util");

const Print = require("../../view/print");
const print = new Print();

module.exports = class DB {
    constructor(
        host = "localhost",
        port = 3306,
        user = "root",
        password = "",
        database = ""
    ) {
        this.conn = mysql.createConnection({
            host,
            port,
            user,
            password,
            database,
        });
    }

    connect() {
        if (!this.conn) {
            this.conn.connect((err) => (err ? print.err(err) : this.conn));
        }
    }

    async query(q) {
        return (await promisify(this.conn.query).bind(this.conn))(q);
    }

    async query(q, ...args) {
        return (await promisify(this.conn.query).bind(this.conn))(q, ...args);
    }

    close() {
        this.conn.end();
    }
};

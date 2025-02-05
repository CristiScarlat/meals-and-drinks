const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbFile = path.join(process.cwd(), "iRadio.db");
// Connecting to or creating a new SQLite database file
const db = new sqlite3.Database(
    dbFile,
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Connected to the SQlite database.");
    }
);

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS stations
            (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                changeuuid TEXT NOT NULL,
                stationuuid TEXT NOT NULL,
                serveruuid TEXT NOT NULL,
                name VARCHAR(20) NOT NULL,
                url VARCHAR(100) NOT NULL,
                url_resolved VARCHAR(100) NOT NULL,
                homepage VARCHAR(100) NOT NULL,
                favicon VARCHAR(100) NOT NULL,
                tags VARCHAR(500) NOT NULL,
                country VARCHAR(100) NOT NULL,
                countrycode VARCHAR(2) NOT NULL,
                iso_3166_2 NULL,
                state VARCHAR(10) NOT NULL,
                language VARCHAR(20) NOT NULL,
                languagecodes VARCHAR(20) NOT NULL,
                votes NUMBER NOT NULL,
                lastchangetime VARCHAR(20) NOT NULL,
                lastchangetime_iso8601 VARCHAR(20) NOT NULL,
                codec VARCHAR(4) NOT NULL,
                bitrate NUMBER NOT NULL,
                hls NUMBER NOT NULL,
                lastcheckok NUMBER NOT NULL,
                lastchecktime VARCHAR(20) NOT NULL,
                lastchecktime_iso8601 VARCHAR(20) NOT NULL,
                lastcheckoktime VARCHAR(20) NOT NULL,
                lastcheckoktime_iso8601 VARCHAR(20) NOT NULL,
                lastlocalchecktime VARCHAR(20) NOT NULL,
                lastlocalchecktime_iso8601 VARCHAR(20) NOT NULL,
                clicktimestamp VARCHAR(20) NOT NULL,
                clicktimestamp_iso8601 VARCHAR(20) NOT NULL,
                clickcount NUMBER NOT NULL,
                clicktrend NUMBER NOT NULL,
                ssl_error NUMBER NOT NULL,
                geo_lat NUMBER NOT NULL,
                geo_long NUMBER NOT NULL,
                geo_distance NULL,
                has_extended_info BOOLEAN NOT NULL
            )`, (err) => {
        if (err) {
            console.log(err)
            return
        }
        console.log("Table created successfully.");
    });

});
db.close();
const sqlite3 = require("sqlite3").verbose();
const stations = require('./stations');
const path = require('path');


const addStations = async () => {
    const dbFile = path.join(process.cwd(), "iRadio.db");
    // If the database instance is not initialized, open the database connection
    const db = new sqlite3.Database(dbFile);
    if (db) {
        // Perform a database query to retrieve all items from the "items" table
        const res = await Promise.allSettled(stations.map(station => {
            return new Promise((resolve, reject) => {
                db.exec (`INSERT INTO stations (${Object.keys(station).join()})
                VALUES (${Object.values(station).map(val => `"${val}"`)});`, (err, row) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(row);
                })
            })
        }))

        db.close();
        return res;
    }
}

addStations()
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err);
    })


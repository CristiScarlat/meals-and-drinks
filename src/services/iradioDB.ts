import sqlite3 from "sqlite3";
import path from 'path';


export const getIRadioStations = async (limit: number, offset: number)  => {
    const dbFile: string = path.join(process.cwd(), "iRadio.db");
    // If the database instance is not initialized, open the database connection
    const db = new sqlite3.Database(dbFile);
    if (db) {
        // Perform a database query to retrieve all items from the "items" table
        const stations = await new Promise((resolve, reject) => {
            db.all(`SELECT * FROM stations LIMIT ${limit} OFFSET ${offset};`, (err: Error, row: unknown) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                return resolve(row);
            })
        })
        db.close();
        return stations;
    }
}
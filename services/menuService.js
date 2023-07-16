const mysql = require("mysql2");
require("dotenv").config();
let instance = null;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("db has been connected");
});

class MenuService {
  static instance() {
    return instance ? instance : new MenuService();
  }

  async list(nameLike) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "SELECT * FROM menu_item WHERE name LIKE ? AND delete_dt IS NULL";
        db.query(query, [nameLike ? `%${nameLike}%` : "%"], (err, result) => {
          if (err) {
            reject(new Error(err.message));
          }
          resolve(result);
        });
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async get(id) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `SELECT * FROM menu_item WHERE id = ?`;
        db.query(query, [id], (err, result) => {
          if (err) {
            reject(new Error(err.message));
          }
          resolve(result);
        });
      });
      console.log(response);
      return response.length > 0 ? response[0] : {};
    } catch (error) {
      console.error(error);
    }
  }

  async add(menuItem) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `INSERT INTO menu_item (
                name, 
                price, 
                description, 
                image
              ) VALUES (?,?,?,?)`;
        db.query(
          query,
          [menuItem.name, menuItem.price, menuItem.description, menuItem.image],
          (err, result) => {
            if (err) reject(new Error(err.message));

            resolve(result);
          }
        );
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async update(menuItem) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `UPDATE menu_item SET
                name = ?, 
                price = ?, 
                description = ?, 
                image = ?
                WHERE id = ?`;
        db.query(
          query,
          [
            menuItem.name,
            menuItem.price,
            menuItem.description,
            menuItem.image,
            menuItem.id,
          ],
          (err, result) => {
            if (err) reject(new Error(err.message));
            resolve(result);
          }
        );
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id) {
    try {
      id = parseInt(id, 10);
      const response = await new Promise((resolve, reject) => {
        const query = "UPDATE menu_item SET delete_dt = now() WHERE id = ?";

        db.query(query, [id], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result.affectedRows);
        });
      });

      return response === 1 ? true : false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

module.exports = MenuService;

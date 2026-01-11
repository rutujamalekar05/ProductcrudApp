const db = require("../../db.js");

const Category = {};
Category.add = (name, callback) => {
    const sql = "INSERT INTO categories (name) VALUES (?)";
    db.query(sql, [name], callback);
};

Category.findByName = (name, callback) => {
    const sql = "SELECT * FROM categories WHERE name = ?";
    db.query(sql, [name], callback);
};
Category.getAllCategories = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM categories", (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

Category.getCategoriesWithLimit = (limit, offset) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM categories ORDER BY id ASC LIMIT ? OFFSET ?";
        db.query(sql, [limit, offset], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};


Category.getCount = (callback) => {
    const sql = "SELECT COUNT(*) AS count FROM categories";
    db.query(sql, (err, result) => {
        if (err) return callback(err);
        callback(null, result[0].count);
    });
};


Category.getById = (id, callback) => {
    const sql = "SELECT * FROM categories WHERE id = ?";
    db.query(sql, [id], callback);
};


Category.updateNameById = (id, name, callback) => {
    const sql = "UPDATE categories SET name = ? WHERE id = ?";
    db.query(sql, [name, id], callback);
};


Category.delete = (id, callback) => {
    const sql = "DELETE FROM categories WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Database error deleting category:", err);
        }
        callback(err, result);
    });
};


module.exports = Category;

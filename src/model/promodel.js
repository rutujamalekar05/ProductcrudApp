const db = require("../../db.js");
exports.getCategories = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM categories", (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

exports.saveProduct = (name, id, price, quantity) => {
    return new Promise((resolve, reject) => {
        const sql = `
            INSERT INTO product (name, id, price, quantity) 
            VALUES (?, ?, ?, ?)
        `;
        db.query(sql, [name, id, price, quantity], (err, result) => {
            if (err) reject(err);
            else resolve("Product added successfully!");
        });
    });
};

exports.getCount = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT COUNT(*) AS count FROM product";
        db.query(sql, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

exports.getProductsWithCategoryLimit = (limit = 10, offset = 0) => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT p.pid, p.name, p.price, p.quantity,
                   c.id AS category_id, c.name AS category_name
            FROM product p
            LEFT JOIN categories c ON p.id = c.id
            ORDER BY p.pid ASC
            LIMIT ? OFFSET ?
        `;
        db.query(sql, [limit, offset], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

exports.getallproduct=()=>
{
    return new Promise((resolve,reject)=>
    {
        db.query("select *from product",(err,result)=>
        {
            if(err)
            {
                reject(err);
            }
            else{
                resolve(result);
            }
        });
    });
}
exports.delproduct = (pid) => {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM product WHERE pid = ?";
        db.query(sql, [pid], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

exports.getProductById = (pid) => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT p.pid, p.name, p.price, p.quantity,
                   p.id,
                   c.name AS category_name
            FROM product p
            LEFT JOIN categories c ON p.id = c.id
            WHERE p.pid = ?
        `;
        db.query(sql, [pid], (err, result) => {
            if (err) return reject(err);
            resolve(result[0]); 
        });
    });
};

exports.updateProduct = (pid, name, price, quantity,id) => {
    return new Promise((resolve, reject) => {
        const sql = `
            UPDATE product 
            SET name=?, price=?, quantity=?, id=?
            WHERE pid=?
        `;
        db.query(sql, [name, price, quantity, id, pid], (err) => {
            if (err) reject(err);
            else resolve(true);
        });
    });
};

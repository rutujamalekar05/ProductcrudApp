const Product = require("../model/promodel.js");
const Category = require("../model/categorymodel");


exports.showAddForm = async (req, res) => {
    const categories = await Product.getCategories();
    res.render("add.ejs", { categories, msg: null });
};

exports.saveProduct = async (req, res) => {
    const { name, category, price, quantity } = req.body;
    const categories = await Product.getCategories();
    if (!name || name.trim().length < 3) {
        return res.render("add.ejs", {
            categories,
            msg: "Product name must be at least 3 characters"
        });
    }

    if (!category) {
        return res.render("add.ejs", {
            categories,
            msg: "Please select a category"
        });
    }

    if (!price || isNaN(price) || Number(price) <= 0) {
        return res.render("add.ejs", {
            categories,
            msg: "Price must be greater than 0"
        });
    }

    if (!quantity || isNaN(quantity) || Number(quantity) <= 0) {
        return res.render("add.ejs", {
            categories,
            msg: "Quantity must be greater than 0"
        });
    }
    try {
        const result = await Product.saveProduct(
            name.trim(),
            category,
            price,
            quantity
        );

        res.render("add.ejs", {
            categories,
            msg: result
        });

    } catch (err) {
        res.render("add.ejs", {
            categories,
            msg: "Error saving product"
        });
    }
};

exports.listProducts = async (req, res) => {
    try {
        let page = parseInt(req.query.page) || 1;
        let limit = 10;
        let offset = (page - 1) * limit;

        const totalCountResult = await Product.getCount(); // new method needed in model
        const totalCount = totalCountResult[0].count;
        const totalPages = Math.ceil(totalCount / limit);
        const products = await Product.getProductsWithCategoryLimit(limit, offset); // new method

        res.render("viewProd.ejs", { products, page, totalPages });
    } catch (err) {
        res.send("Error: " + err);
    }
};


exports.homePage = (req, res) => {
    res.render("home.ejs");
}
exports.newProduct = (req, res) => {
    res.render("add.ejs", { msg: " " });
}
exports.delProduct = async (req, res) => {
    try {
        const pid = parseInt(req.params.id);
        console.log("Deleting product with ID:", pid);

        if (isNaN(pid)) return res.send("Invalid product ID");

        await Product.delproduct(pid);


        res.redirect("/viewproduct");
    } catch (err) {
        console.error(err);
        res.send("Error deleting product: " + err);
    }
};


exports.showEditForm = async (req, res) => {
    try {
        const pid = req.params.id;
        const product = await Product.getProductById(pid);

        if (!product) {
            return res.send("Product not found");
        }
        const categories = await Category.getAllCategories();
        res.render("updateProduct.ejs", {
            product,
            categories
        });

    } catch (err) {
        console.error("Error in showEditForm:", err);
        res.send("Error loading edit form");
    }
};


exports.updateProduct = async (req, res) => {
    const pid = req.params.id;
    const { name, price, quantity, id } = req.body;

    try {
        await Product.updateProduct(
            pid,
            name,
            price,
            quantity,
            id
        );
        res.redirect("/viewproduct");
    } catch (err) {
        console.error(err);
        res.send("Update failed");
    }
};

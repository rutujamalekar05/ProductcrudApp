const Category = require("../model/categorymodel.js");
exports.addCategoryPage = (req, res) => {
    res.render("addcategory.ejs");
};

exports.saveCategory = (req, res) => {
    let { name } = req.body;
    name = name ? name.trim() : "";
    if (name === "") {
        return res.render("addcategory.ejs", {
            msg: "Category name cannot be empty"
        });
    }
    if (name.length < 3) {
        return res.render("addcategory.ejs", {
            msg: "Category name must be at least 3 characters long"
        });
    }


    const pattern = /^[A-Za-z ]+$/;
    if (!pattern.test(name)) {
        return res.render("addcategory.ejs", {
            msg: "Category name should contain only alphabets"
        });
    }

    Category.findByName(name, (err, existing) => {
        if (err) {
            console.error("Error checking category:", err);
            return res.render("addcategory.ejs", {
                msg: "Something went wrong"
            });
        }

        if (existing.length > 0) {
            return res.render("addcategory.ejs", {
                msg: "Category already exists"
            });
        }


        Category.add(name, (err) => {
            if (err) {
                console.error("Error saving category:", err);
                return res.render("addcategory.ejs", {
                    msg: "Category not added"
                });
            }

            res.render("addcategory.ejs", {
                msg: "Category added successfully"
            });
        });
    });
};




exports.listCategories = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const offset = (page - 1) * limit;


        Category.getCount((err, totalCount) => {
            if (err) return res.send("Error fetching count: " + err);

            const totalPages = Math.ceil(totalCount / limit);

            Category.getCategoriesWithLimit(limit, offset)
                .then(categories => {
                    res.render("viewcategory.ejs", {
                        categories,
                        page,
                        totalPages
                    });
                })
                .catch(err => res.send("Error fetching categories: " + err));
        });
    } catch (err) {
        res.send("Unexpected error: " + err);
    }
};

exports.editCategoryPage = (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.redirect("/viewcategory");
    }

    Category.getById(id, (err, result) => {
        if (err) {
            return res.redirect("/viewcategory");
        }

        if (result.length === 0) {
            return res.redirect("/viewcategory");
        }
        res.render("updatecategory.ejs", {
            category: result[0]
        });
    });
};

exports.updateCategory = (req, res) => {
    const id = parseInt(req.params.id);
    const name = req.body.name;

    if (isNaN(id)) {
        console.error("Invalid ID on update:", req.params.id);
        return res.redirect("/viewcategory");
    }

    Category.updateNameById(id, name, (err) => {
        if (err) {
            console.error("Error updating category:", err);
            return res.send("Update failed");
        }

        console.log("Category updated:", id, name);
        res.redirect("/viewcategory");
    });
};


exports.deleteCategory = (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        console.error("Invalid category ID:", req.params.id);
        return res.status(400).send("Invalid category ID");
    }

    Category.delete(id, (err) => {
        if (err) {
            return res.send("Error deleting category");
        }
        res.redirect("/viewCategory");
    });
};

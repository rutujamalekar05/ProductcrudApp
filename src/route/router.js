const express = require("express");
const proctrl = require("../controller/Procontroller.js");
const router = express.Router();
router.get("/", proctrl.homePage);

 //Add Product
router.get("/newProduct", proctrl.showAddForm);   
router.post("/addProduct", proctrl.saveProduct);  

 //View Products (with pagination) 
router.get("/viewproduct", proctrl.listProducts);

// Delete Product (ID required) 
router.get("/delete/:id", proctrl.delProduct);

// Update Product 
router.get("/edit/:id", proctrl.showEditForm);      
router.post("/update/:id", proctrl.updateProduct); 

module.exports = router;

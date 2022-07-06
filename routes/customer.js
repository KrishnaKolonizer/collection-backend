const express = require('express');
const router = express.Router();
const document = require('../middleware/document');
const customer = require("../controllers/customerController");
const {isSignedIn,getLogedInUser,isAdmin,isAccessable,hasPermissionCreate,hasPermissionRead,hasPermissionUpdate,hasPermissionDelete} = require('../middleware/auth');
const upload = require('../middleware/upload');
const { createCustomerValidation} = require('../validator/customerValidator');
const { validate } = require('../validator/validate');

    router.param("customerId", customer.getCustomer);

    router.post("/customer",isSignedIn,getLogedInUser,upload.single('profile_image'),customer.create);

    router.post("/customer_docs",document.single('documents'),customer.docs);

    router.get("/customer/:customerId",isSignedIn,getLogedInUser,isAccessable,hasPermissionRead,customer.findById);

    router.get("/customer",isSignedIn,getLogedInUser,customer.findAll);

    router.delete("/customer/:customerId",isSignedIn,getLogedInUser,isAccessable,hasPermissionDelete,customer.delete);

module.exports = router
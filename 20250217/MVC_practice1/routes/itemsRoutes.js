const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/itemsController");

router.get("/", itemsController.getItems);
router.get("/itemMaxPrice", itemsController.getMaxPrice);
router.get("/:id", itemsController.getItem);

module.exports = router;

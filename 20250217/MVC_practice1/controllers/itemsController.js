const itemsModel = require("../models/itemsModel");

const getItems = (req, res) => {
  const items = itemsModel.allItems();
  res.render("itemsDisplayFolder/itemsDisplay", { items });
};

const getItem = (req, res) => {
  const item = itemsModel.itemsById(req.params.id);
  if (item) {
    res.render("itemsDisplayFolder/itemsList", { item });
  } else {
    res.status(404).send("해당하는 유저가 없습니다");
  }
};

const getMaxPrice = (req, res) => {
  const items = itemsModel.allItems();
  const maxPrice = itemsModel.maxPriceItem(items);
  if (maxPrice) {
    res.render("itemsDisplayFolder/itemMaxPrice", { maxPrice });
  } else {
    res.status(404).send("No items found");
  }
};

module.exports = { getItems, getItem, getMaxPrice };

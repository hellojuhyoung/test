const items = [
  {
    id: 1,
    name: "휴지",
    price: 45000,
  },
  {
    id: 2,
    name: "주방기구",
    price: 66000,
  },
  {
    id: 3,
    name: "세척기",
    price: 665000,
  },
  {
    id: 4,
    name: "자전거",
    price: 124000,
  },
  {
    id: 5,
    name: "세탁기",
    price: 66000,
  },
];

//전체 리스트 가져오기
const allItems = () => {
  return items;
};

//특정 아이디 가져오기
const itemsById = (id) => {
  return items.find((item) => item.id === parseInt(id));
};

//가장 비싼 물건 가져오기
// let maxPrice = items.reduce((max, min) => {
//   return max.price > min.price ? max : min;
// });

// const maxPriceItem = (price) => {
//   return items.reduce((max, min) => (max.price > min.price ? max : min));
// };

const maxPriceItem = (items) => {
  return items.reduce((max, current) =>
    max.price > current.price ? max : current
  );
};

module.exports = { allItems, itemsById, maxPriceItem };

const clg = console.log;
const basket = [
  { id: 3, price: 199, qty: 1 },
  { id: 6, price: 199, qty: 1 },
];
function qtyToArray(max, qty) {
  const qtyI = Array(max).fill(0);
  for (let index = 0; index < qty; index++) {
    qtyI.unshift(1);
    qtyI.pop();
  }
  return qtyI;
}
// console.log(qtyToArray(4, 3))

function findMaxQty(c) {
  const arrMax = c.map((x) => x.qty);
  let arr = [...arrMax];
  return Math.max(...arr);
}

const newBasket = basket.map((item) => {
  const qty = item.qty;
  const qtyI = qtyToArray(findMaxQty(basket), qty);
  return { ...item, qtyI: qtyI };
});

console.log("NewBasket", newBasket);

function operations(newBasket) {
  const arr = [];
  for (let index = 0; index < newBasket.length; index++) {
    arr.push(newBasket[index].qtyI);
  }
  return arr;
}

clg("ope", operations(newBasket));

const totalV = operations(newBasket).reduce(function (array1, array2) {
  return array1.map(function (value, index) {
    return value + array2[index];
  });
});

clg("totalV", totalV);
//350 500 620 => 175 , 166.666 , 155
function calcOffers(arr) {
  const itemsDiscountArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 4) {
      itemsDiscountArr.push(4 * 155);
    } else if (arr[i] === 3) {
      itemsDiscountArr.push(Math.round(3 * 166.666));
    } else if (arr[i] === 2) {
      itemsDiscountArr.push(2 * 175);
    } else {
      itemsDiscountArr.push(1 * 199);
    }
  }
  return itemsDiscountArr;
}
clg("calcArray", calcOffers(totalV));

function totalPriceBeforeVat(arr) {
  return arr.reduce((a, c) => a + c);
}
clg("totalWithoutVat", totalPriceBeforeVat(calcOffers(totalV)));
let totalNoVat = totalPriceBeforeVat(calcOffers(totalV));

function totalPriceAfterVat(totalNoVat) {
  return (totalNoVat * 15) / 100 + totalNoVat;
}

let toPRVAT = totalPriceAfterVat(totalNoVat);
clg("totalWitVat", toPRVAT);

function calcTotalBeforeOffer(newBasket) {
  const beforeOffetArray = newBasket.map((x) => x.price * x.qty);
  return beforeOffetArray;
}

let arr1 = calcTotalBeforeOffer(newBasket);
// 0 + 1 + 2 + 3 + 4
const initialValue = 0;
const sumWithInitial = arr1.reduce(
  (previousValue, currentValue) => previousValue + currentValue,
  initialValue
);
clg("before with Vat", (sumWithInitial * 15) / 100 + sumWithInitial);
clg(
  `you saved ${Math.round(
    (sumWithInitial * 15) / 100 + sumWithInitial - toPRVAT
  )}  `
);

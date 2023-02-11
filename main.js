// https://www.cbr-xml-daily.ru/daily_json.js
// обьект с курсом 3-х валют
const rates = {};
const elemetUSD = document.querySelector('[data-value="USD"]');
const elemetEUR = document.querySelector('[data-value="EUR"]');
const elemetGBP = document.querySelector('[data-value="GBP"]');
// Элементы формы ( ввод суммы, выбор валюты, поле с результатом)
const input = document.querySelector("#input");
const result = document.querySelector("#result");
const select = document.querySelector("#select");

// вызов функция для запроса данных
getCurrencies();
// setInterval(getCurrencies, 10000);

async function getCurrencies() {
  const response = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");

  const data = await response.json();

  // результат данных
  const result = await data;

  // добавление курса валют в обьект
  rates.USD = result.Valute.USD;
  rates.EUR = result.Valute.EUR;
  rates.GBP = result.Valute.GBP;

  // добавления в розметку html курс валюты
  elemetUSD.textContent = rates.USD.Value.toFixed(2);
  elemetEUR.textContent = rates.EUR.Value.toFixed(2);
  elemetGBP.textContent = rates.GBP.Value.toFixed(2);

  // окрашевание отображения курса
  rates.USD.Value > rates.USD.Previous
    ? elemetUSD.classList.add("top")
    : elemetUSD.classList.add("bottom");
  rates.EUR.Value > rates.EUR.Previous
    ? elemetEUR.classList.add("top")
    : elemetEUR.classList.add("bottom");
  rates.GBP.Value > rates.GBP.Previous
    ? elemetGBP.classList.add("top")
    : elemetGBP.classList.add("bottom");
}
// слушаем изменения в текстовом поле и в селект
input.oninput = convertValue;
select.oninput = convertValue;
//функция конвертации
function convertValue() {
  result.value = (parseFloat(input.value) / rates[select.value].Value).toFixed(
    2
  );
}

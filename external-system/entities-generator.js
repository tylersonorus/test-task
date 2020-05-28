const {
  getNewEntity,
  genParamsValues,
  getEntitesOrder,
} = require('./entities');
const axios = require('axios').default;

//массив id сущностей в порядке их отправки
let idOrder = [];

//согласно ТЗ сущности посылаются на сервер по одной каждые 0.1 секунду в разном порядке.
//После того как все 10 сущностей отправлены процесс начинается снова
function InfiniteEntityPosting() {
  //если в массиве есть элементы берем по одному и создаем сущность с id равным значению
  //в последнем элементе массива
  if (idOrder.length > 0) {
    let curId = idOrder.pop();
    //предположим, что наш сервер находится по адресу http://localhost:1234
    axios
      .post('http://localhost:1234/api/entity', getNewEntity(curId))
      .catch((err) => console.log(err.message));
    setTimeout(() => {
      InfiniteEntityPosting();
    }, 100); //отправляем каждый 0.1 секунду
    //если массив исчерпался, начинаем заново
  } else {
    idOrder = [...Array(20).keys()];
    //изменили порядок случайным образом
    getEntitesOrder(idOrder, 10);
    InfiniteEntityPosting();
  }
  //
}

InfiniteEntityPosting();


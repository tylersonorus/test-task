function getNewEntity(id) {
  const entity = { id };
  for (let i = 0; i < 20; i++) {
    entity[`param${i}`] = 0;
  }
  genParamsValues(entity);
  return entity;
}

function genParamsValues(entity) {
  //генерируем значения от -1 до 1
  for (const key in entity) {
    if (entity.hasOwnProperty(key) && key.includes('param')) {
      entity[key] = (Math.random() - 0.5) * 2;
    }
  }
}
//примитивная функция перемешивания значений в массиве
//mixCount - число перемешиваний
function getEntitesOrder(idArray, mixCount) {
  while (mixCount > 0) {
    mixCount--;
    let firstEl = Math.floor(Math.random() * idArray.length );
    let secondEl = Math.floor(Math.random() * idArray.length );
    if (firstEl !== secondEl) {
      [idArray[secondEl], idArray[firstEl]] = [
        idArray[firstEl],
        idArray[secondEl],
      ];
    } else {
      getEntitesOrder(idArray, 1);
    }
  }
}

module.exports = {
  genParamsValues,
  getNewEntity,
  getEntitesOrder,
};

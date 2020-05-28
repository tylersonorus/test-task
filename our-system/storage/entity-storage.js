class EntityStorage {
  entities = [];

  constructor() {}
  //если сущности нет, то вернется undefined
  getEntity(id) {
    return this.entities[id];
  }

  //отдаем все сущности в массиве, если сущность отсутствует в этом элементе вернется null
  //такой подход вполне оправдан, когда количество сущностей заранее ограничено
  getAllEntities() {
    return this.entities;
  }

  //записываем сущность в элемент массива согласно ее id,
  //таким образом мы легко сможем ее извлечь не перебирая массив (O(1))
  //что ускоряет работу сервера
  setEntity(entity) {
    this.entities[entity.id] = entity;
  }
}
//создаем синглетон, который будем шарить через require
module.exports = new EntityStorage();

const router = require('express').Router();
const entityStorage = require('../storage/entity-storage');

//cлушаем приходящие сущности
router.post('/entity', (req, res) => {
  entityStorage.setEntity(req.body);
  console.log(req.body)
  res.sendStatus(200);
});

//получить сущность с определенным id
router.get('/entity/:id', (req, res) => {
  let entityId = req.params.id;
  let entity = entityStorage.getEntity(entityId);
  if (entity) {
    res.status(200).json(entity);
  } else {
    res.status(400).send({ message: 'Сущность с заданным id не найдена' });
  }
});

//получить все сущности разом
router.get('/entity', (req, res) => {
  const entities = entityStorage.getAllEntities();
  res.status(200).json(entities);
});

module.exports = router;

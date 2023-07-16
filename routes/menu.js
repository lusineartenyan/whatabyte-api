const express = require('express');
const router = express.Router();
const menuService = require('../services/menuService').instance();

/* GET menu items */
router.get('/', async function(req, res, next) {
  const result = await menuService.list(req.query.nameLike);

  res.json(result)
});

router.post('/', async function(req, res, next) {
  const result = await menuService.add(req.body);
  req.body.id = result.insertId

  res.json(req.body)
});

router.get('/:id', async function(req, res, next) {
  const { id } = req.params;
  const result = await menuService.get(id);

  res.json(result)
});

router.put('/:id', async function(req, res, next) {
  const { id } = req.params;
  req.body.id = id
  const result = await menuService.update(req.body);

  res.json(req.body)
});

router.delete('/:id',function(req, res, next) {
  const { id } = req.params;
  const result = menuService.delete(id);
  
  result
  .then(data => res.json({success : data}))
  .catch(err => console.log(err));
});

module.exports = router;
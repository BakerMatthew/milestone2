var express = require('express');
var router = express.Router();

var entries = [
  {info:"My First Entry", body: "Hello World! This is my first entry!", created_at: "some date"},
  {info:"Learning JS", body: "Sometimes linking pages together is difficult...", created_at: "some date"}
];

/* READ all: GET til listing. */
router.get('/', function(req, res, next) {
  res.render('til/index', { title: 'Today I Learned', entries: entries });
});

/* CREATE entry form: GET /til/new */
router.get('/new', function(req, res, next) {
  res.render('til/new', {title: "Create A New entry"});
});

/*CREATE entry: POST /til/ */
router.post('/', function(req, res, next) {
  entries.push(req.body);
  res.render('til/index', { title: 'Today I Learned', entries: entries });
});

/* UPDATE entry form: GET /til/1/edit */
router.get('/:id/edit', function(req, res, next) {
  res.render('til/update',
  {
    title: 'Update an entry',
    id: req.params.id,
    entry: entries[req.params.id]
  });
});

/* UPDATE entry: POST /til/1 */
router.post('/:id', function(req, res, next) {
  entries[req.params.id] = req.body;
  res.render('til/index',
  {
    title: 'Update an entry',
    entries: entries
  });
});

/* UPDATE entry form: GET /til/1/entry */
router.get('/:id/entry', function(req, res, next) {
  res.render('til/entry',
  {
    title: 'View an entry',
    id: req.params.id,
    entry: entries[req.params.id]
  });
});

/* UPDATE entry: POST /til/1 */
router.post('/:id', function(req, res, next) {
  entries[req.params.id] = req.body;
  res.render('til/index',
  {
    title: 'View an entry',
    entries: entries
  });
});

/* DELETE entry: GET /til/1/delete  */
router.get('/:id/delete', function(req, res, next) {
  var id = req.params.id
  entries = entries.slice(0,id).concat(entries.slice(id+1, entries.length));
  res.render('til/index', { title: 'Today I Learned', entries: entries });
});

/* GET til listing. */
router.get('/:id', function(req, res, next) {
  res.render('til/index', { title: 'An entry' , entry: entries[req.params.id]});
});

module.exports = router;

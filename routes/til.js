var express = require('express');
var router = express.Router();

//Stores users til entries
var entries = [
  {info:"My First Entry", body: "Hello World! This is my first entry!", created_at: "March 1, 2016"},
  {info:"Learning JS", body: "Sometimes linking pages together is difficult... But I got it down!", created_at: "March 4, 2016"}
];

/* READ all: GET til listing. */
//Sets up initial page
router.get('/', function(req, res, next) {
  res.render('til/index', { title: 'Today I Learned', entries: entries });
});


/* CREATE entry: /til/# */
//Shows a single entry
router.get('/:id', function(req, res, next) {
  res.render('til/entry', { title: 'View An Entry', entry: entries[req.params.id]});
});

/* CREATE new entry form: GET /til/new */
//Sets up new entry page
router.get('/new', function(req, res, next) {
  res.render('til/new', {title: "Create A New entry"});
});

/*CREATE new entry: POST /til/ */
//Shows the new entry page
router.post('/', function(req, res, next) {
  entries.push(req.body);
  res.render('til/index', { title: 'Today I Learned', entries: entries });
});

/* UPDATE edit entry form: GET /til/1/edit */
//Sets up edit page
router.get('/:id/edit', function(req, res, next) {
  res.render('til/update',
  {
    title: 'Update an entry',
    id: req.params.id,
    entry: entries[req.params.id]
  });
});

/* UPDATE edit entry: POST /til/1 */
//Shows the edit entry page
router.post('/:id', function(req, res, next) {
  entries[req.params.id] = req.body;
  res.render('til/index',
  {
    title: 'Update an entry',
    entries: entries
  });
});

/* DELETE delete entry: GET /til/1/delete  */
//Deletes an entry
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

var express = require('express');
var router = express.Router();

//Stores users til entries
var entries = [];

/* READ all: GET til listing. */
//Sets up initial page
router.get('/', function(req, res, next) {
  var name = req.cookies.username || 'anonymous';
  req.db.driver.execQuery(
    "SELECT * FROM entries_til;",
    function(err, data) {
      if(err)
      {
        console.log(err);
      }
      res.render('til/index', { title: 'Today I Learned', entries: data, name: name });
    }
  );
});

/*CREATE new entry: POST /til/ */
//Shows the new entry page
router.post('/', function(req, res, next) {
  req.db.driver.execQuery(
    "INSERT INTO entries_til (info,body) VALUES (?,?);",
    [req.body.info, req.body.body],
    function(err, data){
      if(err)
      {
        console.log(err);
      }
      res.redirect(303, '/til/');
    }
  );
});

/* CREATE new entry form: GET /til/new */
//Sets up new entry page
router.get('/new', function(req, res, next) {
  res.render('til/new', {title: "Create A New entry"});
});

/* UPDATE edit entry form: GET /til/1/edit */
//Sets up edit page
router.get('/:id/edit', function(req, res, next) {
  req.db.driver.execQuery(
    'SELECT * FROM entries_til WHERE id=?;',
    [paseIt(eq.params.id)],
    function(err, data) {
      if(err)
      {
        console.log(err);
      }
      res.render('til/update',
      {
        title: 'Update an entry',
        entry: data[0]
      });
    }
  );
});

/* UPDATE edit entry: POST /til/1 */
//Shows the edit entry page
router.post('/:id', function(req, res, next) {
  var id=parseInt(req.params.id);
  
  req.db.driver.execQuery(
    "UPDATE entries_til SET info=? ,body=? WHERE id=?;",
    [req.body.info, req.body.body, parseInt(req.params.id)],
    function(err, data) {
      if(err)
      {
        console.log(err);
      }
      res.redirect(303, '/til/' + id);
    }
  );
});

/* DELETE delete entry: GET /til/1/delete  */
//Deletes an entry
router.get('/:id/delete', function(req, res, next) {
  req.db.driver.execQuery(
    'DELETE FROM entries WHERE id=?;',
    [parseInt(req.params.id)],
    function(err, data) {
      if(err)
      {
        console.log(err);
      }
      res.redirect(303, '/til/');
    }
  );
});

/* GET til listing. */
//Show single entry page
router.get('/:id', function(req, res, next) {
  req.db.driver.execQuery(
    'SELECT * FROM entries WHERE id=?;',
    [parseInt(req.params.id)],
    function(err, data) {
      if(err)
      {
        console.log(err);
      }
      res.render('til/entry', { title: 'An entry' , entry: data[0]});
    }
  );
});

module.exports = router;
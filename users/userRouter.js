const express = require('express');

const Users = require('./userDb.js');
const Posts = require('../posts/postDb.js');
const router = express.Router();

router.post('/', (req, res) => {
  Users.insert(req.body).then(user => {
    res.status(201).json(user);
  }).catch(err => {
    console.log(err);
    res.status(500).json({ err: 'Unable to retrieve user' });
  });
});

router.post('/:id/posts', (req, res) => {

    Posts.insert(req.body).then(post => {
      res.status(201).json(post);
    }).catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Unable to post that post' });
    });
});

router.get('/', (req, res) => {
  Users.get(req.body).then(users => {
    res.status(201).json(users);
  }).catch(err => {
    console.log(err);
    res.status(500).json({ error: 'Unable to retrieve users' });
  });
});

router.get('/:id', (req, res) => {
  Users.getById(req.params.id).then(user => {
    res.status(201).json(user);
  }).catch(err => {
    console.log(err);
    res.status(500).json({ error: 'Unable to retrieve the user' });
  });
});

router.get('/:id/posts', (req, res) => {
  Users.getUserPosts(req.params.id).then(posts => {
    res.status(201).json(posts);
  }).catch(err => {
    console.log(err);
    res.status(500).json({ error: 'Unable to retrieve the posts associated w/ that user' });
  });
});

router.delete('/:id', (req, res) => {
  Users.remove(req.params.id).then(deleted => {
    console.log('DELETED:', deleted);
    res.sendStatus(200);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ error: "The user could not be removed" });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Users.update(id, changes).then(updated => {
    res.status(200).json(updated);
  }).catch(err => {
    console.log(err);
    res.status(500).json({ error: "The user information could not be modified." });
  });
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;

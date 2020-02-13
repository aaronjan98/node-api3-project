const express = require('express');

const Users = require('./userDb.js');
const Posts = require('../posts/postDb.js');
const router = express.Router();

router.post('/', validateUser, (req, res) => {
  Users.insert(req.body).then(user => {
    res.status(201).json(user);
  }).catch(err => {
    console.log(err);
    res.status(500).json({ err: 'Unable to retrieve user' });
  });
});

router.post('/:id/posts', validateUserId, (req, res) => {
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

router.get('/:id', validateUserId, (req, res) => {
  Users.getById(req.params.id).then(user => {
    res.status(201).json(user);
  }).catch(err => {
    console.log(err);
    res.status(500).json({ error: 'Unable to retrieve the user' });
  });
});

router.get('/:id/posts', validateUserId, (req, res) => {
  Users.getUserPosts(req.params.id).then(posts => {
    res.status(201).json(posts);
  }).catch(err => {
    console.log(err);
    res.status(500).json({ error: 'Unable to retrieve the posts associated w/ that user' });
  });
});

router.delete('/:id', validateUserId, (req, res) => {
  Users.remove(req.params.id).then(deleted => {
    console.log('DELETED:', deleted);
    res.sendStatus(200);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ error: "The user could not be removed" });
  });
});

router.put('/:id', validateUserId, (req, res) => {
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
  const { id } = req.params;

  Users.getById(id).then(user => {
    console.log('user', user);
    if(!user){
      res.status(400).json({ message: "invalid user id" });
    }else {
      req.user = user;
      console.log(req.user);
      next();
    }
  }).catch(err => {
    console.log(err);
    res.status(500).json({ error: "couldn't get user " });
  });
}

function validateUser(req, res, next) {
  // console.log(req.body);
  if( Object.keys(req.body).length == 0 ) {
    res.status(400).json({ message: "missing user data" });
  } else if(!req.body.name) {
    res.status(400).json({ message: "missing required name field" });
  } else next();
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;

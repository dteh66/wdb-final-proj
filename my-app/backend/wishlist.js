// wishlist.js
const express = require('express');
const User = require('user');
const Session = require('session');
const Wishlist = require('wishlist');
const Item = require('item');

const router = express.Router();

// Get user's wishlist
router.get('/wishlist', (req, res) => {
  if (!req.session.session_uid) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  Session.findOne({ session_uid: req.session.session_uid }, (err, session) => {
    if (err || !session) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    User.findOne({ user_uid: session.user_uid })
      .populate('wishlist_uid')
      .exec((err, user) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Server error' });
        }

        return res.status(200).json(user.wishlist_uid);
      });
  });
});

// Add an item to user's wishlist
router.post('/wishlist', (req, res) => {
  if (!req.session.session_uid) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const { name } = req.body;

  Session.findOne({ session_uid: req.session.session_uid }, (err, session) => {
    if (err || !session) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    User.findOne({ user_uid: session.user_uid }, (err, user) => {
      if (err || !user) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
      }

      // Create a new item
      const item = new Item({ name });

      item.save((err, savedItem) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Server error' });
        }

        // Add the item to the user's wishlist
        const wishlist = new Wishlist({
          wishlist_uid: user.wishlist_uid,
          user_uid: user.user_uid,
          wish_list: [savedItem._id],
        });

        wishlist.save((err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Server error' });
          }

          return res.status(201).json(savedItem);
        });
      });
    });
  });
});

// Remove an item from user's wishlist
router.delete('/wishlist/:itemId', (req, res) => {
  if (!req.session.session_uid) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const itemId = req.params.itemId;

  Session.findOne({ session_uid: req.session.session_uid }, (err, session) => {
    if (err || !session) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    User.findOne({ user_uid: session.user_uid }, (err, user) => {
      if (err || !user) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
      }

      Wishlist.findOneAndUpdate(
        { wishlist_uid: user.wishlist_uid },
        { $pull: { wish_list: itemId } },
        { new: true },
        (err, wishlist) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Server error' });
          }

          // Delete the item from the database
          Item.findByIdAndDelete(itemId, (err) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ error: 'Server error' });
            }

            return res
              .status(200)
              .json({ message: 'Item removed from wishlist' });
          });
        }
      );
    });
  });
});

module.exports = router;
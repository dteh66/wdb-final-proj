// wishlist.js
const express = require('express');
const User = require('./User');
const Item = require('./Item');

const router = express.Router();

// Get user's wishlist
router.get('/wishlist', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  User.findById(req.session.user._id)
    .populate('wishlist')
    .exec((err, user) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
      }

      return res.status(200).json(user.wishlist);
    });
});

// Add an item to user's wishlist
router.post('/wishlist', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const { name } = req.body;

  // Create a new item
  const item = new Item({ name });

  item.save((err, savedItem) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }

    // Add the item to the user's wishlist
    User.findByIdAndUpdate(
      req.session.user._id,
      { $push: { wishlist: savedItem._id } },
      { new: true },
      (err, user) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Server error' });
        }

        return res.status(201).json(savedItem);
      }
    );
  });
});

// Remove an item from user's wishlist
router.delete('/wishlist/:itemId', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const itemId = req.params.itemId;

  // Remove the item from the user's wishlist
  User.findByIdAndUpdate(
    req.session.user._id,
    { $pull: { wishlist: itemId } },
    { new: true },
    (err, user) => {
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

        return res.status(200).json({ message: 'Item removed from wishlist' });
      });
    }
  );
});

module.exports = router;
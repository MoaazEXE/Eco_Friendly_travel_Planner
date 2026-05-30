const { Router } = require('express');
const Favourite = require('../models/Favourite');
const authMiddleware = require('../middleware/auth');

const router = Router();

// GET /api/eco-options/favourites
router.get('/favourites', authMiddleware, async (req, res) => {
  try {
    const favourites = await Favourite.find(
      { userId: req.session.userId },
      { _id: 1, ecoOptionId: 1 }
    );
    res.json(favourites);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/eco-options/favourites
router.post('/favourites', authMiddleware, async (req, res) => {
  try {
    const { ecoOptionId } = req.body;

    const existing = await Favourite.findOne({
      userId: req.session.userId,
      ecoOptionId,
    });
    if (existing) return res.status(409).json({ error: 'Already saved' });

    const favourite = await Favourite.create({
      userId: req.session.userId,
      ecoOptionId,
    });
    res.status(201).json(favourite);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/eco-options/favourites/:id
router.delete('/favourites/:id', authMiddleware, async (req, res) => {
  try {
    const favourite = await Favourite.findById(req.params.id);
    if (!favourite) return res.status(404).json({ error: 'Not found' });
    if (String(favourite.userId) !== String(req.session.userId)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    await favourite.deleteOne();
    res.status(204).send();
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

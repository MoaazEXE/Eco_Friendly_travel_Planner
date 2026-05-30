/**
 * Checks that a valid session with a userId exists.
 * M1 (Moaaz) must populate req.session.userId on successful login.
 */
module.exports = function authMiddleware(req, res, next) {
  if (!req.session?.userId) {
    return res.status(401).json({ error: 'Unauthorised' });
  }
  next();
};

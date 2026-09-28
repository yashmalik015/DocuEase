const jwt = require('jsonwebtoken');

/**
 * requireAuth — Express middleware that protects a route.
 *
 * Supabase parallel: this is your manual replacement for Row-Level Security.
 * Supabase would read the JWT and enforce ownership in the database. MongoDB
 * has no RLS, so YOU verify the token here and attach the user's id to the
 * request. Every protected route then filters its queries by req.userId.
 *
 * The identity comes ONLY from the verified token — never trust a userId sent
 * in the request body, because the client can forge that.
 */
function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.sub; // "sub" (subject) = the user's _id, set at login
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

/**
 * Create a signed token for a user id. The client stores this and sends it
 * back as "Authorization: Bearer <token>" on every request.
 */
function signToken(userId) {
  return jwt.sign({ sub: userId.toString() }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
}

module.exports = { requireAuth, signToken };

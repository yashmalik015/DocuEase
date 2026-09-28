const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * The User schema.
 *
 * Supabase parallel: this is your `users` table definition, but written in
 * code instead of SQL. MongoDB itself does NOT enforce these types or the
 * `required` rules — Mongoose does, at write time, in Node. That is the big
 * difference from Postgres: the schema lives here, not in the database.
 */
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,      // creates a unique index -> a second signup with the
      lowercase: true,   // same email is rejected by the DB (your "email already
      trim: true,        // registered" guard)
    },
    // We store ONLY the bcrypt hash, never the plaintext password.
    passwordHash: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ['business', 'professional', 'Owner'],
      default: 'business',
    },
  },
  { timestamps: true } // adds createdAt / updatedAt automatically
);

/**
 * Instance helper: check a plaintext password against the stored hash.
 * Used by the login route. bcrypt.compare is safe against timing attacks.
 */
userSchema.methods.verifyPassword = function (plainPassword) {
  return bcrypt.compare(plainPassword, this.passwordHash);
};

/**
 * Never leak the hash to the client. This strips passwordHash (and the
 * internal __v field) whenever a user document is converted to JSON.
 */
userSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.passwordHash;
    delete ret.__v;
    return ret;
  },
});

// mongoose.model(name, schema) -> the collection is auto-named "users".
module.exports = mongoose.model('User', userSchema);

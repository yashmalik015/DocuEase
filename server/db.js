const mongoose = require('mongoose');

/**
 * Opens the single shared connection to MongoDB.
 *
 * Supabase parallel: this is the equivalent of Supabase already being
 * connected for you behind the client. Here you open the connection yourself,
 * once, when the server boots. Mongoose keeps and reuses this one connection
 * pool for every query in the app — you do NOT connect per request.
 */
async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('MONGODB_URI is not set. Add it to server/.env');
    process.exit(1);
  }

  // Catch the common copy-paste mistake of leaving the Atlas placeholder host.
  if (uri.includes('xxxxx') || uri.includes('<cluster>')) {
    console.error(
      'MONGODB_URI still has a placeholder host. Replace it with your real ' +
        'cluster address from Atlas -> Connect -> Drivers.'
    );
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
}

module.exports = { connectDB };

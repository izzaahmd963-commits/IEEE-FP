const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('⏳ Connecting to MongoDB...');
    
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      family: 4,
      serverSelectionTimeoutMS: 10000,
      authSource: 'admin',
      authMechanism: 'SCRAM-SHA-1',  // Yeh line add karo
    });
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`✅ Database: ${conn.connection.name}`);
    
    // Test the connection
    await conn.connection.db.command({ ping: 1 });
    console.log("✅ MongoDB ping successful!");
    
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error('Full error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
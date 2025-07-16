const mongoose = require('mongoose');

(async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/accessibility-analyzer', {
      serverSelectionTimeoutMS: 5000
    });
    console.log('Connected to:', mongoose.connection.name);

    // Test writing a simple document
    const ReportSchema = new mongoose.Schema({
      url: String,
      timestamp: { type: Date, default: Date.now }
    });
    const Report = mongoose.model('Report', ReportSchema, 'reports');
    const testReport = new Report({ url: 'https://example.com' });
    const savedReport = await testReport.save();
    console.log('Test report saved:', savedReport._id);

    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (err) {
    console.error('MongoDB error:', err.message, err.stack);
    process.exit(1);
  }
})();
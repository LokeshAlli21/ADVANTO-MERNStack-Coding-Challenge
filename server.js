import express from 'express';
import mongoose from 'mongoose';
import axios from 'axios';
import cors from 'cors';
import Product from './models/Product.js';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const DB_URL = 'mongodb://localhost:27017/mern_stack_db';

// Connect to MongoDB
mongoose.connect(DB_URL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Initialize the database with seed data from the third-party API
app.get('/api/initialize', async (req, res) => {
  try {
    const { data: products } = await axios.get("https://s3.amazonaws.com/roxiler.com/product_transaction.json");

    // Save products to the database
    await Product.deleteMany({});

    // Ensure products match the new schema
    const formattedProducts = products.map(product => ({
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
      dateOfSale: product.dateOfSale,
      isSold: product.sold,
      image: product.image,
      originalId: product.id,
    }));

    await Product.insertMany(formattedProducts);
    res.status(200).json({ message: 'Database initialized with seed data' });
  } catch (error) {
    console.error('Error initializing database:', error);
    res.status(500).json({ error: 'Failed to initialize database' });
  }
});

// List all transactions with search and pagination
app.get('/api/transactions', async (req, res) => {
  const { search = '', page = 1, perPage = 10, month } = req.query;

  // Validate month parameter
  if (!month) {
    return res.status(400).json({ error: 'Month is required' });
  }

  const regex = new RegExp(search, 'i'); // Case-insensitive regex for search
  const skip = (page - 1) * perPage; // Calculate how many records to skip

  try {
    const monthFormatted = month.padStart(2, '0'); // Ensure month is two digits

    // Base query to filter by month
    const query = {
      dateOfSale: { $regex: `${monthFormatted}-` }, // Filter by month
      $or: [
        { title: regex },
        { description: regex },
      ],
    };

    // Add price search only if search is a valid number or not empty
    if (search.trim() !== '' && !isNaN(search)) {
      query.$or.push({ price: { $regex: search } }); // Search for price
    }

    // Get total count of matching transactions
    const total = await Product.countDocuments(query);

    // Exclude createdAt, updatedAt, and __v fields
    const transactions = await Product.find(query)
      .skip(skip)
      .limit(Number(perPage))
      .select('-createdAt -updatedAt -__v');

    if (!transactions.length) {
      return res.status(404).json({ message: 'No transactions found' });
    }

    res.status(200).json({ total, transactions });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

// Statistics API
app.get('/api/statistics', async (req, res) => {
  const { month } = req.query;
  
  if (!month) {
    return res.status(400).json({ error: 'Month is required' });
  }
  try {
    const [totalSales] = await Product.aggregate([
      { $match: { dateOfSale: { $regex: `${month}-` } } },
      { $group: { _id: null, totalSaleAmount: { $sum: "$price" } } },
    ]);
    const totalSoldItems = await Product.countDocuments({
      dateOfSale: { $regex: `${month}-` },
      isSold: true,
    });
    const totalNotSoldItems = await Product.countDocuments({
      dateOfSale: { $regex: `${month}-` },
      isSold: false,
    });
    res.status(200).json({
      totalSaleAmount: totalSales?.totalSaleAmount || 0,
      totalSoldItems,
      totalNotSoldItems,
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// Bar chart API (Price ranges)
app.get('/api/bar-chart', async (req, res) => {
  const { month } = req.query;

  if (!month) {
    return res.status(400).json({ error: 'Month is required' });
  }

  const monthFormatted = month.padStart(2, '0');
  const ranges = [
    { range: '0-100', min: 0, max: 100 },
    { range: '101-200', min: 101, max: 200 },
    { range: '201-300', min: 201, max: 300 },
    { range: '301-400', min: 301, max: 400 },
    { range: '401-500', min: 401, max: 500 },
    { range: '501-600', min: 501, max: 600 },
    { range: '601-700', min: 601, max: 700 },
    { range: '701-800', min: 701, max: 800 },
    { range: '801-900', min: 801, max: 900 },
    { range: '901-above', min: 901, max: Infinity },
  ];

  try {
    const data = await Promise.all(
      ranges.map(async ({ range, min, max }) => {
        const count = await Product.countDocuments({
          dateOfSale: { $regex: `${monthFormatted}-` },
          price: { $gte: min, $lte: max },
        });
        return { range, count };
      })
    );
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching bar chart data:', error);
    res.status(500).json({ error: 'Failed to fetch bar chart data' });
  }
});

// Pie chart API (Unique categories)
app.get('/api/pie-chart', async (req, res) => {
  const { month } = req.query;

  if (!month) {
    return res.status(400).json({ error: 'Month is required' });
  }

  try {
    const monthFormatted = month.padStart(2, '0');
    const categories = await Product.aggregate([
      { $match: { dateOfSale: { $regex: `${monthFormatted}-` } } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
    ]);
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching pie chart data:', error);
    res.status(500).json({ error: 'Failed to fetch pie chart data' });
  }
});

// Combined data API
app.get('/api/combined-data', async (req, res) => {
  const { month } = req.query;

  if (!month) {
    return res.status(400).json({ error: 'Month is required' });
  }

  try {
    const monthFormatted = month.padStart(2, '0');
    const [statistics, barChart, pieChart] = await Promise.all([
      Product.aggregate([
        { $match: { dateOfSale: { $regex: `${monthFormatted}-` } } },
        { $group: { _id: null, totalSaleAmount: { $sum: "$price" } } },
      ]),
      Product.aggregate([
        { $match: { dateOfSale: { $regex: `${monthFormatted}-` } } },
        { $group: { _id: '$category', count: { $sum: 1 } } },
      ]),
      Product.aggregate([
        { $match: { dateOfSale: { $regex: `${monthFormatted}-` } } },
        { $group: { _id: '$priceRange', count: { $sum: 1 } } },
      ]),
    ]);

    res.status(200).json({
      totalSaleAmount: statistics[0]?.totalSaleAmount || 0,
      barChart,
      pieChart,
    });
  } catch (error) {
    console.error('Error fetching combined data:', error);
    res.status(500).json({ error: 'Failed to fetch combined data' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

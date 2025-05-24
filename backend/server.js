const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3001;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Database configuration
const pool = new Pool({
  host: '35.225.49.93',
  port: 5432,
  database: 'pim_database',
  user: 'pim_user',
  password: 'SecurePIM2025!',
  ssl: {
    rejectUnauthorized: false
  }
});

// Test connection on startup
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Error connecting to database:', err);
  } else {
    console.log('✅ Database connected successfully');
    release();
  }
});

// API Routes
app.get('/api/test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ 
      status: 'connected', 
      time: result.rows[0],
      message: 'Backend and database working!' 
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ 
      status: 'error', 
      error: error.message 
    });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.*, a.name as category_name, a.color as category_color, a.icon as category_icon
      FROM products p
      LEFT JOIN attribute_sets a ON p.attribute_set_id = a.id
      ORDER BY p.created_at DESC
    `);
    console.log(`Fetched ${result.rows.length} products`);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/api/attribute-sets', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM attribute_sets ORDER BY id');
    console.log(`Fetched ${result.rows.length} attribute sets`);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching attribute sets:', error);
    res.status(500).json({ error: 'Failed to fetch attribute sets' });
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'PIM Backend API is running!',
    endpoints: [
      'GET /api/test',
      'GET /api/products', 
      'GET /api/attribute-sets'
    ]
  });
});

app.listen(port, () => {
  console.log(`🚀 Backend server running on http://localhost:${port}`);
  console.log(`📡 API available at http://localhost:${port}/api`);
});
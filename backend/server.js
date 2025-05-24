const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'https://pim-pro-system.vercel.app'],
  credentials: true
}));
app.use(express.json());

// Database configuration
const pool = new Pool({
  host: process.env.DATABASE_HOST || '35.225.49.93',
  port: process.env.DATABASE_PORT || 5432,
  database: process.env.DATABASE_NAME || 'pim_database',
  user: process.env.DATABASE_USER || 'pim_user',
  password: process.env.DATABASE_PASSWORD || 'SecurePIM2025!',
  ssl: {
    rejectUnauthorized: false
  },
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 30000,
  max: 10
});

// Configure multer for file uploads
const upload = multer({ 
  dest: 'uploads/',
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'text/csv' || file.originalname.endsWith('.csv')) {
      cb(null, true);
    } else {
      cb(new Error('Only CSV files are allowed'));
    }
  }
});

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Test connection on startup with detailed error logging
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Database connection failed:');
    console.error('Error code:', err.code);
    console.error('Error message:', err.message);
  } else {
    console.log('✅ Database connected successfully');
    release();
  }
});

// API Routes with better error handling
app.get('/api/test', async (req, res) => {
  try {
    console.log('Testing database connection...');
    const result = await pool.query('SELECT NOW() as current_time, version() as db_version');
    console.log('✅ Database test successful');
    res.json({ 
      status: 'connected', 
      time: result.rows[0].current_time,
      database_version: result.rows[0].db_version,
      message: 'Backend and database working!' 
    });
  } catch (error) {
    console.error('❌ Database test failed:', error.message);
    res.status(500).json({ 
      status: 'error', 
      error: error.message,
      code: error.code 
    });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    console.log('Fetching products from database...');
    const result = await pool.query(`
      SELECT p.*, a.name as category_name, a.color as category_color, a.icon as category_icon
      FROM products p
      LEFT JOIN attribute_sets a ON p.attribute_set_id = a.id
      ORDER BY p.created_at DESC
    `);
    console.log(`✅ Fetched ${result.rows.length} products successfully`);
    res.json(result.rows);
  } catch (error) {
    console.error('❌ Error fetching products:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch products',
      details: error.message 
    });
  }
});

app.get('/api/attribute-sets', async (req, res) => {
  try {
    console.log('Fetching attribute sets from database...');
    const result = await pool.query('SELECT * FROM attribute_sets ORDER BY id');
    console.log(`✅ Fetched ${result.rows.length} attribute sets successfully`);
    res.json(result.rows);
  } catch (error) {
    console.error('❌ Error fetching attribute sets:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch attribute sets',
      details: error.message 
    });
  }
});

// CSV Import endpoint
app.post('/api/import/csv', upload.single('csvFile'), async (req, res) => {
  try {
    const { attributeSetId } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: 'No CSV file uploaded' 
      });
    }

    if (!attributeSetId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Attribute set ID is required' 
      });
    }

    console.log(`Starting CSV import for attribute set ${attributeSetId}`);
    console.log(`File: ${req.file.originalname} (${req.file.size} bytes)`);

    const results = [];
    const errors = [];
    let processedCount = 0;

    // Parse CSV file
    await new Promise((resolve, reject) => {
      fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (data) => {
          // Clean up column names (remove spaces, convert to lowercase)
          const cleanData = {};
          Object.keys(data).forEach(key => {
            const cleanKey = key.trim().toLowerCase();
            cleanData[cleanKey] = data[key].trim();
          });
          
          results.push(cleanData);
        })
        .on('end', resolve)
        .on('error', reject);
    });

    console.log(`Parsed ${results.length} rows from CSV`);

    // Process each row
    for (let i = 0; i < results.length; i++) {
      const row = results[i];
      processedCount++;

      try {
        // Validate required fields
        if (!row.name || !row.sku || !row.price) {
          errors.push(`Row ${i + 2}: Missing required fields (name, sku, or price)`);
          continue;
        }

        // Prepare product data
        const productData = {
          name: row.name,
          sku: row.sku,
          attribute_set_id: parseInt(attributeSetId),
          price: parseFloat(row.price),
          status: row.status || 'draft',
          featured: row.featured === 'true' || row.featured === '1',
          tags: row.tags ? row.tags.split(',').map(tag => tag.trim()) : [],
          last_modified: new Date().toISOString().split('T')[0]
        };

        // Insert product into database
        const productResult = await pool.query(`
          INSERT INTO products (name, sku, attribute_set_id, price, status, featured, tags, last_modified)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          RETURNING id
        `, [
          productData.name,
          productData.sku,
          productData.attribute_set_id,
          productData.price,
          productData.status,
          productData.featured,
          productData.tags,
          productData.last_modified
        ]);

        const productId = productResult.rows[0].id;

        // Add product attributes
        const attributePromises = [];
        
        // Common attributes
        if (row.brand) {
          attributePromises.push(
            pool.query(
              'INSERT INTO product_attributes (product_id, attribute_name, attribute_value) VALUES ($1, $2, $3)',
              [productId, 'Brand', row.brand]
            )
          );
        }
        
        if (row.color) {
          attributePromises.push(
            pool.query(
              'INSERT INTO product_attributes (product_id, attribute_name, attribute_value) VALUES ($1, $2, $3)',
              [productId, 'Color', row.color]
            )
          );
        }
        
        if (row.weight) {
          attributePromises.push(
            pool.query(
              'INSERT INTO product_attributes (product_id, attribute_name, attribute_value) VALUES ($1, $2, $3)',
              [productId, 'Weight', row.weight]
            )
          );
        }

        // Category-specific attributes
        if (row.size) {
          attributePromises.push(
            pool.query(
              'INSERT INTO product_attributes (product_id, attribute_name, attribute_value) VALUES ($1, $2, $3)',
              [productId, 'Size', row.size]
            )
          );
        }

        if (row.material) {
          attributePromises.push(
            pool.query(
              'INSERT INTO product_attributes (product_id, attribute_name, attribute_value) VALUES ($1, $2, $3)',
              [productId, 'Material', row.material]
            )
          );
        }

        await Promise.all(attributePromises);

      } catch (error) {
        console.error(`Error processing row ${i + 2}:`, error.message);
        
        if (error.code === '23505') { // Unique constraint violation
          errors.push(`Row ${i + 2}: SKU '${row.sku}' already exists`);
        } else {
          errors.push(`Row ${i + 2}: ${error.message}`);
        }
      }
    }

    // Clean up uploaded file
    fs.unlinkSync(req.file.path);

    const successCount = processedCount - errors.length;
    
    console.log(`Import completed: ${successCount} products imported, ${errors.length} errors`);

    res.json({
      success: true,
      message: `Successfully imported ${successCount} products${errors.length > 0 ? ` with ${errors.length} errors` : ''}`,
      details: {
        imported: successCount,
        errors: errors.length,
        total: processedCount,
        errorList: errors.slice(0, 10) // Show first 10 errors
      }
    });

  } catch (error) {
    console.error('CSV import error:', error);
    
    // Clean up uploaded file if it exists
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({
      success: false,
      message: 'Import failed: ' + error.message
    });
  }
});

app.get('/', (req, res) => {
  res.json({ 
    message: 'PIM Backend API is running!',
    endpoints: [
      'GET /api/test',
      'GET /api/products', 
      'GET /api/attribute-sets',
      'POST /api/import/csv'
    ]
  });
});

app.listen(port, () => {
  console.log(`🚀 Backend server running on http://localhost:${port}`);
  console.log(`📡 API available at http://localhost:${port}/api`);
});
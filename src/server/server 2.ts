// import express from 'express';
// import { Pool } from 'pg';
// import cors from 'cors';
// import dotenv from 'dotenv';

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 5000;

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

// app.use(cors());
// app.use(express.json());

// app.get('/api/modules', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM modules');
//     res.json(result.rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// app.get('/api/modules/:slug', async (req, res) => {
//   try {
//     const { slug } = req.params;
//     const result = await pool.query('SELECT * FROM modules WHERE slug = $1', [slug]);
//     if (result.rows.length > 0) {
//       res.json(result.rows[0]);
//     } else {
//       res.status(404).json({ error: 'Module not found' });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

import express from 'express';
import { Pool } from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

console.log('Database URL:', process.env.DATABASE_URL);

const app = express();
const port = process.env.PORT || 5000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use(cors());
app.use(express.json());

// Logging middleware to debug requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Fetch all modules
app.get('/api/modules', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM modules');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching modules:', err); // Log the actual error
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Fetch specific lessons by module and lesson slug
app.get('/api/modules/:moduleSlug/lessons/:lessonSlug', async (req, res) => {
  const { moduleSlug, lessonSlug } = req.params;

  try {
    // Join modules and lessons based on the moduleSlug and lessonSlug
    const result = await pool.query(
      `
      SELECT lessons.* 
      FROM lessons
      JOIN modules ON lessons.module_id = modules.id
      WHERE modules.slug = $1 AND lessons.slug = $2
      `,
      [moduleSlug, lessonSlug]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching lessons:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


//NAUDOTAS IR VEIKIA< RODO LOADING

// import express from 'express';
// import { Pool } from 'pg';
// import cors from 'cors';
// import dotenv from 'dotenv';

// dotenv.config();

// console.log('Database URL:', process.env.DATABASE_URL);

// const app = express();
// const port = process.env.PORT || 5000;

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,  // Ensure your DATABASE_URL is for Supabase
// });

// app.use(cors());
// app.use(express.json());

// // Logging middleware to debug requests
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.url}`);
//   next();
// });

// // Fetch all modules
// // app.get('/api/modules', async (req, res) => {
// //   try {
// //     const result = await pool.query('SELECT * FROM modules');
// //     res.json(result.rows);
// //   } catch (err) {
// //     console.error('Error fetching modules:', err);
// //     res.status(500).json({ error: 'Internal server error' });
// //   }
// // });


// app.get('/api/modules', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM modules');
//     res.json(result.rows);
//   } catch (err) {
//     console.error('Error fetching modules:', err); // Log the actual error
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });


// // Fetch all lessons with associated topics and modules
// app.get('/api/lessons', async (req, res) => {
//   try {
//     const result = await pool.query(`
//       SELECT 
//         lessons.*, 
//         topics.slug as topic_slug, 
//         topics.title as topic_title,
//         modules.slug as module_slug, 
//         modules.title as module_title
//       FROM lessons
//       JOIN topics ON lessons.topic_id = topics.id
//       JOIN modules ON topics.module_id = modules.id
//     `);
//     res.json(result.rows);
//   } catch (err) {
//     console.error('Error fetching lessons:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });








// import express from 'express';
// import { Pool } from 'pg';
// import cors from 'cors';
// import dotenv from 'dotenv';

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 5000;

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

// app.use(cors());
// app.use(express.json());

// // Logging middleware to debug requests
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.url}`);
//   next();
// });

// app.get('/api/modules', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM modules');
//     res.json(result.rows);
//   } catch (err) {
//     console.error('Error fetching modules:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// app.get('/api/lessons', async (req, res) => {
//   try {
//     const result = await pool.query(`
//       SELECT lessons.*, modules.slug as module_slug 
//       FROM lessons 
//       JOIN modules ON lessons.module_id = modules.id
//     `);
//     res.json(result.rows);
//   } catch (err) {
//     console.error('Error fetching lessons:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });







// rodo LESSONS

// import express from 'express';
// import cors from 'cors';
// import { Pool } from 'pg';

// const app = express();
// const port = 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // PostgreSQL Connection Setup
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL, // Set this in your .env file
// });

// // Endpoint to fetch all lessons associated with a module
// app.get('/api/modules/:slug/lessons', async (req, res) => {
//   const { slug } = req.params;
  
//   try {
//     const moduleResult = await pool.query('SELECT id FROM modules WHERE slug = $1', [slug]);

//     if (moduleResult.rows.length === 0) {
//       return res.status(404).json({ error: 'Module not found' });
//     }

//     const moduleId = moduleResult.rows[0].id;

//     const lessonsResult = await pool.query('SELECT * FROM lessons WHERE module_id = $1', [moduleId]);
    
//     res.json(lessonsResult.rows);
//   } catch (error) {
//     console.error('Error fetching lessons:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Endpoint to fetch specific lesson data
// app.get('/api/modules/:moduleSlug/lessons/:lessonSlug', async (req, res) => {
//   const { moduleSlug, lessonSlug } = req.params;
  
//   try {
//     const moduleResult = await pool.query('SELECT id FROM modules WHERE slug = $1', [moduleSlug]);

//     if (moduleResult.rows.length === 0) {
//       return res.status(404).json({ error: 'Module not found' });
//     }

//     const moduleId = moduleResult.rows[0].id;

//     const lessonResult = await pool.query('SELECT * FROM lessons WHERE slug = $1 AND module_id = $2', [lessonSlug, moduleId]);

//     if (lessonResult.rows.length === 0) {
//       return res.status(404).json({ error: 'Lesson not found' });
//     }

//     res.json(lessonResult.rows[0]);
//   } catch (error) {
//     console.error('Error fetching lesson:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });




// import express from 'express';
// import { Pool } from 'pg';
// import cors from 'cors';
// import dotenv from 'dotenv';

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 5000;

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

// app.use(cors());
// app.use(express.json());

// // Root path route
// app.get('/', (req, res) => {
//   res.send('Welcome to the API');
// });

// // API endpoint to get all modules
// app.get('/api/modules', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM modules');
//     res.json(result.rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // API endpoint to get a module by slug
// app.get('/api/modules/:slug', async (req, res) => {
//   try {
//     const { slug } = req.params;
//     const result = await pool.query('SELECT * FROM modules WHERE slug = $1', [slug]);
//     if (result.rows.length > 0) {
//       res.json(result.rows[0]);
//     } else {
//       res.status(404).json({ error: 'Module not found' });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });



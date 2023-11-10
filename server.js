const express = require('express'); // third-party module
const path = require('path'); // core module
const storage = require('./storage'); // local
const upload = require('./upload'); 
const api = require('./routes/api'); // local module (api)

const app = express(); // instance express -> assign ke variabel app
const { PORT = 8000 } = process.env;
const PUBLIC_DIR = path.join(__dirname, 'public');

app.set('view engine', 'ejs');
app.use(express.static(PUBLIC_DIR)); // membuat URL sendiri untuk apa saja
// yang ada di dalam folder PUBLIC_DIR -> "public"


app.get('/upload', (req, res) => {
  res.render('upload', {
    type: req.query.type,
    name: req.query.name || 'Guest',
    message: req.query.message,
    url: req.query.url,
  });
});
app.get('/list', (req, res) => {
  res.render('list', {
    type: req.query.type,
    name: req.query.name || 'Guest',
    message: req.query.message,
    url: req.query.url,
  });
});

app.get('/upload:id', async (req, res) => {
  const id = req.params.id;
  const data = await db.select('*').from('car').where('carid', '=', id);
  res.status(200).json({
    data: data[0],
  });
});


app.use(express.json()); // body json
app.use(
  express.urlencoded({
    extended: true,
  })
); 

app.use('/api/car', api.car());

app.listen(PORT, () => {
  console.log('Server is running on http://localhost:%d', PORT);
});

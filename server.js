const express = require('express');
const cors = require('cors');
const app = express();
const busboyBodyParser = require('busboy-body-parser');
require('./db/database.js');
const { PORT } = require('./constants.js');
app.use(express.json());
app.use(busboyBodyParser());

app.use(cors({
	origin: '*',
}));

const ActivateRoutes = require('./routes');
ActivateRoutes(app);

app.get('/', (req, res) => {
	res.send('Hello from Development server');
});

const port = PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

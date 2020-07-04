const { app } = require('./app');
const { PORT } = require('./config');

app.listen(PORT, () => console.log(`Wombo-Combo server listening on port ${PORT}`));

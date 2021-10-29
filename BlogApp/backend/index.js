const express = require('express');

const app = express();
const blogsRouter = require('./routers/blogs');

app.use(express.static('public'));
app.use(express.static('data/uploads'));
app.use('/api', blogsRouter);



const PORT = process.env.PORT || 3500;

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}.`);
});
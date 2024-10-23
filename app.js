const express = require('express');
const app = express();
const transactionRoutes = require('./routes/transactionRoutes'); 


app.use(express.json()); 


app.use('/transactions', transactionRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


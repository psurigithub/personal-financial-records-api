
const db = require('../db/sqlite');

// POST /transactions
const addTransaction = (req, res) => {
    const { type, category, amount, date, description } = req.body;
    const query = `INSERT INTO transactions (type, category, amount, date, description) VALUES (?, ?, ?, ?, ?)`;
    db.run(query, [type, category, amount, date, description], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID });
    });
};

// GET /transactions
const getAllTransactions = (req, res) => {  
   

    db.all("SELECT * FROM transactions", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);  
    
    });   

    
};

// GET /transactions/:id
const getTransactionById = (req, res) => {
    const { id } = req.params;
    db.get("SELECT * FROM transactions WHERE id = ?", [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "Transaction not found" });
        res.json(row);
    });
};

// PUT /transactions/:id
const updateTransaction = (req, res) => {
    const { id } = req.params;
    const { type, category, amount, date, description } = req.body;
    const query = `UPDATE transactions SET type = ?, category = ?, amount = ?, date = ?, description = ? WHERE id = ?`;
    db.run(query, [type, category, amount, date, description, id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ changes: this.changes, type,category,amount,date,description}); 
        
    });
};

// DELETE /transactions/:id
const deleteTransaction = (req, res) => {
    const { id } = req.params;
    
    db.run("DELETE FROM transactions WHERE id = ?", [id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

  
        if (this.changes === 0) {
            return res.status(404).json({ message: `Transaction with ID ${id} not found` });
        }

        res.json({ message: `Transaction with ID ${id} deleted successfully` });
    });
};


const getSummary = (req, res) => {
    const query = `SELECT type, SUM(amount) as total FROM transactions GROUP BY type`;
    db.all(query, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

module.exports = { addTransaction, getAllTransactions, getTransactionById, updateTransaction, deleteTransaction, getSummary };

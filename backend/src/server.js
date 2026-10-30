
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// Test backend and database connection
app.get("/api/health", async (req, res) => {
    try {
        await pool.query("SELECT 1");

        res.json({
            status: "success",
            message: "Last-Mile Delivery API is running",
            database: "connected"
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Database connection failed"
        });
    }
});

// Get all delivery orders
app.get("/api/orders", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM orders ORDER BY id DESC"
        );

        res.json(result.rows);
    } catch (error) {
        res.status(500).json({
            error: "Unable to fetch orders"
        });
    }
});

// Create a delivery order
app.post("/api/orders", async (req, res) => {
    const {
        customer_name,
        address,
        area,
        package_weight
    } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO orders
            (customer_name, address, area, package_weight)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [customer_name, address, area, package_weight]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        res.status(500).json({
            error: "Unable to create order"
        });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

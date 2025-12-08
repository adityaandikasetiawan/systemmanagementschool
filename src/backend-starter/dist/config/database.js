"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = exports.testConnection = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Create connection pool
const pool = promise_1.default.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'baituljannah_school',
    waitForConnections: true,
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT || '10'),
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});
// Test database connection
const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('✅ MySQL Database connected successfully');
        console.log(`   Database: ${process.env.DB_NAME}`);
        console.log(`   Host: ${process.env.DB_HOST}:${process.env.DB_PORT}`);
        connection.release();
        return true;
    }
    catch (error) {
        console.error('❌ MySQL connection error:', error.message);
        console.error('   Please check your database configuration in .env file');
        return false;
    }
};
exports.testConnection = testConnection;
// Helper function for queries with error handling
const query = async (sql, params) => {
    try {
        const [rows] = await pool.query(sql, params);
        return rows;
    }
    catch (error) {
        console.error('Database query error:', error.message);
        throw new Error(`Database error: ${error.message}`);
    }
};
exports.query = query;
exports.default = pool;
//# sourceMappingURL=database.js.map
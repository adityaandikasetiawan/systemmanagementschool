"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const database_1 = require("./config/database");
// Import routes
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const payments_routes_1 = __importDefault(require("./routes/payments.routes"));
const finance_routes_1 = __importDefault(require("./routes/finance.routes"));
// Load environment variables
dotenv_1.default.config();
// Create Express app
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// ============================================
// MIDDLEWARE
// ============================================
// Security middleware
app.use((0, helmet_1.default)());
// CORS configuration
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
// Logging
if (process.env.NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
else {
    app.use((0, morgan_1.default)('combined'));
}
// Body parser
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
app.use((0, cookie_parser_1.default)());
// Static files for uploads
app.use('/uploads', express_1.default.static('uploads'));
// ============================================
// ROUTES
// ============================================
// Health check endpoint
app.get('/api/health', (_req, res) => {
    res.json({
        success: true,
        message: 'Server is running',
        data: {
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            environment: process.env.NODE_ENV || 'development',
            version: '1.0.0'
        }
    });
});
// API routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api/payments', payments_routes_1.default);
app.use('/api/finance', finance_routes_1.default);
// TODO: Add more routes here
// app.use('/api/users', usersRoutes);
// app.use('/api/students', studentsRoutes);
// app.use('/api/teachers', teachersRoutes);
// app.use('/api/classes', classesRoutes);
// app.use('/api/subjects', subjectsRoutes);
// app.use('/api/materials', materialsRoutes);
// app.use('/api/assignments', assignmentsRoutes);
// app.use('/api/grades', gradesRoutes);
// app.use('/api/attendance', attendanceRoutes);
// app.use('/api/finance', financeRoutes);
// app.use('/api/library', libraryRoutes);
// app.use('/api/ppdb', ppdbRoutes);
// app.use('/api/career', careerRoutes);
// app.use('/api/news', newsRoutes);
// app.use('/api/gallery', galleryRoutes);
// app.use('/api/achievements', achievementsRoutes);
// app.use('/api/programs', programsRoutes);
// app.use('/api/notifications', notificationsRoutes);
// app.use('/api/messages', messagesRoutes);
// ============================================
// ERROR HANDLING
// ============================================
// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
        path: req.originalUrl
    });
});
// Global error handler
app.use((err, _req, res, _next) => {
    const message = err instanceof Error ? err.message : 'Internal server error';
    void _next;
    return res.status(500).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === 'development' && err instanceof Error && { stack: err.stack })
    });
});
// ============================================
// START SERVER
// ============================================
const startServer = async () => {
    try {
        // Test database connection
        const dbConnected = await (0, database_1.testConnection)();
        if (!dbConnected) {
            console.error('⚠️  Starting server without database connection');
            console.error('   Please check your database configuration');
        }
        // Start Express server
        app.listen(PORT, () => {
            console.log('');
            console.log('========================================');
            console.log('🚀 YAYASAN BAITULJANNAH API SERVER');
            console.log('========================================');
            console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`🌐 Server URL: http://localhost:${PORT}`);
            console.log(`💚 Health Check: http://localhost:${PORT}/api/health`);
            console.log(`🔐 Auth API: http://localhost:${PORT}/api/auth`);
            console.log('========================================');
            console.log('');
            if (process.env.NODE_ENV === 'development') {
                console.log('📝 Available endpoints:');
                console.log('   POST   /api/auth/login');
                console.log('   POST   /api/auth/register');
                console.log('   POST   /api/auth/logout');
                console.log('   GET    /api/auth/me');
                console.log('   POST   /api/auth/refresh');
                console.log('   GET    /api/payments/student/:studentId');
                console.log('   POST   /api/payments');
                console.log('   POST   /api/payments/:paymentId/pay');
                console.log('   PUT    /api/payments/transactions/:transactionId/verify');
                console.log('   POST   /api/payments/reminders/send');
                console.log('   GET    /api/finance/report');
                console.log('');
                console.log('🔑 Test credentials (from seed data):');
                console.log('   Email: admin@baituljannah.sch.id');
                console.log('   Password: Admin123!');
                console.log('   Email: student@baituljannah.sch.id');
                console.log('   Password: Student123!');
                console.log('   Email: guru@baituljannah.sch.id');
                console.log('   Password: Guru123!');
                console.log('');
            }
        });
    }
    catch (error) {
        console.error('❌ Failed to start server:', error.message);
        process.exit(1);
    }
};
// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Promise Rejection:', err);
    // Close server & exit process
    process.exit(1);
});
// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});
// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    process.exit(0);
});
process.on('SIGINT', () => {
    console.log('SIGINT signal received: closing HTTP server');
    process.exit(0);
});
// Start the server
startServer();
exports.default = app;
//# sourceMappingURL=app.js.map
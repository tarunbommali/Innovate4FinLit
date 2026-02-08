"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cors_1 = require("cors");
var dotenv_1 = require("dotenv");
var auth_routes_1 = require("./routes/auth.routes");
var user_routes_1 = require("./routes/user.routes");
var scenario_routes_1 = require("./routes/scenario.routes");
var decision_routes_1 = require("./routes/decision.routes");
var rules_routes_1 = require("./routes/rules.routes");
dotenv_1.default.config();
var app = (0, express_1.default)();
var PORT = process.env.PORT || 3001;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Health check
app.get('/health', function (req, res) {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
// API Routes
app.use('/api/v1/auth', auth_routes_1.default);
app.use('/api/v1/users', user_routes_1.default);
app.use('/api/v1/scenarios', scenario_routes_1.default);
app.use('/api/v1/decisions', decision_routes_1.default);
app.use('/api/v1/rules', rules_routes_1.default);
// Error handling
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({
        error: {
            code: 'INTERNAL_SERVER_ERROR',
            message: err.message || 'Something went wrong',
            timestamp: new Date().toISOString()
        }
    });
});
app.listen(PORT, function () {
    console.log("Server running on port ".concat(PORT));
});
exports.default = app;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
var auth_service_1 = require("../services/auth.service");
var response_1 = require("../utils/response");
var authenticate = function (req, res, next) {
    try {
        var authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json((0, response_1.errorResponse)('MISSING_TOKEN', 'Authorization token is required'));
        }
        var token = authHeader.substring(7);
        var payload = auth_service_1.default.verifyToken(token);
        req.user = {
            userId: payload.userId,
            email: payload.email,
            userGroup: payload.userGroup
        };
        next();
    }
    catch (error) {
        if (error.message === 'INVALID_TOKEN') {
            return res.status(401).json((0, response_1.errorResponse)('INVALID_TOKEN', 'Invalid or expired token'));
        }
        return res.status(401).json((0, response_1.errorResponse)('AUTH_ERROR', 'Authentication failed'));
    }
};
exports.authenticate = authenticate;

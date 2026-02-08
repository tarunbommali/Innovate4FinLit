"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = void 0;
var successResponse = function (data) {
    return { data: data };
};
exports.successResponse = successResponse;
var errorResponse = function (code, message, details) {
    return {
        error: {
            code: code,
            message: message,
            details: details,
            timestamp: new Date().toISOString()
        }
    };
};
exports.errorResponse = errorResponse;

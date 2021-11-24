"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDBInitWithFetch = exports.useLocalForageItem = exports.ReactLF = void 0;
var functions_1 = require("./functions");
Object.defineProperty(exports, "ReactLF", { enumerable: true, get: function () { return __importDefault(functions_1).default; } });
var useLocalForageItem_1 = require("./useLocalForageItem");
Object.defineProperty(exports, "useLocalForageItem", { enumerable: true, get: function () { return __importDefault(useLocalForageItem_1).default; } });
var useDBInitWithFetch_1 = require("./useDBInitWithFetch");
Object.defineProperty(exports, "useDBInitWithFetch", { enumerable: true, get: function () { return useDBInitWithFetch_1.useDBInitWithFetch; } });

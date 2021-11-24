"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var localforage_1 = __importDefault(require("localforage"));
var DRIVER_TYPE_CONST = [localforage_1.default.INDEXEDDB, localforage_1.default.LOCALSTORAGE, localforage_1.default.LOCALSTORAGE, localforage_1.default.WEBSQL];

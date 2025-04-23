"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const supabase_js_1 = require("@supabase/supabase-js");
const db = (0, supabase_js_1.createClient)(config_1.default.SUPABASE_URL, config_1.default.SUPABASE_ANON_KEY);
exports.default = db;

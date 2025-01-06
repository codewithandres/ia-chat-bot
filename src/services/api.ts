// API SETUP

import { VITE_API_GEMINI } from './config';

const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${VITE_API_GEMINI}`;

export { API_URL };

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFormatedTelNumberCorrect = exports.getMethodNotAllowdText = void 0;
const getMethodNotAllowdText = (method) => `The request method ${method} is inappropriate for this URL`;
exports.getMethodNotAllowdText = getMethodNotAllowdText;
// If the length of the line is more than 12 characters and Masiav of empty lines returned in a line less than 12 digits ['', '']
const isFormatedTelNumberCorrect = (telNumString) => (/\b\d{12}\b/).test(telNumString);
exports.isFormatedTelNumberCorrect = isFormatedTelNumberCorrect;

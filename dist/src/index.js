"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const PORT = process.env.PORT || 4010; // process.env.PORT пытаемся получить порт из системынх данных
app_1.app.listen(+PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});

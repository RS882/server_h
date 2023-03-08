"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const PORT = 4010;
const port = PORT;
app_1.app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

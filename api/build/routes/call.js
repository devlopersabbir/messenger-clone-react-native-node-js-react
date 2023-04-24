"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/get-all-calls", (req, res) => res.send("hello from call routes"));
exports.default = router;
//# sourceMappingURL=call.js.map
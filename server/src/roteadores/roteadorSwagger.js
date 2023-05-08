const swaggerUi = require("swagger-ui-express");
const swaggerJsonDocument = require("../docs/swagger.json");
const router = require("express").Router();

router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJsonDocument));

module.exports = router;
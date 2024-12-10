const express = require("express");
const cors = require("cors");
require("dotenv").config();
const analytics = require("./routes/analytics.routes");
const http = require("http");
const rateLimit = require("express-rate-limit");
const connectToDB = require("./db/db");
const analyticsServer = express();
connectToDB(process.env.DB_URL);
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiting middleware to all requests

analyticsServer.use(limiter);
analyticsServer.set("trust proxy", 1);

if (process.env.NODE_ENV === "production") {
  analyticsServer.use(
    cors({
      origin: ["https://truescale.in/", "https://www.truescale.in/", "https://*.truescale.in/"],
      optionsSuccessStatus: 200,
    })
  );
} else {
  analyticsServer.use(cors({}));
}

analyticsServer.use(express.json({ limit: "5mb" }));

analyticsServer.use("/api/analytics", analytics);

const analyticsPort = 3008;

http.createServer(analyticsServer).listen(analyticsPort, () => {
  console.log("Analytics running at 3008");
});

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const auth = require("./routes/auth.routes");
const posts = require("./routes/posts.routes");
const comments = require("./routes/comments.routes");
// const followings = require("./routes/followings.routes");
const followers = require("./routes/followers.routes");
const profiles = require("./routes/profiles.routes");
const coverage = require("./routes/coverage.routes");
const provision = require("./routes/provisioning.routes");
const generative = require("./routes/generative.routes");
const orchid = require("./routes/orchid.routes");
const userAnalytics = require("./routes/userAnalytics.routes");
const http = require("http");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet")
const verifyAuthentication = require("./middlewares/auth.middleware");
const app = express();
const connectToDB = require("./db/db");
connectToDB(process.env.DB_URL);
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiting middleware to all requests
app.use(limiter);
app.use(helmet())
app.disable('x-powered-by')
app.set("trust proxy", 1);

if (process.env.NODE_ENV === "production") {
  app.use(
    cors({
      origin: [
        "https://www.google.com/",
        "https://truescale.in/",
        "https://www.truescale.in/",
      ],
      optionsSuccessStatus: 200,
    })
  );
} else {
  app.use(cors({}));

  app.get("/ip", (request, response) => response.send(request.ip));
  app.get("/", (req, res) => {
    res.status(200).json({
      message: "SUCESS",
      response: "Welcome",
    });
  });
}

app.use(express.json({ limit: "5mb" }));
app.use("/api/auth", auth);
app.use("/api/posts", posts);
app.use("/api/generative", generative);
app.use("/api/orchid", orchid);
app.use("/api/comments", comments);
app.use(verifyAuthentication);
app.use("/api/profile", profiles);
app.use("/api/followers", followers);
// app.use("/api/followings", followings);
app.use("/api/coverage", coverage);
app.use("/api/provision", provision);
app.use("/api/userAnalytics", userAnalytics);

const port = process.env.PORT || 3001;
const httpsPort = process.env.HTTPS_PORT || null;

http.createServer(app).listen(port, () => {
  console.log("RUNNING 3001");
});

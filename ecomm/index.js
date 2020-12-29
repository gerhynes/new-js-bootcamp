const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const authRouter = require("./routes/admin/auth");

const app = express();

// Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ["kjljljoipoikjhu"]
  })
);

// Connect routes
app.use(authRouter);

app.listen(3000, () => {
  console.log("App listening on port 3000");
});

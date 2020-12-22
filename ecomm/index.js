const express = require("express");
const bodyParser = require("body-parser");
const usersRepo = require("./repositories/users");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
    <div>
      <form method="POST">
        <input name="email" type="email" placeholder="email"/>
        <input name="password" type="password" placeholder="password"/>
        <input name="passwordConfirmation" type="password" placeholder="password confirmation"/>
        <button>Sign Up</button>
      </form>
    </div>
  `);
});

app.post("/", async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;

  // Check if email in use
  const existingUser = await usersRepo.getOneBy({ email });
  if (existingUser) {
    return res.send("Email already in use");
  }

  // Check for password confirmation
  if (password !== passwordConfirmation) {
    return res.send("Passwords must match");
  }

  res.send("Account created!");
});

app.listen(3000, () => {
  console.log("App listening on port 3000");
});

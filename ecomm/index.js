const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send(`
    <div>
      <form method="POST">
        <input name="email" type="email" placeholder="email"/>
        <input name="password" type="password" placeholder="password"/>
        <input name-"passwordConfirmation" type="password" placeholder="password confirmation"/>
        <button>Sign Up</button>
      </form>
    </div>
  `);
});

app.post("/", (req, res) => {
  res.send("Account created!");
});

app.listen(3000, () => {
  console.log("App listening on port 3000");
});

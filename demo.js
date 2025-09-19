const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const message = {
    message: "Hello, World!",
  };
  res.send(message);
});

app.get("/reflectedxssone", (req, res) => {
  const name =
    req.query.name.replaceAll("<", "").replaceAll(">", "") || "guest ";
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head><Title>Reflected XSS Example</Title></head>
        <body>
            <h1>Welcome ${name}</h1>
        </body>
    </html>`;

  res.send(htmlContent);
});

app.get("/reflectedxsstwo", (req, res) => {
  const url =
    req.query.url.replaceAll("<", "").replaceAll(">", "").replaceAll('"', "") ||
    "https://taylorswift.com ";
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head><Title>XSS Demo Two</Title></head>
        <body>
            <h1>Welcome Everone</h1>
            <a href="${url}">Click here to visit your site</a>
        </body>
    </html>`;

  res.send(htmlContent);
});

const PORT = process.env.PORT || 9999;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import express from 'express';
import dotenv from 'dotenv';

const app = express();
const PORT = process.env.PORT || 3030;

app.use(express.static("public"));

dotenv.config(); // Load environment variables from .env file

app.get("/", (req, res) => {
    res.render("index.ejs");
});


// Route to serve environment variables to the client
app.get('/config', (req, res) => {
    res.json({
      secureToken: process.env.SECURE_TOKEN,
      senderEmail: process.env.SENDER_EMAIL,
      receiverEmail: process.env.RECEIVER_EMAIL
    });
  });

//Data parsing
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json());

app.use("/healthcheck", (req, res) => {
    res.status(200).send("ok");
})

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});


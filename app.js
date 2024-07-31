import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import request from 'request';

const app = express();
const PORT = process.env.PORT || 3030;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

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
      receiverEmail: process.env.RECEIVER_EMAIL,
    });
});


app.post('/submit',function(req,res){
    /* Browse generates the google-recapcha-response key on form submit.
    if its blank or null means user has not selected,
    the captcha then blow error loop occurs.*/
    if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
    return res.json({"responseCode" : 1,"responseDesc" : "Validate captcha first"});
    }
     
    let secretKey = process.env.RECAPTCHA_SECRET_KEY; // Put your secret key here.
    let verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
    // Google will respond with success or error scenario on url request sent.
    request(verificationUrl,function(error,response,body) {
    body = JSON.parse(body);
    // Success will be true or false depending upon captcha validation.
    if(body.success !== undefined && !body.success) {
    return res.json({"responseCode" : 1,"responseDesc" : "Captcha verification has Failed. Try again."});
    }
    res.json({"responseCode" : 0,"responseDesc" : "Captcha validated succesfully!"});
    });
    });
     
    // for handling 404 requests.
    app.use("*",function(req,res) {
    res.status(404).send("404");
    })

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


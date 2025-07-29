import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import request from 'request';

const app = express();
const PORT = process.env.PORT || 3030;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.use(express.static('javascript'));

app.set('view engine', 'ejs');
app.set('views', './views'); // Ensure views folder is correctly set

app.use(express.static("public"));

dotenv.config(); // Load environment variables from .env file

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/project/:projectId", (req, res) => {
    const projectId = req.params.projectId;
    const project = projects.find(p => p.id === projectId);

    if (!project) {
        return res.status(404).send("Project not found");
    }

    res.render("project", { project });  // Ensure project is passed
});

//projects path
const projects = [
    {   id: "consumer-trends-index-2025", 
        title: "Consumer Trends Index 2025", 
        description: "30 day project to create pixel-perfect bilingulal (English and French) Microwebsite from Figma design. Close collaboration with the Design team on every step of the way.",
        coverImage: "/img/cti-higher.gif",
        images: [ // Change 'image' to 'images' and make it an array
            "/img/cti-1.png",
            "/img/cti-2.png",
            "/img/cti-3.png"
        ],
        timeline: '2025',
        website: 'https://meetmarigold.com/cti/overview/',
        role: 'Full Stack Developer, Coding Lead',
        collab: [{ name: 'Maggie Myklebust', website: 'https://www.maggiemyklebust.design/', image: "/img/Maggie-Myklebust.jpeg" }],
        skills: ["PHP", "Javascript","HTML", "SCSS", "Bootstrap", "Wordpress Theme Building", "Figma"]
    },
    {
        id: "sparrow-photography", 
        title: "Sparrow Photography", 
        description: "A website that I originally designed and programmed for a young real estate small business professional. Prototyped in Figma, logo design in Adobe Illustrator, programmed using Express.js and Node.js. I learned how to use AWS Elastic Beanstalk to host it. Worth the time!",
        coverImage: "/img/sparrow-1.png",
        website: "https://www.sparrowrephotography.com/",
        images: [ // Change 'image' to 'images' and make it an array
            "/img/sparrow-2.png",
            "/img/sparrow-3.png",
            "/img/sparrow-4.png"
        ],
        timeline: '2024',
        collab: {name: 'Jonathan Lopez', website:'https://www.sparrowrephotography.com/'},
        github: 'https://github.com/abalakhan/sparrowrephotography',
        figma: 'https://www.figma.com/design/6zwLDn1tpASFcr632m8pJp/Sparrow-Photography-Website-Concept?node-id=0-1&t=9kO5tvfnrZ0YD1Lm-0',
        role: 'Full Stack Developer, Web Designer, Project Manager',
        skills: ["HTML", "CSS", "JS", "Bootstrap", "Express.js", "Node.js", "AWS", "EJS", "Figma", "Logo Design", "Adobe Illustrator"]
    },
    { 
        id: "todo-list", 
        title: "To-do List", 
        description: "A productivity app to unload your brain from all the things you have to do and organize them in one place.",
        image: "/img/to-do-list.png",
        coverImage: "/img/to-do-list.png",
        timeline: '2023',
        github: 'https://github.com/abalakhan/blog-website',
        role: 'Full Stack Developer',
        skills: ["HTML", "CSS", "JS", "Bootstrap", "MongoDB", "Express.js", "React.js", "Node.js"]
    },
    { 
        id: "blog", 
        title: "Blog", 
        description: "Blog website! The posted data is being saved to be read for later. The code is using JS and EJS templates to make magic happen.",
        image: "/img/blog-graphic.png",
        coverImage: "/img/blog-graphic.png",
        timeline: '2023',
        github: 'https://github.com/abalakhan/blog-website',
        figma: '',
        role: 'Full Stack Developer',
        skills: ["HTML", "CSS", "JS", "Bootstrap", "Express.js", "Node.js", "EJS"]
    }
];

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

app.use(express.static("public"));

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});

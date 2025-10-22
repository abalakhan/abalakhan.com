import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import request from 'request';

 // CHANGE PACKAGE.JSON TO BEFORE DEPLOY "start": "node app.js"

const app = express();
const PORT = process.env.PORT || 3030;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

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

const projects = [
    {
       id: "enchanted-spatula", 
        title: "Enchanted Spatula", 
        description: "I wanted to practice implementing AI alongside React, Typescript and SCSS. The program takes in user ingredients and then sends them to Mistral AI via HuggingFace and generates a recipe.",
        coverImage: "/img/enchanted-spatula.gif",
        timeline: '2025',
        website: 'https://enchanted-spatula.onrender.com/',
        role: 'Full Stack Developer, Graphic Designer',
        skills: ["AI Engineering","React","Javascript (Typescript)","HTML", "SCSS", "Material UI", "Figma"] 
    },
    {   id: "consumer-trends-index-2025", 
        title: "Consumer Trends Index 2025", 
        description: "30 day project to create pixel-perfect bilingulal (English and French) Microwebsite from Figma design. Close collaboration with the Design team on every step of the way.",
        coverImage: "/img/cti-higher.gif",
        images: [ 
            "/img/cti-1.png",
            "/img/cti-2.png",
            "/img/cti-3.png"
        ],
        timeline: '2025',
        website: 'https://meetmarigold.com/cti/overview/',
        role: 'Full Stack Developer, Coding Lead',
        skills: ["PHP", "Javascript","HTML", "SCSS", "Bootstrap", "Wordpress Theme Building", "Figma"]
    },
    {
        id: "sparrow-photography", 
        title: "Sparrow Photography", 
        description: "A website that I originally designed and programmed for a young real estate small business professional. Prototyped in Figma, logo design in Adobe Illustrator, programmed using Express.js and Node.js. I learned how to use AWS Elastic Beanstalk to host it. Worth the time!",
        coverImage: "/img/sparrow-1.png",
        images: [ 
            "/img/sparrow-2.png",
            "/img/sparrow-3.png"
        ],
        timeline: '2024',
        collab: {name: 'Jonathan Lopez', website:''},
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
        timeline: '2023',
        website: '',
        github: 'https://github.com/abalakhan/blog-website',
        figma: '',
        role: 'Full Stack Developer',
        skills: ["HTML", "CSS", "JS", "Bootstrap", "MongoDB", "Express.js", "React.js", "Node.js"]
    },
    { 
        id: "blog", 
        title: "Blog", 
        description: "Blog website! The posted data is being saved to be read for later. The code is using JS and EJS templates to make magic happen.",
        image: "/img/blog-graphic.png",
        timeline: '2023',
        website: 'github.com/abalakhan/blog-website',
        github: 'https://github.com/abalakhan/blog-website',
        figma: '',
        role: 'Full Stack Developer',
        skills: ["HTML", "CSS", "JS", "Bootstrap", "Express.js", "Node.js", "EJS"]
    }
];
// Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/project/:projectId", (req, res) => {
  const project = projects.find((p) => p.id === req.params.projectId);
  if (!project) return res.status(404).send("Project not found");
  res.render("project", { project });
});

// Config endpoint
app.get("/config", (req, res) => {
  res.json({
    secureToken: process.env.SECURE_TOKEN,
    senderEmail: process.env.SENDER_EMAIL,
    receiverEmail: process.env.RECEIVER_EMAIL,
  });
});

// Submit endpoint (captcha)
app.post("/submit", (req, res) => {
  const captcha = req.body["g-recaptcha-response"];
  if (!captcha) {
    return res.json({ responseCode: 1, responseDesc: "Validate captcha first" });
  }

  const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}&remoteip=${req.connection.remoteAddress}`;

  request(verificationUrl, (error, response, body) => {
    body = JSON.parse(body);
    if (!body.success) {
      return res.json({ responseCode: 1, responseDesc: "Captcha verification failed." });
    }
    res.json({ responseCode: 0, responseDesc: "Captcha validated successfully!" });
  });
});

// Healthcheck
app.get("/healthcheck", (req, res) => res.status(200).send("ok"));

// 404 handler
app.use("*", (req, res) => res.status(404).send("404"));

app.listen(PORT, () => {
  console.log(`App started at http://localhost:${PORT}`);
});
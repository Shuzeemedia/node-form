const express = require("express")
const app = express()
const ejs = require("ejs")
const path = require('path');

app.set("view engine", "ejs")
app.use(express.urlencoded())

let db = []
let db2 = []

// Serve public folder
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/login", (req, res) => {
    res.render("login", {db})
})

app.get("/dash", (req, res) => {
    res.render("dash", {db2})
})

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    const user = db.find(user => user.email === email && user.password === password);
    
    if (user) {
        db2.push(user)
        res.redirect("/dash");
    } else {
        res.send("User not found or wrong credentials.");
        res.redirect("/dash");
    }

    // app.get("/dash", (req, res) => {
    //     res.render("dash", {user})
    // })
});


app.post("/signup", (req, res) => {
    console.log(req.body);
    db.push(req.body);
    console.log(db);
    res.redirect("/login")
})

const port = 9001
app.listen(port, () => {
    console.log(`At ${port}`);
})
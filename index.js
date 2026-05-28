const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

app.use(methodOverride('_method'));

app.use(express.urlencoded({ extended: true }));

// app.set('views engine', 'pug');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use(express.static(path.join(__dirname, './public')));

let posts = [
    {
        id: uuidv4(),
        username: "Mubashar Hussain",
        title: "My First Post",
        content: "Practice makes perfect!" 
    },
    {
        id: uuidv4(),
        username: "Salman Bashir",
        title: "My Second Post",
        content: "Education is the key to success!"
    },
    {
        id: uuidv4(),
        username: "Bilal Abbas",
        title: "My Third Post",
        content: "Hard work always pays off!"
    }
];

app.delete('/posts', (req, res) => {
  res.render("index.ejs", { posts });
});

app.get(`/posts/new` ,(req , res) => {
    res.render("new.ejs");
});

// app.get(`/posts/:id`, (req, res) => {
//     res.render("new.ejs", { post });
// });

app.patch('/posts/:id', (req, res) => {
    let { id } = req.params;
    const{content, title} = req.body
   // let newContent = req.body.content;
    //let newTitle = req.body.title;
    let post = posts.find(p => p.id === id);
    post.content = content;
    post.title = title; // Update the title as well
    console.log(id);
    console.log(post);
    // res.send("Post updated successfully!");
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find(p => p.id === id);
    res.render("edit.ejs", { post });
});

app.delete('/posts/:id', (req, res) => {
    let { id } = req.params;
    // let post = posts.filter(p => p.id === id);
    posts = posts.filter(p => p.id !==   id);
    console.log(id);
    // res.send("Post deleted successfully!");
    res.redirect("/posts");
});

app.post('/posts', (req, res) => {
    let { username, content, title } = req.body;
    let newPost = {
        id: uuidv4(),
        username,
        content,
        title
    };
    posts.push(newPost);
    console.log(req.body);
    res.redirect('/posts');
    // res.send("Post created successfully!");
    // res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.get('/posts/:id', (req, res) => {
    let { id } = req.params;
    let post = posts.find(p => p.id === id);
    console.log(post);
    // res.send("Post found successfully!");
    res.render("show.ejs",{ post });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


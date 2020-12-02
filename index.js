const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Blog = require('./models/blogs');

//Middlewares
app.use(express.urlencoded({extended:true}))
app.use(express.static('./public'));
app.set('view engine','ejs');


//Database connection
const dbURI = 'Paste your connection URL here'
mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true})
.then((result)=>{
console.log('Connected to DB');
})
.catch((err)=>{
console.log(err);
})



//Index
app.get('/',(req,res)=>{
  res.redirect('/blogs')
})


//Blogs
app.get('/blogs',(req,res)=>{
  
  Blog.find().then((result)=>{
    res.render('blogs',{blogs: result});
  })
  .catch((err)=>{
  console.log(err)
  })
})
app.get('/blogs/createBlogs',(req,res)=>{
  res.render('createBlogs')
})

app.get('/blogs/:id',(req,res)=>{
  const id = req.params.id;
  Blog.findById(id).then((result)=>{
    res.render('details',{blogs:result})
  })
  .catch((err)=>{
    console.log(err)
  })

})

app.delete('/blogs/:id',(req,res)=>{
const id = req.params.id;

Blog.findByIdAndDelete(id).then((result)=>{
res.json({redirect: '/blogs'})
}).catch((err)=>{console.log(err)});
})

app.post('/blog/addBlogs',(req,res)=>{
console.log(req.body);
const blog = Blog(req.body)
blog.save().then((result)=>{
res.redirect('/blogs')
})
})
//About
app.get('/about',(req,res)=>{
  res.render('about')
})

app.listen(3000);
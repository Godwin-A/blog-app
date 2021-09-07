var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var method = require('method-override')
// mongoose.set(');
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
// mongoose.set(');
 var app = express()
 app.use(method('_method'))
 app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))
mongoose.connect('mongodb://localhost/blogapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
var blogSchema = new mongoose.Schema({
  title : String,
  image : String,
  body : String,
  created : {type:Date, default: Date.now}
})



var Blog = mongoose.model('Blog', blogSchema )
// Blog.create({
//   title : 'Test Blog',
//   image : 'https://images.unsplash.com/photo-1627662236865-75ef4bba23a0?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
//   body : 'Hello this is a blog post'
// }, function(err, blog){
//   if(err){
//     console.log(err)
//   }else{
//     console.log(blog)
//   }
// })

app.get('/', function(req, res){
  res.redirect('/blogs')
})
 app.get('/blogs', function(req,res){
   Blog.find({}, function(err, blogs){
     if(err){
       console.log(err)
     }else{
       res.render('index', {blogs: blogs})
     }
   })
 })
 app.get('/blogs/new', function(req, res){
   res.render('new')
 })
 app.post('/blogs', function(req, res){
   Blog.create(req.body.blog, function(err, blog){
     if(err){
       console.log(err)
     }else{
       res.redirect('/blogs')
     }
   })
 })
 app.get('/blogs/:id', function(req, res){
   Blog.findById(req.params.id, function(err, found){
     if(err){
       res.redirect('/blogs')
     }else{
         res.render('show', {blog:found})
     }
   })
 })
 app.get('/blogs/:id/edit', function(req, res){
   Blog.findById(req.params.id,  function(err, updated){
     if(err){
       res.redirect('/blogs')
     }else{
       res.render('edit', {blog:updated})
     }
   })
 })
app.put('/blogs/:id', function(req, res){
 Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, done){
   if(err){
     res.redirect('/blogs')
   }else{
     res.redirect('/blogs/:id'+ req.params.id)
   }
 })
})
app.delete('/blogs/:id', function(req, res){
 Blog.findByIdAndRemove(req.params.id, function(err){
   if(err){
     res.redirect('/blogs')
    }else{
      res.redirect('/blogs')
    }
 })
})


app.listen(4500, function(){
  console.log('blog server is running')
})
import express from 'express';
import path,  { dirname } from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import methodOverride from 'method-override';

const app = express();
const port = 8080;

// Get __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views/crud'));
app.use(express.static(path.join(__dirname, 'public')));

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

let posts = [
  {
    id: uuidv4(),
    userName: 'John Doe',
    content: 'This is a sample post.',
  },
  {
    id: uuidv4(),
    userName: 'Pragya Samadhiya',
    content: 'This is another sample post.',
  },
  {
    id: uuidv4(),
    userName: 'Utkarsha Sharma',
    content: 'This is yet another sample post.',
  }
];

app.get('/post', (req, res) => {
  res.render('post.ejs', { posts });
});

app.get('/post/new', (req, res) => {
  res.render('new.ejs');
}); 

app.post('/post', (req, res) =>{
  const { userName, content } = req.body;
  let id = uuidv4();
  posts.push({id, userName, content });
  res.redirect('/post'); 
});

app.get('/post/:id', (req, res) =>{
  let {id} = req.params;
  let post = posts.find((post) => post.id == id);
  if (!post) {
    return res.status(404).send('Post not found');
  }
  res.render('singlePost.ejs', { post });
});

app.patch('/post/:id', (req, res) => {
  let { id } = req.params;
  console.log(id);
  let newContent = req.body.content;
  console.log(newContent);
  let post = posts.find((post) => post.id == id);
  post.content = newContent;
  console.log(post);
  res.redirect('/post');
});

app.get('/post/:id/edit', (req, res) => {
  let { id } = req.params;
  let post = posts.find((post) => post.id == id);
  if (!post) {
    return res.status(404).send('Post not found');
  }
  res.render('edit.ejs', { post });
});

app.delete('/post/:id', (req, res) => {
  let { id } = req.params;
  posts = posts.filter((post) => post.id != id);
  res.redirect('/post');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

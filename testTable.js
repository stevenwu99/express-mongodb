const mongoose = require('./db/connection.js');

const userSchema = new mongoose.Schema({
  name: String,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
});

const User = mongoose.model('User', userSchema);

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Post = mongoose.model('Post', postSchema);

const user1 = new User({ name: 'Alice' });
const user2 = new User({ name: 'Bob' });

const post1 = new Post({ title: 'Post 1', content: 'Content 1', user: user1 });
const post2 = new Post({ title: 'Post 2', content: 'Content 2', user: user2 });

user1.posts.push(post1);
user2.posts.push(post2);

console.log(user1);

console.log(user2);

user1.save();
user2.save();
post1.save();
post2.save();

console.log("OK............")
// pages/posts/[id].js

import { posts } from '../../data/posts';
import { useState } from 'react';

const Post = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>

      <section>
        <h3>Comments</h3>
        <form onSubmit={handleCommentSubmit}>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment"
          />
          <button type="submit">Add Comment</button>
        </form>

        <ul>
          {comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export async function getStaticPaths() {
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const post = posts.find((p) => p.id === id);

  return {
    props: {
      post,
    },
  };
}

export default Post;

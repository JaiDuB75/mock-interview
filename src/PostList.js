import React from "react";

function PostList({ user = {}, posts }) {
  if (posts.length >= 1) {
    return (
      <>
        <h3>{user.name} Posts</h3>
        <ul>{posts.map((post) => {
            return (
                <li key={post.id}>
                    Id Number: {post.id} - Post Title: {post.title} - Post Content: {post.body}
                </li>
            );
        })}</ul>
      </>
    );
  }
}

export default PostList;
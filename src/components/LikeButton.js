import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

import MyPopup from "../util/MyPopup";
function LikeButton({ user, post: { id, likeCount, likes } }) {
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });

  const likeButton = user ? (
    liked ? (
      <button className="ui teal button">
        <i aria-hidden="true" className="heart icon"></i>
      </button>
    ) : (
      <button className="ui teal basic button">
        <i aria-hidden="true" className="heart icon"></i>
      </button>
    )
  ) : (
    <button as={Link} to={`/login`} className="ui teal basic button">
      <i aria-hidden="true" className="heart icon"></i>
    </button>
  );

  return (
    <div
      className="ui right labeled button"
      role="button"
      tabIndex="0"
      onClick={user ? likePost : null}
    >
      <MyPopup content={liked ? "Unlike" : "Like"}>{likeButton}</MyPopup>
      <button className="ui teal left pointing basic label">{likeCount}</button>
    </div>
  );
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;

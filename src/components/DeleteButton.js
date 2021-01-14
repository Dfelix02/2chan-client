import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { Confirm } from "semantic-ui-react";

import { FETCH_POSTS_QUERY } from "../util/graphql";
import MyPopup from "../util/MyPopup";

function DeleteButton({ postId, commentId, callBack }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;
  const [deletePostOrMutation] = useMutation(mutation, {
    update(proxy) {
      setConfirmOpen(false);
      if (!commentId) {
        const data = proxy.readQuery({
          query: FETCH_POSTS_QUERY,
        });
        proxy.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: { getPosts: data.getPosts.filter((p) => p.id !== postId) },
        });
        if (callBack) {
          callBack();
        }
      }
    },
    variables: {
      postId,
      commentId,
    },
    onError(err) {
      console.log(err);
    },
  });

  return (
    <>
      <MyPopup content={commentId ? "Delete comment" : "Delete Post"}>
        <div
          className="ui labeled button"
          role="button"
          tabIndex="0"
          style={{ float: "right" }}
          onClick={() => setConfirmOpen(true)}
        >
          <button className="ui red button">
            <i
              aria-hidden="true"
              className="trash icon"
              style={{ margin: 0 }}
            ></i>
          </button>
        </div>
      </MyPopup>

      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrMutation}
      />
    </>
  );
}

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;
export default DeleteButton;

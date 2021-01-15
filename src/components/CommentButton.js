import React from "react";
import { Link } from "react-router-dom";

function CommentButton({ commentCount }) {
  return (
    <div className="ui right labeled button" role="button" tabIndex="0">
      <button className="ui blue basic button">
        <i aria-hidden="true" className="comments icon"></i>
      </button>
      <button className="ui blue left pointing basic label">
        {commentCount}
      </button>
    </div>
  );
}

export default CommentButton;

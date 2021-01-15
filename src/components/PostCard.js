import React, { useContext } from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";

import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
import MyPopup from "../util/MyPopup";

function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) {
  const { user } = useContext(AuthContext);
  return (
    <Card fluid>
      <p>test</p>
      <Card.Content as={Link} to={`/posts/${id}`}>
        <Image
          floated="right"
          size="mini"
          src="https://semantic-ui.com/images/avatar2/small/matthew.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div>
          <LikeButton user={user} post={{ id, likes, likeCount }} />
          <MyPopup content="Comment on post">
            <Button labelPosition="right">
              <Button color="blue" basic as={Link} to={`/posts/${id}`}>
                <Icon name="comments" />
              </Button>
              <Label basic color="blue" pointing="left">
                {commentCount}
              </Label>
            </Button>
          </MyPopup>

          {user && user.username === username && <DeleteButton postId={id} />}
        </div>
      </Card.Content>
    </Card>
  );
}

export default PostCard;

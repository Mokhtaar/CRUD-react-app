import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { addNewComment, deletePost } from "../api";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Button } from "@mui/material";
import format from "date-fns/format";

const PostDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  let selectedPost = posts?.find((post) => post.id === +id);

  return (
    <div>
      <Card bg="light" text="" style={{ width: "30rem" }} className="mb-2">
        <Card.Header>
          {format(new Date(selectedPost.createdAt), "P, p")}
        </Card.Header>
        <Card.Body style={{ height: "15rem" }}>
          <Card.Title>{selectedPost?.title}</Card.Title>
          <Card.Text>{selectedPost?.body}</Card.Text>
        </Card.Body>
        <div className="d-flex justify-content-end">
          <div className="d-flex flex-row">
            <BsTrash
              role={"button"}
              className="me-1"
              size={"25px"}
              onClick={() => {
                (deletePost(selectedPost, dispatch));
              }}
            />
            <FiEdit size={"25px"} role={"button"} />
          </div>
          <div>
            <Link to="/">Show all posts</Link>
          </div>
        </div>

        <div>
          {selectedPost?.comments.map((comment) => (
            <Card.Text key={comment.id}>{comment.body}</Card.Text>
          ))}
        </div>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField id="AddComment" label="Add comment" variant="standard" />
          <Button
            variant="text"
            onClick={() =>
              addNewComment(
                selectedPost?.id,
                document.getElementById("AddComment").value,
                dispatch
              )
            }
            // Another way, but not the best practise

            //   async () => {
            //   try {
            //     const payload = {
            //       id: selectedPost?.id,
            //       comment: document.getElementById("AddComment").value,
            //     };
            //     const body = { body: payload.comment, userId: 1 };

            //     const commentResponse = await API.post(
            //       `/post/${payload.id}/comment`,
            //       body
            //     );
            //     console.log({ commentResponse });
            //     const postsResponse = await API.get("/post");
            //     console.log({ postsResponse });
            //     dispatch(
            //       addComment({
            //         comment: commentResponse.data,
            //         posts: postsResponse.data.data,
            //       })
            //     );
            //   } catch (error) {
            //     console.error({ error });
            //   }
            // }}
          >
            Add comment
          </Button>
        </Box>
      </Card>
    </div>
  );
};

export default PostDetails;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../redux/postSlice";
import { deletePost } from "../api";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
// import { format } from "timeago.js";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import AddPost from "../components/addPost";
import format from "date-fns/format";
import NvBar from "../components/navbar";

const Home = () => {
  const posts = useSelector((state) => state.posts.filtered);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
    // const controller = new AbortController();
    // const signal = controller.signal;
    // async function fetchPosts() {
    //   try {
    //     const response = await api.get("/post", {
    //       signal,
    //     });
    //     dispatch(fetchAllPosts(response.data.data));
    //   } catch (error) {
    //     if (signal.aborted) {
    //       console.log("Aborted");
    //     } else {
    //       console.log(error.message);
    //     }
    //   }
    // }
    // fetchPosts();
    // return () => controller.abort();
  }, [dispatch]);
  return (
    <div>
      <NvBar />
      <div className="d-flex justify-content-center mt-3">
        <AddPost />
      </div>

      {posts.map((post) => (
        <Card
          className="m-auto mb-3 mt-3"
          key={post.id}
          style={{ width: "25rem" }}
        >
          <Card.Body>
            <Card.Text>{format(new Date(post.createdAt), "P, p")}</Card.Text>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>
              {post.body.length <= 25
                ? post.body
                : `${post.body.slice(0, 75)}...`}
            </Card.Text>
            <div className="d-flex justify-content-end">
              <BsTrash
                role={"button"}
                className="me-1"
                size={"25px"}
                onClick={(e) => deletePost(post, dispatch)}
              />
              <FiEdit size={"25px"} role={"button"} />
            </div>
            <Link to={`/post/${post.id}`}>Show more</Link>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};
export default Home;

import axios from "axios";
import { addComment, delete1Post } from "../redux/postSlice";

const API = axios.create({
  baseURL: "http://localhost:4000",
});

export const addNewComment = async (postId, body, dispatch) => {
  try {
    await API.post(`/post/${postId}/comment`, {
      body,
      userId: 1,
    });
    const posts = await API.get("/post");
    dispatch(addComment(posts.data.data));
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = async (post, dispatch) => {
  try {
    await API.delete(`/post/${post.id}`);
    const posts = await API.get("/post");
    dispatch(delete1Post(posts.data.data));
  } catch (error) {
    console.log(error.message);
  }
};

export default API;

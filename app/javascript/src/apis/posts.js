import axios from "axios";

const fetch = () => axios.get("/posts");

const show = slug => axios.get(`/posts/${slug}`);

const create = payload => axios.post("/posts", { post: payload });

const update = ({ slug, payload }) =>
  axios.put(`/posts/${slug}`, {
    post: payload,
  });

const destroy = slug => axios.delete(`/posts/${slug}`);

const myPosts = () => axios.get("/posts/my_posts");

const postsApi = { fetch, create, show, update, destroy, myPosts };

export default postsApi;

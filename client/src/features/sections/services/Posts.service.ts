import axios from "axios";

import { PostGet, FormConnect } from "../models/Post.interface";
import { config } from "../../auth/CSRFToken";

const POST = `/post/`;
const CATEGORY_DEPTH = `/category/depth/`;
const CATEGORY_SLUG = `/category/`;
const CATEGORY_SLUG_SLUG = `/category/slug/`;

const getPosts = async (categorySlug: string) => {
  const response = await axios.get<PostGet[]>(categorySlug + POST, config);

  return response;
};

const getPost = async (id: string | undefined) => {
  const response = await axios.get<PostGet>(POST + id + "/", config);

  return response;
};

const updatePost = async (
  form: FormConnect
): Promise<{ post: PostGet | undefined }> => {
  const response = await axios.put(POST + form["id"] + `/`, form, config);

  return response.data;
};

const createPost = async (
  form: FormConnect
): Promise<{ post: PostGet | undefined }> => {
  console.log(form);
  const response = await axios.post(POST, form, config);

  return response.data;
};

const deletePost = async (id: string | undefined) => {
  const response = await axios.delete(
    POST + id + `/`,

    config
  );

  return response.data;
};

const authService = {
  getPosts,
  getPost,
  updatePost,
  createPost,
  deletePost,
};

export default authService;

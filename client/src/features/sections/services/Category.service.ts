import axios from "axios";
import { config } from "../../auth/CSRFToken";
import { CategoryGet, FormConnect } from "../models/Category.interface";

const CATEGORY = `/category/`;
const CATEGORY_DEPTH = `/category/depth/`;
const CATEGORY_SLUG = `/category/`;
const CATEGORY_SLUG_SLUG = `/category/slug/`;

const getCategorys = async () => {
  const response = await axios.get<CategoryGet[]>(CATEGORY, config);
  return response;
};

const getCategoryDepth = async () => {
  const response = await axios.get<CategoryGet[]>(CATEGORY_DEPTH, config);
  return response;
};

const getCategory = async (slug: string | undefined) => {
  const response = await axios.get<CategoryGet | null>(
    CATEGORY_SLUG + slug,
    config
  );
  return response;
};

const getCategorySlug = async (slug: string | undefined) => {
  const response = await axios.get<CategoryGet>(
    CATEGORY_SLUG_SLUG + slug,
    config
  );
  return response;
};

const updateCategory = async (
  form: FormConnect
): Promise<{ category: CategoryGet | null }> => {
  const response = await axios.put(CATEGORY + form["id"], form, config);
  return response.data;
};

const createCategory = async (
  form: FormConnect
): Promise<{ category: CategoryGet | null }> => {
  const response = await axios.post(CATEGORY, form, config);
  console.log(form);
  return response.data;
};

const deleteCategory = async (id: string | undefined) => {
  const response = await axios.delete(CATEGORY + id, config);
  return response.data;
};

const authService = {
  getCategorys,
  getCategoryDepth,
  getCategory,
  getCategorySlug,
  updateCategory,
  createCategory,
  deleteCategory,
};

export default authService;

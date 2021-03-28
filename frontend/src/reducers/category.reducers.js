import { categoryContants } from "../actions/constants";

const initState = {
  categories: [],
  loading: false,
  error: null,
};

const buildNewCategories = (parentId, categories, category) => {
  let myCategories = [];

  if (parentId === undefined) {
    return [
      ...categories,
      {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        type: category.type,
        children: [],
      },
    ];
  }

  for (let cat of categories) {
    if (cat._id === parentId) {
      const newCategory = {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        parentId: category.parentId,
        type: category.type,
        children: [],
      };
      myCategories.push({
        ...cat,
        children: cat.children.length > 0 ? [...cat.children, newCategory] : [newCategory],
      });
    } else {
      myCategories.push({
        ...cat,
        children: cat.children ? buildNewCategories(parentId, cat.children, category) : [],
      });
    }
  }

  return myCategories;
};

export default (state = initState, action) => {
  console.log(action);
  switch (action.type) {
    case categoryContants.GET_ALL_CATEGORIES_SUCCESS:
      state = { ...state, categories: action.payload.categories };
      break;
    case categoryContants.ADD_NEW_CATEGORY_REQUEST:
      state = { ...state, loading: true };
      break;
    case categoryContants.ADD_NEW_CATEGORY_SUCCESS:
      const category = action.payload.category;
      const updateCategories = buildNewCategories(category.parentId, state.categories, category);
      console.log(updateCategories);

      state = {
        ...state,
        categories: updateCategories,
        loading: false,
      };
      break;
    case categoryContants.ADD_NEW_CATEGORY_FAILURE:
      state = { ...initState };
      break;
    case categoryContants.UPDATE_CATEGORIES_REQUEST:
      state = { ...state, loading: true };
      break;
    case categoryContants.UPDATE_CATEGORIES_SUCCESS:
      state = { ...state, loading: false };
      break;
    case categoryContants.UPDATE_CATEGORIES_FAILURE:
      state = { ...state, loading: false, error: action.payload.error };
      break;
    case categoryContants.DELETE_CATEGORIES_REQUEST:
      state = { ...state, loading: true };
      break;
    case categoryContants.DELETE_CATEGORIES_SUCCESS:
      state = { ...state, loading: false };
      break;
    case categoryContants.DELETE_CATEGORIES_FAILURE:
      state = { ...state, loading: false, error: action.payload.error };
      break;
  }
  return state;
};

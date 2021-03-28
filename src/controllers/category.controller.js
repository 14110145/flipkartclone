const Category = require("../models/category.model");
const slugify = require("slugify");

function createCategories(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }
  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      type: cate.type,
      parentId: cate.parentId,
      children: createCategories(categories, cate._id),
    });
  }
  return categoryList;
}

exports.addCategory = (req, res) => {
  const categoryObj = {
    name: req.body.name,
    slug: slugify(req.body.name),
  };
  if (req.file) {
    categoryObj.categoryImage = process.env.API + "/public/" + req.file.filename;
  }
  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }

  const cat = new Category(categoryObj);
  cat.save((error, category) => {
    if (error) {
      return res.status(400).json({ error });
    }
    if (category) {
      return res.status(201).json({ category });
    }
  });
};

exports.getCategories = (req, res) => {
  Category.find({}).exec((error, categories) => {
    if (error) {
      return res.status(400).json({ error });
    }
    if (categories) {
      const categoryList = createCategories(categories);

      return res.status(200).json({ categoryList });
    }
  });
};

exports.updateCategories = async (req, res) => {
  const { name, parentId, type, _id } = req.body;
  const updateCategories = [];
  if (name instanceof Array) {
    for (let i = 0; i < name.length; i++) {
      const category = {
        name: name[i],
        type: type[i],
      };
      if (parentId[i] !== "") {
        category.parentId = parentId[i];
      }
      const updatedCategory = await Category.findOneAndUpdate({ _id: _id[i] }, category, {
        new: true,
      });
      updateCategories.push(updatedCategory);
    }
    return res.status(201).json({ updateCategories });
  } else {
    const category = { name, type };
    if (parentId !== "") {
      category.parentId = parentId;
    }
    const updatedCategory = await Category.findOneAndUpdate({ _id }, category, {
      new: true,
    });
    return res.status(201).json({ updatedCategory });
  }
};

exports.deleteCategories = async (req, res) => {
  const { id } = req.body.payload;
  const deletedcategories = [];
  for (let i = 0; i < id.length; i++) {
    const deleteCategory = await Category.findOneAndDelete({ _id: id[i]._id });
    deletedcategories.push(deleteCategory);
  }
  if (deletedcategories.length === id.length) {
    return res.status(201).json({ message: "Categories removed" });
  } else {
    return res.status(400).json({ message: "Something went wrong" });
  }
};

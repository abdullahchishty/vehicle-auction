const Category = require('../../models/categoryModel/category');
const mongoose = require('mongoose');

const buildCategoryHierarchy = (categories) => {
    const categoryMap = new Map();
    const rootCategories = [];
    categories.forEach(category => {
        categoryMap.set(category._id.toString(), { ...category.toObject(), children: [] });
    });
    categories.forEach(category => {
        if (category.parentCategory) {
            const parent = categoryMap.get(category.parentCategory.toString());
            if (parent) {
                parent.children.push(categoryMap.get(category._id.toString()));
            }
        } else {
            rootCategories.push(categoryMap.get(category._id.toString()));
        }
    });
    return rootCategories;
};

const adjustImage = (image) => {
    return image ? image.replace(/\\/g, "/").replace("src/", "") : null;
};

module.exports = {
    addCategory: async (req, res) => {
        try {
            const { name, description, parentCategory } = req.body;
            if (!name) {
                return res.status(400).json({ message: 'Name is required' });
            }
            const image = req.file ? req.file.path : null;
            const category = new Category({
                name,
                description,
                parentCategory: parentCategory,
                image: adjustImage(image),
            });
            await category.save();
            return res.status(201).json([category]);
        } catch (error) {
            console.error(error);
            return res
                .status(500)
                .json({ message: "Server error", error: error.message });
        }
    },
    getCategory: async (req, res) => {
        try {
            const { id, name } = req.query;
            let category;

            if (id) {
                category = await Category.findById(id)
                    .populate('parentCategory', 'name description image parentCategory')
                    .populate('attributes', 'name');
                if (!category) {
                    return res.status(404).json({ message: 'Category not found' });
                }
                return res.status(200).json([category]);
            }
            if (name) {
                category = await Category.find({
                    name: { $regex: name, $options: 'i' }
                })
                    .populate('parentCategory', 'name description image parentCategory')
                    .populate('attributes', 'name');
                return res.status(200).json(category);
            }
            const categories = await Category.find()
            const categoryHierarchy = buildCategoryHierarchy(categories);
            return res.status(200).json(categoryHierarchy);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error', error: error.message });
        }
    },
    updateCategory: async (req, res) => {
        try {
            const { id } = req.query;
            const { name, description, parentCategory } = req.body;
            const category = await Category.findById(id);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
            if (name) category.name = name;
            if (description) category.description = description;
            if (parentCategory) category.parentCategory = parentCategory;
            if (req.file) {
                category.image = adjustImage(req.file.path);
            }
            await category.save();
            return res.status(200).json([category]);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error', error: error.message });
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const { id } = req.query;
            const category = await Category.findById(id);

            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }

            await category.deleteOne();
            return res.status(200).json({ message: 'Category deleted successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error', error: error.message });
        }
    },
};

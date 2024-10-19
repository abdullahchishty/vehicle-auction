const VehicleAttribute = require('../../models/vehicleAttributeModels/vehicleAttribute');
const AttributeFeature = require('../../models/vehicleAttributeFeatureModel/attributeFeatures');
const VehicleCategory = require('../../models/categoryModel/category');

module.exports = {
    addAttribute: async (req, res) => {
        try {
            const { name, category, attributes } = req.body;
            if (!name || !category) {
                return res.status(400).json({ message: 'Name and category are required' });
            }
            const attributeArray = attributes.split(',');
            const attributeFeatures = [];
            for (const attributeName of attributeArray) {
                const feature = new AttributeFeature({
                    name: attributeName.trim()
                });
                await feature.save(); 
                attributeFeatures.push(feature._id); 
            }
            const attribute = new VehicleAttribute({
                name: name,
                category: category,
                attributeFeatures: attributeFeatures 
            });
            await attribute.save();

            await VehicleCategory.findByIdAndUpdate(
                category, 
                { $push: { attributes: attribute._id } },
                { new: true } 
            );

            return res.status(201).json([
                attribute
            ]);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error', error: error.message });
        }
    },
    getAttributes: async (req, res) => {
        try {
            const { id, name } = req.query; 
            let query = {};
            if (id) {
                query._id = id;
            }
            if (name) {
                query.name = new RegExp(name, 'i');
            }
            const attributes = await VehicleAttribute.find(query)
                .populate('attributeFeatures', 'name')  
                .populate('category', 'name')    
                .exec();  
            if (attributes.length === 0) {
                return res.status(404).json({ message: 'No attributes found' });
            }
            return res.status(200).json(attributes); 
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error', error: error.message });
        }
    },
    updateAttribute: async (req, res) => {
        try {
            const { id } = req.query;
            const { name, category, attributes } = req.body;
            const attribute = await VehicleAttribute.findById(id);
            if (!attribute) {
                return res.status(404).json({ message: "Attribute not found" });
            }
            if (name) {
                attribute.name = name;
            }
    
            if (category) {
                if (attribute.category.toString() !== category) {
                    await VehicleCategory.findByIdAndUpdate(attribute.category, {
                        $pull: { attributes: id },
                    });

                    await VehicleCategory.findByIdAndUpdate(category, {
                        $push: { attributes: id },
                    });
                    attribute.category = category;
                }
            }
            if (attributes) {
                const attributeArray = attributes.split(',').map(attr => attr.trim());
                const newAttributeFeatures = [];
                for (const attributeName of attributeArray) {
                    let feature = await AttributeFeature.findOne({ name: attributeName });
                    if (!feature) {
                        feature = new AttributeFeature({ name: attributeName });
                        await feature.save();
                    }
                    newAttributeFeatures.push(feature._id);
                }
                attribute.attributeFeatures = newAttributeFeatures;
            }
            await attribute.save();
    
            return res.status(200).json({
                message: "Attribute updated successfully",
                attribute
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error', error: error.message });
        }
    },
    deleteAttribute :  async (req, res) => {
        try {
            const { id } = req.query;
            const attribute = await VehicleAttribute.findById(id);
            if (!attribute) {
                return res.status(404).json({ message: 'Attribute not found' });
            }
            await VehicleCategory.updateMany(
                { attributes: id },
                { $pull: { attributes: id } }
            );

            await AttributeFeature.deleteMany({
                _id: { $in: attribute.attributeFeatures } 
            });

            await VehicleAttribute.findByIdAndDelete(id);
    
            return res.status(200).json({ message: 'Attribute and associated features deleted successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
};

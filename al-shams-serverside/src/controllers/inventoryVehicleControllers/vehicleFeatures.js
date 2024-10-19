const VehicleFeatures = require('../../models/inventoryVehicleModel/vehicleFeatures');

module.exports = {
    addFeature: async (req, res) => {
        try {
            const { name } = req.body;
            const feature = new VehicleFeatures({
                name,
            });
            await feature.save();
            return res.status(201).json([feature]);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error', error: error.message });
        }
    },
    getFeature: async (req, res) => {
        try {
            const { id, name } = req.query;
            let feature;
            if (id) {
                feature = await VehicleFeatures.findById(id)
                if (!feature) {
                    return res.status(404).json({ message: 'feature not found' });
                }
                return res.status(200).json([feature]);
            }
            if (name) {
                feature = await VehicleFeatures.find({
                    name: { $regex: name, $options: 'i' }
                })
                return res.status(200).json(feature);
            }
            feature = await VehicleFeatures.find()
            return res.status(200).json(feature);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error', error: error.message });
        }
    },
    updateFeature: async (req, res) => {
        try {
            const { id } = req.query;
            const { name} = req.body;
            const feature = await VehicleFeatures.findById(id);
            if (!feature) {
                return res.status(404).json({ message: 'feature not found' });
            }
            if (name) feature.name = name;
            await feature.save();
            return res.status(200).json([feature]);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error', error: error.message });
        }
    }, 
    deleteFeature: async (req, res) => {
        try {
            const { id } = req.query;
            const feature = await VehicleFeatures.findById(id);
            if (!feature) {
                return res.status(404).json({ message: 'Feature not found' });
            }
            await feature.deleteOne();
            return res.status(200).json({ message: 'Feature deleted successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error', error: error.message });
        }
    },
};

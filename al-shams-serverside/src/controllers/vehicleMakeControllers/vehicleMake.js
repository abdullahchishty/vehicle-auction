const VehicleMake = require('../../models/vehicleMakeModel/make');

module.exports = {
    addMake: async (req, res) => {
        try {
            const { make,type } = req.body;
            if (!make || !type) {
                return res.status(400).json({ message: 'Make and type are required' });
            }
            const image = req.file ? req.file.path : null;
            const vehicleMake = new VehicleMake({
                make:make,
                type:type,
                image,image
            });
            await vehicleMake.save();
            return res.status(201).json([vehicleMake]);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error', error: error.message });
        }
    },
    getMake: async (req, res) => {
        try {
            const { id, make, type } = req.query;
            let vehicleMake;
            if (id) {
                vehicleMake = await VehicleMake.findById(id)
                .populate('models','model _id').exec();
                if (!vehicleMake) {
                    return res.status(404).json({ message: 'Vehicle Make not found' });
                }
                return res.status(200).json([vehicleMake]);
            }
            if (make) {
                vehicleMake = await VehicleMake.find({
                    make: { $regex: make, $options: 'i' }
                })
                .populate('models','model _id').exec();
                return res.status(200).json(vehicleMake);
            }
            if(type)
            {
                vehicleMake = await VehicleMake.find({
                    type: { $regex: type, $options: 'i' }
                }).populate('models','model _id').exec();
                return res.status(200).json(vehicleMake);
            }
            vehicleMake = await VehicleMake.find()
            .populate('models','model _id').exec();
            return res.status(200).json(vehicleMake);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error', error: error.message });
        }
    },
    updateMake: async (req, res) => {
        try {
            const { id } = req.query;
            const { make, type} = req.body;
            const image = req.file ? req.file.path : null;
            const vehicleMake = await VehicleMake.findById(id);
            if (!vehicleMake) {
                return res.status(404).json({ message: 'vehicleMake not found' });
            }
            if (make) vehicleMake.make = make;
            if (type) vehicleMake.type= type;
            if (image) vehicleMake.image = image;
            await vehicleMake.save();
            return res.status(200).json([vehicleMake]);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error', error: error.message });
        }
    }, 
    deleteMake: async (req, res) => {
        try {
            const { id } = req.query;
            const vehicleMake = await VehicleMake.findById(id);
            if (!vehicleMake) {
                return res.status(404).json({ message: 'Vehicle Make not found' });
            }
            await vehicleMake.deleteOne();
            return res.status(200).json({ message: 'Vehicle Make deleted successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error', error: error.message });
        }
    },
};

const VehicleModel = require('../../models/vehicleModel/model');
const VehicleMake = require('../../models/vehicleMakeModel/make');

module.exports = {
    addModel: async (req, res) => {
        try {
            const { model, make } = req.body;
            if (!model || !make) {
                return res.status(400).json({ message: 'Model and Make are required' });
            }
            const vehicleModel = new VehicleModel({
                model: model,
                make: make
            });
            const savedModel = await vehicleModel.save();

            await VehicleMake.findByIdAndUpdate(
                make, 
                { $push: { models: savedModel._id } }
            );
    
            return res.status(201).json([savedModel]);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error', error: error.message });
        }
    },
    
    getModel: async (req, res) => {
        try {
            const { id, model, make} = req.query;
            let vehicleModel;
            if (id) {
                vehicleModel = await VehicleModel.findById(id).populate('make','make').exec();
                if (!vehicleModel) {
                    return res.status(404).json({ message: 'Vehicle Model not found' });
                }
                return res.status(200).json([vehicleModel]);
            }
            if (model) {
                const getMake = await VehicleMake.findOne({ make }).exec();
                console.log(getMake)
                if (!getMake) {
                    return res.status(404).json({ message: 'Vehicle Make not found' });
                }
                const vehicleModels = await VehicleModel.find({ make: getMake._id }).exec();
                return res.status(200).json(vehicleModels);
            }
            if(make)
            {
                const foundMake = await VehicleMake.findOne({ make }).exec();
                if (!foundMake) {
                    return res.status(404).json({ message: 'Vehicle Make not found' });
                }
                const vehicleModels = await VehicleModel.find({ make: foundMake._id }).exec();
                return res.status(200).json(vehicleModels);
            }
            vehicleModel = await VehicleModel.find().populate('make','make type').exec();
            return res.status(200).json(vehicleModel);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error', error: error.message });
        }
    },
    updateModel: async (req, res) => {
        try {
            const { id } = req.query;  
            const { model, make } = req.body; 

            const vehicleModel = await VehicleModel.findById(id);
            if (!vehicleModel) {
                return res.status(404).json({ message: 'Vehicle Model not found' });
            }

            if (model) {
                vehicleModel.model = model;
            }

            if (make) {
                const oldMakeId = vehicleModel.make;
    
                const newMake = await VehicleMake.findById(make).exec();
                if (!newMake) {
                    return res.status(404).json({ message: 'New Vehicle Make not found' });
                }
    
                vehicleModel.make = newMake._id;

                if (oldMakeId.toString() !== newMake._id.toString()) {
                    await VehicleMake.findByIdAndUpdate(oldMakeId, {
                        $pull: { models: vehicleModel._id }
                    });

                    await VehicleMake.findByIdAndUpdate(newMake._id, {
                        $push: { models: vehicleModel._id }
                    });
                }
            }
    
            await vehicleModel.save();
    
            return res.status(200).json([vehicleModel]);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error', error: error.message });
        }
    },
};

const VehicleInventory = require('../../models/inventoryVehicleModel/vehicle');
const VehicleModel = require('../../models/vehicleModel/model');
const mongoose = require('mongoose');
const axios = require('axios');
const xml2js = require('xml2js');
const category = require('../categoryControllers/category');
const VehicleMake = require('../../models/vehicleMakeModel/make');

const adjustAuctionSheet = (image) => {
    if (Array.isArray(image)) {
        return image.map(img => img.replace(/\\/g, "/").replace("src/", ""));
    }
    return image ? image.replace(/\\/g, "/").replace("src/", "") : null;
};


module.exports = {
    addVehicle: async (req, res) => {
        try {
            const {
                MARKA_NAME, MODEL_NAME, VERSION, REGISTER_YEAR, COLOR, MILEAGE, PRICE, ENGINE_NUMBER, CHASSIS_NUMBER,
                CONDITION, TRANSMISSION, VERIFIED_AUCTION_SHEET, DESCRIPTION, FEATURES,
                LENGTH, WIDTH, HEIGHT, WIDTH_INCLUDING_MIRROR, WHEEL_BASE, GROSS_WEIGHT, LUGGAGE_CAPACITY, MAX_LOADING_WEIGHT,
                NO_OF_SEATS, FUEL_TANK_CAPACITY, ENGINE_TYPE, MINIMUM_KERB_WEIGHT, MAX_TOW_WEIGHT, TURNING_CIRCLE,
                MAX_TOWING_WEIGHT_BRAKED, MAX_TOWING_WEIGHT_UNBRAKED, CATEGORY, SUB_CATEGORY, ATTRIBUTE, YEAR,FUEL_TYPE, COUNTRY
            } = req.body;

            const featureArray = (FEATURES || '')
                .split(',')
                .map(id => id.trim())
                .filter(id => id.length > 0);
            const formattedFeatures = featureArray.map(id => {
                return mongoose.Types.ObjectId.isValid(id) ? new mongoose.Types.ObjectId(id) : null;
            }).filter(id => id !== null);

            const parsedAttributes = [];
            for (const [attributeId, features] of Object.entries(ATTRIBUTE || {})) {
                const parsedFeatures = [];
                for (const [featureId, value] of Object.entries(features)) {
                    parsedFeatures.push({
                        feature: new mongoose.Types.ObjectId(featureId),
                        value: value,
                    });
                }
                parsedAttributes.push({
                    attribute: new mongoose.Types.ObjectId(attributeId),
                    features: parsedFeatures
                });
            }

            let images = [];
            let auctionSheet = null;

            if(req.files)
            {
                images = req.files['IMAGES'] ? req.files['IMAGES'].map(file => file.path) : [];
                auctionSheet = req.files['AUCTION_SHEET'] && req.files['AUCTION_SHEET'][0] ? req.files['AUCTION_SHEET'][0].path : null;
            }

            const vehicleInventory = new VehicleInventory({
                MARKA_NAME,
                MODEL_NAME,
                IMAGES: adjustAuctionSheet(images) ? adjustAuctionSheet(images) : [],
                AUCTION_SHEET: adjustAuctionSheet(auctionSheet) ? adjustAuctionSheet(auctionSheet) : null,
                FEATURES: formattedFeatures,
                VERSION,
                REGISTER_YEAR,
                YEAR,
                COLOR,
                MILEAGE,
                PRICE,
                ENGINE_NUMBER,
                CHASSIS_NUMBER,
                CONDITION,
                TRANSMISSION,
                VERIFIED_AUCTION_SHEET,
                DESCRIPTION,
                LENGTH,
                WIDTH,
                HEIGHT,
                WIDTH_INCLUDING_MIRROR,
                WHEEL_BASE,
                GROSS_WEIGHT,
                LUGGAGE_CAPACITY,
                MAX_LOADING_WEIGHT,
                NO_OF_SEATS,
                FUEL_TANK_CAPACITY,
                ENGINE_TYPE,
                MINIMUM_KERB_WEIGHT,
                MAX_TOW_WEIGHT,
                TURNING_CIRCLE,
                MAX_TOWING_WEIGHT_BRAKED,
                MAX_TOWING_WEIGHT_UNBRAKED,
                CATEGORY,
                SUB_CATEGORY,
                ATTRIBUTE: parsedAttributes,
                FUEL_TYPE,
                COUNTRY
            });

            await vehicleInventory.save();
            return res.status(201).json([vehicleInventory]);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error', error: error.message });
        }
    },
    updateVehicle: async (req, res) => {
        try {
            const { id } = req.query;
            const {
                MARKA_NAME, MODEL_NAME, VERSION, REGISTER_YEAR, COLOR, MILEAGE, PRICE, ENGINE_NUMBER, CHASSIS_NUMBER,
                CONDITION, TRANSMISSION, VERIFIED_AUCTION_SHEET, DESCRIPTION, FEATURES,
                LENGTH, WIDTH, HEIGHT, WIDTH_INCLUDING_MIRROR, WHEEL_BASE, GROSS_WEIGHT, LUGGAGE_CAPACITY, MAX_LOADING_WEIGHT,
                NO_OF_SEATS, FUEL_TANK_CAPACITY, ENGINE_TYPE, MINIMUM_KERB_WEIGHT, MAX_TOW_WEIGHT, TURNING_CIRCLE,
                MAX_TOWING_WEIGHT_BRAKED, MAX_TOWING_WEIGHT_UNBRAKED, CATEGORY, SUB_CATEGORY, ATTRIBUTE, YEAR,INITIAL_IMAGES,FUEL_TYPE, COUNTRY
            } = req.body;
    
            const vehicleInventory = await VehicleInventory.findById(id);
            if (!vehicleInventory) {
                return res.status(404).json({ message: 'Inventory not found' });
            }
    
            const parsedAttributes = [];
            for (const [attributeId, features] of Object.entries(ATTRIBUTE || {})) {
                const parsedFeatures = [];
                for (const [featureId, value] of Object.entries(features)) {
                    parsedFeatures.push({
                        feature: new mongoose.Types.ObjectId(featureId),
                        value: value,
                    });
                }
                parsedAttributes.push({
                    attribute: new mongoose.Types.ObjectId(attributeId),
                    features: parsedFeatures
                });
            }
            if (COUNTRY) vehicleInventory.COUNTRY = COUNTRY;
            if (FUEL_TYPE) vehicleInventory.FUEL_TYPE = FUEL_TYPE;
            if (MARKA_NAME) vehicleInventory.MARKA_NAME = MARKA_NAME;
            if (MODEL_NAME) vehicleInventory.MODEL_NAME = MODEL_NAME;
            if (VERSION) vehicleInventory.VERSION = VERSION;
            if (REGISTER_YEAR) vehicleInventory.REGISTER_YEAR = REGISTER_YEAR;
            if (YEAR) vehicleInventory.YEAR = YEAR;
            if (COLOR) vehicleInventory.COLOR = COLOR;
            if (MILEAGE) vehicleInventory.MILEAGE = MILEAGE;
            if (PRICE) vehicleInventory.PRICE = PRICE;
            if (ENGINE_NUMBER) vehicleInventory.ENGINE_NUMBER = ENGINE_NUMBER;
            if (CHASSIS_NUMBER) vehicleInventory.CHASSIS_NUMBER = CHASSIS_NUMBER;
            if (CONDITION) vehicleInventory.CONDITION = CONDITION;
            if (TRANSMISSION) vehicleInventory.TRANSMISSION = TRANSMISSION;
            if (VERIFIED_AUCTION_SHEET) vehicleInventory.VERIFIED_AUCTION_SHEET = VERIFIED_AUCTION_SHEET;
            if (DESCRIPTION) vehicleInventory.DESCRIPTION = DESCRIPTION;
            if (FEATURES) {
                const featureArray = FEATURES.split(',').map(id => id.trim()).filter(id => id.length > 0);
                vehicleInventory.FEATURES = featureArray.map(id => mongoose.Types.ObjectId.isValid(id) ? new mongoose.Types.ObjectId(id) : null).filter(id => id !== null);
            }
            if (LENGTH) vehicleInventory.LENGTH = LENGTH;
            if (WIDTH) vehicleInventory.WIDTH = WIDTH;
            if (HEIGHT) vehicleInventory.HEIGHT = HEIGHT;
            if (WIDTH_INCLUDING_MIRROR) vehicleInventory.WIDTH_INCLUDING_MIRROR = WIDTH_INCLUDING_MIRROR;
            if (WHEEL_BASE) vehicleInventory.WHEEL_BASE = WHEEL_BASE;
            if (GROSS_WEIGHT) vehicleInventory.GROSS_WEIGHT = GROSS_WEIGHT;
            if (LUGGAGE_CAPACITY) vehicleInventory.LUGGAGE_CAPACITY = LUGGAGE_CAPACITY;
            if (MAX_LOADING_WEIGHT) vehicleInventory.MAX_LOADING_WEIGHT = MAX_LOADING_WEIGHT;
            if (NO_OF_SEATS) vehicleInventory.NO_OF_SEATS = NO_OF_SEATS;
            if (FUEL_TANK_CAPACITY) vehicleInventory.FUEL_TANK_CAPACITY = FUEL_TANK_CAPACITY;
            if (ENGINE_TYPE) vehicleInventory.ENGINE_TYPE = ENGINE_TYPE;
            if (MINIMUM_KERB_WEIGHT) vehicleInventory.MINIMUM_KERB_WEIGHT = MINIMUM_KERB_WEIGHT;
            if (MAX_TOW_WEIGHT) vehicleInventory.MAX_TOW_WEIGHT = MAX_TOW_WEIGHT;
            if (TURNING_CIRCLE) vehicleInventory.TURNING_CIRCLE = TURNING_CIRCLE;
            if (MAX_TOWING_WEIGHT_BRAKED) vehicleInventory.MAX_TOWING_WEIGHT_BRAKED = MAX_TOWING_WEIGHT_BRAKED;
            if (MAX_TOWING_WEIGHT_UNBRAKED) vehicleInventory.MAX_TOWING_WEIGHT_UNBRAKED = MAX_TOWING_WEIGHT_UNBRAKED;
            if (parsedAttributes.length > 0) vehicleInventory.ATTRIBUTE = parsedAttributes;
            if (CATEGORY) vehicleInventory.CATEGORY = CATEGORY;
            if (SUB_CATEGORY) vehicleInventory.SUB_CATEGORY = SUB_CATEGORY;
            if (ATTRIBUTE) vehicleInventory.ATTRIBUTE = parsedAttributes;

            const initialImages = req.body.INITIAL_IMAGES ;
            let Images = req.files['IMAGES'] ? req.files['IMAGES'].map(file => file.path) : [];
            let newImages = adjustAuctionSheet(Images); 
            let updatedImages;
            if (newImages.length >= 1 ) {
                let sub;
                if (Array.isArray(initialImages)) {
                    sub = [...initialImages];
                } else {
                    sub = [initialImages];
                }
                sub.push(...newImages); 
                updatedImages = [...sub];
                const uniqueImages = [...new Set(updatedImages)];
                vehicleInventory.IMAGES = uniqueImages;
            }
            else if(initialImages == undefined)
            {
                vehicleInventory.IMAGES = vehicleInventory.IMAGES
            }
            else if(initialImages == '[]')
            {
                vehicleInventory.IMAGES = initialImages
            }
            else if(initialImages.length >=1)
            {
                vehicleInventory.IMAGES = initialImages
            }
            
            const auctionSheet = req.files['AUCTION_SHEET'] && req.files['AUCTION_SHEET'][0] ? req.files['AUCTION_SHEET'][0].path : null;
            if (auctionSheet) vehicleInventory.AUCTION_SHEET = adjustAuctionSheet(auctionSheet);
    
            await vehicleInventory.save();
            return res.status(200).json(vehicleInventory);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error', error: error.message });
        }
    },    
    deleteVehicle: async (req, res) => {
        try {
            const { id } = req.query;
            const vehicleInventory = await VehicleInventory.findById(id);

            if (!vehicleInventory) {
                return res.status(404).json({ message: 'Inventory not found' });
            }

            await vehicleInventory.deleteOne();
            return res.status(200).json({ message: 'Inventory deleted successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error', error: error.message });
        }
    },
    getVehicleFromDatabase: async (req, res) => {
        try {
            const { id, TRANSMISSION, CONDITION,check, minPrice, maxPrice, MARKA_NAME, MODEL_NAME, CATEGORY, AUCTION_SHEET,YEAR, page = 1, limit = 20,sort, search, ...otherFilters } = req.query;
            const query = {};
            if (id) {
                const vehicleInventory = await VehicleInventory.findById(id)
                    .populate('FEATURES', 'name')
                    .populate('CATEGORY', 'name description image parentCategory')
                    .populate('SUB_CATEGORY', 'name description image parentCategory')
                    .populate('MARKA_NAME', 'make type image') 
                    .populate('MODEL_NAME', 'model')
                    .populate({
                        path: 'ATTRIBUTE.attribute',
                        select: 'name description',
                    })
                    .populate({
                        path: 'ATTRIBUTE.features.feature',
                        select: 'name description',
                    });
                if(check)
                {
                    return res.status(200).json({ "vehicles": [vehicleInventory] });
                }
                const vehicle = {
                    ...vehicleInventory.toObject(),
                    MARKA_NAME: vehicleInventory.MARKA_NAME?.make || null,
                    MODEL_NAME: vehicleInventory.MODEL_NAME?.model || null  
                };
                return res.status(200).json({ "vehicles": [vehicle] });
            }
            let modelNames = MODEL_NAME ? MODEL_NAME.split(',').map(name => name.trim()) : [];
            let modelIds = await VehicleModel.find({ model: { $in: modelNames } }).select('_id');
            let idsToQuery = modelIds.map(model => model._id);
            if (idsToQuery.length > 0) {
                query.MODEL_NAME = { $in: idsToQuery };
            }
            let makeNames = MARKA_NAME ? MARKA_NAME.split(',').map(name => name.trim()) : [];
            let makeIds = await VehicleMake.find({ make: { $in: makeNames } }).select('_id');
            let makeIdsToQuery = makeIds.map(make => make._id);
            if (makeIdsToQuery.length > 0) {
                query.MARKA_NAME = { $in: makeIdsToQuery };
            }
            if (YEAR) {
                const registerYears = YEAR.split(',');
                query.REGISTER_YEAR = { $in: registerYears };
            }
            if (TRANSMISSION) {
                const transmissionValues = TRANSMISSION.split(',');
                query.TRANSMISSION = { $in: transmissionValues };
            }
            if (CONDITION) {
                const conditionValues = CONDITION.split(',');
                query.CONDITION = { $in: conditionValues };
            }
            if (AUCTION_SHEET) {
                const auctionSheetValues = AUCTION_SHEET.split(',');
                query.VERIFIED_AUCTION_SHEET = { $in: auctionSheetValues };
            }
            if (minPrice) query.PRICE = { $gte: parseFloat(minPrice) };
            if (maxPrice) query.PRICE = { ...query.PRICE, $lte: parseFloat(maxPrice) };
            if (CATEGORY) {
                const categoryValues = CATEGORY.split(',');
                query.CATEGORY = { $in: categoryValues };
            }
            for (const [key, value] of Object.entries(otherFilters)) {
                if (value) query[key.toUpperCase()] = value;
            }
            const allFilteredVehicles = await VehicleInventory.find()
                .populate('FEATURES', 'name')
                .populate('CATEGORY', 'name description image parentCategory')
                .populate('SUB_CATEGORY', 'name description image parentCategory')
                .populate('MARKA_NAME', 'make type image')
                .populate('MODEL_NAME', 'model')  
                .populate({
                    path: 'ATTRIBUTE.attribute',
                    select: 'name description',
                })
                .populate({
                    path: 'ATTRIBUTE.features.feature',
                    select: 'name description',
                });
            let allVehicles = await VehicleInventory.find(query)
                .populate('FEATURES', 'name')
                .populate('CATEGORY', 'name description image parentCategory')
                .populate('SUB_CATEGORY', 'name description image parentCategory')
                .populate('MARKA_NAME', 'make type image')
                .populate('MODEL_NAME', 'model')  
                .populate({
                    path: 'ATTRIBUTE.attribute',
                    select: 'name description',
                })
                .populate({
                    path: 'ATTRIBUTE.features.feature',
                    select: 'name description',
                });

            if (search) {
                const searchRegex = new RegExp(search, 'i');
                allVehicles = allVehicles.filter(vehicle => 
                    (vehicle.MARKA_NAME && vehicle.MARKA_NAME.make && vehicle.MARKA_NAME.make.match(searchRegex)) || 
                    (vehicle.MODEL_NAME && vehicle.MODEL_NAME.model && vehicle.MODEL_NAME.model.match(searchRegex))
                );
            }

            const vehicles = allVehicles.map(vehicle => ({
                ...vehicle.toObject(),
                MARKA_NAME: vehicle.MARKA_NAME?.make || null,
                MODEL_NAME: vehicle.MODEL_NAME?.model || null,
                TYPE: vehicle.MARKA_NAME.type 
            }));
            const sortedVehicles = allVehicles.sort((a, b) => {
                if (sort === "Price: Low to High") {
                    return (a.PRICE - b.PRICE) || 0;
                } else if (sort === "Price: High to Low") {
                    return (b.PRICE - a.PRICE) || 0;
                } else if (sort === "Year: Low to High") {
                    return (a.REGISTER_YEAR - b.REGISTER_YEAR) || 0;
                } else if (sort === "Year: High to Low") {
                    return (b.REGISTER_YEAR - a.REGISTER_YEAR) || 0;
                }
                return 0; 
            });
            const sortedVehiclesWithMakeModel = sortedVehicles.map(vehicle => ({
                ...vehicle.toObject(),
                MARKA_NAME: vehicle.MARKA_NAME?.make || null,
                MODEL_NAME: vehicle.MODEL_NAME?.model || null,
                TYPE: vehicle.MARKA_NAME.type 
            }));
            const totalVehicles = vehicles.length;
            const totalPages = Math.ceil(totalVehicles / limit);
            const skip = (parseInt(page) - 1) * parseInt(limit);
            const paginatedVehicles = sortedVehiclesWithMakeModel.slice(skip, skip + parseInt(limit));
            const filters = processCombinedFilters(allFilteredVehicles);
            const subFilters = processCombinedFilters(allVehicles);

            return res.status(200).json({
                vehicles: paginatedVehicles,
                pagination: {
                    totalVehicles,
                    totalPages,
                    currentPage: parseInt(page),
                    itemsPerPage: parseInt(limit),
                },
                filters: {
                    ...subFilters,
                },
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error', error: error.message });
        }
    },       
    getVehicleFromExternalAPI: async (req, res) => {
        try {
            let { MARKA_NAME, MODEL_NAME, TRANSMISSION, minPrice, maxPrice, sort, search, ID, page, limit, YEAR } = req.query;

            let SQL_QUERY = `SELECT * FROM MAIN WHERE STATUS != 'SOLD' AND`;

            if (ID) {
                SQL_QUERY += ` id = '${ID}'`;
            }
            
            else {
                if (MARKA_NAME)
                    SQL_QUERY += ` MARKA_NAME = '${MARKA_NAME}' AND`;

                if (MODEL_NAME) 
                    SQL_QUERY += ` MODEL_NAME = '${MODEL_NAME}' AND`;
                
                if (search) 
                    SQL_QUERY += ` (MARKA_NAME LIKE '%${search}%' OR MODEL_NAME LIKE '%${search}%') AND`;

                if (TRANSMISSION) 
                    SQL_QUERY += ` KPP = '${TRANSMISSION}' AND`;
                
                if (minPrice) 
                    SQL_QUERY += ` AVG_PRICE >= '${minPrice}' AND`;

                if (maxPrice)
                    SQL_QUERY += ` AVG_PRICE <= '${maxPrice}' AND`;

                if (YEAR)
                    SQL_QUERY += ` YEAR = '${YEAR}'`;
            }
            
            SQL_QUERY = SQL_QUERY.replace(/(\s+AND|\s+WHERE)\s*$/, '');
            let SQL_QUERY_1 = SQL_QUERY;

            if (sort === "Price: Low to High")
                SQL_QUERY_1 += ` ORDER BY AVG_PRICE ASC`;
            else if (sort === "Price: High to Low") 
                SQL_QUERY_1 += ` ORDER BY AVG_PRICE DESC`;
            else if (sort === "Year: Low to High") 
                SQL_QUERY_1 += ` ORDER BY YEAR ASC`;
            else if (sort === "Year: High to Low") 
                SQL_QUERY_1 += ` ORDER BY YEAR DESC`;
            
            page = parseInt(page) || 1;
            limit = parseInt(limit) || 30;
            
            SQL_QUERY_1 += ` LIMIT ${(page * limit) - limit}, ${limit}`;
            const SQL_QUERY_2 = SQL_QUERY.replace(/^SELECT \*/, 'SELECT COUNT(*)');
            let SQL_QUERY_3 = SQL_QUERY.replace(/^SELECT \*/, 'SELECT MARKA_NAME, COUNT(MARKA_NAME)');
            SQL_QUERY_3 += ` GROUP BY MARKA_NAME`
            let SQL_QUERY_4 = SQL_QUERY.replace(/^SELECT \*/, 'SELECT KPP, COUNT(KPP)');
            SQL_QUERY_4 += ` GROUP BY KPP`
            const SQL_QUERY_5 = SQL_QUERY.replace(/^SELECT \*/, 'SELECT MIN(AVG_PRICE), MAX(AVG_PRICE)');

            // console.log(SQL_QUERY_1);
            // console.log(SQL_QUERY_2);
            // console.log(SQL_QUERY_3);
            // console.log(SQL_QUERY_4);
            // console.log(SQL_QUERY_5);

            const response1 = await axios.get(`http://78.46.90.228/api/?json&code=ASHkgjHuT78h&sql=${SQL_QUERY_1}`);
            const response2 = await axios.get(`http://78.46.90.228/api/?json&code=ASHkgjHuT78h&sql=${SQL_QUERY_2}`);
            const response3 = await axios.get(`http://78.46.90.228/api/?json&code=ASHkgjHuT78h&sql=${SQL_QUERY_3}`);
            const response4 = await axios.get(`http://78.46.90.228/api/?json&code=ASHkgjHuT78h&sql=${SQL_QUERY_4}`);
            const response5 = await axios.get(`http://78.46.90.228/api/?json&code=ASHkgjHuT78h&sql=${SQL_QUERY_5}`);

            const vehicles = response1.data;
            const totalVehicles = parseInt(response2.data[0]["TAG0"]);
            const totalPages = Math.ceil(totalVehicles/limit);
            const makeCounts = processAuctionFilters(response3.data);
            const transmissionCounts = processAuctionFilters(response4.data);
            const min_Price = response5.data[0]["TAG0"];
            const max_Price = response5.data[0]["TAG1"];

            return res.status(200).json({
                vehicles,
                pagination: {
                    totalVehicles,
                    totalPages,
                    currentPage: page,
                    itemsPerPage: limit
                },
                filters: {
                    MARKA_NAME: makeCounts,
                    TRANSMISSION: transmissionCounts,
                    PRICE: {
                        minPrice: min_Price,
                        maxPrice: max_Price,
                    }
                },
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error', error: error.message });
        }
    }    
};    

function processCombinedFilters(combinedData) {
    const transmissionCounts = {};
    const conditionCounts = {};
    const makeCounts = {};
    const modelCounts = {};
    const auctionSheetCounts = {
        true: 0,
        false: 0,
    };
    let minPriceCombined = Infinity, maxPriceCombined = -Infinity;

    combinedData.forEach(vehicle => {
        if (vehicle.TRANSMISSION || vehicle.KPP) {
            const key = vehicle.TRANSMISSION || vehicle.KPP;
            transmissionCounts[key] = (transmissionCounts[key] || 0) + 1;
        }

        if (vehicle.CONDITION) {
            conditionCounts[vehicle.CONDITION] = (conditionCounts[vehicle.CONDITION] || 0) + 1;
        }

        if (vehicle.VERIFIED_AUCTION_SHEET !== undefined) {
            const verified = vehicle.VERIFIED_AUCTION_SHEET.toString();
            auctionSheetCounts[verified] = (auctionSheetCounts[verified] || 0) + 1;
        }

        const makeName = vehicle.MARKA_NAME && typeof vehicle.MARKA_NAME === 'object' ? vehicle.MARKA_NAME.make : vehicle.MARKA_NAME;
        if (makeName) {
            makeCounts[makeName] = (makeCounts[makeName] || 0) + 1;
        }
        const modelName = vehicle.MODEL_NAME && typeof vehicle.MODEL_NAME === 'object' ? vehicle.MODEL_NAME.model : vehicle.MODEL_NAME;
        if (modelName) {
            modelCounts[modelName] = (modelCounts[modelName] || 0) + 1;
        }        

        let price = parseFloat(vehicle.PRICE);
        if (isNaN(price)) {
            price = parseFloat(vehicle.AVG_PRICE);
        }
        if (!isNaN(price)) {
            if (price < minPriceCombined) minPriceCombined = price;
            if (price > maxPriceCombined) maxPriceCombined = price;
        }
    });
    return {
        TRANSMISSION: transmissionCounts,
        CONDITION: conditionCounts,
        MARKA_NAME: makeCounts,
        MODEL_NAME: modelCounts,
        AUCTION_SHEET: auctionSheetCounts,
        PRICE: {
            minPrice: minPriceCombined === Infinity ? 0 : minPriceCombined,
            maxPrice: maxPriceCombined === -Infinity ? 0 : maxPriceCombined
        }
    };
}

function processAuctionFilters(filters) {
    const processedFilters = {};
    for (const filter of filters) {
        processedFilters[filter[Object.keys(filter)[0]]] = filter[Object.keys(filter)[1]];
    }
    return processedFilters;
}
import Crop from "../models/cropModel.js";

export const createCrop = async (req, res) => {
    try {
        const user = req.user;

        const crop = await Crop.create(req.body);
        if(!crop){
            return res.status(400).json({ message: "Error in creating crop" });
        }

        user.crop.push(crop._id);
        await user.save();
        return res.status(201).json({ 
            message: "Crop created successfully",
            crop: crop,
        });
    } catch (error) {
        console.log("Error in createCrop");
        return res.status(500).json({ message: error.message });
    }
}

export const getAllCrops = async (req, res) => {
    try {
        const user = req.user;
        
        if (!user.crop) {
            user.crop = [];
        }
        
        await user.populate("crop");
        return res.status(200).json({
            message: "Crops fetched successfully",
            crops: user.crop
        })
    } catch (error) {
        console.log("Error in getAllCrops");
        return res.status(500).json({ message: error.message });
    }
}

export const getCrop = async (req, res) => {
    try {
        const user = req.user;
        const cropId = req.params.id;
        const hasCrop = user.crop.some(crop => crop.toString() === cropId);

        if (!hasCrop) {
            return res.status(403).json({ message: "Forbidden: You do not have access to this crop" });
        }

        const crop = await Crop.findById(cropId);
        if (!crop) {
            return res.status(404).json({ message: "Crop not found" });
        }

        return res.status(200).json({
            message: "Crop fetched successfully",
            crop: crop,
            advisoryDocs: crop.advisoryDocs,
            diseaseList: crop.diseaseList
        })
    } catch (error) {
        console.log("Error in getCropById");
        return res.status(500).json({ message: error.message });
    }
}

export const updateCrop = async (req, res) => {
    try {
        const user = req.user;
        const cropId = req.params.id;
        
        // Initialize crop array if it doesn't exist
        if (!user.crop) {
            user.crop = [];
        }
        
        const hasCrop = user.crop.some(crop => crop.toString() === cropId);

        if (!hasCrop) {
            return res.status(403).json({ message: "Forbidden: You do not have access to this crop" });
        }

        const updatedCrop = await Crop.findByIdAndUpdate(cropId, req.body, { new: true });
        if (!updatedCrop) {
            return res.status(404).json({ message: "Crop not found" });
        }

        return res.status(200).json({
            message: "Crop updated successfully",
            crop: updatedCrop
        });
    } catch (error) {
        console.log("Error in updateCrop");
        return res.status(500).json({ message: error.message });
    }
}   

export const deleteCrop = async (req, res) => {
    try {
        const user = req.user;
        const cropId = req.params.id;
        
        // Initialize crop array if it doesn't exist
        if (!user.crop) {
            user.crop = [];
        }
        
        const hasCrop = user.crop.some(crop => crop.toString() === cropId);

        if (!hasCrop) {
            return res.status(403).json({ message: "Forbidden: You do not have access to this crop" });
        }

        const deletedCrop = await Crop.findByIdAndDelete(cropId);       
        if (!deletedCrop) {
            return res.status(404).json({ message: "Crop not found" });
        }

        user.crop = user.crop.filter(crop => crop.toString() !== cropId);
        await user.save();

        return res.status(200).json({
            message: "Crop deleted successfully",
            crop: deletedCrop
        });
    } catch (error) {
        console.log("Error in deleteCrop");
        return res.status(500).json({ message: error.message });
    }
}

export const getCurrentCrop = async (req, res) => {
  try {
    const user = req.user;

    if (!user.crop || user.crop.length === 0) {
      return res.status(200).json({ message: "No crops found", crop: null });
    }

    await user.populate("crop");
    const currentCrop = user.crop[user.crop.length - 1];

    return res.status(200).json({
      message: "Current crop fetched successfully",
      crop: currentCrop,
    });
  } catch (error) {
    console.log("Error in getCurrentCrop", error);
    return res.status(500).json({ message: error.message });
  }
};


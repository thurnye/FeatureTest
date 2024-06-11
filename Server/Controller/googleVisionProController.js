const vision = require('@google-cloud/vision');
const path = require('path');
// Initialize the client
const client = new vision.ImageAnnotatorClient({
    keyFilename: path.join(__dirname, '../googleImageRecognitionKey.json')  // Updated path
});

const postAnalyzeImage = async (req, res) => {
    try {
        const { imageUrl } = req.body;
        const result = await client.labelDetection(imageUrl);
        const detections = result[0].labelAnnotations;
        res.status(200).json(detections);
    } catch (error) {
        console.error(error);
        res.status(500).json('Error analyzing image');
    }
};

module.exports = {
    postAnalyzeImage
};

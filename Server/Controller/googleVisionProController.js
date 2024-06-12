const vision = require('@google-cloud/vision');
const path = require('path');

const client = new vision.ImageAnnotatorClient({
    keyFilename: path.join(__dirname, '../googleImageRecognitionKey.json')
});

const postAnalyzeImage = async (req, res) => {
    try {
        const { imageUrl, base64Image } = req.body;
        let result;

        if (base64Image) {
            const [response] = await client.labelDetection({
                image: {
                    content: base64Image.split(',')[1], // Remove the data URL part
                },
            });
            result = response.labelAnnotations;
        } else if (imageUrl) {
            const [response] = await client.labelDetection(imageUrl);
            result = response.labelAnnotations;
        } else {
            return res.status(400).json({ error: 'No image provided' });
        }

        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json('Error analyzing image');
    }
};

module.exports = {
    postAnalyzeImage
};

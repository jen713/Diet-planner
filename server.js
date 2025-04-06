const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const GEMINI_API_URL = 'https://api.gemini.com/v1/diet-plan'; // Example URL
const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY'; // Replace with your actual API key

app.post('/api/diet-plan', async (req, res) => {
    const { ageCategory, currentWeight, targetWeight, exerciseSchedule } = req.body;

    try {
        const response = await axios.post(GEMINI_API_URL, {
            ageCategory,
            currentWeight,
            targetWeight,
            exerciseSchedule
        }, {
            headers: {
                'Authorization': `Bearer ${GEMINI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching diet plan from Gemini API:', error);
        res.status(500).json({ message: 'Error generating diet plan' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
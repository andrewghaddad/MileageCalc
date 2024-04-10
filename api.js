import express, { Router } from "express";
import serverless from "serverless-http";
import axios from 'axios';
import cors from 'cors';
import config from "./config";

const corsOptions = {
    origin: config.ORIGIN_DOMAIN,
    optionsSuccessStatus: 200
}

const api = express();
api.use(cors(corsOptions))

const router = Router();
router.post('/data', async (req, res) => {
    try {
        const requestData = req;
        const headers  = {
            'Content-Type': 'application/json',
            'api-key': config.API_KEY,
            'Accept': 'application/json'
        }
        const response = await axios.post('https://us-east-1.aws.data.mongodb-api.com/app/data-ihtif/endpoint/data/v1/action/find', requestData , { headers });

        const responseData = response.data;

        res.json(responseData);
    } catch (error) {
        console.error('Error calling POST API:', error);
        res.status(500).json({ error: 'An error occurred while calling the POST API' });
    }
});

api.use("/api/", router);

export const handler = serverless(api);
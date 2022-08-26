import axios from "axios";
import settings from "../settings.json";

const dataClient = axios.create({
    baseURL: settings.API_URL || "/api",
});

export default dataClient;

import request from "superagent";
import Config from "../../config/Config";

export const network = request.agent().set({'X-TRENA-KEY':Config.API_KEY})
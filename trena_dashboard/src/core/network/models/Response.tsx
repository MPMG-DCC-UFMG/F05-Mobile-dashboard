import {ErrorResponse} from "./ErrorResponse";

export interface MPResponse{
    success: boolean
    error?: ErrorResponse
}
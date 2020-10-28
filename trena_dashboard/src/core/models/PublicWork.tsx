import {Address} from "./Address";

export interface PublicWork {
    id: string,
    name: string,
    type_work_flag: number,
    address: Address,
    user_status?: number,
    rnn_status?: number
}
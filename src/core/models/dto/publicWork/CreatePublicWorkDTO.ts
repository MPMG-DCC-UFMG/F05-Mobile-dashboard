import { CreateAddressDTO } from "../address/CreateAddressDTO";

export interface CreatePublicWorkDTO {
	name: string;
	type_work_flag: number;
	address: CreateAddressDTO;
}

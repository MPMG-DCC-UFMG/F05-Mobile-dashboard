export interface CreateUserDTO {
	name: string;
	email: string;
	authentication: string;
	full_name: string;
	role?: string;
}

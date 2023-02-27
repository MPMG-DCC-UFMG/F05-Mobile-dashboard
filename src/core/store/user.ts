import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ReadUserDTO } from "../models/dto/user/ReadUserDTO";

type UserStore = {
	user: ReadUserDTO;
	setUser: (user: ReadUserDTO) => void;
	allUsers: ReadUserDTO[];
	setAllUsers: (users: ReadUserDTO[]) => void;
};

export const useUserStore = create(
	persist<UserStore>(
		(set) => ({
			user: {} as ReadUserDTO,
			setUser: (loggedUser: ReadUserDTO) => {
				set(() => ({
					user: loggedUser,
				}));
			},
			allUsers: [],
			setAllUsers: (newUsers: ReadUserDTO[]) => {
				set(() => ({
					allUsers: newUsers,
				}));
			},
		}),
		{
			name: "user-storage",
		}
	)
);

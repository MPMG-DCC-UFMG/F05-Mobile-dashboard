/* eslint-disable indent */
import { Address } from "../core/models/Address";

export function inspectionsStatusMapping(status: number) {
	switch (status) {
		case 0:
			return "Pendente";
		case 1:
			return "Atualizada";
		case 2:
			return "Enviada";
	}
}

export function addressFormatter(adress: Address) {
	return `${adress.street}, ${adress.number} - ${adress.city}`;
}

export function collectStatusMapping(status: number) {
	switch (status) {
		case 0:
			return "Pendente";
		case 1:
			return "Aprovado";
		case 2:
			return "Rejeitado";
		case 3:
			return "Excluído";
	}
}

export function convertEphocDate(seconds: number) {
	const date = new Date(seconds);
	const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
	const month =
		date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
	const year = date.getFullYear();

	return `${day}/${month}/${year}`;
}

function getDMS(latLng: number) {
	const value = Math.abs(latLng);
	const degrees = Math.floor(value);
	const minutes = Math.floor((value - degrees) * 60);
	const seconds =
		Math.floor((value - degrees - minutes / 60) * 3600 * 1000) / 1000;

	return `${degrees}º${minutes}'${seconds}"`;
}

export function convertLatLngToDMS(lat: number, lng: number) {
	let finalLat = getDMS(lat);
	finalLat += lat >= 0 ? "N" : "S";

	let finalLng = getDMS(lng);
	finalLng += lng >= 0 ? "L" : "O";

	return `${finalLat}, ${finalLng}`;
}

export function formatCpf(cpf: string) {
	cpf = cpf.replace(/[^\d]/g, "");

	return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export function formatCep(cep: string) {
	return cep
		.replace(/\D/g, "")
		.replace(/(\d{5})(\d)/, "$1-$2")
		.replace(/(-\d{3})\d+?$/, "$1");
}

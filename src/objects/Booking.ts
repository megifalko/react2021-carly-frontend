export interface Booking {
	id: string;
	customerFirstName: string;
	customerLastName: string;
	carId: string;
	startDate: Date;
	endDate: Date;
	active: boolean;
}

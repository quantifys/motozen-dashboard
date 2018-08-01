import { Device } from "./device.model";
import { Vehicle } from "./vehicle.model";
import { User } from "./user.model";

export class Certificate {
	public id: number;
	public certificate_number: string;
	public date_generated: string;
	public due_date: string;
	public status: string;
	public device: Device;
	public invoice_no: number;
	public customer_name: string;
	public location_state: string;
	public engine_number: string;
	public chassis_number: string;
	public cutoff_speed: number;
	public car_reg_number: string;
	public customer_address: string;
	public customer_telephone: string;
	public location_rto: string;
	public seals: string;
	public vehicle: Vehicle;
	public user: User;
	public mfg_month_year: string;
	public reg_month_year: string;

	constructor(data: any) {
		this.id = data.id ? data.id : null;
		this.certificate_number = data.certificate_number ? data.certificate_number : null;
		this.date_generated = data.date_generated ? data.date_generated : null;
		this.due_date = data.due_date ? data.due_date : null;
		this.status = data.status ? data.status : null;
		this.device = data.device ? new Device(data.device) : new Device({});
		this.invoice_no = data.invoice_no != null ? data.invoice_no : null;
		this.engine_number = data.engine_number ? data.engine_number : null;
		this.chassis_number = data.chassis_number ? data.chassis_number : null;
		this.cutoff_speed = data.cutoff_speed != null ? data.cutoff_speed : null;
		this.car_reg_number = data.car_reg_number ? data.car_reg_number : null;
		this.customer_name = data.customer_name ? data.customer_name : null;
		this.customer_address = data.customer_address ? data.customer_address : null;
		this.customer_telephone = data.customer_telephone ? data.customer_telephone : null;
		this.location_state = data.location_state ? data.location_state : null;
		this.location_rto = data.location_rto ? data.location_rto : null;
		this.seals = data.seals ? data.seals : null;
		this.vehicle = data.vehicle ? new Vehicle(data.vehicle) : new Vehicle({});
		this.user = data.user ? new User(data.user) : new User({});
		this.mfg_month_year = data.mfg_month_year ? data.mfg_month_year : null;
		this.reg_month_year = data.reg_month_year ? data.reg_month_year : null;
	}
}
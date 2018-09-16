import { Inventory } from "./inventory.model";
import { environment } from "../../../environments/environment";

export class Vehicle {
	public id: number;
	public make: string;
	public model: string;
	public variant: string;
	public tac_number: string;
	public report_no: string;
	public category: string;
	public connector: Inventory;
	public icats: Icat[];
	constructor(data: any) {
		this.id = data.id ? data.id : null;
		this.make = data.make ? data.make : null;
		this.model = data.model ? data.model : null;
		this.variant = data.variant ? data.variant : null;
		this.tac_number = data.tac_number ? data.tac_number : null;
		this.report_no = data.report_no ? data.report_no : null;
		this.category = data.category ? data.category : null;
		this.connector = data.connector ? new Inventory(data.connector) : new Inventory({});
		this.icats = data.icats ? data.icats.map(icat => new Icat(icat)) : [];
	}
}

export class Icat {
	public id: number;
	public pages: Page[]
	constructor(data: any) {
		this.id = data.id ? data.id : null;
		this.pages = data.pages ? data.pages.map(page => new Page(page)) : []
	}
}

export class Page {
	public page_url: string;
	constructor(data: any) {
		this.page_url = data.page_url ? data.page_url : null;
	}

	getPageUrl(): string {
		return environment.token_auth_config.apiBase + this.page_url;
	}
}
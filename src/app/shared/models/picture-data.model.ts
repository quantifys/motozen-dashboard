import { environment } from "src/environments/environment";

export class PictureData {
  public url: string;
  public data: string;

  constructor(data: any) {
    this.url = data.url ? data.url : null;
    this.data = data.data ? data.data : null;
  }

  getPicUrl(): string {
		return environment.token_auth_config.apiBase + this.url;
	}
}
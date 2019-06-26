import { VtsUser } from './vts-user.model';
import { TrackerDevice } from './tracker-device.model';


export class TrackerCertificateFormData {
  public devices: TrackerDevice[];
  public customers: VtsUser[];

  constructor(data: any) {
    this.devices = data.devices ? data.devices.map(device => new TrackerDevice(device)) : [];
    this.customers = data.tracker_customers ? data.tracker_customers.map(customer => new VtsUser(customer)) : [];
  }
}

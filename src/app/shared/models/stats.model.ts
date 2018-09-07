import { Certificate } from "./certificate.model";
import { PurchaseOrder } from "./purchase-order.model";
import { User } from "./user.model";

export class DeviceStats {
  public all_time_count: number;
  public certified_count: number;
  public in_stock_count: number;
  constructor(data: any) {
    this.all_time_count = data.all_time_count != null ? +data.all_time_count : null;
    this.certified_count = data.certified_count != null ? +data.certified_count : null;
    this.in_stock_count = data.in_stock_count != null ? +data.in_stock_count : null;
  }
}

export class CertificateStats {
  public expired_count: number;
  public valid_count: number;
  public recent: Certificate[];
  constructor(data: any) {
    this.expired_count = data.expired_count != null ? +data.expired_count : null;
    this.valid_count = data.valid_count != null ? +data.valid_count : null;
    this.recent = data.recent ? data.recent.map(certificate => new Certificate(certificate)) : [];
  }
}

export class PurchaseOrderStats {
  public total_count: number;
  public recent: PurchaseOrder[];
  constructor(data: any) {
    this.total_count = data.total_count != null ? +data.total_count : null;
    this.recent = data.recent ? data.recent.map(po => new PurchaseOrder(po)) : [];
  }
}

export class DealerStats {
  public total_count: number;
  constructor(data: any) {
    this.total_count = data.total_count != null ? +data.total_count : null;
  }
}

export class UserStats {
  public user: User;
  public distributor: User;
  public po_stats: PurchaseOrderStats;
  public certificate_stats: CertificateStats;
  public device_stats: DeviceStats;
  public dealer_stats: DealerStats;
  constructor(data: any) {
    this.user = data.user ? new User(data.user) : new User({});
    this.distributor = data.distributor ? new User(data.distributor) : new User({});
    this.po_stats = data.po_stats ? new PurchaseOrderStats(data.po_stats) : new PurchaseOrderStats({});
    this.certificate_stats = data.certificate_stats ? new CertificateStats(data.certificate_stats) : new CertificateStats({});
    this.device_stats = data.device_stats ? new DeviceStats(data.device_stats) : new DeviceStats({});
    this.dealer_stats = data.dealer_stats ? new DealerStats(data.dealer_stats) : new DealerStats({});
  }
}
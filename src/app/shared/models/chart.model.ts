export class PieChartConfig {
  title: string;
  pieHole: number;
  legend: any;
  is3D: boolean;

  constructor(data: any) {
    this.title = data.title ? data.title : null;
    this.pieHole = data.pieHole != null ? data.pieHole : null;
    this.legend = data.legend ? data.legend : null;
    this.is3D = data.is3D != null ? data.is3D : null;
  }
}

export class BarChartConfig {
  title: string;
  bars: string;
  legend: any;

  constructor(data: any) {
    this.title = data.title ? data.title : null;
    this.bars = data.bars ? data.bars : null;
    this.legend = data.legend ? data.legend : null;
  }
}
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Vehicle } from 'src/app/shared/models';

@Component({
  selector: 'app-vehicle-select',
  templateUrl: './vehicle-select.component.html',
  styleUrls: ['./vehicle-select.component.scss']
})
export class VehicleSelectComponent implements OnInit {

  public searchForm: FormGroup;
  public type = false;
  public brands: string[] = [];
  public models: any[] = [];
  public selectedBrand: string;
  public searchText = '';
  public selectedModel: any;

  constructor(
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<VehicleSelectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.brands = [...Object.keys(data['vehicle_makes'])];
  }

  ngOnInit() {
    this.searchForm = this._fb.group({
      search: null
    });
    this.search.valueChanges.subscribe(value => this.searchText = value);
  }

  get search(): FormControl {
    return this.searchForm.get('search') as FormControl;
  }

  selectBrand(brand: string) {
    this.type = true;
    this.selectedBrand = brand;
    this.models = this.data['vehicle_makes'][this.selectedBrand];
  }

  selectModel(model: any) {
    this.selectedModel = model;
  }

  reset() {
    this.type = false;
    this.selectedBrand = null;
    this.selectedModel = null;
  }

  close() {
    this.dialogRef.close();
  }

}

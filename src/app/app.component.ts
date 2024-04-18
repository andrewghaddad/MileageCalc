import { Component } from '@angular/core';
import { DataService } from "./services/data.service";
import {
	NgbCalendar,
	NgbDateAdapter,
	NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';
import { Utils } from "./utils/utils";
import { FormsModule } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { CalcService } from './services/calc.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  providers: [FormsModule, Utils],
  imports: [FormsModule, NgbDatepickerModule, FormsModule, CommonModule, JsonPipe]

})

export class AppComponent  {
  title = "MileageCalc";
  model1!: string;
  totalMiles!: number;
  data: any;

  formData = {
    model2: '',
    mileage: undefined,
  };
  lastMileage!: number;
  errorMessage: boolean = false;
  missingData: any;

  constructor(
		private ngbCalendar: NgbCalendar,
		private dateAdapter: NgbDateAdapter<string>,
    private dataService: DataService,
    private calcService: CalcService,
    public utils: Utils,
	) {}

  ngOnInit() {
    this.dataService.data().subscribe(
      (response: any) => {
        console.log('GET request successful:', response);
        if(response) {
          this.calcService.setData(response.documents);
          this.data = response.documents;
          this.update();
        }
      },
      error => {
        console.error('Error making GET request:', error);
      }
    );
  }

	get today() {
		return this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
	}

  submitForm() {
    console.log('Form Data: ', this.formData);
    
    try {
      let missingDate = this.missingDate(this.utils.formatDate(this.formData.model2));
    
      if (this.formData.mileage == undefined) {
        this.errorMessage = true;

      } else if (missingDate.length <= 0 && this.formData.mileage < this.lastMileage -1) {
        this.errorMessage = true;

      } else if (missingDate.length > 0) {
        this.errorMessage = false;

        this.dataService.update({
          "filter": { "$and": [{ "_date": this.utils.formatDate(this.formData.mileage)}, {"_milesEnd": 0}]},
          "update": {"$set": {"_milesEnd": this.formData.mileage}}
        }).subscribe(
          (response: any) => {
            console.log('UPDATE request successful:', response);
            this.update();
            location.reload();
          },
          error => {
            console.error('Error making UPDATE request:', error);
          }
        );

      } else {
        this.errorMessage = false;

        this.dataService.insert({
          '_milesStart': this.formData.mileage,
          '_milesEnd': 0,
          '_logTime': 'S',
          '_date': this.utils.formatDate(this.formData.model2)
        }).subscribe(
          (response: any) => {
            console.log('INSERT request successful:', response);
            this.update();
            location.reload();
          },
          error => {
            console.error('Error making INSERT request:', error);
          }
        );
      }
    } catch (error) {
      console.error('[submitForm] ERROR:', error);
    } 
  }

  private update() : void {
    this.missingData = this.calcService.missing
    this.totalMiles = this.calcService.miles;
    this.lastMileage = this.calcService.lastMileage;

    console.log('Missing Data: ' , this.missingData);
    console.log('Total Miles: ' , this.totalMiles);
    console.log('Last Mileage: ' , this.lastMileage);
  }

  public missingDate(date: string | null) : any {
    return this.calcService.missing.filter((doc: any) => doc._date == date);
  }
}

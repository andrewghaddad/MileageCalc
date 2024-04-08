import { Component, Injectable } from '@angular/core';
import {
	NgbCalendar,
	NgbDateAdapter,
	NgbDateParserFormatter,
	NgbDatepickerModule,
	NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  providers: [FormsModule],
  imports: [FormsModule, NgbDatepickerModule, FormsModule, JsonPipe]

})

export class AppComponent  {
  title = "MileageCalc";
  model1!: string;
  
  formData = {
    model2: '',
    mileage: 0,
  };

  constructor(
		private ngbCalendar: NgbCalendar,
		private dateAdapter: NgbDateAdapter<string>,
	) {}

	get today() {
		return this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
	}

  submitForm() {
    console.log(this.formData);

    // IF miles > most recent mileage -> submit
    // ELSE -> error message

    // IF date already exist in DB -> update end miles
    // ELSE -> calls api to insert data & updates start miles
  }

  mostRecentMileage() {
    // Returns value of most recent mileage
  }

  missingDates() {
    // Returns all dates where end mileage are missing 
  }

  mileage() {
    // Returns all data where start and end miles not 0 

    // FOR EACH item IN data: subtract end FROM start 

    // takes difference and adds it to local variable
  }
}

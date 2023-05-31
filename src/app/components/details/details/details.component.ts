import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DataFormService } from 'src/app/services/data-form.service';
import { VillaService } from 'src/app/services/villa/villa.service';
import { HousesService } from 'src/app/services/houses/houses.service';
import * as mapboxgl from 'mapbox-gl';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  form: FormGroup;
  currentYear: number;
  currentMonth: string;
  calendarData: number[];
  years: number[];
  currentMonthIndex: number;
  currentMonthDays: number;
  availableDays: boolean[] = [];
  //aaa
  house: any;
  owner: any;
  map: mapboxgl.Map;
  selectedDays: number[][] = [];
  selectedDates: number[][] = [];

  selectedDatespro: string[] = [];



  constructor(
    private route: ActivatedRoute,
    private DataFormService: DataFormService,
    private VillaService: VillaService,
    private HousesService: HousesService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({});
    this.currentYear = new Date().getFullYear();
    this.currentMonth = '';
    this.calendarData = [];
    this.years = [this.currentYear, this.currentYear + 1, this.currentYear + 2];
  }


  ngOnInit(): void {
    console.log('Before calling isCrossed');





    const storedYear = localStorage.getItem('selectedYear');
    if (storedYear) {
      this.currentYear = +storedYear;
    }


    const today = new Date();
    this.currentMonth = this.getMonthName(today.getMonth());
    this.currentMonthIndex = today.getMonth();
    this.updateCalendar();



    const id = this.route.snapshot.paramMap.get('id');
    this.HousesService.GetHouse(id).subscribe((house) => {
      this.house = house;
      this.initializeMap();
      this.getOwnerDetails(this.house.owner); // Fetch owner details



      const selectedDatespro = this.house?.calendrier || [];
      // this.selectedDays = [this.getSelectedDaysFromCalendrier(selectedDatespro)];
      this.selectedDatespro = selectedDatespro;
      console.log('dates', selectedDatespro);
      console.log('dayss', this.selectedDays);













      const isCrossedResult = this.isCrossed(10);
      console.log('After calling isCrossed');

      for (let i = 0; i < this.house.icons; i++) {
        const house = this.house[i];
        const icons = house.icons;
        console.log('icons fe details page', icons);
      }
    });

  }




  isCrossed(day: number): boolean {
    const formattedDate = this.formatDate(day);
    console.log('this is a coment');
    return this.selectedDatespro.includes(formattedDate);
  }

  isDisabled(day: number): boolean {
    const formattedDate = this.formatDate(day);

    return this.selectedDatespro.includes(formattedDate);
  }

  isHighlighted(day: number): boolean {
    const formattedDate = this.formatDate(day);

    return this.selectedDatespro.includes(formattedDate);
  }

  getSelectedDaysFromCalendrier(selectedDates: string[]): void {
    this.selectedDatespro = selectedDates.map(date => {
      const parts = date.split('/');
      if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        return this.formatDate(day); // Format the selected date in the same format as in the calendar
      }
      return '';
    });
  }

  getOwnerDetails(ownerId: string): void {
    this.DataFormService.getUser(ownerId).subscribe((user) => {
      this.owner = user;
    });
  }

  initializeMap(): void {
    (mapboxgl as typeof mapboxgl).accessToken =
      'pk.eyJ1IjoibWVoZHkxMiIsImEiOiJjbGZ2cGxyc2wwOWo5M3BxaGtmaGNhczN4In0.c9e3Q7S9ZlMVBirYY79JQg';

    this.map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [this.house.localisation.lng, this.house.localisation.lat], // starting position [lng, lat]
      zoom: 7 // starting zoom level
    });
    const marker = new mapboxgl.Marker().setLngLat([this.house.localisation.lng, this.house.localisation.lat]).addTo(this.map);
  }





  //aaa


  prevMonth(): void {
    const currentMonthIndex = this.getMonthIndex(this.currentMonth);
    const previousMonthIndex = currentMonthIndex === 0 ? 11 : currentMonthIndex - 1;
    const previousYear = currentMonthIndex === 0 ? this.currentYear - 1 : this.currentYear;

    this.currentYear = previousYear;
    this.currentMonth = this.getMonthName(previousMonthIndex);
    this.updateCalendar();
  }

  nextMonth(): void {
    const currentMonthIndex = this.getMonthIndex(this.currentMonth);
    const nextMonthIndex = currentMonthIndex === 11 ? 0 : currentMonthIndex + 1;
    const nextYear = currentMonthIndex === 11 ? this.currentYear + 1 : this.currentYear;

    this.currentYear = nextYear;
    this.currentMonth = this.getMonthName(nextMonthIndex);
    this.updateCalendar();
  }

  changeYear(year: number): void {
    this.currentYear = year;
    localStorage.setItem('selectedYear', year.toString());
    this.updateCalendar();
  }

  getMonthName(monthIndex: number): string {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];

    return months[monthIndex];
  }


  updateCalendar(): void {
    const currentMonthIndex = this.getMonthIndex(this.currentMonth);
    const currentYear = this.currentYear;

    const daysInMonth = new Date(currentYear, currentMonthIndex + 1, 0).getDate();
    const firstDayOfWeek = new Date(currentYear, currentMonthIndex, 1).getDay();

    this.calendarData = Array.from({ length: daysInMonth }, (_, index) => index + 1);
    const prefixDays = Array.from({ length: firstDayOfWeek }, (_, index) => -1);
    this.calendarData = [...prefixDays, ...this.calendarData];

    this.form = this.formBuilder.group({}); // Update the form with the new calendar data
  }


  getMonthIndex(monthName: string): number {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];

    return months.indexOf(monthName);
  }



  isCurrentDay(day: number): boolean {
    const today = new Date();
    return (
      day === today.getDate() &&
      this.getMonthIndex(this.currentMonth) === today.getMonth() &&
      this.currentYear === today.getFullYear()
    );
  }

  isSelected(day: number): boolean {
    const monthIndex = this.getMonthIndex(this.currentMonth);
    if (this.selectedDates[monthIndex]) {
      return this.selectedDates[monthIndex].includes(day);
    }
    return false;
  }

  toggleSelection(day: number): void {
    const monthIndex = this.getMonthIndex(this.currentMonth);
    const selectedMonthDates = this.selectedDates[monthIndex] || [];

    // Check if any dates are already selected in other months
    const areOtherMonthsSelected = this.selectedDates.some((dates, index) => index !== monthIndex && dates !== undefined && dates.length > 0);

    if (!areOtherMonthsSelected) {
      if (this.isSelected(day)) {
        // Deselect the date if it's already selected
        const lastSelectedDayIndex = selectedMonthDates.lastIndexOf(day);
        if (lastSelectedDayIndex !== -1) {
          this.selectedDates[monthIndex] = selectedMonthDates.slice(0, lastSelectedDayIndex);
        }
      } else {
        // Select the date if it's not already selected
        const previousDay = selectedMonthDates[selectedMonthDates.length - 1];
        if (previousDay === undefined || day === previousDay + 1 || day === previousDay - 1) {
          this.selectedDates[monthIndex] = [...selectedMonthDates, day];
        }
      }
    }
  }




  getFormattedYear(monthIndex: number): string {
    if (monthIndex < this.currentMonthIndex || (monthIndex === this.currentMonthIndex && this.currentMonthDays === this.currentMonthDays)) {
      return this.currentYear.toString();
    } else {
      return (this.currentYear).toString();
    }
  }
  formatDate(day: number): string {
    const formattedDay = day < 10 ? '0' + day : day.toString();
    const formattedMonth = this.currentMonthIndex + 1 < 10 ? '0' + (this.currentMonthIndex + 1) : (this.currentMonthIndex + 1).toString();
    return `${formattedDay}/${formattedMonth}/${this.currentYear}`;
  }


  getFormattedDates(): string[] {
    const formattedDates: string[] = [];
    for (const monthIndex in this.selectedDates) {
      const selectedDays = this.selectedDates[monthIndex];
      if (selectedDays) {
        const formattedMonth = +monthIndex + 1;
        const formattedYear = this.getFormattedYear(+monthIndex);

        const formattedMonthDates = selectedDays.map(day => {
          const formattedDay = day < 10 ? '0' + day : day.toString();
          return `${formattedDay}/${formattedMonth}/${formattedYear}`;
        });
        formattedDates.push(...formattedMonthDates);
      }
    }
    return formattedDates;
  }

  selectDay(day: number): void {
    const monthIndex = this.getMonthIndex(this.currentMonth);
    const selectedMonthDates = this.selectedDates[monthIndex] || [];

    if (selectedMonthDates.length === 0) {
      // No dates selected in the current month
      this.selectedDates[monthIndex] = [day];
    } else {
      // Dates already selected in the current month
      const previousDay = selectedMonthDates[selectedMonthDates.length - 1];
      if (previousDay === undefined || day === previousDay + 1) {
        this.selectedDates[monthIndex] = [...selectedMonthDates, day];
      }
    }
  }

  isPastDay(day: number): boolean {
    const today = new Date();
    const currentMonthIndex = this.getMonthIndex(this.currentMonth);
    const currentYear = this.currentYear;

    if (
      currentYear < today.getFullYear() ||
      (currentYear === today.getFullYear() && currentMonthIndex < today.getMonth()) ||
      (currentYear === today.getFullYear() && currentMonthIndex === today.getMonth() && day < today.getDate())
    ) {
      return true; // Day is in the past
    }

    return false; // Day is not in the past
  }


  opp(): void {
    const selectedDates: string[] = this.getFormattedDates();
    console.log('Selected Dates:', selectedDates);
  }





}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  calendarData: number[] = [];
  currentMonthIndex: number;
  currentYear: number;
  currentMonth: string;
  currentMonthDays: number;
  form: FormGroup;
  years: number[] = [];
  selectedDays: { [monthIndex: number]: number[] } = {}; // Separate selected days for each month
  availableDays: boolean[] = [];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      calendrier: ['']
    });
  }

  ngOnInit() {
    this.setCurrentMonth();
    this.generateYears();
    this.generateCalendarData(this.currentMonthIndex, this.currentYear);
    this.updateFormControlValue();
  }

  isSelected(day: number): boolean {
    const selectedDays = this.selectedDays[this.currentMonthIndex];
    const selectedYearDays = this.selectedDays[this.currentMonthIndex]?.filter(yearDay =>
      this.getFormattedYear(this.currentMonthIndex) === this.currentYear.toString() ? yearDay === day : true
    );
    return selectedYearDays && selectedYearDays.includes(day);
  }

  isDayAvailable(day: number): boolean {
    return this.availableDays[day];
  }

  selectDay(day: number) {
    if (!this.selectedDays[this.currentMonthIndex]) {
      this.selectedDays[this.currentMonthIndex] = []; // Initialize array for the month if it doesn't exist
    }

    const selectedDays = this.selectedDays[this.currentMonthIndex];
    const selectedIndex = selectedDays.indexOf(day);

    if (selectedIndex === -1) {
      selectedDays.push(day); // Add the selected day for the current month
    } else {
      selectedDays.splice(selectedIndex, 1); // Remove the selected day from the current month
    }

    this.availableDays[day] = !this.availableDays[day]; // Toggle the availability of the selected day

    this.updateFormControlValue();
  }

  changeYear(event: Event) {
    const year = +(event.target as HTMLSelectElement).value;
    const previousYear = this.currentYear;

    this.currentYear = year;

    // Clear selected days for the previous year
    delete this.selectedDays[previousYear];

    // Clear selected days for the current month if it exists
    delete this.selectedDays[this.currentMonthIndex];

    this.generateCalendarData(this.currentMonthIndex, this.currentYear);

    this.updateFormControlValue();
  }

  generateCalendarData(monthIndex: number, year: number) {
    const daysInEachMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const firstDay = new Date(year, monthIndex, 1).getDay();
    const daysInMonth = daysInEachMonth[monthIndex];

    this.calendarData = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    this.availableDays = Array.from({ length: daysInMonth + firstDay }, (_, i) => i >= firstDay); // Mark available days starting from 'firstDay'
  }

  setCurrentMonth() {
    const date = new Date();
    this.currentMonthIndex = date.getMonth();
    this.currentYear = date.getFullYear();

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    this.currentMonth = monthNames[this.currentMonthIndex];
    this.currentMonthDays = this.calendarData.filter(day => day >= 0).length;
  }

  prevMonth() {
    if (this.currentMonthIndex === 0) {
      this.currentYear--;
      this.currentMonthIndex = 11;
    } else {
      this.currentMonthIndex--;
    }

    this.currentMonth = this.getMonthName(this.currentMonthIndex);
    this.generateCalendarData(this.currentMonthIndex, this.currentYear);
    this.currentMonthDays = this.calendarData.filter(
      day => day >= 0 && day < this.getDaysInMonth(this.currentMonthIndex, this.currentYear)
    ).length;

    this.updateFormControlValue();
  }

  nextMonth() {
    if (this.currentMonthIndex === 11) {
      this.currentYear++;
      this.currentMonthIndex = 0;
    } else {
      this.currentMonthIndex++;
    }

    this.currentMonth = this.getMonthName(this.currentMonthIndex);
    this.generateCalendarData(this.currentMonthIndex, this.currentYear);
    this.currentMonthDays = this.calendarData.filter(
      day => day >= 0 && day < this.getDaysInMonth(this.currentMonthIndex, this.currentYear)
    ).length;

    this.updateFormControlValue();
  }

  getMonthName(monthIndex: number): string {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[monthIndex];
  }

  getDaysInMonth(monthIndex: number, year: number): number {
    const date = new Date(year, monthIndex + 1, 0);
    return date.getDate();
  }

  generateYears() {
    const startYear = new Date().getFullYear();
    const endYear = startYear + 10;
    this.years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);
  }

  getFormattedDates(): string[] {
    const formattedDates: string[] = [];
    for (const monthIndex in this.selectedDays) {
      const selectedDays = this.selectedDays[monthIndex];
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

  getFormattedYear(monthIndex: number): string {
    if (monthIndex < this.currentMonthIndex || (monthIndex === this.currentMonthIndex && this.currentMonthDays === this.currentMonthDays)) {
      return this.currentYear.toString();
    } else {
      return (this.currentYear - 1).toString();
    }
  }

  updateFormControlValue() {
    const selectedDates = this.getFormattedDates();
    this.form.patchValue({
      calendrier: selectedDates
    });
  }

  opp() {
    const selectedDates = this.getFormattedDates();
    console.log('Selected dates:', selectedDates);
  }

  formatDate(day: number): string {
    const formattedDay = day < 10 ? '0' + day : day.toString();
    const formattedMonth = this.currentMonthIndex + 1 < 10 ? '0' + (this.currentMonthIndex + 1) : (this.currentMonthIndex + 1).toString();
    return `${formattedDay}/${formattedMonth}/${this.currentYear}`;
  }
  isCurrentDay(day: number): boolean {
    const currentDate = new Date();
    return day === currentDate.getDate() && this.currentMonthIndex === currentDate.getMonth() && this.currentYear === currentDate.getFullYear();
  }
}
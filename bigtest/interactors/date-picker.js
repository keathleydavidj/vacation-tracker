import {
  clickable,
  fillable,
  interactor,
  text,
  value,
  collection,
  blurrable,
  isVisible
} from '@bigtest/interactor';

@interactor class DatePicker {
  blurInput = blurrable('input');
  focusInput = clickable('input');
  fillInput = fillable('input');
  value = value('input');
  isDayPickerVisible = isVisible('.DayPicker');

  dayCells = collection('.DayPicker-Day', {
    clickDay: clickable(),
    dayText: text()
  });

  async selectDay(day) {
    await this.focusInput()
      .when(() => this.isDayPickerVisible);
    await this.dayCells()
      .find(cell => cell.dayText === `${day}`)
      .clickDay();
  }
}

export default DatePicker;
import {
  clickable,
  fillable,
  interactor,
  isPresent,
  property,
  selectable,
  text,
  value,
  collection,
  focusable,
  blurrable,
  action,
  scoped,
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
      .when(() => this.isDayPickerVisible)
    await this.dayCells()
      .find(cell => cell.dayText === `${day}`)
      .clickDay();
  }
}

@interactor class CreatePage {
  hasHeading = isPresent('h6');
  headingText = text('h6');

  ownerName = value('[data-test-owner-name]');
  status = value('[data-test-status]');
  startDate = scoped('[data-test-start-date] .DayPickerInput', DatePicker);
  endDate = scoped('[data-test-end-date] .DayPickerInput', DatePicker);
  nameIsReadOnly = property('[data-test-owner-name]', 'readOnly');

  changeOwnerName = fillable('[data-test-owner-name]');

  // changeStartDate = fillable('[data-test-start-date]');
  // changeEndDate = fillable('[data-test-end-date]');

  changeStartDate(day) {
    return this.startDate.selectDay(day);
  }

  changeEndDate(day) {
    return this.endDate.selectDay(day);
  }

  clickSave = clickable('[data-test-save]');
  clickCancel = clickable('[data-test-cancel]');
  isSaveDisabled = property('[data-test-save]', 'disabled');
}

export default new CreatePage('[data-test-create-route]');

import {
  clickable,
  fillable,
  interactor,
  isPresent,
  property,
  text,
  value,
  scoped,
} from '@bigtest/interactor';
import DatePicker from './date-picker';

@interactor class CreatePage {
  hasHeading = isPresent('h6');
  headingText = text('h6');

  ownerName = value('[data-test-owner-name]');
  status = value('[data-test-status]');
  startDate = scoped('[data-test-start-date] .DayPickerInput', DatePicker);
  endDate = scoped('[data-test-end-date] .DayPickerInput', DatePicker);
  nameIsReadOnly = property('[data-test-owner-name]', 'readOnly');

  changeOwnerName = fillable('[data-test-owner-name]');

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

import {
  clickable,
  fillable,
  interactor,
  isPresent,
  property,
  selectable,
  text,
  value
} from '@bigtest/interactor';

@interactor class DatePicker {
  
}

@interactor class CreatePage {
  hasHeading = isPresent('h6');
  headingText = text('h6');

  ownerName = value('[data-test-owner-name]');
  status = value('[data-test-status]');
  startDate = new DatePicker('[data-test-start-date]');
  endDate = new DatePicker('[data-test-end-date]');
  nameIsReadOnly = property('[data-test-owner-name]', 'readOnly');

  changeStatus = selectable('[data-test-status]');
  // changeStartDate = fillable('[data-test-start-date]');
  // changeEndDate = fillable('[data-test-end-date]');
  changeStartDate(date) {
    /* first focus on the input field
      then pick the date that matches the input param
      then blur focus away 
    */
    this.startDate
  }

  clickSave = clickable('[data-test-save]');
  clickCancel = clickable('[data-test-cancel]');
  isSaveDisabled = property('[data-test-save]', 'disabled');
}

export default new CreatePage('[data-test-create-route]');

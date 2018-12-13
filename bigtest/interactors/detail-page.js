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

@interactor class DetailPage {
  hasHeading = isPresent('h6');
  headingText = text('h6');

  ownerName = value('[data-test-owner-name]');
  status = value('[data-test-status]');
  startDate = value('[data-test-start-date]');
  endDate = value('[data-test-end-date]');
  nameIsReadOnly = property('[data-test-owner-name]', 'readOnly');

  changeStatus = selectable('[data-test-status]');
  changeStartDate = fillable('[data-test-start-date]');
  changeEndDate = fillable('[data-test-end-date]');

  clickSave = clickable('[data-test-save]');
  clickCancel = clickable('[data-test-cancel]');
}

export default new DetailPage('[data-test-detail-route]');

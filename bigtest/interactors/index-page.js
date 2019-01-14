import {
  collection,
  interactor,
  isPresent,
  scoped,
  text,
  clickable,
  isVisible
} from '@bigtest/interactor';

@interactor class IndexPage {
  hasHeading = isPresent('[data-test-index-header]');
  headingText = text('[data-test-index-header]');

  isCreateButtonVisible = isVisible('[data-test-create-button]');
  clickCreateButton = clickable('[data-test-create-button]');

  requestList = collection('[data-test-request-list-item]', {
    ownerName: text('[data-test-owner-name]'),
    status: scoped('[data-test-status]', {
      label: text('[data-test-label]'),
      text: text('[data-test-value]')
    }),
    startDate: scoped('[data-test-start-date]', {
      label: text('[data-test-label]'),
      text: text('[data-test-value]')
    }),
    endDate: scoped('[data-test-end-date]', {
      label: text('[data-test-label]'),
      text: text('[data-test-value]')
    }),

    clickEdit: clickable('[data-test-edit-icon]'),
    clickDelete: clickable('[data-test-delete-icon]')
  });
}

export default new IndexPage('[data-test-index-route]');

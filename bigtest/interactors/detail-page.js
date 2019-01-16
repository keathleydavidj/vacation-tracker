import {
  interactor,
  isPresent,
  text,
  scoped
} from '@bigtest/interactor';
import EditForm from './edit-form';

@interactor class DetailPage {
  hasHeading = isPresent('h6');
  headingText = text('h6');

  form = scoped('form', EditForm);
}

export default new DetailPage('[data-test-detail-route]');

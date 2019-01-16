import {
  interactor,
  isPresent,
  text,
  scoped
} from '@bigtest/interactor';
import EditForm from './edit-form';

@interactor class CreatePage {
  hasHeading = isPresent('h6');
  headingText = text('h6');

  form = scoped('form', EditForm);
}

export default new CreatePage('[data-test-create-route]');

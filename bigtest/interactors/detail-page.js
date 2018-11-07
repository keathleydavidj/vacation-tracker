import { interactor, isPresent, text } from '@bigtest/interactor';

@interactor class DetailPage {
  hasHeading = isPresent('h6');
  headingText = text('h6');
}

export default new DetailPage('#detail-route');

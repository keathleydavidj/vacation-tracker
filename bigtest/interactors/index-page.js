import { interactor, isPresent, text } from '@bigtest/interactor';

@interactor class IndexPage {
  hasHeading = isPresent('h6');
  headingText = text('h6');
}

export default new IndexPage('#index-route');

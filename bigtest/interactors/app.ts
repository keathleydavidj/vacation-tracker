import {
  clickable,
  collection,
  interactor,
  isPresent,
  scoped,
  text,
} from '@bigtest/interactor';

@interactor
class AppInteractor {
  static defaultScope = 'app-root';

  hasHeading = isPresent('h1');

  navBar = scoped('[data-test-nav-bar]', {
    clickCalendar: clickable('[data-test-nav-calendar-link]'),
    clickRequests: clickable('[data-test-nav-index-link]')
  });
}

export default AppInteractor;

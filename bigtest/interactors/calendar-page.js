import { interactor, isPresent, text } from '@bigtest/interactor';

@interactor class CalendarPage {
  hasHeading = isPresent('h6');
  headingText = text('h6');
}

export default new CalendarPage('#calendar-route');

import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

function CalendarComponent(props) {
  const { localizer: localizerProp, ...restProps } = props;
  return <Calendar {...restProps} localizer={localizer} />;
}

export default CalendarComponent;

import { ErrorComponent } from '../../components/error';
import { renderDOM } from '../../utils/renderdom';

const errorPage = new ErrorComponent({
  code: 404,
  message: 'Не туда попали',
});

renderDOM('#app', errorPage);

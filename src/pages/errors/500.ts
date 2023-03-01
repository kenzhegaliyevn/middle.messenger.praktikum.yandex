import { ErrorComponent } from '../../components/error';
import { renderDOM } from '../../utils/renderdom';

const errorPage = new ErrorComponent({
  code: 500,
  message: 'Уже фиксим',
});

renderDOM('#app', errorPage);

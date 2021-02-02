  import { root } from './constants.js';

  // Запрет вертикального скролла
  export const disableScrollY = () => {
    root.classList.add('root_scroll_disable');
  };

  // Разрешение вертикального скролла
  export const enableScrollY = () => {
    root.classList.remove('root_scroll_disable');
  };

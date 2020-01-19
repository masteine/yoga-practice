import { init } from '@rematch/core';
import { home } from '../../views/Home/_models';

export const store = init({
  models: {
    home
  }
});

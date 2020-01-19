import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from './index.js';

storiesOf('Atoms/Button', module).add('default', () => (
  <Button>Default</Button>
));

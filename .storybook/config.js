import { configure } from '@storybook/html';

configure(require.context('../stories', true, /\.js$/), module);

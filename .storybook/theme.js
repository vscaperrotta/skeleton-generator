import { create } from '@storybook/theming';
import pkjJson from '../package.json';

export default create({
  base: 'dark',
  brandTitle: pkjJson.displayName,
  brandTarget: '_self',
});
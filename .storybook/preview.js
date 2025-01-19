import '../src/styles/global.scss';
import '../src/styles/storybook.scss';

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ['Base', 'System', 'Components'],
      },
    },
  }
};

export default preview;
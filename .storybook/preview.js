import '../src/styles/main.scss';

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
const config = {
  // Required
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  stories: [
    '../src/components/**/*.stories.@(js|jsx)',
    '../src/stories/*.mdx'
  ],
  // Optional
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
};

export default config;
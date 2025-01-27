
import { fn } from "@storybook/test";
import Footer from './Footer';

export const ActionsData = {
};

export default {
  component: Footer,
  title: 'Components/Footer',
  tags: ['autodocs'],
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  args: {
    ...ActionsData,
  },
  parameters: {
    docs: {
      description: {
        component: 'Another description, overriding the comments'
      }
    }
  }
};

export const Default = {
  args: {
  },
};

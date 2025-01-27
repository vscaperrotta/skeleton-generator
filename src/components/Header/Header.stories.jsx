
import { fn } from "@storybook/test";
import Header from './Header';

export const ActionsData = {
};

export default {
  component: Header,
  title: 'Components/Header',
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

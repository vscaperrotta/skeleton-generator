
import { fn } from "@storybook/test";
import Tabs from './Tabs';

export const ActionsData = {
};

export default {
  component: Tabs,
  title: 'Components/Tabs',
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

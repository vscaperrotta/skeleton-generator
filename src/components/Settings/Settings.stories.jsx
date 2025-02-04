
import { fn } from "@storybook/test";
import Settings from './Settings';

export const ActionsData = {
};

export default {
  component: Settings,
  title: 'Components/Settings',
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

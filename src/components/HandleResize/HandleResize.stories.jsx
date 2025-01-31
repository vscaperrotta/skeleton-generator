
import { fn } from "@storybook/test";
import HandleResize from './HandleResize';

export const ActionsData = {
};

export default {
  component: HandleResize,
  title: 'Components/HandleResize',
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

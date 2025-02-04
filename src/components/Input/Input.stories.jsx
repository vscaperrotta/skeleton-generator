
import { fn } from "@storybook/test";
import Input from './Input';

export const ActionsData = {
};

export default {
  component: Input,
  title: 'Components/Input',
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

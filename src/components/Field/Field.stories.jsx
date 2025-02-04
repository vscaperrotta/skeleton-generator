
import { fn } from "@storybook/test";
import Field from './Field';

export const ActionsData = {
};

export default {
  component: Field,
  title: 'Components/Field',
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

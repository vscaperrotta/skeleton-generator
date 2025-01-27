
import { fn } from "@storybook/test";
import Toggle from './Toggle';

export const ActionsData = {
};

export default {
  component: Toggle,
  title: 'Components/Toggle',
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


import { fn } from "@storybook/test";
import CodeOutput from './CodeOutput';

export const ActionsData = {
};

export default {
  component: CodeOutput,
  title: 'Components/CodeOutput',
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

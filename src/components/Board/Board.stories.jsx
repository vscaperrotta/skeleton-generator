
import { fn } from "@storybook/test";
import Board from './Board';

export const ActionsData = {
};

export default {
  component: Board,
  title: 'Components/Board',
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

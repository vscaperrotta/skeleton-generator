
import { fn } from "@storybook/test";
import Controller from './Controller';

export const ActionsData = {
};

export default {
  component: Controller,
  title: 'Components/Controller',
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

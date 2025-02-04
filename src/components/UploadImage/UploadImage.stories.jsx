
import { fn } from "@storybook/test";
import UploadImage from './UploadImage';

export const ActionsData = {
};

export default {
  component: UploadImage,
  title: 'Components/UploadImage',
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

import logger from '../../utils/logger.js';
import utils from '../../utils/utils.js';

const apiGenerator = {
  description: logger.custom('ddffdd', 'Add an api for project.'),
  prompts: [
    {
      type: 'list',
      name: 'whichAction',
      message: 'On which Route want to add a action?',
      pageSize: 12,
      choices: () => {
        const myChoiches = utils.readDir(`${utils.getPath()}store/actions/`);
        const list = [];
        myChoiches.forEach((m) => {
          const f = m.replace('.js', '');
          if (f !== 'index') {
            list.push(f);
          }
        });
        return list;
      },
    },
    {
      type: 'input',
      name: 'actionName',
      message: 'What\'s the name of the action?',
      pageSize: 10,
    },
  ],
  actions: (data) => {
    data.username = utils.getAuthor();
    data.date = utils.getDate();

    const actions = [
      logger.delayLog('Collect all answers'),
      logger.delayLog('Configure all templates'),
      logger.delayLog('Converting hbs template'),
      logger.delayLog('Adding component'),
      {
        type: 'modify',
        path: `${utils.getPath()}/store/actions/{{whichAction}}.js`,
        pattern: /(\/\/ @generator action:method)/gm,
        templateFile: './action/templates/action.js.hbs',
        abortOnFail: true,
        skipIfExists: true,
      },
      {
        type: 'modify',
        path: `${utils.getPath()}/store/actions/{{whichAction}}.js`,
        pattern: /(\/\/ @generator reducer:type:action)/gm,
        templateFile: './action/templates/reducer.js.hbs',
        abortOnFail: true,
        skipIfExists: true,
      },
      {
        type: 'modify',
        path: `${utils.getPath()}/store/actions/{{whichAction}}.js`,
        pattern: /(\/\/ @generator action:action-type)/gm,
        templateFile: './action/templates/type.js.hbs',
        abortOnFail: true,
        skipIfExists: true,
      }
    ]

    return actions
  }
}

export default apiGenerator;

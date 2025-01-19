/**
 *
 * Task
 *
 * @author Vittorio Scaperrotta
 * @date 19-Jan-2025
*/

import React from 'react';
import PropTypes from 'prop-types';
import './Task.scss';

function Task({ task: { id, title, state }, onArchiveTask, onPinTask }) {
  return (
    <>
      <h1>Test</h1>
      <h2>Test</h2>
      <h3>Test</h3>
    </>
  );
}

Task.propTypes = {};

Task.defaultProps = {};

export default Task;

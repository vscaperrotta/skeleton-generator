/**
 *
 * Header
 *
 * @author Vittorio Scaperrotta
 * @date 21-Jan-2025
*/

import React from 'react';
import messages from './messages';
import Button from '@components/Button';
import './Header.scss';

const Header = () => {

  function handleClickGitHub() {
    window.open('https://github.com/vscaperrotta/skeleton-generator', '_blank');
  }

  return (
    <header className='header__container'>
      <div className='header__placeholder header__placeholder--strips'>
        <div />
        <div />
        <div />
      </div>
      <div className='header__placeholder header__placeholder--squares'>
        <div />
        <div />
      </div>
      <h3 className='header__title'>{messages.title}</h3>
      <p className='header__paragraph'>{messages.paragraph}</p>
      <div className='header__actions'>
        <Button
          onClick={handleClickGitHub}
          label={messages.github}
          variant='outlined'
        />
      </div>
    </header>
  )
}

Header.propTypes = {};

Header.defaultProps = {};

export default Header;

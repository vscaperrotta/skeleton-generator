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
import Shape1 from '@assets/header/Shape1';
import Shape2 from '@assets/header/Shape2';
import './Header.scss';

const Header = () => {

  function handleClickGitHub() {
    window.open('https://github.com/vscaperrotta/skeleton-generator', '_blank');
  }

  return (
    <header className='header__container'>
      <div className='header__shapes header__shapes--shape1'>
        <Shape1 />
      </div>
      <div className='header__shapes header__shapes--shape2'>
        <Shape2 />
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

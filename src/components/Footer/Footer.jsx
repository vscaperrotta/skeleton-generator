/**
 *
 * Footer
 *
 * @author Vittorio Scaperrotta
 * @date 21-Jan-2025
*/

import React from 'react';
import messages from './messages';
import './Footer.scss';

const Footer = () => {
  return (
    <div className="footer__container">
      <div className="footer__content">
        <p className="footer__paragraph">
          {messages.release}
        </p>
        <p className="footer__paragraph">
          {messages.paragraph}
        </p>
      </div>
    </div>
  )
}

export default Footer;

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
      <p className="footer__paragraph">
        {messages.paragraph}
      </p>
    </div>
  )
}

export default Footer;

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { ensureConfig } from '@edx/frontend-platform/config';
import { AppContext } from '@edx/frontend-platform/react';

import messages from './Footer.messages';
import LanguageSelector from './LanguageSelector';

import facebookIcon from './facebook.png';
import xIcon from './x.png';
import instagramIcon from './instagram.png';
import linkedinIcon from './linkedin.png';
import youtubeIcon from './youtube.png';

ensureConfig([
  'LMS_BASE_URL',
  'LOGO_TRADEMARK_URL',
], 'Footer component');

const EVENT_NAMES = {
  FOOTER_LINK: 'edx.bi.footer.link',
};

class SiteFooter extends React.Component {
  constructor(props) {
    super(props);
    this.externalLinkClickHandler = this.externalLinkClickHandler.bind(this);
  }

  externalLinkClickHandler(event) {
    const label = event.currentTarget.getAttribute('href');
    const eventName = EVENT_NAMES.FOOTER_LINK;
    const properties = {
      category: 'outbound_link',
      label,
    };
    sendTrackEvent(eventName, properties);
  }

  render() {
    const {
      supportedLanguages,
      onLanguageSelected,
      logo,
      intl,
    } = this.props;
    const showLanguageSelector = supportedLanguages.length > 0 && onLanguageSelected;
    const { config } = this.context;

    return (
      <footer
        role="contentinfo"
        className="footer d-flex border-top py-3 px-4"
      >
        <div className="container-fluid d-flex container">

           {/* Links to terms, privacy, and about */}
           <div className="footer-links">
  <a href={`${config.LMS_BASE_URL}/tos`} className="footer-link" onClick={this.externalLinkClickHandler}>
    {intl.formatMessage(messages.termsOfService)}
  </a>
  <a href={`${config.LMS_BASE_URL}/privacy`} className="footer-link" onClick={this.externalLinkClickHandler}>
    {intl.formatMessage(messages.privacyPolicy)}
  </a>
  <a href={`${config.LMS_BASE_URL}/about`} className="footer-link" onClick={this.externalLinkClickHandler}>
    {intl.formatMessage(messages.about)}
  </a>
</div>

          


          <div className="flex-grow-1" />

          {/* Language selector */}
          {showLanguageSelector && (
            <LanguageSelector
              options={supportedLanguages}
              onSubmit={onLanguageSelected}
            />
          )}

          {/* Social media icons */}
          <div className="social-media">
 
  <a href="https://www.x.com" target="_blank" rel="noopener noreferrer">
    <img src={xIcon} alt="X" style={{ width: '24px', height: '24px', marginRight: '8px' }} />
  </a>
  <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
    <img src={linkedinIcon} alt="X" style={{ width: '24px', height: '24px', marginRight: '8px' }} />
  </a>
  <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
    <img src={instagramIcon} alt="Instagram" style={{ width: '24px', height: '24px', marginRight: '8px' }} />
  </a>
  <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
    <img src={facebookIcon} alt="Facebook" style={{ width: '24px', height: '24px', marginRight: '8px' }} />
  </a>
  <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
    <img src={youtubeIcon} alt="Instagram" style={{ width: '24px', height: '24px', marginRight: '8px' }} />
  </a>
  
</div>

         
        </div>
      </footer>
    );
  }
}

SiteFooter.contextType = AppContext;

SiteFooter.propTypes = {
  intl: intlShape.isRequired,
  logo: PropTypes.string,
  onLanguageSelected: PropTypes.func,
  supportedLanguages: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })),
};

SiteFooter.defaultProps = {
  logo: undefined,
  onLanguageSelected: undefined,
  supportedLanguages: [],
};

export default injectIntl(SiteFooter);
export { EVENT_NAMES };
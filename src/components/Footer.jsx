import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { ensureConfig } from '@edx/frontend-platform/config';
import { AppContext } from '@edx/frontend-platform/react';

import messages from './Footer.messages';
import LanguageSelector from './LanguageSelector';

import xIcon from './x.png';
import emailIcon from './email.png';

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
      intl,
    } = this.props;
    const showLanguageSelector = supportedLanguages.length > 0 && onLanguageSelected;
    const { config } = this.context;

    return (
      <footer role="contentinfo" className="site-footer">
        {/* Wrapper to center content with max-width 1440px */}
        <div className="footer-container">
          {/* Social Media Icon and Contact Info */}
          <div className="footer-contact">
            <p className="footer-contact-title">تواصلوا معنا</p>
            <div className="footer-social">
              <a href="https://x.com/Arab_ACINET" target="_blank" rel="noopener noreferrer" className="footer-social-item">
                <img src={xIcon} alt="X" className="footer-icon" />
                <span className="footer-social-text">@Arab_ACINET</span>
              </a>
            </div>
            <div className="footer-email-container">
              <img src={emailIcon} alt="Email" className="footer-icon" />
              <p className="footer-email">info@arabacinet.org</p>
            </div>
          </div>

          {/* Footer Links and Copyright */}
          <div className="footer-links-container">
            <a 
              href="https://www.arabacinet.org/ar/home" 
              className="footer-title" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              البوابة الالكترونية للشبكة
            </a>
            <div className="footer-links">
              <a
                href={`${config.LMS_BASE_URL}/tos`}
                className="footer-link"
                onClick={this.externalLinkClickHandler}
              >
                {intl.formatMessage(messages.termsOfService)}
              </a>
              <span className="footer-separator">|</span>
              <a
                href={`${config.LMS_BASE_URL}/privacy`}
                className="footer-link"
                onClick={this.externalLinkClickHandler}
              >
                {intl.formatMessage(messages.privacyPolicy)}
              </a>
            </div>
            <p className="footer-copyright">
            جميع الحقوق محفوظة &copy; 2025 الشبكة العربية للنزاهة ومكافحة الفساد.
            </p>
          </div>
        </div>
      </footer>
    );
  }
}

SiteFooter.contextType = AppContext;

SiteFooter.propTypes = {
  intl: intlShape.isRequired,
  onLanguageSelected: PropTypes.func,
  supportedLanguages: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })),
};

SiteFooter.defaultProps = {
  onLanguageSelected: undefined,
  supportedLanguages: [],
};

export default injectIntl(SiteFooter);
export { EVENT_NAMES };

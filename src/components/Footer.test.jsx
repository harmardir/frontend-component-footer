import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { ensureConfig } from '@edx/frontend-platform/config';
import { AppContext } from '@edx/frontend-platform/react';

import messages from './Footer.messages';

import xIcon from './x.png';

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
    const { intl } = this.props;
    const { config } = this.context;

    return (
      <footer className="footer rtl">
        {/* Right Side: Copyright and Links */}
        <div className="footer-right">
          <p className="footer-copyright">
            &copy; 2025 الشبكة العربية للنزاهة ومكافحة الفساد. جميع الحقوق محفوظة.
          </p>
          <div className="footer-links">
            <a
              href={`${config.LMS_BASE_URL}/tos`}
              className="footer-link"
              onClick={this.externalLinkClickHandler}
            >
              {intl.formatMessage(messages.termsOfService)}
            </a>
            <a
              href={`${config.LMS_BASE_URL}/privacy`}
              className="footer-link"
              onClick={this.externalLinkClickHandler}
            >
              {intl.formatMessage(messages.privacyPolicy)}
            </a>
          </div>
        </div>

        {/* Left Side: Icon and Email */}
        <div className="footer-left">
          <img src={xIcon} alt="X" className="footer-icon" />
          <p className="footer-email">info@arabacinet.org</p>
        </div>
      </footer>
    );
  }
}

SiteFooter.contextType = AppContext;

SiteFooter.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(SiteFooter);
export { EVENT_NAMES };

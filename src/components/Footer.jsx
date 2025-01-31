import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { ensureConfig } from '@edx/frontend-platform/config';
import { AppContext } from '@edx/frontend-platform/react';

import messages from './Footer.messages';
import LanguageSelector from './LanguageSelector';

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
    const {
      supportedLanguages,
      onLanguageSelected,
      intl,
    } = this.props;
    const showLanguageSelector = supportedLanguages.length > 0 && onLanguageSelected;
    const { config } = this.context;

    return (
      <footer
        role="contentinfo"
        className="footer bg-green-600 text-white py-6 px-4 flex flex-col md:flex-row md:justify-between md:items-center"
      >
        {/* Social Media Icon and Contact Info */}
        <div className="flex flex-col items-center md:items-start">
          <img src={xIcon} alt="X" className="w-12 h-12 mb-2" />
          <p className="text-sm font-semibold">info@arabacinet.org</p>
        </div>

        {/* Footer Links and Copyright */}
        <div className="mt-4 md:mt-0 text-center md:text-right">
          <div className="text-sm space-x-4 md:space-x-2">
            <a
              href={`${config.LMS_BASE_URL}/tos`}
              className="footer-link hover:underline"
              onClick={this.externalLinkClickHandler}
            >
              {intl.formatMessage(messages.termsOfService)}
            </a>
            <span className="hidden md:inline">|</span>
            <a
              href={`${config.LMS_BASE_URL}/privacy`}
              className="footer-link hover:underline"
              onClick={this.externalLinkClickHandler}
            >
              {intl.formatMessage(messages.privacyPolicy)}
            </a>
          </div>
          <p className="mt-2 text-xs">
            &copy; 2025 الشبكة العربية للنزاهة ومكافحة الفساد. جميع الحقوق محفوظة.
          </p>
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

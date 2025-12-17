/**
 * 51st Year Ministry Banner
 * Dismissible banner that shows until mid-summer 2026
 *
 * Usage: Simply include this script on any page where you want the banner to appear.
 * The banner will automatically be created and displayed if conditions are met.
 */

(function() {
  'use strict';

  const BANNER_STORAGE_KEY = 'parakaleo_51st_year_banner_dismissed';
  const EXPIRATION_DATE = new Date('2026-07-15'); // Mid-summer 2026

  // Banner configuration - easily update the message here
  const BANNER_CONFIG = {
    message: "Celebrating 50 years of the Lord's faithfulness at Stanford and beyond, and eager to continue growing and serving in our 51st year (2026)!",
    mobileMessage: "Celebrating 50 years of ministry and eager to continue serving in our 51st year (2026)!",
    alertType: 'alert-danger' // Using alert-danger as base for royal purple tones, with custom styling
  };

  function shouldShowBanner() {
    // Check if banner has been dismissed
    const dismissed = localStorage.getItem(BANNER_STORAGE_KEY);
    if (dismissed === 'true') {
      return false;
    }

    // Check if we're past the expiration date
    const now = new Date();
    if (now > EXPIRATION_DATE) {
      return false;
    }

    return true;
  }

  function dismissBanner() {
    localStorage.setItem(BANNER_STORAGE_KEY, 'true');
  }

  function createBannerHTML() {
    const mobileMessage = BANNER_CONFIG.mobileMessage;
    const desktopMessage = BANNER_CONFIG.message;

    return `
      <div id="ministry-year-banner" class="alert ${BANNER_CONFIG.alertType} alert-dismissible show fixed-bottom mb-0" role="alert">
        <div class="d-flex align-items-center banner-flex-container">
          <div class="banner-text-container">
            <span class="d-none d-sm-inline banner-desktop-message">
              ${desktopMessage}
            </span>
            <span class="d-inline d-sm-none banner-mobile-message">
              ${mobileMessage}
            </span>
          </div>
          <div class="banner-close-container">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function initBanner() {
    if (!shouldShowBanner()) {
      return;
    }

    // Check if banner already exists (in case script is loaded multiple times)
    if ($('#ministry-year-banner').length > 0) {
      return;
    }

    // Create and append the banner to the body
    const $banner = $(createBannerHTML());
    $('body').append($banner);

    // Banner positioning is handled by CSS

    // Ensure body doesn't have horizontal overflow
    $('body').css('overflow-x', 'hidden');

    // Handle Bootstrap alert close event (Bootstrap 4)
    $banner.on('closed.bs.alert', function() {
      dismissBanner();
    });

    // Also add direct click handler as fallback
    $banner.find('.close').on('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      dismissBanner();
      $banner.fadeOut(300, function() {
        $(this).remove();
      });
    });

    // Force a reflow to ensure visibility on mobile
    $banner[0].offsetHeight;
  }

  // Initialize when DOM is ready (using jQuery since it's already loaded)
  $(document).ready(function() {
    initBanner();
  });

  // Also try to show immediately if DOM is already ready
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(initBanner, 0);
  }
})();


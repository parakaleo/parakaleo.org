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
    message: "We're well into our 51st year of ministry and eager to continue into 2026!",
    alertType: 'alert-info' // Bootstrap 4 alert types: alert-info, alert-success, alert-warning, alert-danger
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
    // Mobile-friendly shorter message
    const mobileMessage = "We're well into our 51st year of ministry and eager to continue into 2026!";
    const desktopMessage = BANNER_CONFIG.message;

    return `
      <div id="ministry-year-banner" class="alert ${BANNER_CONFIG.alertType} alert-dismissible show fixed-bottom mb-0" role="alert" style="border-radius: 0; z-index: 1030; left: 0; right: 0; width: 100vw; max-width: 100vw; box-sizing: border-box; padding: 0.75rem 1rem; display: block !important; opacity: 1 !important; margin: 0;">
        <div style="display: flex; align-items: center; max-width: 100%; box-sizing: border-box;">
          <div style="flex: 1; min-width: 0; padding-right: 0.5rem;">
            <span class="d-none d-sm-inline" style="font-size: 0.95rem; word-wrap: break-word;"><strong>${desktopMessage}</strong></span>
            <span class="d-inline d-sm-none" style="font-size: 0.875rem; word-wrap: break-word;"><strong>${mobileMessage}</strong></span>
          </div>
          <div style="flex-shrink: 0;">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close" style="padding: 0.5rem; margin: 0; font-size: 1.5rem; line-height: 1; min-width: 44px; min-height: 44px; border: none; background: transparent;">
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

    // Ensure banner is visible immediately (especially on mobile)
    $banner.css({
      'display': 'block',
      'position': 'fixed',
      'bottom': '0',
      'left': '0',
      'right': '0',
      'width': '100vw',
      'max-width': '100vw',
      'box-sizing': 'border-box',
      'margin': '0',
      'overflow-x': 'hidden'
    });

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


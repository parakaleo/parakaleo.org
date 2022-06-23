if (location.hostname === 'localhost' || location.hostname.indexOf('ngrok') >= 0) {
  // var s = document.createElement('script')
  // s.src = "http://localhost:35729/livereload.js?snipver=1"
  // document.head.appendChild(s);


  var showSpecials = () => {
    var style = document.createElement('style')
    style.innerText = '.macro { background-color: orange; opacity: 0.7; }'
    style.id = 'edit-mode-show-specials'
    document.body.appendChild(style)
  }
  var edit = () => {
    showSpecials()
    document.body.contentEditable = true
    window.onbeforeunload = function (e) {
      e = e || window.event;
      var msg = 'unsaved changes'
      if (e) { e.returnValue = msg; }
      return msg;
    };
  }

  var cleanup = function() {
    $('#edit-mode-show-specials').remove()
    $('style.tab-styles').remove()

    // handle brave
    $('script[data-dapp-detection=""]').remove()

    // handle livereload
    $('script[src*="livereload.js"]').remove()

    // handle top nav
    $('nav.is-fixed').removeClass('is-fixed')

    // handle tabs
    $('a[data-toggle="tab"]').removeClass('active').removeAttr('aria-expanded')
    $('div.tab-pane.fade').removeClass('active show').removeAttr('aria-expanded')
    $('div.tab-pane.fade').first().addClass('active show')
  }


  var save = () => {
    cleanup()
    window.onbeforeunload = null
    document.body.removeAttribute('contentEditable')
    var html = new XMLSerializer().serializeToString(document)
    var href = location.href
    var base = document.baseURI
    var path = location.pathname
    $.post("/save", {
      html,
      href,
      base,
      path
    }, function(data) {
      console.log(data)
    });
  }
}

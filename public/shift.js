// Sets the day/night shift before first paint. Kept as a file because the
// site's Content-Security-Policy does not allow inline scripts.
// Night is the default; a visitor's own choice from the toggle is remembered.
(function () {
  var shift
  try {
    shift = localStorage.getItem('shift')
  } catch (e) {}
  document.documentElement.dataset.shift = shift === 'day' ? 'day' : 'night'
})()

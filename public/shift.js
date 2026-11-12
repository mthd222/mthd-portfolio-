// Sets the day/night shift before first paint. Kept as a file because the
// site's Content-Security-Policy does not allow inline scripts.
(function () {
  var shift
  try {
    shift = localStorage.getItem('shift')
  } catch (e) {}
  if (shift !== 'day' && shift !== 'night') {
    shift = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'
  }
  document.documentElement.dataset.shift = shift
})()

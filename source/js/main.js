var is_dark_mode = 'light';
let dark_mode_class = () => {
  if (is_dark_mode == 'dark') {
    $('.ui.dropdown>.menu').addClass('inverted')
    $('table').addClass('inverted')
  }
  else {
    $('.ui.dropdown>.menu').removeClass('inverted')
    $('table').removeClass('inverted')
  }
}
let dark_mode = () => {
  let list = ['--header-col', '--header-bgcol', '--card-bgcol', '--innercode-bgcol', '--code-bgcol', '--font-col',
    '--title-col', '--background-img', '--dark-mode-bgcol', '--footer-col', '--background-col', 'innercode-col'];
  list.forEach((e) => {
    let a = getComputedStyle(document.documentElement).getPropertyValue(e);
    let b = getComputedStyle(document.documentElement).getPropertyValue(e + '-rev');
    document.documentElement.style.setProperty(e, b);
    document.documentElement.style.setProperty(e + '-rev', a);
  });
  is_dark_mode = (is_dark_mode == 'light' ? 'dark' : 'light');
  localStorage.setItem('dark-mode', is_dark_mode);
  dark_mode_class()
}

let x = localStorage.getItem('dark-mode');
if (!x) x = 'light', localStorage.setItem('dark-mode', x);
if (x == 'dark') dark_mode();

let init = () => {
  $('.ui.accordion').accordion()
  $('.ui.dropdown').dropdown({on: 'click', action: 'nothing'})
  $('table').addClass('ui celled table collapsing')
  dark_mode_class()
}

$(document).ready(init)
$(document).on('pjax:complete', init)
window.addEventListener('hexo-blog-decrypt', init)
var is_dark_mode = 'light';
let dark_mode_class = () => {
  if (is_dark_mode == 'dark') {
    $('.ui.dropdown>.menu').addClass('inverted')
    $('table').addClass('inverted')
    $('.ui.flyout').addClass('inverted')
    $('.ui.menu').addClass('inverted')
    $('.ui.sidebar').addClass('inverted')
    $('.ui.button').addClass('inverted')
    $('.ui.input').addClass('inverted')
  }
  else {
    $('.ui.dropdown>.menu').removeClass('inverted')
    $('table').removeClass('inverted')
    $('.ui.flyout').removeClass('inverted')
    $('.ui.menu').removeClass('inverted')
    $('.ui.sidebar').removeClass('inverted')
    $('.ui.button').removeClass('inverted')
    $('.ui.input').removeClass('inverted')
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
  $('.ui.accordion:not(.ui.accordion *)').accordion()
  $('.ui.dropdown').dropdown({on: 'click', action: 'nothing'})
  $('table').addClass('ui celled table unstackable')
  dark_mode_class()
}

$(document).ready(() => {
  init()
  const ap = new APlayer({
    container: document.getElementById('aplayer-content'),
    fixed: true,
    audio: [{
      name: '3300sbt',
      artist: 'Enucai',
      url: '/music/wsy3300sb.mp3',
      cover: 'https://enucai.github.io/images/avatar.jpeg',
    }]
  });
})
$(document).on('pjax:complete', init)
window.addEventListener('hexo-blog-decrypt', init)
window.addEventListener('hexo-blog-encrypt', init)
$(document).pjax('a[target!=_blank]', '#body', {fragment: '#body'});
$(document).on('pjax:start', function() { NProgress.start(); });
$(document).on('pjax:complete', function() { NProgress.done(); });
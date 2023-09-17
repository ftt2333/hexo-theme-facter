var md = require('markdown-it')()

let plugin_list = [
  'markdown-it-emoji',
  'markdown-it-sub',
  'markdown-it-sup',
  'markdown-it-deflist',
  'markdown-it-abbr',
  'markdown-it-footnote',
  'markdown-it-ins',
  'markdown-it-mark',
  '@iktakahiro/markdown-it-katex',
  // 'markdown-it-toc-and-anchor'
]

for (let i in plugin_list) {
  if (plugin_list[i] == 'markdown-it-toc-and-anchor') {
    md.use(require('./lib/markdown-it-toc-and-anchor').default)
  } else md.use(require(plugin_list[i]))
}

var renderer = (data) => { return md.render(data.text) }

hexo.extend.renderer.register('md', 'html', renderer, true);
hexo.extend.renderer.register('markdown', 'html', renderer, true);
hexo.extend.renderer.register('mkd', 'html', renderer, true);
hexo.extend.renderer.register('mkdn', 'html', renderer, true);
hexo.extend.renderer.register('mdwn', 'html', renderer, true);
hexo.extend.renderer.register('mdtxt', 'html', renderer, true);
hexo.extend.renderer.register('mdtext', 'html', renderer, true);

hexo.extend.tag.register('folding', (data, cont) => {
  let content = renderer({text: cont, path: '', toString: true, onRenderEnd: () => {}})
  let title = ''
  if (data.length > 0) title = data[0]
  let active = false
  if (data.length > 1) active = data[1]
  return `
    <div class="ui accordion">
      <div class="` + (active ? 'active' : '') + ` title">
        <i class="dropdown icon"></i>
        ` + title + `
      </div>
      <div class="` + (active ? 'active' : '') + ` content">
        <p>` + content + `</p>
      </div>
    </div>
  `

}, { ends: true })

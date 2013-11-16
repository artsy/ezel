var markdown = require('markdown').markdown,
    fs = require('fs'),
    cheerio = require('cheerio'),
    jade = require('jade');

var mdHTML = markdown.toHTML(fs.readFileSync('./README.md').toString());
var $ = cheerio.load(mdHTML);
var navItems = $('h2').map(function(i, el) { return $(el).text() });

var html = jade.compile(fs.readFileSync('./index.jade'), {
  filename: __dirname + '/index.jade',
})({ navItems: navItems });
var $ = cheerio.load(html);

$('h2').each(function() {
  $(this).attr('id', $(this).text().toLowerCase());
});

fs.writeFileSync('./index.html', $.html());
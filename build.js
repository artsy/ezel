var markdown = require('markdown').markdown,
    fs = require('fs'),
    cheerio = require('cheerio'),
    jade = require('jade'),
    request = require('superagent'),
    typeset = require('typeset');

request
  .get('https://raw.githubusercontent.com/artsy/ezel/master/README.md')
  .end(function(err, res) {
    if (err) {
      console.warn(err);
      return process.exit(1);
    }
    var $ = cheerio.load(markdown.toHTML(res.text));
    var navItems = $('h2').map(function(i, el) { return $(el).text() });
    // $('p').each(function(i, el) {
    //   var h = typeset($(el).html());
    //   console.log(h)
    //   $(el).html(h);
    // })

    var html = jade.compile(fs.readFileSync('./index.jade'), {
      filename: __dirname + '/index.jade',
    })({
      navItems: navItems,
      body: $.html()
    });
    var $ = cheerio.load(html);

    $('h2').each(function() {
      $(this).attr('id', $(this).text().toLowerCase());
    });

    fs.writeFileSync('./index.html', $.html());
  });

const http = require('http');
const fs = require('fs');
const cheerio = require('cheerio');
const request = require('request');
let count = 0;
let originUrl = `http://www.fabric4cloud.com`;

let imgDirname = '';
let limit = 2;

let start = (url) => {
  http.get(url, (res) => {
    let html = '';
    res.setEncoding('utf-8');
    res.on('data', (data) => {
      html += data;
    });
    res.on('end', (err) => {
      if (err) {
        console.log(err);
      } else {
        const $ = cheerio.load(html);
        let imgSrc = [];

        $('img').map((index, doc) => {
          imgSrc.push(doc.attribs.src);
        })

        imgSrc.map( (index, doc) => {
          const url = originUrl + index;
          request(url).pipe(fs.createWriteStream(`./imgs/${doc}.jpg`));
          count++;
          console.log(`已爬取图片 ${count} 张`);
        })
      }
    })
  })
}
start(originUrl);
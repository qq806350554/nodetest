var http = require('http');
var express = require('express');
var app = express();
var url = require('url'); //解析操作url
var superagent = require('superagent'); //这三个外部依赖不要忘记npm install
var cheerio = require('cheerio');
var eventproxy = require('eventproxy');
var targetUrl = 'http://www.meipai.com/medias/hot';
var ab=[];
superagent.get(targetUrl)
    .end(function (err, res) {
var $ = cheerio.load(res.text);
$('#mediasList>li').each(function (idx, element) {
var mp4_url= element.children[3].next['next'].attribs['data-video'];//视频地址
var pic_url=element.children[3].attribs['src']; //缩略图地址
var tx_url=element.children[6].next.children[1].children[1].attribs['src'].split("!")[0]; 
ab.push({mp4_url:mp4_url,pic_url:pic_url,tx_url:tx_url})
});
    });

app.get('/', function(req, res){
res.jsonp(ab);
});

app.listen(5000);
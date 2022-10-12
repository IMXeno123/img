js:
addListener("onClose", $.toString(() => {
	clearVar('fyclass_sel');
	clearVar('fyclass_se');
	clearVar('搜索');
}))
var d = [];
//------分类及替换-------//
const fyclass_cont = '最新音乐&轻音乐&有声音乐&有声电台&音乐心情&专辑曲目&MTV&3D音乐&伤感音乐&佛乐&八音盒&古风音乐&优美纯音乐&周杰伦&大自然音乐&小清新&庄重大气&异域风情&怀旧声音&悠扬的音乐&放松减压&新世纪&欢快愉悦&民谣&治愈系音乐&激情轻音&班得瑞&睡眠音乐&网络电台节目&胎教音乐&节奏&轻音乐MV&阳光音乐&静心音乐&魅惑电音';
const fyclass_list = '&qingyinyue&yuansheng&diantai&shenghuo&wusun&mtv&tag/3d&tag/shanggan&tag/%e4%bd%9b%e4%b9%90&tag/bayinhe&tag/gufeng&tag/youmei&tag/%e5%91%a8%e6%9d%b0%e4%bc%a6&tag/daziran&tag/qingxin&tag/daqi&tag/yiyufengqing&tag/huaijiu&tag/youyang&tag/fangsong&tag/newage&tag/huankuai&tag/minyao&tag/zhiyu&tag/jiqing&tag/%e7%8f%ad%e5%be%97%e7%91%9e&tag/shuimian&tag/diantai&tag/taijiao&tag/%e8%8a%82%e5%a5%8f&tag/%e8%bd%bb%e9%9f%b3%e4%b9%90mv&tag/yangguang&tag/jingxin&tag/dianyin/';
//------传递所选中的选项-------//
const fyclass_sel = getVar("fyclass_sel", fyclass_cont.split('&')[0]);
const fyclass_se = getVar("fyclass_se", fyclass_list.split('&')[0]);
const fyclass_conts = fyclass_cont.split('&');
const fyclass_lists = fyclass_list.split('&');
let fyclass_data = [];
for (let i in fyclass_conts) {
	fyclass_data.push(fyclass_conts[i]);
}
var fyclass_jsda = [];
for (let i in fyclass_lists) {
	fyclass_jsda.push(fyclass_lists[i]);
}
//链接替换分类
var urll = MY_URL.split('#')[1].replace('分类', fyclass_se);
var page = MY_URL.match(/page\/(.*?)\//)[1];
//------分类刷新------//
if (page ==1) {
	for(let i=0;i<10;i++){d.push({col_type: "blank_block"})}
	for (let i = 0; i < fyclass_data.length; i++) {
		let title = fyclass_data[i] == fyclass_sel ? '““””<b><font color=#1AB16B>' + fyclass_data[i] + '</font></b>' : fyclass_data[i];
		d.push({
			title: title,
			url: $("#noLoading#").lazyRule((fyclass_data, fyclass_jsda) => {
				clearVar('搜索');
				putVar("fyclass_sel", fyclass_data);
				putVar("fyclass_se", fyclass_jsda);
				refreshPage(false);
				return "hiker://empty"
			}, fyclass_data[i], fyclass_jsda[i]),
			col_type: 'scroll_button'
		});
	}
	d.push({
		title: 'FM',
		url: 'http://www.tyqyyw.com/fm/',
		col_type: "text_2"
	});
	d.push({
		title: 'About',
		url: 'http://www.tyqyyw.com/about/',
		col_type: "text_2"
	});
	d.push({
		url: "putVar('搜索',input);refreshPage(false)",
		col_type: "input"
	})
	var random = request('http://www.tyqyyw.com/random/').match(/\d+/g);
	var sj = 'http://www.tyqyyw.com/' + random + '/';
	var tt=pdfh(request(sj), '.article_container&&h1&&Text');
	d.push({
		title: '““””<font color=#48D1CC>' + "♪"+tt + '</font>',
		col_type: "flex_button",
		url: $(sj).rule((sj) => {
			var d = [];
			d.push({
				title: '♪播放',
				url: pdfh(request(sj), '.context&&source&&src'),
				col_type: "text_center_1"
			});
			d.push({
				title: pdfh(request(sj), '.context--script&&Html'),
				col_type: "rich_text",
			});
			setResult(d)
		}, sj),
	});
}
//-----一级页面-------//
var sh = getVar("搜索");
try {
	if (sh) {
		urll ="http://www.tyqyyw.com/page/" + page + "/?s=" + sh;
		var col = "movie_1_vertical_pic_blur"
	} else {
		var col = "movie_1_left_pic"
	}
	var html = request(urll);
	var list = pdfa(html, '#post_container&&li');
	if(list.length !="") {
    	for (let i in list) {
    		d.push({
    			title: parseDomForHtml(list[i], 'a&&title'),
    			desc: parseDomForHtml(list[i], '.entry_post&&Text'),
    			pic_url: parseDom(list[i], 'img&&src'),
    			url: pd(list[i], 'a&&href') + `@rule=js: let d = [];d.push({title:'♪播放',url:pdfh(getResCode(),'.context&&source&&src'),col_type:"text_center_1"});d.push({title:pdfh(getResCode(),'.context--script&&Html'),col_type:"rich_text"});setResult(d);`,
    			col_type: col
    		});
    	}
	}else{
    	var tips="暂无更多";
    	if (sh) var tips="以上为搜到的全部内容";
    	d.push({
			title: '““””<small><font color=gray>' + tips+ '</font></small>',
			url: "hiker://empty",
			col_type: "text_center_1",
			extra: {lineVisible: false}
		});
	}
} catch (e) {}
setResult(d);
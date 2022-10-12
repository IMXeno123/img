//R佬的彩云天气
js:
var d = [];
var location = fetch('hiker://files/cache/location.txt');
if (getVar('page') == '' && location != '') {
	putVar('page', 'main');
}
d.push({
	title: '搜索',
	url: "putVar('input',input);putVar('page','ss');refreshPage();'toast://你输入的是' + input+'，请选择属于您的位置';",
	col_type: 'input'
});
if (getVar('page') == 'ss') {
	var surl = 'http://api.caiyunapp.com/v2/place?query=' + getVar('input') +
		'&lang=zh_CN&token=Y2FpeXVuIGFuZHJpb2QgYXBp&count=5';
	var locationlist = JSON.parse(request(surl)).places;
	for (var x of locationlist) {
		var loc = x.name + '$' + x.location.lng + ',' + x.location.lat;
		d.push({
			title: x.name + '(' + x.formatted_address + ')',
			url: 'hiker://empty#' + loc +
				"@lazyRule=.js:var lat = input.split('#')[1];writeFile('hiker://files/cache/location.txt',lat);putVar('page','main');refreshPage();'toast://已更改定位';",
			col_type: 'text_1'
		});
	}
}


if (getVar('page') == 'main') {

	var weather = [{
		'id': '晴朗',
		'url': 'https://gitee.com/CherishRx/imagewarehouse/raw/master/image/20210814-IMG_20210814_200010.png'
	}, {
		'id': '多云',
		'url': 'https://gitee.com/CherishRx/imagewarehouse/raw/master/image/20210814-IMG_20210814_200134.png'
	}, {
		'id': '阴',
		'url': 'https://gitee.com/CherishRx/imagewarehouse/raw/master/image/20210814-IMG_20210814_195932.png'
	}, {
		'id': '小雨',
		'url': 'https://gitee.com/CherishRx/imagewarehouse/raw/master/image/20210814-IMG_20210814_200214.png'
	}, {
		'id': '中雨',
		'url': 'https://gitee.com/CherishRx/imagewarehouse/raw/master/image/20210814-IMG_20210814_200243.png'
	}, {
		'id': '大雨',
		'url': 'https://gitee.com/CherishRx/imagewarehouse/raw/master/image/20210814-IMG_20210814_200307.png'
	}, {
		'id': '暴雨',
		'url': 'https://gitee.com/CherishRx/imagewarehouse/raw/master/image/20210814-IMG_20210814_211730.png'
	}, {
		'id': '小雪',
		'url': 'https://gitee.com/CherishRx/imagewarehouse/raw/master/image/20210814-IMG_20210814_200407.png'
	}, {
		'id': '中雪',
		'url': 'https://gitee.com/CherishRx/imagewarehouse/raw/master/image/20210814-IMG_20210814_200456.png'
	}, {
		'id': '大雪',
		'url': 'https://gitee.com/CherishRx/imagewarehouse/raw/master/image/20210814-IMG_20210814_200523.png'
	}, {
		'id': '暴雪',
		'url': 'https://gitee.com/CherishRx/imagewarehouse/raw/master/image/20210814-IMG_20210814_200523.png'
	}, {
		'id': '中度雾霾',
		'url': 'https://gitee.com/CherishRx/imagewarehouse/raw/master/image/20210814-IMG_20210814_211821.png'
	}, {
		'id': '轻度雾霾',
		'url': 'https://gitee.com/CherishRx/imagewarehouse/raw/master/image/20210814-IMG_20210814_211902.png'
	}, {
		'id': '重度雾霾',
		'url': 'https://gitee.com/CherishRx/imagewarehouse/raw/master/image/20210814-IMG_20210814_211924.png'
	}, {
		'id': '沙尘',
		'url': 'https://gitee.com/CherishRx/imagewarehouse/raw/master/image/20210814-IMG_20210814_211949.png'
	}, {
		'id': '晴（夜间）',
		'url': 'https://gitee.com/CherishRx/imagewarehouse/raw/master/image/20210814-IMG_20210814_212255.png'
	}, {
		'id': '多云（夜间）',
		'url': 'https://gitee.com/CherishRx/imagewarehouse/raw/master/image/20210814-IMG_20210814_212232.png'
	}];

	var url = 'https://api.caiyunapp.com/v2.5/Y2FpeXVuIGFuZHJpb2QgYXBp/' + location.split('$')[1] +
		'/weather?lang=zh_CN&span=16&dailystart=-1&hourlysteps=384&alert=true&version=6.1.7&device_id=fdcf0e2ae2f1ed59';
	//信息
	var code = JSON.parse(request(url, {}).replace(/CLEAR_DAY/g, '晴朗').replace(/CLEAR_NIGHT/g, '晴（夜间）').replace(
		/PARTLY_CLOUDY_DAY/g, '多云').replace(/PARTLY_CLOUDY_NIGHT/g, '多云（夜间）').replace(/CLOUDY/g, '阴').replace(
		/LIGHT_HAZE/g, '轻度雾霾').replace(/MODERATE_HAZE/g, '中度雾霾').replace(/HEAVY_HAZE/g, '重度雾霾').replace(
		/LIGHT_RAIN/g, '小雨').replace(/MODERATE_RAIN/g, '中雨').replace(/HEAVY_RAIN/g, '大雨').replace(/STORM_RAIN/g,
		'暴雨').replace(/FOG/g, '雾').replace(/LIGHT_SNOW/g, '小雪').replace(/MODERATE_SNOW/g, '中雪').replace(
		/HEAVY_SNOW/g, '大雪').replace(/STORM_SNOW/g, '暴雪').replace(/DUST/g, '浮尘').replace(/SAND/g, '沙尘').replace(
		/WIND/g, '大风'));

	var img = 'https://gitee.com/CherishRx/imagewarehouse/raw/master/image/20210814-IMG_20210814_165728.png';
	for (var x of weather) {
		if (code.result.realtime.skycon == x.id) {
			var img = x.url;
		}
	}
	d.push({
		title: '定位: ' + location.split('$')[0] + '\n\n\n' + code.result.realtime.skycon + '\n' + code.result
			.realtime.temperature + '℃\n' + code.result.hourly.description,
		desc: '4',
		pic_url: img,
		url: 'https://caiyunapp.com/wx_share/?#' + location.split('$')[1],
		col_type: 'card_pic_1'
	});
	d.push({
		title: '““””<small>专业数据</small>',
		url: 'hiker://empty',
		col_type: 'text_center_1'
	});
	d.push({
		col_type: 'line_blank'
	});
	d.push({
		title: ' 穿衣: ' + code.result.realtime.life_index.comfort.desc,
		img: 'https://gitee.com/CherishRx/imagewarehouse/raw/master/image/20210814-clothing_icon.png',
		url: 'hiker://empty',
		col_type: 'icon_2_round'
	});
	d.push({
		title: ' 紫外线: ' + code.result.realtime.life_index.ultraviolet.desc,
		img: 'https://gitee.com/CherishRx/imagewarehouse/raw/master/image/20210814-Screenshot_20210814154829.jpg',
		url: 'hiker://empty',
		col_type: 'icon_2_round'
	});
	d.push({
		title: ' 空气质量: ' + code.result.realtime.air_quality.aqi.chn + '/' + code.result.realtime.air_quality
			.description.chn,
		img: 'https://gitee.com/CherishRx/imagewarehouse/raw/master/image/20210814-layer_satellite_unchecked.png',
		url: 'hiker://empty',
		col_type: 'icon_2_round'
	});
	d.push({
		title: ' 可见度: ' + code.result.realtime.visibility + ' km',
		img: 'https://gitee.com/CherishRx/imagewarehouse/raw/master/image/20210814-Screenshot_20210814154907.jpg',
		url: 'hiker://empty',
		col_type: 'icon_2_round'
	});
	d.push({
		title: ' 体感: ' + code.result.realtime.apparent_temperature + '℃',
		img: 'https://gitee.com/CherishRx/imagewarehouse/raw/master/image/20210814-layer_tem_unchecked.png',
		url: 'hiker://empty',
		col_type: 'icon_2_round'
	});
	d.push({
		title: ' 湿度: ' + (code.result.realtime.humidity * 100).toFixed(0) + '%',
		img: 'https://gitee.com/CherishRx/imagewarehouse/raw/master/image/20210814-layer_rain_unchecked.png',
		url: 'hiker://empty',
		col_type: 'icon_2_round'
	});

	var daily = code.result.daily;
	var hourly = code.result.hourly;
	d.push({
		title: '““””<small>15日天气</small>',
		url: "hiker://empty@lazyRule=.js:putVar('dailybutton',getVar('dailybutton')=='on'?'off':'on');refreshPage();'toast://刷新成功';",
		col_type: 'text_center_1'
	});
	d.push({
		col_type: 'line_blank'
	});
	if (getVar('dailybutton') == 'on') {
		for (var i in daily.skycon) {
			var a = daily.skycon;
			var b = daily.temperature;
			d.push({
				title: a[i].date.split('T')[0] + '/' + a[i].value,
				url: 'hiker://empty',
				col_type: 'text_2'
			});
			d.push({
				title: '↑' + b[i].max + '℃/' + b[i].min + '℃↓',
				url: 'hiker://empty',
				col_type: 'text_2'
			});
		}
	}
	d.push({
		title: '““””<small>小时预报</small>',
		url: "hiker://empty@lazyRule=.js:putVar('hourlybutton',getVar('hourlybutton')=='on'?'off':'on');refreshPage();'toast://刷新成功';",
		col_type: 'text_center_1'
	});
	d.push({
		col_type: 'line_blank'
	});
	if (getVar('hourlybutton') == 'on') {
		for (var i in hourly.skycon) {
			var a = hourly.skycon;
			var b = hourly.temperature;
			d.push({
				title: a[i].datetime.split('+')[0].replace('T', '/'),
				url: 'hiker://empty',
				col_type: 'text_2'
			});
			d.push({
				title: a[i].value + '/' + b[i].value + '℃',
				url: 'hiker://empty',
				col_type: 'text_2'
			});
		}
	}
}
setResult(d);
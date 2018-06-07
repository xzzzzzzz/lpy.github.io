 let numberFormats =  (number, decimals = 2, dec_point = ".", thousands_sep = ",", roundtag = 'floor') => {
  /*
* 参数说明：
* number：要格式化的数字
* decimals：保留几位小数
* dec_point：小数点符号
* thousands_sep：千分位符号
* roundtag:舍入参数，默认 "ceil" 向上取,"floor"向下取,"round" 四舍五入
* */
  number = (number + '').replace(/[^0-9+-Ee.]/g, '');
  roundtag = roundtag || "ceil"; //"ceil","floor","round"
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function (n, prec) {

      var k = Math.pow(10, prec);
      console.log();

      return '' + parseFloat(Math[roundtag](parseFloat((n * k).toFixed(prec * 2))).toFixed(prec * 2)) / k;
    };
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  var re = /(-?\d+)(\d{3})/;
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, "$1" + sep + "$2");
  }

  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

let formatDate = (value) => {
  var date = new Date(value);
  return new Date(value).Format('yyyy-MM-dd')
}

let realNameFormat = (realName) => { 

  return realName.replace(/^(.+)(.{1})$/, function (s, s1, s2) {
    var l = s1.length;
    var rs = "";
    for (var i = 0; i < l; i++) {
      rs += "*";
    }
    rs += s2;
    return rs;
  });
		 
}
export { numberFormats, formatDate, realNameFormat}
var SuffixDirectMap = {
    "lcdn-registration.apple.com": 1,
    "ls.apple.com": 1,
    "cn": 1,
    "126.com": 1,
    "163.com": 1,
    "2q10.com": 1,
    "56.com": 1,
    "58.com": 1,
    "acfun.tv": 1,
    "alicdn.com": 1,
    "alipay.com": 1,
    "alipayobjects.com": 1,
    "aliyun.com": 1,
    "amap.com": 1,
    "autohome.com.cn": 1,
    "baidu.com": 1,
    "baixing.com": 1,
    "bdstatic.com": 1,
    "bdimg.com": 1,
    "bilibili.com": 1,
    "cmbchina.com": 1,
    "cnzz.com": 1,
    "ctrip.cn": 1,
    "ctrip.com": 1,
    "cctv.com": 1,
    "dangdang.com": 1,
    "dianping.com": 1,
    "duotai.org": 1,
    "ganji.com": 1,
    "gtimg.com": 1,
    "id1.cn": 1,
    "iqiyi.com": 1,
    "jd.com": 1,
    "jumei.com": 1,
    "kankan.com": 1,
    "letv.com": 1,
    "meituan.com": 1,
    "miwifi.com": 1,
    "netease.com": 1,
    "nuomi.com": 1,
    "ousns.net": 1,
    "pptv.com": 1,
    "qhimg.com": 1,
    "qq.com": 1,
    "qunar.com": 1,
    "sina.cn": 1,
    "sina.com": 1,
    "sina.com.cn": 1,
    "sinaimg.cn": 1,
    "sinajs.cn": 1,
    "sogou.com": 1,
    "sohu.com": 1,
    "soso.com": 1,
    "suning.com": 1,
    "t.cn": 1,
    "tanx.com": 1,
    "taobao.com": 1,
    "tiantian.tv": 1,
    "tmall.com": 1,
    "tudou.com": 1,
    "tvesou.com": 1,
    "weibo.com": 1,
    "weixin.com": 1,
    "youku.com": 1,
    "xiaomi.com": 1,
    "xici.net": 1,
    "xunlei.com": 1,
    "zhihu.com": 1,
    "zimuzu.tv": 1,
    "zqt.pw": 1,
    "zuiqt.com": 1,
    "appldnld.apple.com": 1,
    "adcdownload.apple.com": 1,
    "swcdn.apple.com": 1,
    "phobos.apple.com": 1,
    "itunes.apple.com": 1,
    "aaplimg.com": 1,
    "cdn-apple.com": 1,
    "icloud.com": 1,
    "itunes.com": 1,
    "me.com": 1,
    "mzstatic.com": 1
};
var SuffixProxyMap = {"gist.github.com"};
var MatchProxies = ["google","twitter.com","ytimg.com","ggpht.com","twimg.com","tellapart.com","facebook.com","fbcdn.net",
"wikipedia.org","gmail.com","fanqiang","m3.com"];

var MatchDirects = ["360buy", "alipay", "baidu", "taobao"];
var Direct = "DIRECT;";
var GeoProxy = "PROXY 211.103.157.176:62688;";
var Proxy = "PROXY 211.103.157.176:62688;";

function FindProxyForURL(url, host) {
    var ip = dnsResolve(host);
    if (isInNet(ip, "10.0.0.0", "10.255.255.255")) return Direct;
    if (isInNet(ip, "127.0.0.0", "127.255.255.255")) return Direct;
    if (isInNet(ip, "172.16.0.0", "172.31.255.255")) return Direct;
    if (isInNet(ip, "192.168.0.0", "192.168.255.255")) return Direct;
    if (isPlainHostName(host)) return Direct;
    var m, h = host;
    do {
        if (SuffixProxyMap[h]) return Proxy;
        if (SuffixDirectMap[h]) return Direct;
        m = h.indexOf(".") + 1;
        h = h.slice(m);
    } while ( m >= 1 );
    for (var i = 0; i < MatchProxies.length; ++i) {
        if (host.indexOf(MatchProxies[i]) != -1) {
            return Proxy;
        }
    }
    for (var i = 0; i < MatchDirects.length; ++i) {
        if (host.indexOf(MatchDirects[i]) != -1) {
            return Direct;
        }
    }
    return Direct;
}
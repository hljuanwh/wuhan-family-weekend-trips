'use client';

import {
  AlertTriangle, ArrowRight, Baby, CalendarDays, CarFront, Check,
  ChevronDown, Clock3, ExternalLink, Footprints, Hotel, MapPin,
  Navigation, Sparkles, Trees,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

type TimelineItem = { time: string; title: string; detail: string };
type Source = { label: string; href: string };
type AlternatePlan = {
  label: string; intro: string; returnTime: string; arrivalHome: string;
  budget: string; day1: TimelineItem[]; day2: TimelineItem[]; day3: TimelineItem[];
};
type Trip = {
  id: string; month: string; monthShort: string; season: string; name: string;
  place: string; image: string; imageCredit: string; imageCreditUrl: string;
  headline: string; intro: string; homeDrive: string; sceneDrive: string;
  sceneLabel: string; returnTime: string; arrivalHome: string; budget: string;
  rank: string; tags: string[]; notice?: string; day1: TimelineItem[];
  day2: TimelineItem[]; toddler: string[]; booking: string[];
  mapHotel: string; mapScene: string; sources: Source[]; alternatePlan?: AlternatePlan;
};

const amap = (keyword: string) =>
  `https://uri.amap.com/search?keyword=${encodeURIComponent(keyword)}&view=map`;

const trips: Trip[] = [
  {
    id: 'yuhe', month: '9月', monthShort: '本月', season: '初秋',
    name: '裕和夫子山居', place: '武汉 · 黄陂', image: 'trips/yuhe.jpg',
    imageCredit: '图片来源：携程攻略', imageCreditUrl: 'https://you.ctrip.com/travels/wuhan145/4094176.html',
    headline: '本月先去：山林、湖边和慢慢玩',
    intro: '把民宿本身当作目的地，不再加木兰山等大景点。接近2岁的宝宝以草地、湖边、手作和短步道为主，午睡照常保留。',
    homeDrive: '约 1小时15分—1小时40分', sceneDrive: '园内接驳约 5—15分钟', sceneLabel: '酒店 → 圣师湖/夫子山步道',
    returnTime: '次日 16:30 左右', arrivalHome: '预计 17:50—18:20 到家', budget: '¥1,000—2,200 / 家庭', rank: '本月首选',
    tags: ['低强度', '自然放电', '酒店即景区'],
    day1: [
      { time: '12:00', title: '从家出发', detail: '先吃午饭再走，最后一段村道路窄，白天抵达更轻松。' },
      { time: '13:30', title: '抵达、午睡', detail: '寄存行李或提前入住，先让宝宝睡够，不急着参加活动。' },
      { time: '15:30', title: '湖边＋短步道', detail: '坐接驳到圣师湖，散步30—45分钟；推车走平路，山路用背带。' },
      { time: '17:00', title: '草地自由玩', detail: '看湖、捡落叶、玩无动力设施，成人全程远离无护栏水边。' },
      { time: '18:00', title: '提前晚餐', detail: '园区餐厅供餐时间有限，入住后立刻在管家群订餐。' },
    ],
    day2: [
      { time: '08:00', title: '早餐＋晨间散步', detail: '避开太晚的人流，饭后只走平缓路线。' },
      { time: '09:30', title: '亲子活动', detail: '优先手作、捞鱼观察或当季采摘；不安排骑马和长距离徒步。' },
      { time: '11:30', title: '午餐、退房', detail: '行李寄存在服务中心。' },
      { time: '13:00', title: '午睡＋轻活动', detail: '先午睡，再在湖边咖啡区或儿童区玩一会儿。' },
      { time: '16:30', title: '开车返家', detail: '提前30分钟叫接驳车取行李。' },
    ],
    toddler: ['带轻便推车＋背带，两者都需要', '不安排骑马；水边始终牵手', '准备驱蚊液、替换衣物和宝宝零食'],
    booking: ['确认每日亲子活动表', '确认午晚餐供餐时间', '优先面积较大的双床或家庭房'],
    mapHotel: amap('武汉裕和夫子山居'), mapScene: amap('裕和夫子山圣师湖'),
    sources: [
      { label: '武汉市政府：民宿与园区介绍', href: 'https://3g.wuhan.gov.cn/zjwh/whly/202307/t20230728_2239268.shtml' },
      { label: '酒店地址与设施', href: 'https://hotels.ctrip.com/hotels/76336142.html' },
    ],
  },
  {
    id: 'ganlu', month: '2027年3月', monthShort: '明春', season: '春季',
    name: '甘露山花间堂·岚雪', place: '武汉 · 黄陂', image: 'trips/ganlu.jpg',
    imageCredit: '图片来源：花间堂酒店页面', imageCreditUrl: 'https://www.blossomhousewuhan.cn/',
    headline: '明年春天再去：花间堂＋木兰草原，不滑雪',
    intro: '十月留给厦门，甘露山顺延到明年春季。两天一夜走精华版：第一天住玩甘露山，第二天去木兰草原坐环线小火车；页面还可切换三天两晚慢玩版。',
    homeDrive: '约 50分钟—1小时20分', sceneDrive: '约 10—20分钟', sceneLabel: '酒店 → 木兰草原',
    returnTime: '次日 16:00—16:30', arrivalHome: '预计 17:10—18:00 到家', budget: '¥1,300—2,600 / 家庭', rank: '可选2天或3天',
    tags: ['私汤', '草原小火车', '不滑雪'],
    notice: '木兰草原适合和花间堂联动，但不是“出酒店就到”。春季周末停车与入园排队建议多留30分钟。',
    day1: [
      { time: '12:00', title: '从家出发', detail: '约一小时抵达，宝宝可在车上午睡。' },
      { time: '13:10', title: '抵达、午睡', detail: '15:00前未放房时先寄存行李，在安静公共区休息。' },
      { time: '15:30', title: '甘露西嬉里', detail: '选择旋转木马、小火车、湖边散步；不安排滑雪。' },
      { time: '17:30', title: '梦华里晚餐', detail: '饭后看当日巡游或灯光，活动以官方排期为准。' },
      { time: '20:00', title: '房内短时玩水', detail: '只选温度舒适的浅水活动；高温泡池留给成人轮流使用。' },
    ],
    day2: [
      { time: '08:00', title: '早餐、整理行李', detail: '09:00左右退房，把行李放车里。' },
      { time: '09:30', title: '前往木兰草原', detail: '避开中午车流，先坐环线小火车减少步行。' },
      { time: '10:00', title: '草原小火车＋草地玩耍', detail: '看马、看草地即可，不骑马、不追表演全场。' },
      { time: '12:00', title: '景区午餐＋午睡', detail: '饭后用推车午睡，家长轮流休息。' },
      { time: '14:00', title: '轻松补玩', detail: '只选一个低龄项目，15:30开始往停车场走。' },
      { time: '16:00', title: '从木兰草原返家', detail: '周末按实时导航调整返程路线。' },
    ],
    alternatePlan: {
      label: '3天2晚慢玩版',
      intro: '多住一晚后节奏更适合低龄宝宝：第一天下午只玩甘露山，第二天完整留给木兰草原，第三天再补花间堂和西嬉里的低龄项目，全程保留午睡。',
      returnTime: '第三天 16:00 左右', arrivalHome: '预计 17:10—18:00 到家', budget: '¥2,400—4,200 / 家庭',
      day1: [
        { time: '12:00', title: '从家出发', detail: '午饭后出发，车上午睡。' },
        { time: '13:10', title: '抵达、入住休息', detail: '不急着赶项目，先熟悉酒店和房间。' },
        { time: '15:30', title: '甘露西嬉里低龄项目', detail: '小火车、旋转木马和湖边散步三选二。' },
        { time: '17:30', title: '梦华里晚餐', detail: '饭后只看一段巡游或灯光，早点回房。' },
      ],
      day2: [
        { time: '08:00', title: '早餐后去木兰草原', detail: '轻装出发，酒店到景区约10—20分钟。' },
        { time: '09:30', title: '环线小火车', detail: '先坐车看全景，再挑一片平坦草地玩。' },
        { time: '11:30', title: '景区午餐', detail: '避开正午排队，餐后推车午睡。' },
        { time: '14:00', title: '草原慢玩', detail: '看马、放风筝或看一场适合的演出，不骑马。' },
        { time: '16:30', title: '回酒店休息', detail: '洗澡、吃饭，晚上不再加项目。' },
      ],
      day3: [
        { time: '08:00', title: '早餐＋酒店花园', detail: '利用清晨人少时散步拍照。' },
        { time: '10:00', title: '西嬉里补玩', detail: '只补前两天没玩的一个低龄项目。' },
        { time: '11:30', title: '退房、午餐', detail: '行李放车里，午饭后安排午睡。' },
        { time: '14:00', title: '梦华里轻松散步', detail: '买点路上零食，15:30开始取车。' },
        { time: '16:00', title: '从甘露山返家', detail: '以实时路况为准。' },
      ],
    },
    toddler: ['草原面积大，必须带可平躺轻便推车', '不骑马、不进入高温温泉池', '摩天轮、演出遇排队可直接放弃'],
    booking: ['优先订带私汤亲子房', '确认玩水或温泉权益是否含在房费中', '出发前查木兰草原小火车和当日演出'],
    mapHotel: amap('武汉甘露山花间堂岚雪'), mapScene: amap('木兰草原'),
    sources: [
      { label: '花间堂酒店介绍', href: 'https://www.blossomhousewuhan.cn/' },
      { label: '木兰草原与甘露山联动', href: 'https://finance.sina.cn/2026-05-02/detail-inhwpcha9642072.d.html' },
      { label: '黄陂旅游集散中心', href: 'https://www.huangpi.gov.cn/ywdt/bmzc/202605/t20260506_2760571.html' },
    ],
  },
  {
    id: 'lingling', month: '11月', monthShort: '已暂定', season: '深秋',
    name: '湖北文旅灵玲大酒店', place: '湖北 · 鄂州', image: 'trips/lingling.jpg',
    imageCredit: '图片来源：荆楚网', imageCreditUrl: 'https://news.cnhubei.com/content/2026-03/31/content_19896791.html',
    headline: '十一月已暂定：全年最完整的一站式亲子行程',
    intro: '酒店紧邻动物王国与马戏剧场，车程友好。十一月不追夜场和烟花，重点安排自驾观兽、小熊猫与一场马戏。',
    homeDrive: '约 1小时30分—2小时', sceneDrive: '步行约 3—8分钟', sceneLabel: '酒店 → 动物王国/马戏剧场',
    returnTime: '次日 16:00—16:30', arrivalHome: '预计 17:40—18:30 到家', budget: '¥1,400—2,600 / 家庭', rank: '综合第一',
    tags: ['11月已定', '动物主题房', '马戏'],
    day1: [
      { time: '12:00', title: '从家出发', detail: '吃过午饭再走，中途一般不必停服务区。' },
      { time: '13:40', title: '登记、午睡', detail: '先确认套票核销日和马戏时间，再让宝宝休息。' },
      { time: '15:30', title: '步行区短逛', detail: '先看小熊猫、飞鸟与萌宠，控制在45分钟。' },
      { time: '16:00', title: '国际马戏', detail: '历史排期曾为16:00；十一月必须以当天场次为准。' },
      { time: '17:30', title: '回酒店晚餐', detail: '不等夜场，早点洗澡休息。' },
    ],
    day2: [
      { time: '08:00', title: '早餐、退房准备', detail: '行李提前整理，避免中午折返。' },
      { time: '09:30', title: '5.8公里自驾观兽线', detail: '全程不下车、不伸手、不自行投喂。' },
      { time: '10:40', title: '步行区精华', detail: '使用推车，看小熊猫和孩子最感兴趣的两三个区域。' },
      { time: '12:00', title: '午餐＋午睡', detail: '推车午睡或回酒店公共区休息，视套票权益决定是否再次入园。' },
      { time: '14:00', title: '无动力乐园', detail: '只玩低龄设施，15:30开始离园。' },
      { time: '16:15', title: '开车返家', detail: '避开闭园时集中车流。' },
    ],
    toddler: ['主题双床房比高景观房更实用', '园区大，轻便推车必须带', '马戏音量大，准备儿童降噪耳罩'],
    booking: ['确认套票是否含儿童票', '确认入住日与次日的重复入园规则', '先锁定马戏场次再排行程'],
    mapHotel: amap('湖北文旅灵玲大酒店'), mapScene: amap('鄂州灵玲野生动物王国'),
    sources: [
      { label: '鄂州政府：度假区开园信息', href: 'https://www.ezhou.gov.cn/bsfw_0/ztfwcs/ggsy/wlxx/wyk/202603/t20260331_757110.html' },
      { label: '酒店地址与亲子房', href: 'https://m.ctrip.com/html5/hotel/hoteldetail/134113840.html' },
      { label: '动物王国与马戏介绍', href: 'https://www.ezhou.gov.cn/syts/zntj/202604/t20260429_762984.html' },
    ],
  },
  {
    id: 'xianning', month: '12—2月', monthShort: '待恢复', season: '冬季',
    name: '咸宁温泉谷大酒店', place: '湖北 · 咸宁', image: 'trips/xianning.jpg',
    imageCredit: '图片来源：携程酒店', imageCreditUrl: 'https://hotels.ctrip.com/hotels/780825.html',
    headline: '冬季候选，但当前先不要订',
    intro: '温泉项目页面目前显示暂停营业。即使恢复，接近2岁的宝宝也不以高温泡汤为主：家长轮流泡，孩子安排潜山散步和普通温水短时玩水。',
    homeDrive: '约 2小时10分—2小时40分', sceneDrive: '步行约 2—5分钟', sceneLabel: '酒店 → 潜山森林公园/温泉中心',
    returnTime: '次日 16:00—16:30', arrivalHome: '预计 18:20—19:00 到家', budget: '¥1,000—1,800 / 家庭', rank: '恢复后再评估',
    tags: ['冬季', '温泉', '当前暂停'],
    notice: '截至 2026-09-11，温泉度假区页面显示“暂停营业，恢复时间待定”。没有电话确认恢复前，不购买不可退套餐。',
    day1: [
      { time: '12:00', title: '从家出发', detail: '中途服务区停一次，让宝宝活动。' },
      { time: '14:20', title: '入住、午睡', detail: '老牌酒店先检查房间气味、热水和空调。' },
      { time: '16:00', title: '家长轮流泡汤', detail: '宝宝不进高温药浴池，以散步或普通温水区短时活动为主。' },
      { time: '18:00', title: '晚餐、早点休息', detail: '不带宝宝泡夜场。' },
    ],
    day2: [
      { time: '08:00', title: '早餐', detail: '饭后休息半小时再出门。' },
      { time: '09:30', title: '潜山山脚散步', detail: '只走平缓步道，不登顶；带推车和背带。' },
      { time: '11:30', title: '退房、午餐', detail: '行李放车内。' },
      { time: '13:30', title: '温泉古遗址公园', detail: '轻松散步；若温泉恢复，家长可轮流短泡。' },
      { time: '16:00', title: '开车返家', detail: '中途预留一次宝宝休息。' },
    ],
    toddler: ['宝宝不进入高温和药浴泡池', '成人必须轮流照看，不让孩子在湿滑区奔跑', '冬季出池立即擦干、保暖和补水'],
    booking: ['先电话确认温泉恢复营业', '只订可取消套餐', '确认儿童玩水区和水温'],
    mapHotel: amap('咸宁温泉谷大酒店'), mapScene: amap('潜山国家森林公园咸宁'),
    sources: [
      { label: '温泉当前营业状态', href: 'https://you.ctrip.com/sight/xianning861/134511.html' },
      { label: '酒店地址与设施', href: 'https://hotels.ctrip.com/hotels/780825.html' },
    ],
  },
  {
    id: 'longwan', month: '2027年4—5月', monthShort: '明春', season: '春季',
    name: '梁子湖龙湾半岛', place: '武汉 · 江夏', image: 'trips/longwan.jpg',
    imageCredit: '图片来源：同程旅行', imageCreditUrl: 'https://www.ly.com/scenery/BookSceneryTicket_31737.html',
    headline: '春天看湖、玩沙，住玩都在半岛里',
    intro: '这条春季路线车程适中。酒店、沙滩浴场和龙湾半岛景区集中在一起，不需要反复开车，适合接近2岁的宝宝慢慢玩沙、看湖和逛儿童乐园。',
    homeDrive: '约 1小时40分—2小时10分', sceneDrive: '步行约 2—5分钟', sceneLabel: '酒店 → 龙湾半岛景区/沙滩',
    returnTime: '次日 16:00—16:30', arrivalHome: '预计 17:50—18:40 到家', budget: '¥900—1,800 / 家庭', rank: '春季轻松线',
    tags: ['梁子湖', '沙滩玩沙', '住玩一体'],
    notice: '四五月更适合玩沙和湖边散步，不把下水项目作为主线。园区餐饮选择有限，周末最好提前订晚餐并自备宝宝食物。',
    day1: [
      { time: '12:00', title: '从家出发', detail: '午饭后走，宝宝可在车上午睡。' },
      { time: '13:50', title: '抵达、寄存行李', detail: '酒店通常16:00后入住，先在安静区域休息，不赶项目。' },
      { time: '15:30', title: '沙滩玩沙', detail: '只在岸边玩沙、捡石头，不安排快艇和刺激水上项目。' },
      { time: '17:00', title: '湖边木栈道', detail: '散步30分钟看夕阳，水边始终牵手。' },
      { time: '18:00', title: '酒店晚餐', detail: '提前点餐，饭后回房洗澡休息。' },
    ],
    day2: [
      { time: '08:00', title: '早餐＋晨间看湖', detail: '避开中午人流，气温低时加薄外套。' },
      { time: '09:30', title: '星球乐园或儿童区', detail: '只选低龄无动力项目，玩60—90分钟。' },
      { time: '11:30', title: '退房、午餐', detail: '行李放车内，提前解决午餐。' },
      { time: '13:00', title: '午睡', detail: '用可平躺推车在树荫下休息，家长轮流看护。' },
      { time: '14:30', title: '最后一次玩沙', detail: '补玩湖边草地或沙滩，15:40开始整理。' },
      { time: '16:10', title: '从梁子湖返家', detail: '出发当天以实时导航为准。' },
    ],
    toddler: ['沙滩边不脱离成人一臂距离', '必须带驱蚊液、遮阳帽和两套替换衣物', '不坐快艇、不玩尾波冲浪等刺激水上项目'],
    booking: ['确认房费是否含沙滩和儿童乐园门票', '酒店不提供婴儿床，提前确认床型与床围', '订房前查看近期卫生和餐饮评价'],
    mapHotel: amap('武汉梁子湖龙湾半岛度假酒店'), mapScene: amap('湖北文旅龙湾半岛景区'),
    sources: [
      { label: '酒店地址、设施与儿童政策', href: 'https://hotels.ctrip.com/hotels/1465602.html' },
      { label: '龙湾半岛景区介绍', href: 'https://gs.ctrip.com/html5/you/sight/wuhan145/1413746.html' },
    ],
  },
  {
    id: 'hilton', month: '6—8月', monthShort: '夏季', season: '夏季',
    name: '武汉光谷希尔顿', place: '武汉 · 花山', image: 'trips/hilton.jpg',
    imageCredit: '图片来源：Hilton 官方', imageCreditUrl: 'https://www.hilton.com/zh-hans/hotels/wuhovhi-hilton-wuhan-optics-valley/',
    headline: '不再看动物：严西湖畔＋九峰森林散步',
    intro: '酒店本身就在严西湖畔，第一天下午看湖和草坪；第二天去九峰国家森林公园，只走珍珠湖、林荫谷地等轻松路线，不带宝宝登峰。',
    homeDrive: '约 1小时10分—1小时40分', sceneDrive: '严西湖步行即到；九峰约 20—30分钟', sceneLabel: '酒店 → 严西湖/九峰国家森林公园',
    returnTime: '次日 16:00—16:30', arrivalHome: '预计 17:30—18:20 到家', budget: '¥1,200—2,300 / 家庭', rank: '非动物替代线',
    tags: ['严西湖畔', '九峰森林', '轻徒步'],
    notice: '九峰国家森林公园有坡道和林间土路，低龄宝宝不登顶；只走平缓湖边与林荫段，推车不好走时及时换背带。',
    day1: [
      { time: '12:00', title: '从家出发', detail: '先吃午饭，避开下午跨城拥堵。' },
      { time: '13:30', title: '抵达、午睡', detail: '酒店15:00入住，未放房先寄存行李。' },
      { time: '15:30', title: '严西湖畔和酒店花园', detail: '湖就在酒店旁，以草坪自由走动和短距离湖边散步为主。' },
      { time: '17:30', title: '晚餐', detail: '周五周六可确认自助餐，其他日期选中餐厅。' },
      { time: '19:00', title: '短散步、早睡', detail: '夏季防蚊；泳池只作为现场确认水深后的备选。' },
    ],
    day2: [
      { time: '07:30', title: '早餐、退房准备', detail: '09:00前退房出发，行李放车内。' },
      { time: '09:30', title: '九峰国家森林公园', detail: '从珍珠湖或平缓林荫段开始，散步60—90分钟，不登峰。' },
      { time: '11:30', title: '返回酒店附近午餐', detail: '宝宝在推车或车上午睡，家长轮流休息。' },
      { time: '14:30', title: '严西湖边补玩', detail: '看水鸟、吹风、草坪走动即可，不安排露营过夜。' },
      { time: '15:40', title: '取车、补水', detail: '提前收拾，不拖到晚高峰。' },
      { time: '16:10', title: '从光谷返家', detail: '按实时路况选择三环或二环。' },
    ],
    toddler: ['九峰路线优先背带＋轻便推车双备份', '严西湖水边始终牵手，不追鸟、不进入湿地区域', '酒店泳池水深不确定，不作为必玩项'],
    booking: ['确认九峰森林公园最新开放范围', '遇雨取消森林路线，留在酒店慢玩', '优先湖景双床房并备注无烟'],
    mapHotel: amap('武汉光谷希尔顿酒店'), mapScene: amap('武汉九峰国家森林公园'),
    sources: [
      { label: '希尔顿官方：地址与设施', href: 'https://www.hilton.com/zh-hans/hotels/wuhovhi-hilton-wuhan-optics-valley/' },
      { label: '光谷官方：九峰国家森林公园', href: 'https://www.wehdz.gov.cn/2022/ztzl_75799/gggzh/jfsslgy/' },
      { label: '武汉市公安局：严西湖湿地生态', href: 'https://gaj.wuhan.gov.cn/jmzx/jwdt/202211/t20221110_2092006.html' },
    ],
  },
];

const orderedTrips = ['yuhe', 'lingling', 'xianning', 'ganlu', 'longwan', 'hilton']
  .map((id) => trips.find((trip) => trip.id === id))
  .filter((trip): trip is Trip => Boolean(trip));

function Timeline({ items }: { items: TimelineItem[] }) {
  return <ol className="timeline">{items.map((item) => (
    <li key={`${item.time}-${item.title}`}><time>{item.time}</time><span className="timeline-dot" aria-hidden="true" /><div><h4>{item.title}</h4><p>{item.detail}</p></div></li>
  ))}</ol>;
}

export default function Home() {
  const [selectedId, setSelectedId] = useState('yuhe');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [ganluPlan, setGanluPlan] = useState<'2d1n' | '3d2n'>('2d1n');
  const selected = useMemo(() => orderedTrips.find((trip) => trip.id === selectedId) ?? orderedTrips[0], [selectedId]);
  const alternatePlan = selected.id === 'ganlu' && ganluPlan === '3d2n' ? selected.alternatePlan : undefined;

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (orderedTrips.some((trip) => trip.id === hash)) setSelectedId(hash);
  }, []);

  const chooseTrip = (id: string) => {
    setSelectedId(id); setMobileMenu(false);
    window.history.replaceState(null, '', `#${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return <main>
    <header className="topbar">
      <a className="brand" href="#yuhe" onClick={() => chooseTrip('yuhe')}><span className="brand-mark"><Trees size={18} /></span><span>小小周末</span></a>
      <div className="top-note"><Baby size={15} /> 接近2岁宝宝版 · 花间堂可选3天</div>
    </header>

    <section className="intro-shell">
      <div className="eyebrow"><CalendarDays size={15} /> 2026—2027 武汉周边自驾计划</div>
      <h1>六个周末，慢慢带娃去看世界</h1>
      <p>从家中午出发，第二天下午4—5点开车返家。按最适合的月份排好，点一下就能切换查看。</p>
      <div className="skip-note"><CalendarDays size={17} /><div><b>10月不安排武汉周边行程</b><span>国庆假期去厦门，甘露山花间堂顺延到明年春季。</span></div></div>

      <button className="mobile-select" type="button" onClick={() => setMobileMenu(!mobileMenu)} aria-expanded={mobileMenu}>
        <span><b>{selected.month}</b>{selected.name}</span><ChevronDown size={18} />
      </button>
      {mobileMenu && <div className="mobile-options">{orderedTrips.map((trip) => (
        <button key={trip.id} type="button" onClick={() => chooseTrip(trip.id)}><span>{trip.month}</span>{trip.name}{trip.id === selected.id && <Check size={16} />}</button>
      ))}</div>}

      <nav className="month-rail" aria-label="按月份选择目的地">{orderedTrips.map((trip) => (
        <button type="button" key={trip.id} className={trip.id === selected.id ? 'active' : ''} onClick={() => chooseTrip(trip.id)}>
          <span>{trip.month}</span><b>{trip.name}</b><small>{trip.monthShort}</small>
        </button>
      ))}</nav>
    </section>

    <section className="detail-shell" key={selected.id}>
      <div className="hero-card">
        <img src={selected.image} alt={`${selected.name}实景`} />
        <div className="hero-shade" />
        <div className="hero-copy"><div className="hero-meta"><span>{selected.month}</span><span>{selected.place}</span></div><h2>{selected.name}</h2><p>{selected.headline}</p></div>
        <a className="image-credit" href={selected.imageCreditUrl} target="_blank" rel="noreferrer">{selected.imageCredit}</a>
      </div>

      {selected.alternatePlan && <div className="plan-switch" aria-label="选择花间堂行程天数">
        <button type="button" className={ganluPlan === '2d1n' ? 'active' : ''} onClick={() => setGanluPlan('2d1n')}><b>2天1夜</b><span>周末精华版</span></button>
        <button type="button" className={ganluPlan === '3d2n' ? 'active' : ''} onClick={() => setGanluPlan('3d2n')}><b>3天2晚</b><span>草原＋甘露山慢玩</span></button>
      </div>}

      <div className="summary-grid">
        <article><span className="metric-icon"><CarFront size={18} /></span><small>家 → 酒店</small><strong>{selected.homeDrive}</strong></article>
        <article><span className="metric-icon"><Navigation size={18} /></span><small>{selected.sceneLabel}</small><strong>{selected.sceneDrive}</strong></article>
        <article><span className="metric-icon"><Clock3 size={18} /></span><small>返程</small><strong>{alternatePlan?.returnTime ?? selected.returnTime}</strong><em>{alternatePlan?.arrivalHome ?? selected.arrivalHome}</em></article>
        <article><span className="metric-icon"><Sparkles size={18} /></span><small>粗略预算</small><strong>{alternatePlan?.budget ?? selected.budget}</strong></article>
      </div>

      <div className="content-grid">
        <div className="main-column">
          <section className="opening-card"><div className="rank">{alternatePlan?.label ?? selected.rank}</div><p>{alternatePlan?.intro ?? selected.intro}</p><div className="tag-row">{selected.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></section>
          {selected.notice && <div className="notice"><AlertTriangle size={20} /><p>{selected.notice}</p></div>}
          <section className="day-section"><header><span>DAY 01</span><div><h3>中午出发，下午慢慢进入状态</h3><p>午睡优先，不为了“值回票价”打乱宝宝节奏。</p></div></header><Timeline items={alternatePlan?.day1 ?? selected.day1} /></section>
          <section className="day-section"><header><span>DAY 02</span><div><h3>{alternatePlan ? '整天慢玩，晚上仍住花间堂' : '上午主玩，下午4—5点开车回家'}</h3><p>{alternatePlan ? '不赶着退房，让木兰草原拥有完整的一天。' : '返程时间指从目的地出发，不是到家时间。'}</p></div></header><Timeline items={alternatePlan?.day2 ?? selected.day2} /></section>
          {alternatePlan && <section className="day-section"><header><span>DAY 03</span><div><h3>补玩甘露山，下午4点再返家</h3><p>第三天仍然只选轻松项目，保留午睡。</p></div></header><Timeline items={alternatePlan.day3} /></section>}
        </div>

        <aside className="side-column">
          <section className="side-card toddler-card"><div className="side-title"><Baby size={19} /><h3>低龄宝宝提醒</h3></div><ul>{selected.toddler.map((item) => <li key={item}>{item}</li>)}</ul></section>
          <section className="side-card"><div className="side-title"><Hotel size={19} /><h3>预订前确认</h3></div><ul>{selected.booking.map((item) => <li key={item}>{item}</li>)}</ul></section>
          <section className="map-card"><div><MapPin size={20} /><h3>直接导航</h3></div><a href={selected.mapHotel} target="_blank" rel="noreferrer">酒店位置 <ArrowRight size={16} /></a><a href={selected.mapScene} target="_blank" rel="noreferrer">主玩景区 <ArrowRight size={16} /></a></section>
          <section className="source-card"><h3>资料依据</h3>{selected.sources.map((source) => <a key={source.href} href={source.href} target="_blank" rel="noreferrer">{source.label}<ExternalLink size={13} /></a>)}<p>车程为周末正常路况预估，出发当天以实时导航为准。</p></section>
        </aside>
      </div>

      <section className="quick-compare">
        <div className="compare-heading"><Footprints size={19} /><div><h3>还没决定？快速比较</h3><p>从车程和低龄友好度先排除。</p></div></div>
        <div className="compare-list">{orderedTrips.map((trip) => (
          <button key={trip.id} type="button" onClick={() => chooseTrip(trip.id)} className={trip.id === selected.id ? 'active' : ''}><span>{trip.month}</span><b>{trip.name}</b><small>{trip.homeDrive}</small><em>{trip.rank}</em></button>
        ))}</div>
      </section>
    </section>

    <footer><span>小小周末 · 武汉周边亲子自驾手册</span><p>行程基于 2026年9月可核验信息整理。营业时间、票价、演出与套餐权益可能变化，请在预订前再次确认。</p></footer>
  </main>;
}

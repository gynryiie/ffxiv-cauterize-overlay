const queryParser = q => 
    q.slice(1).split('&').map(h => (
      {
        key: h.split('=')[0],
        value: decodeURI(h.split('=')[1])
      }
    )).map(p => (
      {
        key: p.key,
        value: p.value
      }
    )).reduce((a, c) => (
      {...a, [c.key]: c.value}
    ), {});

const {duration = 130000} = queryParser(location.search);
const Query = {duration: parseFloat(duration)};
const TestMode = location.hash == "#test";
const HashToCircle = {
    "01234": "11,4,7",
    "01235": "11,4,6",
    "01236": "11,4,7",
    "01237": "11,4,7.5",
    "01245": "11,4,8.5",
    "01246": "11,4,7.5",
    "01247": "11,4,8",
    "01256": "11,4,10",
    "01257": "11,4,9",
    "01267": "11,4,8",
    "01345": "11,3.5,8.5",
    "01346": "11,3.5,7.5",
    "01347": "11,3.5,8",
    "01356": "2.5,5.5,10",
    "01357": "2.5,5.5,9",
    "01367": "2.5,5.5,11.5",
    "01456": "2.5,7,10",
    "01457": "11,5,9",
    "01467": "11,5,8",
    "01567": "2.5,6.5,11.5",
    "02345": "1.5,5.5,8.5",
    "02346": "1.5,5.5,7.5",
    "02347": "1.5,5.5,8",
    "02356": "1.5,5.5,10",
    "02357": "1.5,5.5,9",
    "02367": "1.5,5.5,11.5",
    "02456": "1.5,7,10",
    "02457": "1.5,7,9",
    "02467": "1.5,7,11.5",
    "02567": "1.5,8.5,11.5",
    "03456": "2,7,10",
    "03457": "2,7,9",
    "03467": "2,7,11.5",
    "03567": "2,8.5,11.5",
    "04567": "3,8.5,11.5",
    "12345": "0.5,5.5,8.5",
    "12346": "0.5,5.5,7.5",
    "12347": "0.5,5.5,8",
    "12356": "0.5,5.5,10",
    "12357": "0.5,5.5,9",
    "12367": "0.5,5.5,11.5",
    "12456": "0.5,5,10",
    "12457": "0.5,5,9",
    "12467": "0.5,5,8",
    "12567": "0.5,6.5,8",
    "13456": "3,7,10",
    "13457": "3,7,9",
    "13467": "3,7,11.5",
    "13567": "3,8.5,11.5",
    "14567": "4,8.5,11.5",
    "23456": "2,7,10",
    "23457": "2,7,9",
    "23467": "2,7,11.5",
    "23567": "2,6.5,11.5",
    "24567": "4.5,8.5,11.5",
    "34567": "3.5,8.5,11.5",
}

const CircleToRadian = {
    "0": 1.570796327,
    "0.5": 1.308996939,
    "1": 1.047197551,
    "1.5": 0.785398163,
    "2": 0.523598776,
    "2.5": 0.261799388,
    "3": 0,
    "3.5": -0.261799388,
    "4": -0.523598776,
    "4.5": -0.785398163,
    "5": -1.047197551,
    "5.5": -1.308996939,
    "6": -1.570796327,
    "6.5": -1.832595715,
    "7": -2.094395102,
    "7.5": -2.35619449,
    "8": -2.617993878,
    "8.5": -2.879793266,
    "9": 3.141592654,
    "9.5": 2.879793266,
    "10": 2.617993878,
    "10.5": 2.35619449,
    "11": 2.094395102,
    "11.5": 1.832595715,
}

const TestLogs = [
  "39|2020-10-09T21:42:33.6850000+09:00|10246A07|Test Suruo|63982|63982|10000|10000|0|0|1.083313|4.684509|-5.960464E-08|0.07885742||f81438de7dae37611e1d72be4a615484",
  "39|2020-10-09T21:42:33.6850000+09:00|40007969|カーバンクル・ルビー|39772|39772|10000|10000|0|0|0.289917|5.966248|0|0.3590047||b029f4410c48ecb2902d1e722b3d98cd",
  "03|2020-10-09T21:42:33.2780000+09:00|4000798e|サンダーウィング|0|46|0|0||2632|8165|5725000|5725000|10000|10000|0|0|-16.67|-16.66999|-2.384186E-07|0.7853622||a5768362924225e027509cf0ee03457c",
  "03|2020-10-09T21:42:33.2780000+09:00|4000798c|ライトファング|0|46|0|0||6957|8167|5725000|5725000|10000|10000|0|0|16.66999|-16.66999|0|-0.7854581||481853740231328713196eaf30b61252",
  "03|2020-10-09T21:42:33.2780000+09:00|4000798d|ダークテイル|0|46|0|0||6958|8166|5725000|5725000|10000|10000|0|0|23.99998|-6.67572E-06|0|-1.570868||44d6236d06cde4e37a6a440683fafd6e",
  "37|2020-10-09T21:42:33.7740000+09:00|40007918|ネール・デウス・ダーナス|00002DD0|4834458|5013955|10000|10000|0||1.449585|9.048584|0|-0.05843402|0|0|0|01|07001ABE|0|41700000|10256E0C||75fe2a7c1ed08e3327917b9c99893c47",
  "03|2020-10-09T21:42:33.2780000+09:00|40007990|ファイアホーン|0|46|0|0||2630|8163|5725000|5725000|10000|10000|0|0|16.66999|16.66996|0|-2.356278||658cc24d98cc48009be6b8b045105dfa",
  "03|2020-10-09T21:42:33.2780000+09:00|4000798f|アイスクロウ|0|46|0|0||2631|8164|5725000|5725000|10000|10000|0|0|-1.907349E-06|-24|0|-4.792213E-05||97a9208060002a9b4eacf0e48467024d",
  "37|2020-10-09T21:42:33.7740000+09:00|10246A07|Test Suruo|00002DC7|63982|63982|10000|10000|4||1.083313|4.684509|-5.960464E-08|0.07885742|2504|0|0|01|04001CFD|0|41700000|40007969||a078c0df21758870dae5dce263fce394",
]

const AddedNewCombatantDragons = {
    English: null,
    French: null,
    German: null,
    Japanese: /^03\|\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{7}(\+|-)\d{2}:\d{2}\|4000[0-9a-fA-F]{4}\|(ダークテイル|サンダーウィング|ライトファング|ファイアホーン|アイスクロウ)\|0\|46\|0\|0\|\|\d{4}\|\d{4}\|5725000\|5725000\|10000\|10000\|0\|0\|(?<pos>.+)\|\|[0-9a-fA-F]{32}$/,
    Chinese: null,
    Korean: null,
}

const ResetRegex = /^33\|\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{7}(\+|-)\d{2}:\d{2}\|[0-9a-fA-F]{8}\|40000005\|00\|00\|00\|00\|[0-9a-fA-F]{32}$/

const DragonPosMapping = {
    "90": 0,
    "45": 1,
    "0": 2,
    "-0": 2,
    "-45": 3,
    "-90": 4,
    "-135": 5,
    "180": 6,
    "135": 7
}

const SIZE = 12.5;
const RADIUS = 100;
const NORM = RADIUS + SIZE;
const P_NORM = RADIUS - SIZE;
const ORIGIN = {
    x: 150,
    y: 150
}
const Color = {
    "g1": "rgb(255, 0, 0)",
    "g2": "rgb(0, 255, 0)",
    "g3": "rgb(0, 0, 255)"
}

const ZONEID = 733;

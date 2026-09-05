// 官方 PDF 提取出来的题面里混着「康熙部首」和「CJK 部首补充」区的字符：
// 「运行」的「行」可能是 U+2F8F 而不是 U+884C，「贪心」的「心」可能是 U+2F3C
// 而不是 U+5FC3。肉眼完全看不出差别，但它们和常规汉字是不同码位，于是站内搜索、
// 题库校验、解析质量审计里的所有文本匹配都会静默失效。
//
// 只处理这两个部首区，不能用整体 NFKC：那会把中文全角标点一起折叠掉
// （「，」→「,」近 2.6 万处、「（ ）」→「( )」1.6 万处），还会把 O(n²) 里的
// 上标压成 O(n2)。部首区不一样——没有人会用部首码位去写正文汉字，
// 出现即是提取产物，可以放心归一化。
//
// 区间用 \u 转义而不是字面字符：这个文件自身若写入部首字符，会被批量归一化
// 脚本改掉，把区间上下界改乱（U+2F00 被折成 U+4E00 后区间直接失序报错）。
const CJK_RADICAL_RANGES = /[\u2E80-\u2EFF\u2F00-\u2FDF]/g;

/** 把部首区字符折回常规汉字，其余字符原样保留。 */
export function normalizeCjkRadicals(value) {
    return String(value ?? '').replace(
        CJK_RADICAL_RANGES,
        (character) => character.normalize('NFKC'),
    );
}

/** 文本里是否还残留部首区字符。校验脚本用它做门禁。 */
export function hasCjkRadicals(value) {
    CJK_RADICAL_RANGES.lastIndex = 0;
    return CJK_RADICAL_RANGES.test(String(value ?? ''));
}

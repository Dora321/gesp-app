import { Globe, Search, Database, Shield, Download, PlayCircle, Key, Layers, Cpu, Bug, CheckCircle, Info, Film } from 'lucide-react';
import PythonProjectSupport from '../../../components/PythonProjectSupport';
import PythonLessonShell, { MasteryCheck, TransferCheck } from '../shell/PythonLessonShell';
import { IntroSlide, RequestSlide, ParserSlide, RobotsSlide, StatusSlide, HeadersSlide, PaginationSlide, StorageSlide } from './crawler/CoreSlides';
import { PracticeSlide, DoubanProjectSlide } from './crawler/PracticeSlides';
import { BingWallpaperProjectSlide, BilibiliProjectSlide } from './crawler/ProjectSlides';

const crawlerMasteryItems = [
    {
        label: '能解释请求、响应和状态码的关系。',
        evidence: '能说清 200、403、404 分别代表什么，以及程序应该怎么分支处理。',
        retryHint: '回到 HTTP 状态码页，先把三个状态码写成 if / elif / else。',
    },
    {
        label: '能遵守 robots、频率和公开数据边界。',
        evidence: '能说出不抓登录数据、不高频请求、不绕过限制，并先看 robots.txt。',
        retryHint: '回到爬虫协议页，给自己的项目写三条安全规则。',
    },
    {
        label: '能把请求、解析、清洗和存储拆成函数。',
        evidence: '能画出 get_html -> parse_items -> clean_data -> save_data 的流程。',
        retryHint: '回到解析数据和数据存储页，先只处理一个字段。',
    },
    {
        label: '能处理空结果、分页和异常情况。',
        evidence: '知道页面没有目标元素、下一页不存在、网络失败时不能让程序直接崩掉。',
        retryHint: '回到分页处理和实战挑战，给每一步加失败样例。',
    },
];

const sections = [
    { id: 1, title: '课程介绍 (Intro)', icon: Bug, component: IntroSlide },
    { id: 2, title: '爬虫协议 (Robots.txt)', icon: Shield, component: RobotsSlide },
    { id: 3, title: '发送请求 (Requests)', icon: Globe, component: RequestSlide },
    { id: 4, title: 'HTTP 状态码 (Status)', icon: Info, component: StatusSlide },
    { id: 5, title: '伪装头部 (Headers)', icon: Key, component: HeadersSlide },
    { id: 6, title: '解析数据 (BeautifulSoup)', icon: Search, component: ParserSlide },
    { id: 7, title: '实战: 豆瓣 Top 250', icon: Film, component: DoubanProjectSlide },
    { id: 8, title: '分页处理 (Pagination)', icon: Layers, component: PaginationSlide },
    { id: 9, title: '数据存储 (Storage)', icon: Database, component: StorageSlide },
    { id: 10, title: '项目二: 必应壁纸', icon: Download, component: BingWallpaperProjectSlide },
    { id: 11, title: '项目三: B站热门', icon: PlayCircle, component: BilibiliProjectSlide },
    { id: 12, title: '实战挑战 (Challenge)', icon: Cpu, component: PracticeSlide },
    {
        id: 13,
        title: '项目过关',
        category: '项目线收尾',
        icon: CheckCircle,
        component: () => (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <TransferCheck
                    theme="dark"
                    prompt="换个例子：你要抓三个页面：A 返回状态码 200，B 返回 404，C 的 robots.txt 明确禁止抓取。哪些页面可以继续进入「解析」这一步？各是为什么？"
                    hint="先想流程顺序：查 robots → 发请求 → 看状态码 → 再解析。"
                    answer="只有 A。B 是 404（页面不存在，没有内容可解析）；C 被 robots 禁止，根本不该发请求。"
                    steps={[
                        'C 在发请求之前就该被排除——遵守 robots 是爬虫的底线。',
                        'B 请求发了但 404，应记录失败并跳过，而不是硬解析空内容。',
                        'A 返回 200 才进入解析、清洗、存储的后续流程。',
                    ]}
                />
                <MasteryCheck
                    title="A9 网络爬虫项目过关检查"
                    description="如果能解释请求响应、遵守边界、拆清流程、处理失败情况，Python 项目线就完成了。"
                    accent="teal"
                    theme="dark"
                    items={crawlerMasteryItems}
                />
            </div>
        ),
    },
];

export default function PythonCrawler() {
    return (
        <PythonLessonShell
            eyebrow="PYTHON 项目"
            lessonCode="A9"
            lessonTitle="网络爬虫项目"
            lessonSubtitle="搞清楚数据从哪里来"
            accent="teal"
            theme="dark"
            hero={{
                title: '让程序自己去网上"取数据"',
                description: '理解 HTTP 请求、状态码、请求头和网页解析，做一个遵守 robots 规则的抓取小工具——项目线的收尾拓展。',
            }}
            sections={sections}
            previousPath="/python/ai"
            nextPath="/"
            nextLabel="完成项目线 · 返回课程中心"
            topSupport={<PythonProjectSupport projectId="crawler" theme="dark" />}
            bottomSupport={<PythonProjectSupport projectId="crawler" placement="bottom" theme="dark" />}
        />
    );
}

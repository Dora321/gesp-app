import { AlertTriangle, Ban, Bot, Brain, Eye, Fingerprint as Fingerprint2, Ghost, Grid as Grid2, HardDrive, HelpCircle, Infinity as InfinityIcon, Layers, Lightbulb, Map as Map2, MessageCircle, Palette, Puzzle, QrCode, Rocket, Skull, Skull as Skull2, Sparkles, Terminal, Video } from 'lucide-react';

export const museumExhibitsPart4 = [
{
        id: 'chatgpt',
        title: 'ChatGPT',
        rarity: '夯',
        year: '2022',
        icon: <Bot className="w-12 h-12 text-emerald-500" />,
        color: 'from-emerald-500/20 to-teal-600/20 border-emerald-500/50',
        accent: 'text-emerald-500',
        description: '它好像...真的会思考？',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-emerald-300 italic mb-4">
                    "我只是一个语言模型...骗你的，我什么都会。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-emerald-500">
                    <li><strong>涌现：</strong>当量变引起质变，机器突然学会了推理、写诗、写代码。</li>
                    <li><strong>图灵测试：</strong>已经被它像跨栏一样跨过去了。</li>
                    <li><strong>未来：</strong>是人类最好的助手，还是终结者天网的雏形？</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——奇点临近。</p>
            </div>
        )
    },
{
        id: 'deepfakes',
        title: 'Deepfake',
        rarity: '人上人',
        year: '2017',
        icon: <Ghost className="w-12 h-12 text-red-400" />,
        color: 'from-red-500/20 to-rose-600/20 border-red-500/50',
        accent: 'text-red-400',
        description: '眼见不再为实。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-red-300 italic mb-4">
                    "那个人脸，是画皮。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-red-500">
                    <li><strong>换脸：</strong>用AI把一个人的脸无缝贴到另一个人身上。</li>
                    <li><strong>危机：</strong>当视频证据不再可信，真相将变得扑朔迷离。</li>
                    <li><strong>潘多拉：</strong>技术本身无罪，但它释放了人性深处的恶。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——后真相时代。</p>
            </div>
        )
    },
{
        id: 'neuralink',
        title: '脑机接口',
        rarity: '夯',
        year: '2016',
        icon: <Brain className="w-12 h-12 text-pink-400" />,
        color: 'from-pink-500/20 to-fuchsia-600/20 border-pink-500/50',
        accent: 'text-pink-400',
        description: 'High Bandwidth connection to the Brain.',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-pink-300 italic mb-4">
                    "既然打不过AI，那就加入它。" —— 伊隆·马斯克
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-pink-500">
                    <li><strong>赛博格：</strong>把电极植入大脑，用意念控制电脑、义肢。</li>
                    <li><strong>治疗：</strong>让瘫痪者重新行走，让盲人重见光明。</li>
                    <li><strong>永生：</strong>如果能上传意识，肉体是否还重要？</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——人机合一。</p>
            </div>
        )
    },
{
        id: 'spacex',
        title: '可回收火箭',
        rarity: '夯',
        year: '2015',
        icon: <Rocket className="w-12 h-12 text-orange-500" />,
        color: 'from-orange-500/20 to-red-600/20 border-orange-500/50',
        accent: 'text-orange-500',
        description: '让太空旅行像坐飞机一样便宜。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-orange-300 italic mb-4">
                    "Of Course I Still Love You (当然我还爱你 - 回收船名)"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-orange-500">
                    <li><strong>垂直着陆：</strong>像科幻电影一样，火箭倒着飞回来，稳稳停在海上。</li>
                    <li><strong>成本：</strong>把发射成本降低了90%，开启了商业航天时代。</li>
                    <li><strong>火星：</strong>这只是第一步，目标是让人类成为多行星物种。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——飞向群星。</p>
            </div>
        )
    },
{
        id: 'qrcode',
        title: '二维码',
        rarity: '拉完了',
        year: '1994',
        icon: <QrCode className="w-12 h-12 text-stone-400" />,
        color: 'from-stone-500/20 to-gray-600/20 border-stone-500/50',
        accent: 'text-stone-400',
        description: '现实世界的超链接。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-stone-300 italic mb-4">
                    "扫一扫。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-stone-500">
                    <li><strong>腾飞：</strong>日本人发明的，原本是用来追踪汽车零件，却在中国发扬光大。</li>
                    <li><strong>移动支付：</strong>没有它，就没有今天的支付宝和微信支付，我们就还在数零钱。</li>
                    <li><strong>入口：</strong>它是连接原子世界和比特世界的任意门。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——⬛⬜⬛</p>
            </div>
        )
    },
{
        id: 'privacy',
        title: '个人隐私',
        rarity: '夯',
        year: '20??',
        icon: <Eye className="w-12 h-12 text-red-600" />,
        color: 'from-red-500/20 to-rose-600/20 border-red-500/50',
        accent: 'text-red-600',
        description: '已丢失的文件。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-red-300 italic mb-4">
                    "如果有个东西是免费的，那你就是商品。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-red-500">
                    <li><strong>大数据杀熟：</strong>平台比你更知道你愿意花多少钱。</li>
                    <li><strong>监控：</strong>摄像头、手机定位、浏览记录...你在裸奔。</li>
                    <li><strong>GDPR：</strong>法律在努力追赶技术，但效果...一言难尽。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——老大哥在看着你。</p>
            </div>
        )
    },
{
        id: 'ssd',
        title: '固态硬盘',
        rarity: '拉完了',
        year: '1991',
        icon: <HardDrive className="w-12 h-12 text-blue-500" />,
        color: 'from-blue-500/20 to-cyan-600/20 border-blue-500/50',
        accent: 'text-blue-500',
        description: '告别机械噪音。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-blue-300 italic mb-4">
                    "天下武功，唯快不破。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-blue-500">
                    <li><strong>闪存：</strong>用电子这种微观粒子来存储宏观世界的信息。</li>
                    <li><strong>速度：</strong>让老电脑起死回生的唯一神器。</li>
                    <li><strong>坚固：</strong>没有机械结构，不怕摔，不像HDD像个娇气的瓷娃娃。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——速度的代价。</p>
            </div>
        )
    },
{
        id: 'biometrics',
        title: '生物识别',
        rarity: 'NPC',
        year: '2013',
        icon: <Fingerprint2 className="w-12 h-12 text-yellow-400" />,
        color: 'from-yellow-400/20 to-amber-500/20 border-yellow-400/50',
        accent: 'text-yellow-400',
        description: '你就是密码。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-yellow-300 italic mb-4">
                    "Touch ID, Face ID..."
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-yellow-500">
                    <li><strong>便利：</strong>再也不用记那该死的 'Pa$$w0rd' 了。</li>
                    <li><strong>风险：</strong>密码丢了可以改，指纹丢了（被复制）你总不能把手砍了吧？</li>
                    <li><strong>普及：</strong>现在连门锁都是指纹的了。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——独一无二。</p>
            </div>
        )
    },
{
        id: 'smart_home',
        title: '智能家居',
        rarity: '拉完了',
        year: '2000s',
        icon: <Lightbulb className="w-12 h-12 text-orange-300" />,
        color: 'from-orange-400/20 to-yellow-500/20 border-orange-400/50',
        accent: 'text-orange-300',
        description: '变得懒惰的借口。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-orange-200 italic mb-4">
                    "嘿，Siri，关灯。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-orange-400">
                    <li><strong>自动化：</strong>窗帘自动开合，空调自动调节，扫地机自动铲屎。</li>
                    <li><strong>Matter协议：</strong>终于，小米的灯能听苹果HomeKit的话了。</li>
                    <li><strong>断网：</strong>但要是断了网，你可能连家门都进不去。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——生活的遥控器。</p>
            </div>
        )
    },
{
        id: 'theranos',
        title: 'Theranos',
        rarity: '拉完了',
        year: '2003',
        icon: <Skull className="w-12 h-12 text-rose-500" />,
        color: 'from-rose-500/20 to-red-600/20 border-rose-500/50',
        accent: 'text-rose-500',
        description: '硅谷最大的骗局。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-rose-300 italic mb-4">
                    "Fake it until you make it."
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-rose-500">
                    <li><strong>画饼：</strong>宣称只用一滴血就能检测几百种疾病。</li>
                    <li><strong>伊丽莎白·霍姆斯：</strong>那个穿黑色高领衫、模仿乔布斯的女人，骗倒了所有大佬。</li>
                    <li><strong>教训：</strong>科学容不得半点虚假，PPT做得再好也没用。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——坏血。</p>
            </div>
        )
    },
{
        id: 'silk_road',
        title: '丝绸之路',
        rarity: '拉完了',
        year: '2011',
        icon: <Ban className="w-12 h-12 text-slate-500" />,
        color: 'from-slate-500/20 to-gray-600/20 border-slate-500/50',
        accent: 'text-slate-500',
        description: '暗网的亚马逊。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-slate-300 italic mb-4">
                    "这是完全自由贸易的实验..."
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-slate-500">
                    <li><strong>暗网黑市：</strong>用比特币交易毒品、枪支，一度极其猖獗。</li>
                    <li><strong>恐龙海盗罗伯茨：</strong>创始人的ID，最终在图书馆被FBI按在地上抓获（为了不让他锁屏）。</li>
                    <li><strong>警示：</strong>技术没有善恶，但人有。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——法网恢恢。</p>
            </div>
        )
    },
{
        id: 'wechat',
        title: '微信',
        rarity: '夯',
        year: '2011',
        icon: <MessageCircle className="w-12 h-12 text-green-500" />,
        color: 'from-green-500/20 to-emerald-600/20 border-green-500/50',
        accent: 'text-green-500',
        description: '一种生活方式。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-green-300 italic mb-4">
                    "再小的个体，也有自己的品牌。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-green-500">
                    <li><strong>超级App：</strong>聊天、支付、打车、外卖...它几乎吞噬了整个中国互联网。</li>
                    <li><strong>摇一摇：</strong>最简单的交互，连接了最陌生的人。</li>
                    <li><strong>张小龙：</strong>那个孤独的高尔夫球手，做出了最热闹的产品。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——连接一切。</p>
            </div>
        )
    },
{
        id: 'tiktok',
        title: 'TikTok',
        rarity: '夯',
        year: '2016',
        icon: <Video className="w-12 h-12 text-pink-500" />,
        color: 'from-pink-500/20 to-cyan-500/20 border-pink-500/50',
        accent: 'text-pink-500',
        description: '15秒的多巴胺。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-pink-300 italic mb-4">
                    "记录美好（魔性）生活。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-pink-500">
                    <li><strong>算法：</strong>它比你妈更懂你喜欢看什么。</li>
                    <li><strong>病毒式传播：</strong>让中国互联网产品第一次真正征服了全世界。</li>
                    <li><strong>争议：</strong>是奶头乐，还是创意的爆发？</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——停不下来。</p>
            </div>
        )
    },
{
        id: 'linux',
        title: 'Linux',
        rarity: '夯',
        year: '1991',
        icon: <Terminal className="w-12 h-12 text-yellow-300" />,
        color: 'from-yellow-400/20 to-orange-500/20 border-yellow-400/50',
        accent: 'text-yellow-300',
        description: 'For Fun.',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-yellow-200 italic mb-4">
                    "我只是为了好玩做个小操作系统，不想搞得像GNU那么大。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-yellow-400">
                    <li><strong>企鹅：</strong>Tux，这只吃饱了的企鹅，现在运行在火星探测器、超级计算机和你的安卓手机上。</li>
                    <li><strong>开源的力量：</strong>证明了全世界的志愿者协作，能打败世界最强的软件公司。</li>
                    <li><strong>Linus：</strong>"Talk is cheap, show me the code."</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——自由软件。</p>
            </div>
        )
    },
{
        id: 'mvp_future',
        title: '未来(你)',
        rarity: '夯',
        year: '20??',
        icon: <Sparkles className="w-12 h-12 text-white animate-pulse" />,
        color: 'from-white/20 to-slate-200/20 border-white/50',
        accent: 'text-white',
        description: '未被书写的历史。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-white italic mb-4">
                    "最好的预测未来的方式，就是去创造它。" —— 艾伦·凯
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-white">
                    <li><strong>第100号藏品：</strong>这个位置留给正在看屏幕的你。</li>
                    <li><strong>无限可能：</strong>下一个改变世界的代码，也许就诞生在你的指尖。</li>
                    <li><strong>传承：</strong>计算的历史是由人书写的，现在笔在你手里。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——Go Create!</p>
            </div>
        )
    },
{
        id: 'four_color',
        title: '四色定理',
        rarity: '人上人',
        year: '1976',
        icon: <Palette className="w-12 h-12 text-pink-500" />,
        color: 'from-pink-500/20 to-rose-600/20 border-pink-500/50',
        accent: 'text-pink-500',
        description: '地图只需四种颜色。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-pink-300 italic mb-4">
                    "这是第一个主要由计算机证明的数学定理。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-pink-500">
                    <li><strong>难题：</strong>困扰数学家100多年的涂色问题。</li>
                    <li><strong>暴力穷举：</strong>肯尼斯·阿佩尔用电脑跑了1200小时，检查了1936种情况。</li>
                    <li><strong>争议：</strong>"如果人类无法验证其过程，这还算证明吗？"</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——人脑的边界。</p>
            </div>
        )
    },
{
        id: 'tsp',
        title: '旅行商问题',
        rarity: '顶级',
        year: '1930s',
        icon: <Map2 className="w-12 h-12 text-amber-500" />,
        color: 'from-amber-500/20 to-orange-600/20 border-amber-500/50',
        accent: 'text-amber-500',
        description: '最短的路径在哪里？',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-amber-300 italic mb-4">
                    "想去遍所有城市不走回头路？祝你好运。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-amber-500">
                    <li><strong>NP-hard：</strong>随着城市数量增加，计算量呈指数级爆炸。</li>
                    <li><strong>应用：</strong>物流配送、电路板钻孔、DNA测序都离不开它。</li>
                    <li><strong>优化：</strong>我们找不到绝对最优解，但可以用蚁群算法找到"足够好"的解。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——计算的迷宫。</p>
            </div>
        )
    },
{
        id: 'game_of_life',
        title: '生命游戏',
        rarity: '夯',
        year: '1970',
        icon: <Grid2 className="w-12 h-12 text-green-400" />,
        color: 'from-green-500/20 to-emerald-600/20 border-green-500/50',
        accent: 'text-green-400',
        description: '零玩家游戏。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-green-300 italic mb-4">
                    "简单规则衍生出无限复。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-green-500">
                    <li><strong>康威：</strong>数学家约翰·霍顿·康威发明的细胞自动机。</li>
                    <li><strong>规则：</strong>孤单死，拥挤死，刚刚好就活。</li>
                    <li><strong>滑翔机：</strong>这些像素点仿佛有了生命，能够移动、繁殖、构建逻辑门。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——上帝的沙盒。</p>
            </div>
        )
    },
{
        id: 'mandelbrot',
        title: '曼德勃罗集',
        rarity: '夯',
        year: '1980',
        icon: <InfinityIcon className="w-12 h-12 text-violet-500" />,
        color: 'from-violet-500/20 to-fuchsia-600/20 border-violet-500/50',
        accent: 'text-violet-500',
        description: '上帝的指纹。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-violet-300 italic mb-4">
                    "Z = Z² + C"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-violet-500">
                    <li><strong>分形：</strong>无限缩放，永远能看到新的细节，且与整体相似。</li>
                    <li><strong>混沌：</strong>在确定性的公式中，诞生了不可预测的美。</li>
                    <li><strong>自然：</strong>海岸线、云朵、树叶、血管...大自然就是分形的。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——无限之美。</p>
            </div>
        )
    },
{
        id: 'p_vs_np',
        title: 'P vs NP',
        rarity: '夯',
        year: '1971',
        icon: <HelpCircle className="w-12 h-12 text-red-500" />,
        color: 'from-red-500/20 to-rose-600/20 border-red-500/50',
        accent: 'text-red-500',
        description: '直觉能被计算吗？',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-red-300 italic mb-4">
                    "如果 P = NP，那么只要能欣赏莫扎特的音乐，你就能写出它。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-red-500">
                    <li><strong>千禧年大奖难题：</strong>七大数学难题之首，赏金100万美元。</li>
                    <li><strong>核心：</strong>容易验证答案的问题，是否也容易找到答案？</li>
                    <li><strong>现状：</strong>绝大多数科学家相信 P ≠ NP，但还没人能证明。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——终极谜题。</p>
            </div>
        )
    },
{
        id: 'captcha',
        title: '验证码',
        rarity: '拉完了',
        year: '2003',
        icon: <Puzzle className="w-12 h-12 text-slate-400" />,
        color: 'from-slate-500/20 to-gray-600/20 border-slate-500/50',
        accent: 'text-slate-400',
        description: '全自动区分计算机和人类的图灵测试。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-slate-300 italic mb-4">
                    "请找出所有的红绿灯。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-slate-500">
                    <li><strong>反向图灵测试：</strong>这次是机器出题，人类来做。</li>
                    <li><strong>免费劳力：</strong>你输入的每一次验证码，都在帮谷歌训练自动驾驶AI。</li>
                    <li><strong>失效：</strong>现在的AI识别图片比人类还准，所以验证码越来越变态了。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——证明你是人。</p>
            </div>
        )
    },
{
        id: 'bsod',
        title: '蓝屏死机',
        rarity: 'NPC',
        year: '1993',
        icon: <Skull2 className="w-12 h-12 text-blue-600" />,
        color: 'from-blue-600/20 to-indigo-700/20 border-blue-600/50',
        accent: 'text-blue-600',
        description: ':( 您的设备遇到问题。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-blue-300 italic mb-4">
                    "CRITICAL_PROCESS_DIED"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-blue-600">
                    <li><strong>恐惧：</strong>未保存文档时的噩梦。</li>
                    <li><strong>比尔·盖茨：</strong>在演示Win98时当场蓝屏，成为了永恒的经典。</li>
                    <li><strong>保护：</strong>其实它是操作系统为了自我保护，防止数据损坏而选择的"自杀"行为。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——致命错误。</p>
            </div>
        )
    },
{
        id: 'stackoverflow',
        title: 'Stack Overflow',
        rarity: '夯',
        year: '2008',
        icon: <Layers className="w-12 h-12 text-orange-500" />,
        color: 'from-orange-500/20 to-amber-600/20 border-orange-500/50',
        accent: 'text-orange-500',
        description: '全栈工程师的真正后盾。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-orange-300 italic mb-4">
                    "Ctrl+C, Ctrl+V"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-orange-500">
                    <li><strong>圣地：</strong>全球程序员解决报错的百科全书。</li>
                    <li><strong>复制粘贴：</strong>承认吧，你的代码有一半是从这里抄的。</li>
                    <li><strong>互助：</strong>这里有的不仅是答案，还有乐于助人的极客精神。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——知无不言。</p>
            </div>
        )
    },
{
        id: 'alphago',
        title: 'AlphaGo',
        rarity: '夯',
        year: '2016',
        icon: <Brain className="w-12 h-12 text-cyan-500" />,
        color: 'from-cyan-500/20 to-sky-600/20 border-cyan-500/50',
        accent: 'text-cyan-500',
        description: '神之一手。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-cyan-300 italic mb-4">
                    "Move 37."
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-cyan-500">
                    <li><strong>围棋：</strong>人类最后的智力堡垒，被认为至少要几十年才能被攻克。</li>
                    <li><strong>李世石：</strong>1:4落败，但那唯一的胜局，是人类尊严的闪光。</li>
                    <li><strong>深度学习：</strong>它不靠死记硬背，它靠的是直觉和自我对弈。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——AI的加冕礼。</p>
            </div>
        )
    },
{
        id: 'glitch',
        title: '故障艺术',
        rarity: '拉完了',
        year: '20??',
        icon: <AlertTriangle className="w-12 h-12 text-rose-400" />,
        color: 'from-rose-500/20 to-pink-600/20 border-rose-500/50',
        accent: 'text-rose-400',
        description: '破碎也是一种美。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-rose-300 italic mb-4">
                    "It's not a bug, it's a feature."
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-rose-500">
                    <li><strong>Glitch Art：</strong>故意利用数字错误（马赛克、花屏、失真）来创作艺术。</li>
                    <li><strong>赛博朋克：</strong>高科技与低生活的视觉象征。</li>
                    <li><strong>隐喻：</strong>在一个追求完美精度的数字世界里，错误反而显得真实而有人情味。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——崩坏之美。</p>
            </div>
        )
    }
];

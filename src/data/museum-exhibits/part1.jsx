import { Ban, Binary, Box, Bug, Cpu, Database, Dices, Fingerprint, Globe, LockKeyhole, MapPin, Minimize2, MousePointer2, Network, Palette, Sparkles, Swords, Terminal, ToggleRight, Zap } from 'lucide-react';

export const museumExhibitsPart1 = [
{
        id: 'bug',
        title: '第一只 Bug',
        rarity: '夯',
        year: '1947',
        icon: <Bug className="w-12 h-12 text-rose-400" />,
        color: 'from-rose-500/20 to-pink-600/20 border-rose-500/50',
        accent: 'text-rose-400',
        description: '一切的起源：那只真正的飞蛾。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-rose-300 italic mb-4">
                    "First actual case of bug being found."
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-rose-500">
                    <li><strong>意外发现：</strong>9月9日，格蕾丝·霍珀在 Mark II 计算机的继电器触点中发现了一只被夹扁的飞蛾。</li>
                    <li><strong>术语诞生：</strong>虽然"Bug"（虫子）指代小故障早就存在，但这是第一次把它和计算机故障字面意义上联系起来。</li>
                    <li><strong>除虫（Debug）：</strong>从此，排除程序错误的过程就被生动地称为"捉虫子"。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——那只飞蛾至今仍贴在美国国家历史博物馆的日志簿里。</p>
            </div>
        )
    },
{
        id: 'four_color_computer_proof',
        title: '四色定理',
        rarity: '顶级',
        year: '1976',
        icon: <Palette className="w-12 h-12 text-pink-400" />,
        color: 'from-pink-500/20 to-rose-600/20 border-pink-500/50',
        accent: 'text-pink-400',
        description: '结束百年争论的暴力美学。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-pink-300 italic mb-4">
                    "给你一张乱七八糟的地图，你能保证只用4种颜色、还不让相邻国家撞色吗？"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-pink-500">
                    <li><strong>什么叫"相邻"：</strong>只有边挨边才算，点碰点不算。</li>
                    <li><strong>为什么难：</strong>地图的画法有无数种，人类无法穷举。</li>
                    <li><strong>计算机做了什么：</strong>把海量情况归纳为"必须检查的少数清单"，再用程序逐个验证。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——有些证明，不是写出来的，是"算出来也验证出来的"。</p>
            </div>
        )
    },
{
        id: 'halting',
        title: '停机问题',
        rarity: '夯',
        year: '1936',
        icon: <Ban className="w-12 h-12 text-red-500" />,
        color: 'from-red-500/20 to-orange-600/20 border-red-500/50',
        accent: 'text-red-500',
        description: '图灵证明了"全知全能"的不存在。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-red-300 italic mb-4">
                    "能不能做一个'万能检测器'，一眼看出某个程序会不会死循环？"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-red-500">
                    <li><strong>死循环：</strong>程序一直跑，永远不结束。</li>
                    <li><strong>图灵的结论：</strong>不存在能预判所有程序是否会停机的"万能判定器"。</li>
                    <li><strong>意义：</strong>证明了计算机虽然强大，但在逻辑上也有不可逾越的"天花板"。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——有些答案，数学告诉你"别找了"。</p>
            </div>
        )
    },
{
        id: 'tsp_optimization',
        title: '旅行商难题',
        rarity: '顶级',
        year: '1930s',
        icon: <MapPin className="w-12 h-12 text-amber-400" />,
        color: 'from-amber-500/20 to-yellow-600/20 border-amber-500/50',
        accent: 'text-amber-400',
        description: '外卖小哥每天都在面对的世界级难题。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-amber-300 italic mb-4">
                    "要送10个点，怎么走最省时间？你觉得'试一试'可行吗？"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-amber-500">
                    <li><strong>路线爆炸：</strong>点越多，可能的路线数量呈指数级增长，算不过来。</li>
                    <li><strong>最优 vs 够好：</strong>有时我们不求"绝对最省"，只求"差不多最省"的贪心或近似算法。</li>
                    <li><strong>真实应用：</strong>物流配送、芯片布线、DNA测序。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——世界上最难的题，常常长得像"怎么少走两步"。</p>
            </div>
        )
    },
{
        id: 'enigma',
        title: '恩尼格玛',
        rarity: '顶级',
        year: '1920s',
        icon: <LockKeyhole className="w-12 h-12 text-slate-400" />,
        color: 'from-slate-500/20 to-gray-600/20 border-slate-500/50',
        accent: 'text-slate-400',
        description: '数学家与机器的密码战争。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-slate-300 italic mb-4">
                    "如果你的密信被别人捡到，但他怎么也看不懂，会发生什么？"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-slate-500">
                    <li><strong>加密原理：</strong>密码不是藏起来，而是通过极其复杂的规则"变个样子"。</li>
                    <li><strong>为何难破：</strong>设置每天一换，组合数量多得离谱（1.5万亿亿种以上）。</li>
                    <li><strong>破解之道：</strong>阿兰·图灵等人的数学直觉 + 巨型炸弹机（Bombe）的暴力穷举。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——密码战不是魔法，是计算。</p>
            </div>
        )
    },
{
        id: 'deep_blue',
        title: '深蓝大战',
        rarity: '人上人',
        year: '1997',
        icon: <Swords className="w-12 h-12 text-blue-500" />,
        color: 'from-blue-500/20 to-indigo-600/20 border-blue-500/50',
        accent: 'text-blue-500',
        description: '人类第一次在棋盘上输给机器。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-blue-300 italic mb-4">
                    "你下棋会想三步，机器能想多少步？"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-blue-500">
                    <li><strong>机器优势：</strong>算得多。它能在一秒内分析上亿步棋。</li>
                    <li><strong>不止蛮力：</strong>"评估函数"让它知道什么样的棋局是"优势"。</li>
                    <li><strong>深远影响：</strong>开启了AI在博弈领域的统治，后来演化出了AlphaGo。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——有些胜利不是更聪明，而是更会算。</p>
            </div>
        )
    },
{
        id: 'shannon_01',
        title: '0与1的胜利',
        rarity: '顶级',
        year: '1937',
        icon: <ToggleRight className="w-12 h-12 text-green-400" />,
        color: 'from-green-500/20 to-emerald-600/20 border-green-500/50',
        accent: 'text-green-400',
        description: '香农把电路变成了"会思考的开关"。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-green-300 italic mb-4">
                    "灯的开关只有'开/关'，为什么能做出手机和电脑？"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-green-500">
                    <li><strong>信息基石：</strong>0代表关/假，1代表开/真。</li>
                    <li><strong>逻辑门：</strong>把"与、或、非"的判断逻辑做进电路里。</li>
                    <li><strong>质变：</strong>复杂的计算 = 无数个简单开关的组合。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——巨大的聪明，来自无数个很简单的 0 和 1。</p>
            </div>
        )
    },
{
        id: 'hash',
        title: '哈希江湖',
        rarity: '顶级',
        year: '1953',
        icon: <Fingerprint className="w-12 h-12 text-fuchsia-400" />,
        color: 'from-fuchsia-500/20 to-purple-600/20 border-fuchsia-500/50',
        accent: 'text-fuchsia-400',
        description: '数据的数码指纹。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-fuchsia-300 italic mb-4">
                    "图书馆找书，如果每次都从第一本翻到最后一本，会怎样？"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-fuchsia-500">
                    <li><strong>像是"指纹"：</strong>把任意长度的数据，快速算成一串固定长度的编号。</li>
                    <li><strong>作用：</strong>极速查找、校验文件是否被篡改（改一个字，指纹全变）。</li>
                    <li><strong>碰撞：</strong>要小心不同的东西算出一样的指纹，所以算法设计很难。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——会找路的不是腿，是方法。</p>
            </div>
        )
    },
{
        id: 'random',
        title: '随机数之谜',
        rarity: '人上人',
        year: '-',
        icon: <Dices className="w-12 h-12 text-violet-400" />,
        color: 'from-violet-500/20 to-purple-600/20 border-violet-500/50',
        accent: 'text-violet-400',
        description: '计算机真的会"随便"吗？',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-violet-300 italic mb-4">
                    "让电脑'随便'选一个数，它真的是随便吗？"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-violet-500">
                    <li><strong>伪随机：</strong>看起来乱序，其实是按固定公式算出来的，有迹可循。</li>
                    <li><strong>真随机：</strong>利用热噪声、按键抖动等物理现象生成的真正随机。</li>
                    <li><strong>用途：</strong>游戏抽卡（也许是伪的？）、密码加密（必须是真的！）。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——"看起来像"不等于"本来就是"。</p>
            </div>
        )
    },
{
        id: 'packet',
        title: '互联网诞生',
        rarity: '顶级',
        year: '1969',
        icon: <Network className="w-12 h-12 text-cyan-500" />,
        color: 'from-cyan-500/20 to-sky-600/20 border-cyan-500/50',
        accent: 'text-cyan-500',
        description: '把消息"切块再出发"。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-cyan-300 italic mb-4">
                    "你寄一整箱书，和把书分成很多小包裹寄，哪个更稳？"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-cyan-500">
                    <li><strong>分组交换：</strong>把信息切成小包（数据包），每个包自己找路。</li>
                    <li><strong>鲁棒性：</strong>这条路堵了就换那条，一个包丢了就只重发那一个。</li>
                    <li><strong>结果：</strong>造就了今天强大、稳定、连接全球的互联网。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——把大问题切小，是计算世界的万能招。</p>
            </div>
        )
    },
{
        id: 'compression',
        title: '压缩的魔法',
        rarity: '人上人',
        year: '-',
        icon: <Minimize2 className="w-12 h-12 text-orange-400" />,
        color: 'from-orange-500/20 to-amber-600/20 border-orange-500/50',
        accent: 'text-orange-400',
        description: '为什么照片能"变小"还不太糊？',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-orange-300 italic mb-4">
                    "同一张照片，为啥能从 10MB 变 1MB？"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-orange-500">
                    <li><strong>去重：</strong>把大片相同的颜色合并表达（"这100个点都是白"）。</li>
                    <li><strong>有损 vs 无损：</strong>为了更小，有时候可以丢掉人眼看不出的一点点细节。</li>
                    <li><strong>价值：</strong>让在线看视频、存文件成为可能。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——压缩不是把东西变少，而是把表达变聪明。</p>
            </div>
        )
    },
{
        id: 'moore',
        title: '摩尔定律',
        rarity: '人上人',
        year: '1965',
        icon: <Cpu className="w-12 h-12 text-indigo-400" />,
        color: 'from-indigo-500/20 to-violet-600/20 border-indigo-500/50',
        accent: 'text-indigo-400',
        description: '计算机速度的"心跳"。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-indigo-300 italic mb-4">
                    "如果汽车以计算机发展的速度进化，现在一辆劳斯莱斯只要1美元，百公里油耗一滴油，但那辆车可能只有火柴盒大小。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-indigo-500">
                    <li><strong>定律内容：</strong>集成电路上的晶体管数量，大约每18-24个月就会翻一番。</li>
                    <li><strong>结果：</strong>电脑性能指数级爆炸，价格指数级下降。</li>
                    <li><strong>现状：</strong>随着物理极限逼近，摩尔定律正在放缓，但"创新"永不停止。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——指数增长，是人类最难直观理解的力量。</p>
            </div>
        )
    },
{
        id: 'helloworld',
        title: 'Hello World',
        rarity: '拉完了',
        year: '1972',
        icon: <Terminal className="w-12 h-12 text-green-400" />,
        color: 'from-green-500/20 to-emerald-600/20 border-green-500/50',
        accent: 'text-green-400',
        description: '每一位程序员的初生啼哭。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-green-300 italic mb-4">
                    "当你让屏幕显示出这句话，你就拥有了对机器的控制权。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-green-500">
                    <li><strong>起源：</strong>最早出现在 B 语言教程中，后因《C程序设计语言》一书而流行全球。</li>
                    <li><strong>仪式感：</strong>它是确认环境配置正确的第一步，也是程序员与数字世界建立连接的握手礼。</li>
                    <li><strong>文化：</strong>无论用什么语言，这都是我们学会的第一句"咒语"。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——世界，你好！</p>
            </div>
        )
    },
{
        id: 'mouse',
        title: '道格拉斯的鼠标',
        rarity: '人上人',
        year: '1968',
        icon: <MousePointer2 className="w-12 h-12 text-slate-400" />,
        color: 'from-slate-500/20 to-gray-600/20 border-slate-500/50',
        accent: 'text-slate-400',
        description: '把人类的手延伸进屏幕。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-slate-300 italic mb-4">
                    "在那个全是黑底绿字的命令行时代，他给电脑装上了'手'。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-slate-500">
                    <li><strong>"演示之母"：</strong>1968年演示会上，恩格尔巴特展示了鼠标、视窗、超链接，震惊了世界。</li>
                    <li><strong>原型：</strong>最初的鼠标是一个木头盒子，下面有两个垂直的轮子。</li>
                    <li><strong>变革：</strong>它让普通人也能用电脑，而不必背诵几百条指令。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——最好的工具，是身体的延伸。</p>
            </div>
        )
    },
{
        id: 'opensource',
        title: '开源精神',
        rarity: '夯',
        year: '1991',
        icon: <Box className="w-12 h-12 text-yellow-500" />,
        color: 'from-yellow-500/20 to-amber-600/20 border-yellow-500/50',
        accent: 'text-yellow-500',
        description: 'Linux 与代码共享的革命。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-yellow-300 italic mb-4">
                    "我做了一个操作系统，只是为了好玩。" —— Linus Torvalds
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-yellow-500">
                    <li><strong>集市模式：</strong>成千上万的陌生人通过互联网协作，造出了比商业软件更好的系统。</li>
                    <li><strong>基石：</strong>今天，从安卓手机到超级计算机，世界的运转离不开 Linux。</li>
                    <li><strong>哲学：</strong>代码属于全人类，知识在分享中增值。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——独行快，众行远。</p>
            </div>
        )
    },
{
        id: 'wifi',
        title: 'WiFi与女明星',
        rarity: '顶级',
        year: '1942',
        icon: <Sparkles className="w-12 h-12 text-pink-500" />,
        color: 'from-pink-500/20 to-rose-600/20 border-pink-500/50',
        accent: 'text-pink-500',
        description: '好莱坞巨星发明的通信技术。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-pink-300 italic mb-4">
                    "比她美丽的没她聪明，比她聪明的没她美丽。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-pink-500">
                    <li><strong>海蒂·拉玛：</strong>白天是好莱坞当红影星，晚上是无线电发明家。</li>
                    <li><strong>灵感：</strong>受钢琴自动演奏的启发，她发明了"跳频技术"，防止鱼雷信号被干扰。</li>
                    <li><strong>遗产：</strong>这项技术成为了现代 WiFi、蓝牙和 GPS 的基础。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——才华，是最好的滤镜。</p>
            </div>
        )
    },
{
        id: 'y2k',
        title: '千年虫',
        rarity: 'NPC',
        year: '2000',
        icon: <Bug className="w-12 h-12 text-lime-400" />,
        color: 'from-lime-500/20 to-green-600/20 border-lime-500/50',
        accent: 'text-lime-400',
        description: '吓坏全世界的两个数字。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-lime-300 italic mb-4">
                    "时钟跳到00的那一刻，世界会毁灭吗？"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-lime-500">
                    <li><strong>起因：</strong>早期存储昂贵，程序员只用两位数表示年份（1998 → 98）。</li>
                    <li><strong>恐慌：</strong>2000年会变成"00"，电脑会误以为是1900年，导致银行计算出错、飞机失控。</li>
                    <li><strong>结局：</strong>全球耗资数千亿美元修补代码，平安度过了千禧年。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——由于我们修得好，大家以为没事发生。</p>
            </div>
        )
    },
{
        id: 'antikythera',
        title: '安提基特拉',
        rarity: '顶级',
        year: '-150',
        icon: <Cpu className="w-12 h-12 text-amber-500" />,
        color: 'from-amber-500/20 to-yellow-600/20 border-amber-500/50',
        accent: 'text-amber-500',
        description: '来自两千年前的"电脑"。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-amber-300 italic mb-4">
                    "它是古代世界的黑科技，精密度超越了之后一千年的所有机械。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-amber-500">
                    <li><strong>模拟计算机：</strong>虽然是纯机械的，但它利用复杂的齿轮系统完成计算。</li>
                    <li><strong>功能：</strong>预测日月食、太阳月亮位置，甚至奥林匹克运动会日期。</li>
                    <li><strong>发现：</strong>沉睡在海底两千年，直到1901年被潜水员在沉船中打捞出土。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——人类对计算的渴望，从未停止。</p>
            </div>
        )
    },
{
        id: 'lovelace',
        title: 'Ada Lovelace',
        rarity: '夯',
        year: '1843',
        icon: <Sparkles className="w-12 h-12 text-purple-400" />,
        color: 'from-purple-500/20 to-fuchsia-600/20 border-purple-500/50',
        accent: 'text-purple-400',
        description: '历史上的第一位程序员。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-purple-300 italic mb-4">
                    "因为她，计算机不再仅仅是'计算器'。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-purple-500">
                    <li><strong>远见者：</strong>她是著名诗人拜伦的女儿，但她透过数学看到了机器的灵魂。</li>
                    <li><strong>第一个程序：</strong>在分析机还只是图纸时，她就为它写出了计算伯努利数的算法。</li>
                    <li><strong>预言：</strong>她预言机器不仅能处理数字，未来甚至能创作音乐和绘图。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——既然机器能处理符号，那它就能处理一切。</p>
            </div>
        )
    },
{
        id: 'cables',
        title: '海底光缆',
        rarity: '人上人',
        year: '1850s',
        icon: <Globe className="w-12 h-12 text-emerald-400" />,
        color: 'from-emerald-500/20 to-teal-600/20 border-emerald-500/50',
        accent: 'text-emerald-400',
        description: '互联网并不在云端，而在海底。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-emerald-300 italic mb-4">
                    "你发给大洋彼岸的消息，其实是'游'过去的。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-emerald-500">
                    <li><strong>物理实体：</strong>99%的跨国流量依靠铺设在深海海底的400多条光缆传输。</li>
                    <li><strong>脆弱性：</strong>尽管层层保护，但地震、甚至鲨鱼咬一口都可能导致断网。</li>
                    <li><strong>历史：</strong>最早的海底电缆起源于1858年的电报时代，远早于互联网。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——"云"的根基，深深扎在泥沙里。</p>
            </div>
        )
    },
{
        id: 'floppy',
        title: '保存图标',
        rarity: '拉完了',
        year: '1971',
        icon: <Database className="w-12 h-12 text-indigo-400" />,
        color: 'from-indigo-500/20 to-violet-600/20 border-indigo-500/50',
        accent: 'text-indigo-400',
        description: '一个被时间冻结的符号。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-indigo-300 italic mb-4">
                    "对于00后来说，这可能只是一个'图标'，但它曾是我们的整个世界。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-indigo-500">
                    <li><strong>物理实体：</strong>在90年代，这个图标是真实的3.5英寸塑料盘片。</li>
                    <li><strong>容量：</strong>虽然只有1.44MB（存不下一张高清照片），但由于太过经典，它成为了"保存"的永恒符号。</li>
                    <li><strong>遗产：</strong>这就是拟物化设计留给数字世界最深刻的印记。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——经典永不看脸。</p>
            </div>
        )
    },
{
        id: 'binary',
        title: '0与1',
        rarity: '拉完了',
        year: '1679',
        icon: <Binary className="w-12 h-12 text-cyan-400" />,
        color: 'from-cyan-500/20 to-blue-600/20 border-cyan-500/50',
        accent: 'text-cyan-400',
        description: '最简单的语言，描述最复杂的世界。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-cyan-300 italic mb-4">
                    "道生一，一生二，二生万物。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-cyan-500">
                    <li><strong>莱布尼茨：</strong>受中国《易经》启发，他完善了二进制系统。</li>
                    <li><strong>物理实现：</strong>只有两个状态，完美契合了电路的"通"与"断"。</li>
                    <li><strong>本质：</strong>你看到的图像、听到的声音，本质上都是一串长长的0和1。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——少即是多。</p>
            </div>
        )
    },
{
        id: 'transistor',
        title: '晶体管',
        rarity: '夯',
        year: '1947',
        icon: <Zap className="w-12 h-12 text-yellow-500" />,
        color: 'from-yellow-500/20 to-amber-600/20 border-yellow-500/50',
        accent: 'text-yellow-500',
        description: '现代文明的基石。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-yellow-300 italic mb-4">
                    "这是20世纪最重要的发明，没有之一。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-yellow-500">
                    <li><strong>微波炉大小到纳米级：</strong>第一只晶体管有手掌那么大，现在一个指甲盖大小的芯片里能塞进几百亿个。</li>
                    <li><strong>开关：</strong>它的原理很简单，就是控制电流的通与断（0和1）。</li>
                    <li><strong>改变世界：</strong>如果没有它，我们还在用房间那么大的真空管计算机。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——沙子（硅）变成了金子。</p>
            </div>
        )
    },
{
        id: 'ic',
        title: '集成电路',
        rarity: '顶级',
        year: '1958',
        icon: <Cpu className="w-12 h-12 text-blue-500" />,
        color: 'from-blue-500/20 to-cyan-600/20 border-blue-500/50',
        accent: 'text-blue-500',
        description: '把世界装进微尘。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-blue-300 italic mb-4">
                    "为什么要一个个焊接零件？为什么不把它们直接做在一块材料上？"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-blue-500">
                    <li><strong>基尔比的创想：</strong>杰克·基尔比因为是新员工没有休假，独自在实验室里在一块锗片上做出了第一个集成电路。</li>
                    <li><strong>威力：</strong>解决了"数字暴政"，让复杂的电子设备体积缩小了万倍。</li>
                    <li><strong>微芯片：</strong>这就是我们今天所说的"芯片"的祖先。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——小即是强。</p>
            </div>
        )
    },
{
        id: 'cpu_4004',
        title: 'Intel 4004',
        rarity: '夯',
        year: '1971',
        icon: <Cpu className="w-12 h-12 text-indigo-500" />,
        color: 'from-indigo-500/20 to-purple-600/20 border-indigo-500/50',
        accent: 'text-indigo-500',
        description: '世界上第一款商用微处理器。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-indigo-300 italic mb-4">
                    "把一台计算机的所有核心功能，浓缩到一块芯片上。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-indigo-500">
                    <li><strong>意外的诞生：</strong>原本是为了给日本计算器公司做定制芯片，结果工程师想："为什么不做个通用的？"</li>
                    <li><strong>性能：</strong>虽然只有2300个晶体管，计算能力和第一台电子计算机 ENIAC 相当，但只有指甲盖大。</li>
                    <li><strong>意义：</strong>它开启了微型计算机时代，让电脑走进千家万户成为可能。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——大脑，已就位。</p>
            </div>
        )
    }
];

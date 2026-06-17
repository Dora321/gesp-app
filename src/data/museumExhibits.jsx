import React from 'react';
import { Bug, Cpu, Globe, Binary, Search, Sparkles, X, Database, Zap, Lock, RefreshCw, Box, Palette, Ban, MapPin, LockKeyhole, Swords, ToggleRight, Fingerprint, Dices, Network, Minimize2, Terminal, MousePointer2, Monitor, Gamepad2, Smartphone, Usb, Camera, Code2, Braces, Command, Layout, Server, Layers, Workflow, FileCode, AppWindow, Play, GitBranch, Cloud, Shield, Hash, Wifi, Radio, ShoppingCart, Video, MessageCircle, Link, Globe2, Share2, Rss, Eye, HardDrive, Brain, Rocket, Glasses, Gem, Ghost, Skull, Bot, Lightbulb, Satellite, Fingerprint as Fingerprint2, QrCode, Map as Map2, HelpCircle, Puzzle, Grid as Grid2, Skull as Skull2, AlertTriangle, Infinity as InfinityIcon } from 'lucide-react';

export const allExhibits = [
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
    },
    {
        id: 'ibm_pc',
        title: 'IBM PC',
        rarity: '人上人',
        year: '1981',
        icon: <Monitor className="w-12 h-12 text-slate-400" />,
        color: 'from-slate-500/20 to-gray-600/20 border-slate-500/50',
        accent: 'text-slate-400',
        description: '个人电脑的标准制定者。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-slate-300 italic mb-4">
                    "从此，电脑不再是玩具，而是严肃的生产力工具。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-slate-500">
                    <li><strong>开放架构：</strong>IBM允许其他厂商制造兼容机，这导致了PC产业的爆炸式繁荣。</li>
                    <li><strong>操作系统：</strong>它也意外地成就了微软（MS-DOS）。</li>
                    <li><strong>影响：</strong>确立了延续至今的 x86 架构统治地位。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——标准比技术更重要。</p>
            </div>
        )
    },
    {
        id: 'gameboy',
        title: 'Game Boy',
        rarity: '人上人',
        year: '1989',
        icon: <Gamepad2 className="w-12 h-12 text-purple-500" />,
        color: 'from-purple-500/20 to-fuchsia-600/20 border-purple-500/50',
        accent: 'text-purple-500',
        description: '装在口袋里的童年。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-purple-300 italic mb-4">
                    "不需要彩屏，不需要高性能，只需要好玩。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-purple-500">
                    <li><strong>横井军平的哲学：</strong>"枯萎技术的水平思考"——用成熟便宜的技术，做出最有创意的产品。</li>
                    <li><strong>俄罗斯方块：</strong>它是Game Boy这种硬件最好的推销员。</li>
                    <li><strong>销量：</strong>累计销量近1.2亿台，神一般的存在。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——好玩是第一生产力。</p>
            </div>
        )
    },
    {
        id: 'iphone',
        title: 'iPhone',
        rarity: '夯',
        year: '2007',
        icon: <Smartphone className="w-12 h-12 text-zinc-400" />,
        color: 'from-zinc-500/20 to-slate-600/20 border-zinc-500/50',
        accent: 'text-zinc-400',
        description: '重新发明了手机。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-zinc-300 italic mb-4">
                    "一个iPod，一个电话，一个互联网通讯器。这不是三个设备，这是一个。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-zinc-500">
                    <li><strong>多点触控：</strong>扔掉手写笔，用上帝赐予我们的十根手指。</li>
                    <li><strong>App Store：</strong>开启了移动互联网的大航海时代。</li>
                    <li><strong>终结者：</strong>它终结了诺基亚的帝国，重新定义了人类的生活方式。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——今天，它是你的器官。</p>
            </div>
        )
    },
    {
        id: 'raspberry_pi',
        title: '树莓派',
        rarity: '拉完了',
        year: '2012',
        icon: <Cpu className="w-12 h-12 text-rose-500" />,
        color: 'from-rose-500/20 to-red-600/20 border-rose-500/50',
        accent: 'text-rose-500',
        description: '35美元的电脑梦。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-rose-300 italic mb-4">
                    "让每个孩子都能拥有一台可以编程的电脑。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-rose-500">
                    <li><strong>极客玩具：</strong>原本为了教育，结果被全世界的极客拿去做机器人、服务器、甚至超级计算机集群。</li>
                    <li><strong>甚至在太空：</strong>国际空间站上也有两台树莓派（Astro Pi）。</li>
                    <li><strong>精神：</strong>技术的门槛，不应被金钱阻挡。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——小身材，大梦想。</p>
            </div>
        )
    },
    {
        id: 'gpu',
        title: 'GPU',
        rarity: '人上人',
        year: '1999',
        icon: <Box className="w-12 h-12 text-lime-400" />,
        color: 'from-lime-500/20 to-green-600/20 border-lime-500/50',
        accent: 'text-lime-400',
        description: '不只是为了玩游戏。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-lime-300 italic mb-4">
                    "并行计算的艺术。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-lime-500">
                    <li><strong>图形处理：</strong>最初是为了让游戏画面更逼真，计算光影和3D模型。</li>
                    <li><strong>通用计算（GPGPU）：</strong>后来发现，它特别擅长做大量重复的简单计算（如矩阵运算）。</li>
                    <li><strong>AI引擎：</strong>如今，它是深度学习和人工智能背后的真正动力。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——算力即权力。</p>
            </div>
        )
    },
    {
        id: 'usb',
        title: 'USB',
        rarity: '拉完了',
        year: '1996',
        icon: <Usb className="w-12 h-12 text-blue-400" />,
        color: 'from-blue-500/20 to-sky-600/20 border-blue-500/50',
        accent: 'text-blue-400',
        description: '一种接口统治世界。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-blue-300 italic mb-4">
                    "虽然你总是第一次插反，但它确实拯救了混乱的世界。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-blue-500">
                    <li><strong>大一统：</strong>在它之前，键盘、鼠标、打印机各有各的接口，互不兼容。</li>
                    <li><strong>即插即用：</strong>不需要关机重启，插上就能用（虽然早期是"即插即祈祷"）。</li>
                    <li><strong>进化：</strong>从1.5MB/s到今天的40GB/s，它一直在提速，从未被淘汰。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——通用是最高的赞美。</p>
            </div>
        )
    },
    {
        id: 'digital_camera',
        title: '数码相机',
        rarity: '拉完了',
        year: '1975',
        icon: <Camera className="w-12 h-12 text-zinc-300" />,
        color: 'from-zinc-500/20 to-gray-600/20 border-zinc-500/50',
        accent: 'text-zinc-300',
        description: '光影的数字化。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-zinc-300 italic mb-4">
                    "柯达发明了它，然后被它埋葬。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-zinc-500">
                    <li><strong>第一台原型：</strong>柯达工程师史蒂夫·萨松用磁带记录了第一张1万像素的黑白数码照片。</li>
                    <li><strong>变革：</strong>它让摄影不再需要昂贵的胶卷和暗房，让"记录生活"变得零成本。</li>
                    <li><strong>警示：</strong>颠覆你的通常不是同行，而是你看不懂的新技术。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——胶卷死了，摄影永生。</p>
            </div>
        )
    },
    {
        id: 'c_lang',
        title: 'C语言',
        rarity: '夯',
        year: '1972',
        icon: <Code2 className="w-12 h-12 text-blue-500" />,
        color: 'from-blue-500/20 to-indigo-600/20 border-blue-500/50',
        accent: 'text-blue-500',
        description: '上帝语言。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-blue-300 italic mb-4">
                    "它不阻止你做蠢事，但它让你做的一切都极度高效。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-blue-500">
                    <li><strong>基石：</strong>Windows、Linux、macOS、Python、Java...它们的底层都是用C写的。</li>
                    <li><strong>简洁有力：</strong>它贴近硬件，像一把手术刀，精准但危险。</li>
                    <li><strong>永生：</strong>50年过去了，在此刻的世界上，仍有无数台机器在运行着C代码。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——世界是C做的。</p>
            </div>
        )
    },
    {
        id: 'unix',
        title: 'UNIX',
        rarity: '夯',
        year: '1969',
        icon: <Terminal className="w-12 h-12 text-slate-200" />,
        color: 'from-slate-500/20 to-gray-600/20 border-slate-500/50',
        accent: 'text-slate-200',
        description: '操作系统的哲学导师。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-slate-300 italic mb-4">
                    "K.I.S.S. (Keep It Simple, Stupid)"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-slate-500">
                    <li><strong>哲学：</strong>小即是美；让程序只做一件事并做好；让程序能够协同工作。</li>
                    <li><strong>一切皆文件：</strong>这种优雅的抽象，统一了对硬件、文档和网络的操作。</li>
                    <li><strong>子孙：</strong>我们今天用的 Linux, macOS, iOS, Android，流的都是 UNIX 的血。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——简单的力量。</p>
            </div>
        )
    },
    {
        id: 'tetris',
        title: '俄罗斯方块',
        rarity: '顶级',
        year: '1984',
        icon: <Layout className="w-12 h-12 text-yellow-500" />,
        color: 'from-yellow-500/20 to-orange-600/20 border-yellow-500/50',
        accent: 'text-yellow-500',
        description: '最完美的电子游戏。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-yellow-300 italic mb-4">
                    "如果你甚至无法停止摆弄这几个方块，你怎么去拯救世界？"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-yellow-500">
                    <li><strong>从铁幕后走来：</strong>诞生于苏联科学院的一台古老计算机上，通过软盘偷渡到西方。</li>
                    <li><strong>极简设计：</strong>没有剧情，没有终点，只有对秩序的渴望。</li>
                    <li><strong>心理学：</strong>"蔡格尼克效应"——未完成的任务让人欲罢不能。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——秩序与混乱的永恒博弈。</p>
            </div>
        )
    },
    {
        id: 'www',
        title: '万维网',
        rarity: '夯',
        year: '1989',
        icon: <Globe className="w-12 h-12 text-emerald-400" />,
        color: 'from-emerald-500/20 to-green-600/20 border-emerald-500/50',
        accent: 'text-emerald-400',
        description: '连接人类的神经网。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-emerald-300 italic mb-4">
                    "这是一个给所有人的、免费的、开放的空间。" —— 蒂姆·伯纳斯-李
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-emerald-500">
                    <li><strong>不仅是网：</strong>Internet是路，WWW是路上的车和风景。</li>
                    <li><strong>三件套：</strong>URL（地址）、HTTP（传输）、HTML（内容），构成了我们看到的网页。</li>
                    <li><strong>无私：</strong>发明者没有申请专利，而是把它送给了全人类。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——这也是为什么你现在能看到这些文字。</p>
            </div>
        )
    },
    {
        id: 'git',
        title: 'Git',
        rarity: '顶级',
        year: '2005',
        icon: <GitBranch className="w-12 h-12 text-orange-500" />,
        color: 'from-orange-500/20 to-red-600/20 border-orange-500/50',
        accent: 'text-orange-500',
        description: '时间机器。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-orange-300 italic mb-4">
                    "世界上只有两种开发者：用Git的，和把代码存为'最终版_绝对不改了_v3.zip'的。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-orange-500">
                    <li><strong>起源：</strong>Linus Torvalds 因为没好用的工具管理 Linux 代码，就花了两周自己写了一个。</li>
                    <li><strong>分布式：</strong>每个人都拥有完整的历史记录，不再依赖中央服务器。</li>
                    <li><strong>后悔药：</strong>它让你能随时回到过去，修复被你搞砸的代码。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——代码的撤销键。</p>
            </div>
        )
    },
    {
        id: 'photoshop',
        title: 'Photoshop',
        rarity: '人上人',
        year: '1990',
        icon: <AppWindow className="w-12 h-12 text-cyan-500" />,
        color: 'from-cyan-500/20 to-blue-600/20 border-cyan-500/50',
        accent: 'text-cyan-500',
        description: '真相并不一定如你所见。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-cyan-300 italic mb-4">
                    "PDD（Photoshop Document）是数字时代的画布。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-cyan-500">
                    <li><strong>动词：</strong>它太成功了，以至于"P图"（Photoshopping）成了一个动词。</li>
                    <li><strong>图层：</strong>它的"图层"概念，彻底改变了平面设计的逻辑。</li>
                    <li><strong>双刃剑：</strong>它创造了美，也制造了假象。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——重新定义"有图有真相"。</p>
            </div>
        )
    },
    {
        id: 'minecraft',
        title: 'Minecraft',
        rarity: '顶级',
        year: '2011',
        icon: <Box className="w-12 h-12 text-green-500" />,
        color: 'from-green-500/20 to-emerald-600/20 border-green-500/50',
        accent: 'text-green-500',
        description: '数字时代的乐高。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-green-300 italic mb-4">
                    "由于没有说明书，所以整个世界都是你的说明书。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-green-500">
                    <li><strong>自由：</strong>没有目标，没有输赢，只有创造。</li>
                    <li><strong>红石电脑：</strong>玩家在游戏里用红石电路造出了真正的 CPU，甚至能运行简单的程序。</li>
                    <li><strong>销量：</strong>史上销量最高的电子游戏。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——不仅是游戏，是元宇宙的雏形。</p>
            </div>
        )
    },
    {
        id: 'rsa',
        title: 'RSA算法',
        rarity: '夯',
        year: '1977',
        icon: <Lock className="w-12 h-12 text-purple-400" />,
        color: 'from-purple-500/20 to-pink-600/20 border-purple-500/50',
        accent: 'text-purple-400',
        description: '互联网安全的守护神。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-purple-300 italic mb-4">
                    "你敢在网上刷信用卡，全靠它保护。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-purple-500">
                    <li><strong>不对称加密：</strong>我有两把钥匙，一把公钥给你加密，一把私钥我自己留着解密。</li>
                    <li><strong>数学原理：</strong>由于大整数分解极其困难，现代计算机算几百年也算不出来私钥。</li>
                    <li><strong>地位：</strong>没有它，就没有电子商务，没有网银，没有HTTPS。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——因为难算，所以安全。</p>
            </div>
        )
    },
    {
        id: 'alphago_move37',
        title: 'AlphaGo',
        rarity: '夯',
        year: '2016',
        icon: <Cpu className="w-12 h-12 text-teal-400" />,
        color: 'from-teal-500/20 to-cyan-600/20 border-teal-500/50',
        accent: 'text-teal-400',
        description: '那一刻，人类终于回想起了被支配的恐惧。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-teal-300 italic mb-4">
                    "第37手。那不是人类会下的一步棋。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-teal-500">
                    <li><strong>突破：</strong>围棋曾被认为是AI无法攻克的堡垒，因其变化数超过宇宙原子总数。</li>
                    <li><strong>深度学习：</strong>它不是死记硬背，而是通过自我对弈"学会"了直觉。</li>
                    <li><strong>转折点：</strong>标志着人工智能从"弱AI"迈向了具有创造力的新纪元。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——Machine Learning。</p>
            </div>
        )
    },
    {
        id: 'doom',
        title: '毁灭战士',
        rarity: '人上人',
        year: '1993',
        icon: <Swords className="w-12 h-12 text-red-600" />,
        color: 'from-red-600/20 to-rose-700/20 border-red-600/50',
        accent: 'text-red-600',
        description: '3D游戏的开山鼻祖。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-red-300 italic mb-4">
                    "Can it run DOOM?（这玩意儿能运行DOOM吗？）"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-red-600">
                    <li><strong>3D引擎：</strong>卡马克大神的黑魔法，在简陋的硬件上实现了流畅的3D射击体验。</li>
                    <li><strong>模组（Mod）：</strong>它是最早支持玩家修改游戏内容的游戏之一。</li>
                    <li><strong>移植：</strong>被移植到了验孕棒、ATM机、甚至乐高积木的屏幕上。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——Everything runs DOOM。</p>
            </div>
        )
    },
    {
        id: 'java',
        title: 'Java',
        rarity: '拉完了',
        year: '1995',
        icon: <Code2 className="w-12 h-12 text-orange-400" />,
        color: 'from-orange-500/20 to-amber-600/20 border-orange-500/50',
        accent: 'text-orange-400',
        description: 'Write Once, Run Anywhere.',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-orange-300 italic mb-4">
                    "想喝杯咖啡吗？"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-orange-500">
                    <li><strong>跨平台：</strong>通过虚拟机（JVM），代码可以在任何系统上运行，不用重写。</li>
                    <li><strong>企业级：</strong>它是大公司的最爱，支撑着全球的银行、电商后台。</li>
                    <li><strong>垃圾回收：</strong>自动管理内存，让程序员不用再担心内存泄漏（虽然偶尔也会OOM）。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——稳健的老大哥。</p>
            </div>
        )
    },
    {
        id: 'google',
        title: 'PageRank',
        rarity: '夯',
        year: '1998',
        icon: <Search className="w-12 h-12 text-blue-400" />,
        color: 'from-blue-500/20 to-sky-600/20 border-blue-500/50',
        accent: 'text-blue-400',
        description: '整理世界信息的算法。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-blue-300 italic mb-4">
                    "网页的重要性，由指向它的链接决定。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-blue-500">
                    <li><strong>突破：</strong>早期的搜索引擎只看关键词，Google 看网页之间的"投票"关系。</li>
                    <li><strong>商业模式：</strong>精准的搜索广告，让它成为了印钞机。</li>
                    <li><strong>影响：</strong>从那时起，"百度一下"或"Google it"成了获取知识的代名词。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——互联网的入口。</p>
            </div>
        )
    },
    {
        id: 'email',
        title: '电子邮件',
        rarity: '拉完了',
        year: '1971',
        icon: <Box className="w-12 h-12 text-yellow-300" />,
        color: 'from-yellow-400/20 to-orange-500/20 border-yellow-400/50',
        accent: 'text-yellow-300',
        description: '那个 @ 符号。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-yellow-200 italic mb-4">
                    "user@host：简单而天才的发明。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-yellow-400">
                    <li><strong>第一封邮件：</strong>Ray Tomlinson 发给了自己，内容大概是 "QWERTYUIOP"。</li>
                    <li><strong>@：</strong>选中这个符号是因为它在键盘上很少用到，且含义准确（at）。</li>
                    <li><strong>长寿：</strong>虽然有了微信和Slack，但邮件依然是正式沟通的王道。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——连接人与人。</p>
            </div>
        )
    },
    {
        id: 'mp3',
        title: 'MP3',
        rarity: '人上人',
        year: '1993',
        icon: <Play className="w-12 h-12 text-pink-400" />,
        color: 'from-pink-500/20 to-rose-600/20 border-pink-500/50',
        accent: 'text-pink-400',
        description: '被听觉欺骗的艺术。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-pink-300 italic mb-4">
                    "把10首歌装进口袋？以前这是魔法，现在是笑话。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-pink-500">
                    <li><strong>心理声学：</strong>利用人耳的听觉掩蔽效应，删掉人耳听不见的声音数据。</li>
                    <li><strong>颠覆：</strong>它杀死了CD，毁掉了传统唱片工业，诞生了iPod。</li>
                    <li><strong>遗产：</strong>音乐从此流淌在网线里，而不是刻在盘片上。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——声音的革命。</p>
            </div>
        )
    },
    {
        id: 'bitcoin',
        title: '比特币',
        rarity: '人上人',
        year: '2009',
        icon: <Braces className="w-12 h-12 text-amber-500" />,
        color: 'from-amber-500/20 to-yellow-600/20 border-amber-500/50',
        accent: 'text-amber-500',
        description: '去中心化的数字黄金。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-amber-300 italic mb-4">
                    "中本聪是谁？这不重要。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-amber-500">
                    <li><strong>区块链：</strong>一个公开的、不可篡改的超级账本。</li>
                    <li><strong>稀缺性：</strong>总量恒定2100万枚，代码即法律。</li>
                    <li><strong>争议：</strong>是未来的货币，还是最大的泡沫？</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——In Cryptography We Trust。</p>
            </div>
        )
    },
    {
        id: 'docker',
        title: 'Docker',
        rarity: '人上人',
        year: '2013',
        icon: <Box className="w-12 h-12 text-blue-400" />,
        color: 'from-blue-500/20 to-cyan-600/20 border-blue-500/50',
        accent: 'text-blue-400',
        description: '代码的集装箱。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-blue-300 italic mb-4">
                    "在我的机器上能跑啊？—— 这句话成了历史。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-blue-500">
                    <li><strong>标准化：</strong>把程序和它运行需要的环境打包在一起，在哪都能跑。</li>
                    <li><strong>集装箱革命：</strong>就像集装箱改变了全球贸易，Docker 改变了云端应用交付。</li>
                    <li><strong>微服务：</strong>让拆分巨型应用变得容易，催生了云原生时代。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——Build, Ship, and Run Any App, Anywhere。</p>
            </div>
        )
    },
    {
        id: 'emoji',
        title: 'Emoji',
        rarity: '拉完了',
        year: '1999',
        icon: <Sparkles className="w-12 h-12 text-yellow-400" />,
        color: 'from-yellow-400/20 to-amber-500/20 border-yellow-400/50',
        accent: 'text-yellow-400',
        description: '人类的新世界语。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-yellow-300 italic mb-4">
                    "😂 变成了年度词汇。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-yellow-400">
                    <li><strong>起源：</strong>栗得广为了解决日本手机邮件字数限制而发明。</li>
                    <li><strong>Unicode：</strong>由于被纳入国际编码标准，它可以跨越语言障碍，让全世界沟通。</li>
                    <li><strong>表现力：</strong>有时候一个表情胜过千言万语。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——(●'◡'●)</p>
            </div>
        )
    },
    {
        id: 'unity',
        title: 'Unity',
        rarity: '人上人',
        year: '2005',
        icon: <Box className="w-12 h-12 text-stone-300" />,
        color: 'from-stone-500/20 to-gray-600/20 border-stone-500/50',
        accent: 'text-stone-300',
        description: '游戏民主化。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-stone-200 italic mb-4">
                    "人人都能做游戏。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-stone-400">
                    <li><strong>引擎：</strong>封装了复杂的物理、渲染、音频代码，让开发者只关注玩法。</li>
                    <li><strong>生态：</strong>庞大的资源商店，不懂美术也能拼出一个像样的世界。</li>
                    <li><strong>普及：</strong>今天手机上一般的游戏都是用它做的。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——造梦引擎。</p>
            </div>
        )
    },
    {
        id: 'excel',
        title: 'Excel',
        rarity: '拉完了',
        year: '1985',
        icon: <Layout className="w-12 h-12 text-green-600" />,
        color: 'from-green-600/20 to-emerald-700/20 border-green-600/50',
        accent: 'text-green-600',
        description: '世界上最流行的编程语言（由于使用了公式）。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-green-300 italic mb-4">
                    "万物皆可Excel。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-green-600">
                    <li><strong>电子表格：</strong>VisiCalc 的精神续作，彻底淘汰了纸质账本。</li>
                    <li><strong>功能：</strong>从简单的加减乘除到复杂的金融建模，甚至有人用它画画、做游戏。</li>
                    <li><strong>真实：</strong>它是许多公司真正的核心业务系统（虽然IT部门不想承认）。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——生产力的代名词。</p>
            </div>
        )
    },
    {
        id: 'arpanet',
        title: 'ARPANET',
        rarity: '夯',
        year: '1969',
        icon: <Network className="w-12 h-12 text-slate-500" />,
        color: 'from-slate-500/20 to-gray-600/20 border-slate-500/50',
        accent: 'text-slate-500',
        description: '互联网的始祖。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-slate-300 italic mb-4">
                    "LO"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-slate-500">
                    <li><strong>第一条消息：</strong>本来想发"LOGIN"，结果输到"O"的时候系统崩溃了，只发出了"LO"。</li>
                    <li><strong>冷战遗产：</strong>最初是为了建立一个在核战争中也能保持通讯的去中心化网络。</li>
                    <li><strong>节点：</strong>最开始只有4个节点（UCLA, Stanford, UCSB, Utah）。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——伟大的开始总是伴随着崩溃。</p>
            </div>
        )
    },
    {
        id: 'tcpip',
        title: 'TCP/IP',
        rarity: '顶级',
        year: '1974',
        icon: <Link className="w-12 h-12 text-blue-400" />,
        color: 'from-blue-500/20 to-sky-600/20 border-blue-500/50',
        accent: 'text-blue-400',
        description: '互联网的普通话。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-blue-300 italic mb-4">
                    "不管你是谁，只要说这门语言，我们就是朋友。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-blue-500">
                    <li><strong>文特·瑟夫：</strong>互联网之父，设计了这个让不同网络能互联互通的协议。</li>
                    <li><strong>分层：</strong>把复杂的问题拆成四层，每层只管好自己的事。</li>
                    <li><strong>鲁棒性：</strong>它假设网络总是不可靠的，所以设计得极其耐造。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——协议即和平。</p>
            </div>
        )
    },
    {
        id: 'dns',
        title: 'DNS',
        rarity: '拉完了',
        year: '1983',
        icon: <Search className="w-12 h-12 text-amber-500" />,
        color: 'from-amber-500/20 to-yellow-600/20 border-amber-500/50',
        accent: 'text-amber-500',
        description: '互联网的电话本。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-amber-300 italic mb-4">
                    "你能记住百度的IP是 202.108.22.5 吗？"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-amber-500">
                    <li><strong>人性化：</strong>把反人类的IP地址翻译成好记的域名（.com）。</li>
                    <li><strong>根服务器：</strong>全世界只有13组根服务器，掌管着互联网的顶层目录。</li>
                    <li><strong>缓存：</strong>为了快，大家都存一份副本，所以有时候改了域名不会马上生效。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——名字是最短的咒语。</p>
            </div>
        )
    },
    {
        id: 'netscape',
        title: 'Netscape',
        rarity: '夯',
        year: '1994',
        icon: <Globe2 className="w-12 h-12 text-teal-500" />,
        color: 'from-teal-500/20 to-emerald-600/20 border-teal-500/50',
        accent: 'text-teal-500',
        description: '被微软杀死的领航员。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-teal-300 italic mb-4">
                    "它是第一扇面向普通人的通往互联网的大门。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-teal-500">
                    <li><strong>Mosaic后裔：</strong>马克·安德森写的第一个图形化浏览器。</li>
                    <li><strong>浏览器大战：</strong>微软捆绑IE免费送，Netscape最终败北，但它的代码重生为Firefox。</li>
                    <li><strong>遗产：</strong>它发明了 Cookie、JavaScript 和 SSL，塑造了今天的Web。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——老兵不死，只是凋零。</p>
            </div>
        )
    },
    {
        id: 'amazon',
        title: '电子商务',
        rarity: '拉完了',
        year: '1994',
        icon: <ShoppingCart className="w-12 h-12 text-orange-400" />,
        color: 'from-orange-500/20 to-amber-600/20 border-orange-500/50',
        accent: 'text-orange-400',
        description: '什么都卖的Everything Store。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-orange-300 italic mb-4">
                    "Get Big Fast."
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-orange-500">
                    <li><strong>起源：</strong>贝佐斯只是想在网上卖书，因为书长得都一样，退货率低。</li>
                    <li><strong>长尾效应：</strong>甚至一年只卖出一本的冷门书，在网上也能找到买家。</li>
                    <li><strong>推荐算法：</strong>"买过这本书的人也买了..."，比你自己更懂你的钱包。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——剁手节的万恶之源。</p>
            </div>
        )
    },
    {
        id: 'facebook',
        title: '社交网络',
        rarity: '人上人',
        year: '2004',
        icon: <Share2 className="w-12 h-12 text-blue-600" />,
        color: 'from-blue-600/20 to-indigo-700/20 border-blue-600/50',
        accent: 'text-blue-600',
        description: '人类历史上最大的通讯录。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-blue-300 italic mb-4">
                    "Move fast and break things."
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-blue-600">
                    <li><strong>六度分隔：</strong>你和世界上任何一个人之间，最多只隔了5个人。</li>
                    <li><strong>点赞：</strong>这个简单的按钮，彻底改变了人类寻求认可的方式。</li>
                    <li><strong>隐私：</strong>当产品免费时，你就是产品。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——连接的代价。</p>
            </div>
        )
    },
    {
        id: 'aws',
        title: '云计算',
        rarity: '顶级',
        year: '2006',
        icon: <Cloud className="w-12 h-12 text-sky-400" />,
        color: 'from-sky-500/20 to-blue-600/20 border-sky-500/50',
        accent: 'text-sky-400',
        description: '别人的电脑。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-sky-300 italic mb-4">
                    "不再需要买服务器，像用水用电一样使用计算资源。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-sky-500">
                    <li><strong>弹性：</strong>双11来了服务器不够？点几下鼠标，瞬间增加一万台。</li>
                    <li><strong>Serverless：</strong>你只需要写代码，剩下的交给云。</li>
                    <li><strong>垄断：</strong>互联网的半壁江山，其实都跑在亚马逊、微软和谷歌的机房里。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——云端之上。</p>
            </div>
        )
    },
    {
        id: '5g',
        title: '5G',
        rarity: '拉完了',
        year: '2019',
        icon: <Radio className="w-12 h-12 text-purple-500" />,
        color: 'from-purple-500/20 to-pink-600/20 border-purple-500/50',
        accent: 'text-purple-500',
        description: '快到没朋友。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-purple-300 italic mb-4">
                    "万物互联的基础设施。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-purple-500">
                    <li><strong>速度：</strong>比4G快100倍，下载一部电影只需几秒。</li>
                    <li><strong>低延迟：</strong>1毫秒的延迟，让远程手术和自动驾驶成为可能。</li>
                    <li><strong>密度：</strong>每平方公里支持100万个设备连接。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——未来已来。</p>
            </div>
        )
    },
    {
        id: 'youtube',
        title: 'YouTube',
        rarity: '人上人',
        year: '2005',
        icon: <Video className="w-12 h-12 text-red-500" />,
        color: 'from-red-500/20 to-rose-600/20 border-red-500/50',
        accent: 'text-red-500',
        description: 'Broadcast Yourself.',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-red-300 italic mb-4">
                    "第一个视频是 'Me at the zoo'。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-red-500">
                    <li><strong>UGC：</strong>不再是电视台说了算，每个人都是生活的导演。</li>
                    <li><strong>流量黑洞：</strong>全球互联网流量的大头都是视频。</li>
                    <li><strong>网红：</strong>创造了一种全新的职业和名人生态。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——人人皆是主角。</p>
            </div>
        )
    },
    {
        id: 'wikipedia',
        title: '维基百科',
        rarity: '顶级',
        year: '2001',
        icon: <Globe className="w-12 h-12 text-slate-300" />,
        color: 'from-slate-400/20 to-gray-500/20 border-slate-400/50',
        accent: 'text-slate-300',
        description: '人类知识的总和。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-slate-200 italic mb-4">
                    "想象一个世界，每个人都可以自由分享人类的所有知识。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-slate-400">
                    <li><strong>群众智慧：</strong>相信普通人的善意和纠错能力，而不是专家的权威。</li>
                    <li><strong>非营利：</strong>不卖广告，全靠捐赠，是互联网仅存的净土之一。</li>
                    <li><strong>规模：</strong>拥有300多种语言版本，仅仅英文版就有600多万条条目。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——知识属于全人类。</p>
            </div>
        )
    },
    {
        id: 'ssl',
        title: 'SSL/TLS',
        rarity: '人上人',
        year: '1995',
        icon: <LockKeyhole className="w-12 h-12 text-green-400" />,
        color: 'from-green-500/20 to-emerald-600/20 border-green-500/50',
        accent: 'text-green-400',
        description: '给互联网戴上锁。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-green-300 italic mb-4">
                    "那个浏览器地址栏里的小锁头。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-green-500">
                    <li><strong>握手：</strong>"天王盖地虎？""宝塔镇河妖！"——确认身份的过程。</li>
                    <li><strong>HTTPS：</strong>现在几乎所有正规网站都是HTTPS，未加密的HTTP正在消亡。</li>
                    <li><strong>证书：</strong>你得先证明你是你，浏览器才信任你。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——信任链。</p>
            </div>
        )
    },
    {
        id: 'firewall',
        title: '防火墙',
        rarity: '拉完了',
        year: '1988',
        icon: <Shield className="w-12 h-12 text-orange-500" />,
        color: 'from-orange-500/20 to-red-600/20 border-orange-500/50',
        accent: 'text-orange-500',
        description: '数字世界的城墙。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-orange-300 italic mb-4">
                    "好人进，坏人出。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-orange-500">
                    <li><strong>过滤：</strong>检查每一个进出的数据包，看看有没有夹带私货（病毒、攻击）。</li>
                    <li><strong>状态检测：</strong>不只是看包，还看这个包属于哪个会话，是不是不请自来。</li>
                    <li><strong>必要的恶：</strong>虽然有时会挡住好东西，但没有它，网络就是裸奔。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——Safety First。</p>
            </div>
        )
    },
    {
        id: 'icq',
        title: 'ICQ',
        rarity: '拉完了',
        year: '1996',
        icon: <MessageCircle className="w-12 h-12 text-green-500" />,
        color: 'from-green-500/20 to-lime-600/20 border-green-500/50',
        accent: 'text-green-500',
        description: 'I seek you.',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-green-300 italic mb-4">
                    "欧－欧！(Uh-oh!)"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-green-500">
                    <li><strong>即时通讯：</strong>在它之前，网上聊天主要靠BBS和IRC。它让私聊变得简单。</li>
                    <li><strong>QQ的祖先：</strong>马化腾创业之初就是模仿ICQ做了OICQ，后来改名QQ。</li>
                    <li><strong>存在感：</strong>那个小花图标，是一代网民的青春回忆。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——你有新的消息。</p>
            </div>
        )
    },
    {
        id: 'iot',
        title: '物联网',
        rarity: '人上人',
        year: '1999',
        icon: <Wifi className="w-12 h-12 text-cyan-400" />,
        color: 'from-cyan-500/20 to-blue-600/20 border-cyan-500/50',
        accent: 'text-cyan-400',
        description: '万物皆有灵（灵是IP）。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-cyan-300 italic mb-4">
                    "当你的冰箱知道牛奶喝完了，并自动下单买新的。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-cyan-500">
                    <li><strong>连接：</strong>不只是人连人，现在是灯泡连接手机，汽车连接红绿灯。</li>
                    <li><strong>IPv6：</strong>地址不够用了？IPv6能让地球上的每一粒沙子都拥有一个IP。</li>
                    <li><strong>隐患：</strong>你的摄像头可能正在直播你的生活，你的烤箱可能被黑客控制。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——网络泛在。</p>
            </div>
        )
    },
    {
        id: 'blog',
        title: '博客',
        rarity: '拉完了',
        year: '1994',
        icon: <Rss className="w-12 h-12 text-orange-400" />,
        color: 'from-orange-500/20 to-amber-600/20 border-orange-500/50',
        accent: 'text-orange-400',
        description: 'Web 2.0 的号角。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-orange-300 italic mb-4">
                    "Weblog → Blog"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-orange-400">
                    <li><strong>去中心化出版：</strong>不需要编辑审核，不需要印刷厂，只要有网，人人都是作家。</li>
                    <li><strong>RSS：</strong>信息聚合，让你不去网站也能订阅更新（虽然现在快死绝了）。</li>
                    <li><strong>演变：</strong>从长篇大论的博客，到140字的微博/推特，再到现在的短视频。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——表达渴望。</p>
            </div>
        )
    },
    {
        id: 'tor',
        title: 'Tor',
        rarity: '顶级',
        year: '2002',
        icon: <Globe className="w-12 h-12 text-violet-500" />,
        color: 'from-violet-500/20 to-purple-600/20 border-violet-500/50',
        accent: 'text-violet-500',
        description: '洋葱路由与暗网。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-violet-300 italic mb-4">
                    "互联网的地下室。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-violet-500">
                    <li><strong>原理：</strong>像洋葱一样层层加密，经过全球无数个中继节点跳转，没人知道你是谁。</li>
                    <li><strong>用途：</strong>它是追求极致隐私者的工具，也是罪犯的温床。</li>
                    <li><strong>警示：</strong>自由是把双刃剑。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——黑暗森林。</p>
            </div>
        )
    },
    {
        id: 'modem',
        title: 'Modem',
        rarity: '拉完了',
        year: '1958',
        icon: <RefreshCw className="w-12 h-12 text-slate-400" />,
        color: 'from-slate-500/20 to-gray-600/20 border-slate-500/50',
        accent: 'text-slate-400',
        description: '互联网的心跳声。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-slate-300 italic mb-4">
                    "滋滋——滋滋——滴滴滴——"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-slate-500">
                    <li><strong>调制解调：</strong>把数字信号（01）变成电话线能传的模拟信号（声音），反之亦然。</li>
                    <li><strong>拨号上网：</strong>那个年代，上网就不能打电话。</li>
                    <li><strong>56k：</strong>下载一张图要几分钟，但那种期待感是现在的千兆光纤给不了的。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——听得见的连接。</p>
            </div>
        )
    },
    {
        id: 'napster',
        title: 'Napster',
        rarity: '人上人',
        year: '1999',
        icon: <Share2 className="w-12 h-12 text-blue-400" />,
        color: 'from-blue-500/20 to-indigo-600/20 border-blue-500/50',
        accent: 'text-blue-400',
        description: 'P2P原本的模样。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-blue-300 italic mb-4">
                    "我为人人，人人为我。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-blue-500">
                    <li><strong>P2P：</strong>点对点传输，不经过中心服务器。不仅没被封杀，反而越传越快。</li>
                    <li><strong>版权战争：</strong>被唱片公司告到破产，但它打开了潘多拉魔盒。</li>
                    <li><strong>继承者：</strong>BitTorrent、eMule，以及现在的区块链技术。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——去中心化。</p>
            </div>
        )
    },
    {
        id: 'flash',
        title: 'Adobe Flash',
        rarity: '夯',
        year: '1996',
        icon: <Zap className="w-12 h-12 text-red-500" />,
        color: 'from-red-500/20 to-orange-600/20 border-red-500/50',
        accent: 'text-red-500',
        description: '网页游戏的黄金时代。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-red-300 italic mb-4">
                    "4399，多少人的童年？"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-red-500">
                    <li><strong>交互：</strong>在HTML还很弱智的时候，是Flash让网页动了起来，能看视频，能玩游戏。</li>
                    <li><strong>乔布斯的死刑判决：</strong>因为耗电、不安全、闭源，被iPhone拒之门外，最终走向消亡。</li>
                    <li><strong>落幕：</strong>2020年12月31日，Flash正式停止支持。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——再见，闪客。</p>
            </div>
        )
    },
    {
        id: 'android',
        title: 'Android',
        rarity: '拉完了',
        year: '2008',
        icon: <Smartphone className="w-12 h-12 text-lime-500" />,
        color: 'from-lime-500/20 to-green-600/20 border-lime-500/50',
        accent: 'text-lime-500',
        description: '那个绿色小机器人。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-lime-300 italic mb-4">
                    "Be together. Not the same."
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-lime-500">
                    <li><strong>开源：</strong>基于Linux，谷歌把它免费送给了所有手机厂商，用来对抗iPhone。</li>
                    <li><strong>碎片化：</strong>它占领了全球80%的手机市场，但每个品牌的体验都不太一样。</li>
                    <li><strong>功臣：</strong>是它让智能手机变成了白菜价，让每个人都上得起网。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——平民英雄。</p>
            </div>
        )
    },
    {
        id: 'vr',
        title: '虚拟现实',
        rarity: '人上人',
        year: '2016',
        icon: <Glasses className="w-12 h-12 text-teal-400" />,
        color: 'from-teal-500/20 to-emerald-600/20 border-teal-500/50',
        accent: 'text-teal-400',
        description: '号手就位。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-teal-300 italic mb-4">
                    "在这里，你可以是任何人，去任何地方。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-teal-500">
                    <li><strong>沉浸感：</strong>欺骗你的大脑，让你以为自己真的在悬崖边，或者太空中。</li>
                    <li><strong>Oculus：</strong>帕尔默·拉奇用胶带把手机屏幕粘在滑雪镜上，重启了VR革命。</li>
                    <li><strong>元宇宙入口：</strong>虽然现在还有点晕，但它是通往《头号玩家》世界的门票。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——庄周梦蝶。</p>
            </div>
        )
    },
    {
        id: 'nft',
        title: 'NFT',
        rarity: '人上人',
        year: '2014',
        icon: <Gem className="w-12 h-12 text-pink-500" />,
        color: 'from-pink-500/20 to-fuchsia-600/20 border-pink-500/50',
        accent: 'text-pink-500',
        description: '这只猴子为什么这么贵？',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-pink-300 italic mb-4">
                    "这是你的JPG，因为我在区块链上写了你的名字。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-pink-500">
                    <li><strong>所有权：</strong>让数字资产像实物一样拥有唯一的"原件"。</li>
                    <li><strong>泡沫与艺术：</strong>有人为了洗钱，有人为了信仰，有人为了那张只有像素的头像。</li>
                    <li><strong>Web3：</strong>试图把互联网的所有权还给用户（至少宣传是这么说的）。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——万物皆可Token。</p>
            </div>
        )
    },
    {
        id: 'quantum',
        title: '量子计算',
        rarity: '夯',
        year: '2019',
        icon: <Box className="w-12 h-12 text-violet-400" />,
        color: 'from-violet-500/20 to-purple-600/20 border-violet-500/50',
        accent: 'text-violet-400',
        description: '上帝的骰子。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-violet-300 italic mb-4">
                    "遇事不决，量子力学。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-violet-500">
                    <li><strong>叠加态：</strong>经典比特是0或1，量子比特（Qubit）可以是0和1的叠加。</li>
                    <li><strong>量子霸权：</strong>谷歌的"悬铃木"只用200秒就完成了超算需要一万年才能算完的任务。</li>
                    <li><strong>毁灭者：</strong>当它真正成熟时，所有的传统加密（RSA）都将像纸一样脆弱。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——降维打击。</p>
            </div>
        )
    },
    {
        id: 'starlink',
        title: '星链',
        rarity: '人上人',
        year: '2019',
        icon: <Satellite className="w-12 h-12 text-slate-400" />,
        color: 'from-slate-500/20 to-gray-600/20 border-slate-500/50',
        accent: 'text-slate-400',
        description: '用WiFi包裹地球。',
        details: (
            <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl text-center text-slate-300 italic mb-4">
                    "看那天上的星星，都是路由器。"
                </div>
                <ul className="list-disc pl-5 space-y-2 marker:text-slate-500">
                    <li><strong>42000颗：</strong>马斯克的疯狂计划，发射比人类历史上总和还多的卫星。</li>
                    <li><strong>无死角：</strong>让沙漠、海洋、高山...地球上任何角落都能上网。</li>
                    <li><strong>光污染：</strong>天文学家在哭泣，但偏远山区的孩子笑了。</li>
                </ul>
                <p className="text-right font-bold text-white mt-4">——天地连线。</p>
            </div>
        )
    },
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

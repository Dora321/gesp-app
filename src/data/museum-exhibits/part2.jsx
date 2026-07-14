import { AppWindow, Box, Braces, Camera, Code2, Cpu, Gamepad2, GitBranch, Globe, Layout, Lock, Monitor, Play, Search, Smartphone, Sparkles, Swords, Terminal, Usb } from 'lucide-react';

export const museumExhibitsPart2 = [
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
    }
];

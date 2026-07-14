import { Box, Cloud, Gem, Glasses, Globe, Globe2, Layout, Link, LockKeyhole, MessageCircle, Network, Radio, RefreshCw, Rss, Satellite, Search, Share2, Shield, ShoppingCart, Smartphone, Video, Wifi, Zap } from 'lucide-react';

export const museumExhibitsPart3 = [
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
    }
];

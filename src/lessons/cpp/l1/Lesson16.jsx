import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  CheckCircle2,
  HelpCircle,
  Layers,
  ListOrdered,
  Replace,
  Table,
  Timer,
  Users,
  AlertTriangle,
  Terminal,
  XCircle
} from 'lucide-react';
import CppL1LessonSupport from '../../../components/CppL1LessonSupport';
import LegacyCppLessonShell from '../LegacyCppLessonShell';
import { MasteryCheck, PredictCheck, TransferCheck } from '../CppLessonShell';
import { ReviewMapTable, ReviewRouter } from './Lesson16Activities';

// --- 图标组件 ---
const Icon = ({ name, size = 24, className = "" }) => {
  const icons = {
    "help": <HelpCircle size={size} className={className} />,
    "list": <ListOrdered size={size} className={className} />,
    "alert": <AlertTriangle size={size} className={className} />,
    "layers": <Layers size={size} className={className} />,
    "timer": <Timer size={size} className={className} />,
    "table": <Table size={size} className={className} />,
    "users": <Users size={size} className={className} />,
    "replace": <Replace size={size} className={className} />,
    "check": <CheckCircle2 size={size} className={className} />,
    "terminal": <Terminal size={size} className={className} />,
    "book": <BookOpen size={size} className={className} />
  };
  return icons[name] || null;
};

const lesson16MasteryItems = [
  {
    label: '能按读题—手算—编码—测试完成一级编程题。',
    evidence: '先划出输入格式、数据范围、输出格式，手算样例，再编码，最后用正常、边界、特殊三组数据测试：《图书馆里的老鼠》样例 10 2 3 输出 8，补测 3 2 100 输出 0。',
    retryHint: '回到“编程四步”，对着《图书馆里的老鼠》把四步各写一句话。',
  },
  {
    label: '能把错题归入读题、算法、边界、格式四类。',
    evidence: '能说出每类的一个例子：看错输出要求是读题，最值初值写 0 是算法，P <= 10 写成 P < 10 是边界，多输出提示语是格式。',
    retryHint: '回到“错因四类”，把整卷里每道错题标上一类。',
  },
  {
    label: '能按回学表回到对应的课复习。',
    evidence: '做完 2026 年 3 月整卷后，在错题回流表里勾选错题，按汇总回到对应课的那一节，重做一道同类题。',
    retryHint: '回到“回学表”，至少为一道错题完成“回课—重做—写错因”。',
  },
  {
    label: '能独立完成两种编程主型。',
    evidence: '“读 n 个数统计”（第 14 课）和“按定义检验”（第 15 课）各能独立写出一题，并说清循环变量、计数器和边界；停车收费输入 31 输出 5，125 输出 15。',
    retryHint: '回到“上机：幸运号码求和 / 停车收费”，两题都不看参考程序写一遍。',
  },
];

// --- 章节数据 ---
const sections = [
  { id: 1, title: "问题导入：一级考什么", icon: "help", category: "复盘方法" },
  { id: 2, title: "编程四步：读题—手算—编码—测试", icon: "list", category: "复盘方法" },
  { id: 3, title: "错因四类", icon: "alert", category: "复盘方法" },
  { id: 4, title: "选择题三类速查", icon: "layers", category: "复盘方法" },
  { id: 5, title: "整卷测评：2026 年 3 月", icon: "timer", category: "整卷测评" },
  { id: 6, title: "回学表", icon: "table", category: "整卷测评" },
  { id: 7, title: "讲评：编程 1《交朋友》", icon: "users", category: "整卷测评" },
  { id: 8, title: "讲评：编程 2《数字替换》", icon: "replace", category: "整卷测评" },
  { id: 9, title: "上机：幸运号码求和 / 停车收费", icon: "terminal", category: "整卷测评" },
  { id: 10, title: "小结与二级入口", icon: "book", category: "小结与检查" },
  { id: 11, title: "离开前检查", icon: "check", category: "小结与检查" }
];

// --- 通用小组件（沿用第 1、2 课样板） ---
const Button = ({ onClick, children, variant = 'primary', disabled = false, className = '' }) => {
  const baseStyle = "px-6 py-2 rounded-lg font-bold transition-all duration-200 transform active:scale-95 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200",
    secondary: "bg-green-500 text-white hover:bg-green-600 shadow-green-200",
    outline: "border-2 border-gray-300 text-gray-600 hover:border-blue-400 hover:text-blue-500"
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-1 shadow-md'} ${className}`}
    >
      {children}
    </button>
  );
};

const CodePanel = ({ children }) => (
  <pre className="overflow-x-auto rounded-xl bg-gray-800 p-5 font-mono text-sm leading-relaxed text-gray-100"><code>{children}</code></pre>
);

const OutputPanel = ({ children }) => (
  <pre className="overflow-x-auto rounded-xl bg-slate-900 p-5 font-mono text-sm leading-relaxed text-green-400 shadow-inner"><code>{children}</code></pre>
);

// 编程题卡片：题面 + 样例 + 写完后才显示参考程序。
const PracticeProblem = ({ problem }) => {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="grid w-full gap-6 md:grid-cols-2">
      <div className="min-w-0 rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
        <span className="mb-3 inline-block rounded bg-blue-100 px-2 py-1 text-xs font-bold text-blue-800">{problem.tag}</span>
        <h2 className="mb-3 text-2xl font-bold text-gray-800">{problem.title}</h2>
        <p className="text-sm leading-relaxed text-gray-700">{problem.statement}</p>
        <div className="mt-4 grid grid-cols-2 gap-2 font-mono text-sm">
          {problem.samples.map(([input, output]) => (
            <React.Fragment key={input}>
              <div className="whitespace-pre-line rounded-lg border border-gray-200 bg-gray-50 p-2">输入：{'\n'}{input}</div>
              <div className="whitespace-pre-line rounded-lg border border-green-200 bg-green-50 p-2 font-bold text-green-800">输出：{'\n'}{output}</div>
            </React.Fragment>
          ))}
        </div>
        <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm leading-relaxed text-amber-950">提示：{problem.hint}</p>
      </div>
      <div className="flex min-w-0 flex-col gap-4 rounded-2xl border border-green-200 bg-green-50 p-6 shadow-sm">
        <h3 className="flex items-center gap-2 font-bold text-green-800"><Terminal size={18} /> 参考程序</h3>
        <p className="text-sm text-green-900">先在本机写出程序，用样例和补测数据核对输出，再打开参考程序对照。</p>
        <Button onClick={() => setShowCode(!showCode)} variant={showCode ? 'outline' : 'secondary'}>
          {showCode ? '收起参考程序' : '我写完了，显示参考程序'}
        </Button>
        {showCode && <CodePanel>{problem.code}</CodePanel>}
      </div>
    </div>
  );
};

// --- 1. 问题导入 ---
const IntroSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="text-center space-y-4">
      <h2 className="text-3xl font-bold text-gray-800">一级考什么</h2>
      <p className="text-lg text-gray-600">一级 16 课学完了。本课不再讲新语法，而是做三件事：学会一道编程题的完整做法，用一整套真题测出自己的薄弱点，再按错因回到对应的课复习。</p>
    </div>

    <div className="grid w-full gap-4 md:grid-cols-3">
      {[
        ['单选题', '15 题 × 2 分', '计算机基础、表达式求值、程序追踪'],
        ['判断题', '10 题 × 2 分', '和单选同范围，常考“改一处结果是否相同”'],
        ['编程题', '2 题 × 25 分', '“读 n 个数统计”与“按定义检验”两种主型最常见'],
      ].map(([title, score, detail]) => (
        <div key={title} className="min-w-0 rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
          <h3 className="mb-1 text-lg font-bold text-gray-800">{title}</h3>
          <p className="mb-3 font-mono text-sm font-bold text-blue-700">{score}</p>
          <p className="text-sm text-slate-700">{detail}</p>
        </div>
      ))}
    </div>
    <p className="w-full text-center text-xs text-slate-500">题量、分值和 90 分钟时长取自站内题库数据，官方说明待核实。</p>

    <div className="w-full rounded-2xl border border-slate-100 bg-white p-8 shadow-lg">
      <h3 className="mb-4 text-center text-xl font-bold text-slate-800">一级四段主线</h3>
      <div className="grid gap-3 md:grid-cols-2">
        {[
          ['第 1～6 课：顺序程序', '输入—计算—输出；/ 与 %、类型、自增、printf 要逐字正确。'],
          ['第 7～9 课：分支', '条件表达式、if-else、else if 与 switch。'],
          ['第 10～13 课：循环', 'for、while、break / continue 的次数与终点，以及数位分离。'],
          ['第 14～16 课：综合', '读 n 个数统计、按定义检验，最后整卷测评。'],
        ].map(([title, detail]) => (
          <div key={title} className="rounded-xl border border-blue-100 bg-blue-50 p-4">
            <p className="mb-1 font-bold text-blue-900">{title}</p>
            <p className="text-sm text-blue-950">{detail}</p>
          </div>
        ))}
      </div>
    </div>

    <PredictCheck
      className="w-full"
      prompt="按站内数据，一级卷满分 100 分，两道编程题一共占多少分？"
      options={['30 分', '40 分', '50 分']}
      correctIndex={2}
      explanation="每道编程题 25 分，两道共 50 分；单选 30 分、判断 20 分。编程题占一半，所以“编程四步”是本课的第一件事。"
      misconception="只练选择题。编程题能拿部分分，但输入输出格式错了往往整题不得分。"
    />

    <div className="w-full rounded-2xl border border-blue-200 bg-blue-50 p-6 text-sm leading-relaxed text-blue-950 shadow-sm">
      <strong className="mb-2 block text-base text-blue-900">本课主线</strong>
      <strong>编程四步 → 错因四类 → 选择题三类速查 → 2026 年 3 月整卷测评 → 回学表 → 两道编程题讲评</strong>，最后完成“幸运号码求和”和“停车收费”两道上机题。
    </div>
  </div>
);

// --- 2. 编程四步 ---
const FourStepsSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-8 shadow-lg">
      <h3 className="mb-6 text-center text-xl font-bold text-slate-800">一道编程题的四步</h3>
      <ol className="list-none space-y-3 text-sm text-slate-700">
        {[
          '读题：划出输入格式（几行、几个数）、数据范围（会不会是 0、会不会很大）、输出格式（几行、空格还是换行）。',
          '手算：用样例走一遍，确认自己理解的规则能算出样例输出；算不出来先别写代码。',
          '编码：选结构——顺序、分支，还是“读 n 个数”“按定义枚举”的循环；变量先写好初值。',
          '测试：正常数据（样例）、边界数据（最小值、恰好相等、整除）、特殊数据（结果为 0、条件全不满足）三组都跑一遍。',
        ].map((rule, index) => (
          <li key={rule} className="flex flex-wrap items-center gap-3 rounded-lg border border-blue-100 bg-white p-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">{index + 1}</span>
            <span>{rule}</span>
          </li>
        ))}
      </ol>
    </div>

    <div className="grid w-full gap-6 md:grid-cols-2">
      <div className="min-w-0 rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
        <span className="mb-3 inline-block rounded bg-slate-100 px-2 py-1 text-xs font-bold text-slate-700">站内题库 2025 年 3 月一级编程题第 1 题 · 来源待核</span>
        <h3 className="mb-3 text-xl font-bold text-gray-800">例题：《图书馆里的老鼠》</h3>
        <p className="text-sm leading-relaxed text-gray-700">图书馆有 n 本书，老鼠每 x 小时啃光一本，啃光一本之前不会啃另一本。问 y 小时后还剩多少本完整的书。输入三行：n、x、y（站内题面：n ≤ 10⁵，x ≤ 100，y ≤ 10⁷）。</p>
        <OutputPanel>{`手算 10 2 3：
2 小时啃光第 1 本，第 3 小时第 2 本被啃了一半
不完整的书 2 本，剩 10 − 2 = 8
样例：10 2 3 → 8；5 2 4 → 3`}</OutputPanel>
      </div>
      <div className="min-w-0 rounded-2xl border border-green-200 bg-green-50 p-6 shadow-sm">
        <p className="mb-2 text-sm font-bold text-green-800">编码</p>
        <CodePanel>{`int n, x, y;
cin >> n >> x >> y;
int eaten = y / x;
if (y % x != 0) eaten++;   // 正在啃的那本也不完整
if (eaten > n) eaten = n;  // 边界保护：书不会被吃成负数
cout << n - eaten << endl;`}</CodePanel>
        <p className="mt-3 text-sm text-green-900">测试三组：10 2 3 → 8（正常），5 2 4 → 3（恰好整除），3 2 100 → 0（时间远多于书）。站内题面没有写“至少剩一本”（与官方卷是否一致待核），所以加了最后一行保护。</p>
      </div>
    </div>

    <PredictCheck
      className="w-full"
      prompt="去掉 if (y % x != 0) eaten++; 这一行，输入 10 2 3 输出几？"
      options={['8', '9', '7']}
      correctIndex={1}
      explanation="3 / 2 = 1，只算了啃光的 1 本，漏掉了被啃了一半的那本，输出 9。这一步是“手算”时就该发现的：样例输出是 8，算法不对。"
      misconception="只用整数除法算“啃了几本”，忘了余数代表一本正在被啃、已经不完整。"
    />
  </div>
);

// --- 3. 错因四类 ---
const errorTypes = [
  { title: '读题', example: '题目要求两行输出写成一行；没注意 n 可能是 0；把“不超过”看成“小于”。', back: '回原题重读输入输出格式和数据范围。' },
  { title: '算法', example: '思路本身不对：最值初值写 0；找“第一个”却没有 break；按位重建时把 0 位丢了。', back: '回到对应的课（第 13～15 课最多）重学写法。' },
  { title: '边界', example: '恰好相等、恰好整除、只有 1 个数时出错：P <= 10 写成 P < 10；n = 0 的位数。', back: '补测最小值和分界线两侧的值。' },
  { title: '格式', example: '多输出了“请输入”提示语；空格和换行不符；大小写写错（Yes 写成 YES）。', back: '对照样例逐字比较输出。' },
];

const ErrorTypesSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
      <h3 className="mb-6 flex items-center justify-center gap-2 text-2xl font-bold text-slate-800">
        <AlertTriangle className="text-orange-500" /> 每道错题都归入一类
      </h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {errorTypes.map((item) => (
          <div key={item.title} className="rounded-xl border border-red-100 bg-red-50 p-5">
            <div className="mb-2 flex items-center gap-2 font-bold text-red-700"><XCircle size={16} /> {item.title}</div>
            <p className="mb-2 text-sm text-red-900">{item.example}</p>
            <p className="text-xs font-bold text-red-700">怎么补：{item.back}</p>
          </div>
        ))}
      </div>
    </div>

    <PredictCheck
      className="w-full"
      prompt="《手机电量显示》把 P <= 10 写成 P < 10，输入 10 时输出 L 而不是 R。这属于哪类错因？"
      options={['读题', '边界', '格式']}
      correctIndex={1}
      explanation="规则理解对了，只是分界线上的 10 落错了档，属于边界错误。补救办法是每个分界点都补测一次：10、11、20、21。"
      misconception="把所有“输出不对”都归为格式错误。格式错误是指数值对、但空格换行或文字不符。"
    />

    <div className="w-full rounded-2xl border border-blue-200 bg-blue-50 p-6 text-sm leading-relaxed text-blue-950 shadow-sm">
      <strong className="mb-2 block text-base text-blue-900">错题本的一行怎么写</strong>
      题号 → 错因类别 → 一句话说明错在哪 → 回到第几课哪一节 → 重做的同类题结果。只写“粗心”不算复盘。
    </div>
  </div>
);

// --- 4. 选择题三类速查 ---
const quickGroups = [
  { title: '计算机基础', lessons: '第 1 课', points: ['输入、输出、存储、处理设备的区分', '操作系统与应用软件', '源程序要经过编译才能运行'] },
  { title: '表达式求值', lessons: '第 3～7 课', points: ['/ 与 % 和优先级，同级从左到右', 'int 与 double，小数存入 int 向 0 截断', 'x++ 与 ++x、逗号表达式、printf 的 %d %2d %%'] },
  { title: '程序追踪', lessons: '第 8～13 课', points: ['走哪个分支、else if 只命中第一支', '循环执行次数与结束值、空循环体分号', 'break / continue 后去哪，数位分离每轮的 n'] },
];

const QuickReviewSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="grid w-full gap-4 md:grid-cols-3">
      {quickGroups.map((group) => (
        <div key={group.title} className="min-w-0 rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
          <h3 className="mb-1 text-lg font-bold text-gray-800">{group.title}</h3>
          <p className="mb-3 text-xs font-bold text-blue-700">{group.lessons}</p>
          <ul className="space-y-2 text-sm text-slate-700">
            {group.points.map((point) => (
              <li key={point} className="rounded-lg border border-slate-100 bg-slate-50 p-2">{point}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <PredictCheck
      className="w-full"
      title="速查 1：计算机基础"
      prompt="把 C++ 源程序变成计算机能执行的程序，这一步叫什么？"
      options={['编译', '调试', '输入']}
      correctIndex={0}
      explanation="编译器把源程序翻译成可执行程序。调试是找错和改错，输入是程序运行时读数据。"
      misconception="把“运行”和“编译”混为一谈。保存—编译—运行是三步（第 1 课）。"
    />
    <PredictCheck
      className="w-full"
      title="速查 2：表达式求值"
      prompt="int a = 7; cout << a / 2 * 2 + a % 2; 输出几？"
      options={['7', '7.0', '6']}
      correctIndex={0}
      explanation="/ 和 * 同级，从左到右：7 / 2 = 3，3 * 2 = 6；7 % 2 = 1；6 + 1 = 7。两个 int 运算结果还是 int，不会出现 7.0。这正是“被除数 = 除数 × 商 + 余数”。"
      misconception="把 7 / 2 算成 3.5。int 除以 int 是整数除法。"
    />
    <PredictCheck
      className="w-full"
      title="速查 3：程序追踪"
      prompt="int i; for (i = 0; i < 10; i += 3); cout << i; 输出几？"
      options={['9', '12', '10']}
      correctIndex={1}
      explanation="for 后面的分号是空循环体。i 取 0、3、6、9 时条件为真，9 + 3 = 12 时 12 < 10 为假，循环结束，输出 12。"
      misconception="以为结束值是最后一次进入时的 9，或以为结束值一定等于条件里的 10。"
    />
  </div>
);

// --- 5. 整卷测评 ---
const ExamSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-8 shadow-lg">
      <h3 className="mb-4 text-center text-2xl font-bold text-slate-800">2026 年 3 月 GESP C++ 一级整卷</h3>
      <p className="mb-6 text-center text-slate-600">第 1～15 课没有引用这套卷的任何一道题，就是为了留到这里做测评。</p>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          ['限时', '90 分钟，一次做完，中途不查课件。'],
          ['顺序', '单选 → 判断 → 编程；编程题先手算样例再写。'],
          ['记录', '每道拿不准的题做个记号，交卷后和错题一起复盘。'],
        ].map(([title, detail]) => (
          <div key={title} className="rounded-xl border border-blue-100 bg-blue-50 p-4">
            <p className="mb-2 font-bold text-blue-900">{title}</p>
            <p className="text-sm text-blue-950">{detail}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <Link
          to="/question-bank/1/2026-03-l1"
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-bold text-white shadow-md transition-all hover:-translate-y-1 hover:bg-blue-700"
        >
          <Timer size={18} /> 进入整卷测评
        </Link>
      </div>
    </div>

    <div className="w-full rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm leading-relaxed text-amber-950 shadow-sm">
      <strong className="mb-2 block text-base text-amber-900">本卷的站内核验状态</strong>
      这套卷依据官方 PDF 录入，其中单选第 1～15 题的答案已对照官方卷核对；判断题和编程题的站内核验尚未全部完成。判卷时如果对某道判断题的站内答案有疑问，先用 g++ 运行题中代码自查，以官方卷为准。
    </div>

    <div className="w-full rounded-2xl border border-blue-200 bg-blue-50 p-6 text-sm leading-relaxed text-blue-950 shadow-sm">
      <strong className="mb-2 block text-base text-blue-900">做完之后</strong>
      回到本课下一节“回学表”，勾选做错的题，按汇总回到对应的课。两道编程题的讲评在第 7、8 节，做完整卷之前不要先看。
    </div>
  </div>
);

// --- 6. 回学表 ---
const ReviewSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="text-center">
      <h3 className="text-2xl font-bold text-slate-800">回学表：每道题错了回到哪里</h3>
      <p className="mt-1 text-slate-500">只列考点和课节，不列答案。答案与解析在整卷页作答后查看。</p>
    </div>
    <ReviewRouter />
    <ReviewMapTable />
  </div>
);

// --- 7. 讲评：交朋友 ---
const FriendSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="grid w-full gap-6 md:grid-cols-2">
      <div className="min-w-0 rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
        <span className="mb-3 inline-block rounded bg-blue-100 px-2 py-1 text-xs font-bold text-blue-800">2026 年 3 月 GESP C++ 一级编程题第 1 题</span>
        <h3 className="mb-3 text-xl font-bold text-gray-800">《交朋友》</h3>
        <p className="text-sm leading-relaxed text-gray-700">4 个人的身高 H1～H4（每行一个，100～199，互不相同），H1 是 Alice。输出和 Alice 身高最接近的人的身高；距离相同时取较矮的那一个。</p>
        <OutputPanel>{`样例：150 165 135 133 → 135
（165、135 与 150 都相差 15，取较矮的 135）
补测：150 140 160 120 → 140`}</OutputPanel>
        <p className="mt-3 text-sm text-slate-700">读题要点：“最接近”是差的绝对值最小；“相同时取较矮”是第二个条件。这就是第 8 课“较大值与差的绝对值”的组合。</p>
      </div>
      <div className="min-w-0 rounded-2xl border border-green-200 bg-green-50 p-6 shadow-sm">
        <p className="mb-2 text-sm font-bold text-green-800">先假设第 2 人最好，再逐个比较</p>
        <CodePanel>{`int h1, h2, h3, h4;
cin >> h1 >> h2 >> h3 >> h4;
int best = h2, bd = h2 - h1;
if (bd < 0) bd = -bd;
int d = h3 - h1;
if (d < 0) d = -d;
if (d < bd || (d == bd && h3 < best)) { best = h3; bd = d; }
d = h4 - h1;
if (d < 0) d = -d;
if (d < bd || (d == bd && h4 < best)) { best = h4; bd = d; }
cout << best << endl;`}</CodePanel>
        <p className="mt-3 text-sm text-green-900">best 记身高，bd 记距离。换人的条件是“更近”，或者“一样近但更矮”。没有用 ?: 和数组，只用第 7、8 课的写法。</p>
      </div>
    </div>

    <PredictCheck
      className="w-full"
      prompt="如果两处都去掉 (d == bd && … < best) 这一部分，只写 if (d < bd)，样例 150 165 135 133 输出几？"
      options={['135', '165', '133']}
      correctIndex={1}
      explanation="165 先成为 best，距离 15；135 的距离也是 15，15 < 15 为假，不换；133 距离 17，不换。输出 165，违反了“相同时取较矮”。样例正好考这一点。"
      misconception="以为“相等时保持原样”就对了。谁先比较谁就留下，结果取决于输入顺序，不一定是较矮的。"
    />
  </div>
);

// --- 8. 讲评：数字替换 ---
const ReplaceSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="grid w-full gap-6 md:grid-cols-2">
      <div className="min-w-0 rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
        <span className="mb-3 inline-block rounded bg-blue-100 px-2 py-1 text-xs font-bold text-blue-800">2026 年 3 月 GESP C++ 一级编程题第 2 题</span>
        <h3 className="mb-3 text-xl font-bold text-gray-800">《数字替换》</h3>
        <p className="text-sm leading-relaxed text-gray-700">把整数 A 中的全部数字 4 都替换成 8，输出替换后的数 B（0 ≤ A ≤ 10⁸）。</p>
        <OutputPanel>{`样例：8459045 → 8859085
样例：123 → 123
补测：0 → 0；404 → 808`}</OutputPanel>
        <p className="mt-3 text-sm text-slate-700">这是第 13 课例 3（把 3 换成 7）的同型题：取个位、替换、乘上这一位的权放回去。A = 0 时循环不执行，输出 0，正好正确（0 里没有 4）。10⁸ 也在 int 范围内。</p>
      </div>
      <div className="min-w-0 rounded-2xl border border-green-200 bg-green-50 p-6 shadow-sm">
        <p className="mb-2 text-sm font-bold text-green-800">按位重建</p>
        <CodePanel>{`int a, b = 0, p = 1;
cin >> a;
while (a > 0) {
    int d = a % 10;
    if (d == 4) d = 8;
    b += d * p;
    p *= 10;
    a /= 10;
}
cout << b << endl;`}</CodePanel>
        <p className="mt-3 text-sm text-green-900">如果写成“反转”的 r = r * 10 + d，数字顺序会倒过来；按位重建才能让每一位回到原来的位置。</p>
      </div>
    </div>

    <PredictCheck
      className="w-full"
      prompt="用这段程序输入 404，输出几？"
      options={['808', '88', '408']}
      correctIndex={0}
      explanation="个位 4 → 8，b = 8；十位 0 → 0，b = 8 + 0 × 10 = 8；百位 4 → 8，b = 8 + 8 × 100 = 808。中间的 0 也乘了权，所以位置没有错开。"
      misconception="以为 0 位“什么也不做”就会丢掉。0 × 10 加进去确实不变，但 p 照样乘 10，下一位才能放到百位。"
    />
  </div>
);

// --- 9. 上机 ---
const practiceProblems = [
  {
    tag: '基础题 16-A',
    title: '幸运号码求和',
    statement: '在 [L, R] 中，个位为 k 或能被 k 整除的数称为幸运号码，求它们的和，每个数只加一次。输入一行三个整数 k、L、R（2 ≤ k ≤ 9，1 ≤ L ≤ R ≤ 1000）。',
    samples: [['3 1 15', '58'], ['7 7 7', '7']],
    hint: '按定义枚举 L～R（第 15 课），两个条件用 || 合成一个 if，同时满足两个条件的数（如 3：个位是 3，又是 3 的倍数）也只加一次。3 1 15：3 + 6 + 9 + 12 + 13 + 15 = 58。',
    code: `#include <iostream>
using namespace std;

int main() {
    int k, L, R, sum = 0;
    cin >> k >> L >> R;
    for (int i = L; i <= R; i++) {
        if (i % 10 == k || i % k == 0) sum += i;
    }
    cout << sum << endl;
    return 0;
}`,
  },
  {
    tag: '提高题 16-B',
    title: '停车收费',
    statement: '第一行组数 T（1 ≤ T ≤ 100），之后每行一个停车分钟数 m（0 ≤ m ≤ 1440）。不超过 30 分钟免费；超过 30 分钟时，按每 60 分钟 5 元收费，不足 60 分钟按 60 分钟算，从第 1 分钟开始计时。每组输出一行费用。',
    samples: [['3\n30\n31\n125', '0\n5\n15'], ['1\n60', '5']],
    hint: '多组数据（第 14 课）+ 分支（第 8 课）+ 向上取整：m 分钟按 60 分钟一段，段数是 (m + 59) / 60。补测 61（10）和 1440（120）。',
    code: `#include <iostream>
using namespace std;

int main() {
    int T;
    cin >> T;
    for (int t = 1; t <= T; t++) {
        int m;
        cin >> m;
        if (m <= 30) cout << 0 << endl;
        else cout << (m + 59) / 60 * 5 << endl;
    }
    return 0;
}`,
  },
];

const PracticeSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    {practiceProblems.map((problem) => (
      <PracticeProblem key={problem.title} problem={problem} />
    ))}
    <p className="w-full rounded-2xl border border-blue-200 bg-blue-50 p-6 text-sm leading-relaxed text-blue-950 shadow-sm">两道题分别是“按定义检验”和“多组数据读入”。写完后按编程四步自查：输入是一行还是多行？31、60、61 这些分界值都测了吗？输出有没有多余的提示语？</p>
  </div>
);

// --- 10. 小结与二级入口 ---
const homeworkTasks = [
  {
    title: '第二套整卷',
    source: '站内题库 · 2024 年 6 月 GESP C++ 一级',
    detail: '限时 90 分钟再做一套，用同样的方法给错题归类、回课。部分题在课上见过，重点看自己是否还会错。',
  },
  {
    title: '错题重做',
    source: '课堂练习',
    detail: '2026 年 3 月卷的每道错题，回到对应小节重做一道同类练习，并写一句错因：读题、算法、边界还是格式。',
  },
  {
    title: '个人易错清单',
    source: '课堂练习',
    detail: '整理 3 条自己最常犯的错误，每条写一个能暴露它的输入和正确输出，考前再测一遍。',
  },
];

const SummarySlide = () => (
  <div className="flex flex-col items-center justify-center h-full">
    <div className="w-full bg-yellow-50 border-2 border-yellow-200 rounded-3xl p-6 md:p-10 space-y-8">
      <div className="rounded-2xl border border-yellow-100 bg-white p-8 shadow-sm">
        <p className="mb-6 flex items-center gap-3 text-2xl font-bold text-slate-800">
          <span className="rounded-lg bg-yellow-400 p-2 text-white"><BookOpen size={24} /></span> 本课要点
        </p>
        <ol className="space-y-4 text-slate-700">
          {[
            '编程四步：读题（格式、范围）→ 手算样例 → 编码 → 用正常、边界、特殊三组数据测试。',
            '错因四类：读题、算法、边界、格式。每道错题写清类别、错在哪、回到哪一课。',
            '选择题三类：计算机基础（第 1 课）、表达式求值（第 3～7 课）、程序追踪（第 8～13 课）。',
            '编程两种主型：“读 n 个数统计”（第 14 课）和“按定义检验”（第 15 课），数位分离（第 13 课）常常和它们组合出现。',
            '整卷测评后用回学表回课，重做同类题，而不是只看答案。',
          ].map((point, index) => (
            <li key={point} className="flex items-start gap-4">
              <span className="mt-0.5 rounded bg-slate-100 px-2 py-0.5 text-sm font-bold text-slate-600">{index + 1}</span>
              <span className="leading-relaxed">{point}</span>
            </li>
          ))}
        </ol>
      </div>

      <div>
        <strong className="mb-6 flex items-center gap-2 text-xl text-yellow-900">
          <Terminal size={20} /> 课后任务
        </strong>
        <div className="grid gap-4 md:grid-cols-2">
          {homeworkTasks.map((task) => (
            <label key={task.title} className="flex cursor-pointer items-start gap-4 rounded-xl border border-yellow-100 bg-white/60 p-4 transition-colors hover:bg-white">
              <input type="checkbox" className="mt-1 h-6 w-6 shrink-0 accent-yellow-600" />
              <div>
                <strong className="mb-1 block text-yellow-900">{task.title}</strong>
                <p className="mb-1 text-xs text-yellow-800">{task.source}</p>
                <p className="text-sm text-yellow-900">{task.detail}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      <p className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm leading-relaxed text-blue-950">
        二级入口：L2-5 嵌套循环。一级的单层循环手推（第 10～12 课）和数位分离（第 13 课）是二级拆题的前提；二级还会在第 15 课的基础上学“试到 √n 就够”。
      </p>
    </div>
  </div>
);

// --- 主应用 ---
export default function App() {
  const [activeSection, setActiveSection] = useState(1);

  const renderContent = () => {
    switch (activeSection) {
      case 1: return <IntroSlide />;
      case 2: return <FourStepsSlide />;
      case 3: return <ErrorTypesSlide />;
      case 4: return <QuickReviewSlide />;
      case 5: return <ExamSlide />;
      case 6: return <ReviewSlide />;
      case 7: return <FriendSlide />;
      case 8: return <ReplaceSlide />;
      case 9: return <PracticeSlide />;
      case 10: return <SummarySlide />;
      case 11:
        return (
          <div className="slide-enter py-6">
            <TransferCheck
                prompt="换个例子：把《交朋友》改成“距离相同时取较高的那一个”，比较条件要怎么改？手推输入 150 140 160 120 的输出。"
                hint="只改“一样近时换不换”的那半个条件。"
                answer="两处都改成 if (d < bd || (d == bd && h > best))，其中 h 分别是 h3、h4。150 140 160 120：140 和 160 都相差 10，取较高的 160，输出 160。"
                steps={[
                    'best 先是 140，bd = 10。',
                    '160 的距离也是 10，d == bd 且 160 > 140，换成 160。',
                    '120 的距离是 30，不换。输出 160（原题规则下输出 140）。',
                ]}
            />
            <MasteryCheck
              title="C++ L1-16 一级综合复盘离开前检查"
              description="如果能按四步完成编程题、把错题归入四类错因、用回学表回课复习，并独立写出两种编程主型，一级就可以收尾了。接下来进入题库做更多整卷训练，或开始二级课程。"
              items={lesson16MasteryItems}
            />
          </div>
        );
      default: return <div>Content Not Found</div>;
    }
  };

  return (
    <LegacyCppLessonShell
        prerequisites={['完成第 1～15 课的离开前检查', '能写出“读 n 个数统计”的程序（第 14 课）', '能写出“按定义检验”的程序（第 15 课）']}
      lessonNumber={16}
      lessonTitle="一级综合复盘"
      sections={sections}
      activeSection={activeSection}
      setActiveSection={setActiveSection}
      nextLessonPath="/"
      renderIcon={(name, size) => <Icon name={name} size={size} />}
      topSupport={<CppL1LessonSupport lessonId={16} />}
      bottomSupport={<CppL1LessonSupport lessonId={16} placement="bottom" />}
    >
      {renderContent()}
    </LegacyCppLessonShell>
  );
}

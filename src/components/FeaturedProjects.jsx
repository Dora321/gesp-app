import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { getCppLevelCatalogItem } from '../data/cppLevelCatalog';
import { getPythonProjectSupport } from '../data/pythonProjectFlow';

const game = getPythonProjectSupport('a2');
const morse = getPythonProjectSupport('morse');
const cppLevel7 = getCppLevelCatalogItem(7);
const projectStart = getPythonProjectSupport('a1');

const projects = [
    {
        id: 'game',
        line: 'python',
        lineCode: 'Python',
        kind: '游戏项目',
        title: game.current.title,
        description: `${game.brief.outcome}，产出：${game.brief.artifact}。`,
        path: game.current.path,
        duration: game.brief.duration,
    },
    {
        id: 'morse',
        line: 'python',
        lineCode: 'Python',
        kind: '编码项目',
        title: morse.current.title,
        description: `${morse.brief.outcome}，产出：${morse.brief.artifact}。`,
        path: morse.current.path,
        duration: morse.brief.duration,
    },
    {
        id: 'maze',
        line: 'cpp',
        lineCode: 'C++',
        kind: '七级算法专题',
        title: '图搜索与迷宫寻路',
        description: `${cppLevel7.title}专题，用 BFS 理解无权最短路，观察迷宫里的层层探索，找到通向终点的路径。`,
        path: cppLevel7.path,
        duration: '4–5 课时',
    },
];

// ---- 插图：画的都是课里真正要讲的东西 ----

// 2048 的合并规则：一次左移里，同一个方块只合并一次。
function MergeArt() {
    const rows = [
        { label: '左移前', cells: [2, 2, 4, 0] },
        { label: '左移后', cells: [4, 4, 0, 0] },
    ];
    return (
        <div className="home-art-merge">
            {rows.map((row) => (
                <div key={row.label} className="home-art-merge-row">
                    <span>{row.label}</span>
                    <div>
                        {row.cells.map((value, index) => (
                            <i key={index} data-value={value || undefined}>{value || ''}</i>
                        ))}
                    </div>
                </div>
            ))}
            <p>刚合并出的 4 这一步不再合并，所以不是 8</p>
        </div>
    );
}

// 摩斯电码：点和划都用 SVG 画，不依赖字体。
function MorseArt() {
    const letters = [
        { char: 'S', marks: '...' },
        { char: 'O', marks: '---' },
        { char: 'S', marks: '...' },
    ];
    return (
        <div className="home-art-morse">
            {letters.map((letter, letterIndex) => (
                <div key={letterIndex}>
                    <svg viewBox="0 0 66 16" aria-hidden="true">
                        {[...letter.marks].map((mark, index) => (
                            mark === '.'
                                ? <circle key={index} cx={8 + index * 22} cy="8" r="5" />
                                : <rect key={index} x={index * 22} y="4" width="18" height="8" rx="4" />
                        ))}
                    </svg>
                    <span>{letter.char}</span>
                </div>
            ))}
        </div>
    );
}

// BFS 迷宫：格子里的数字是真的用 BFS 算出来的步数，高亮的是最短路。
const MAZE = [
    'S..#...',
    '##.#.#.',
    '.....#.',
    '.###.#.',
    '...#..E',
];

function solveMaze(rows) {
    const height = rows.length;
    const width = rows[0].length;
    const distance = rows.map((row) => [...row].map(() => null));
    const parent = new Map();
    const queue = [[0, 0]];
    distance[0][0] = 0;

    for (let head = 0; head < queue.length; head += 1) {
        const [r, c] = queue[head];
        for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
            const nr = r + dr;
            const nc = c + dc;
            if (nr < 0 || nc < 0 || nr >= height || nc >= width) continue;
            if (rows[nr][nc] === '#' || distance[nr][nc] !== null) continue;
            distance[nr][nc] = distance[r][c] + 1;
            parent.set(`${nr},${nc}`, `${r},${c}`);
            queue.push([nr, nc]);
        }
    }

    const path = new Set();
    for (let key = `${height - 1},${width - 1}`; key; key = parent.get(key)) path.add(key);
    return { distance, path };
}

const mazeSolution = solveMaze(MAZE);

function MazeArt() {
    return (
        <div className="home-art-maze" style={{ '--maze-cols': MAZE[0].length }}>
            {MAZE.flatMap((row, r) => [...row].map((cell, c) => {
                const key = `${r},${c}`;
                if (cell === '#') return <i key={key} data-kind="wall" />;
                const onPath = mazeSolution.path.has(key);
                const label = cell === 'S' ? '起' : cell === 'E' ? '终' : mazeSolution.distance[r][c];
                return <i key={key} data-kind={onPath ? 'path' : 'open'}>{label}</i>;
            }))}
        </div>
    );
}

const ART = { game: MergeArt, morse: MorseArt, maze: MazeArt };

export default function FeaturedProjects() {
    return (
        <section className="home-section home-projects" aria-labelledby="home-projects-title">
            <div className="home-container">
                <div className="home-section-head">
                    <div>
                        <p className="mw-kicker">项目课</p>
                        <h2 id="home-projects-title">学完语法，做点真东西</h2>
                        <p>每个项目都有明确的产出，做完能拿给别人看，也讲得清背后的算法。</p>
                    </div>
                    <Link
                        to={projectStart.current.path}
                        aria-label={`从${projectStart.current.title}进入 Python 项目线`}
                        className="mw-text-link mw-line-python"
                    >
                        进入 Python 项目线
                        <ArrowRight size={17} aria-hidden="true" />
                    </Link>
                </div>

                <div className="home-project-grid">
                    {projects.map((project) => {
                        const Art = ART[project.id];
                        return (
                            <article
                                key={project.id}
                                className={`home-project home-project--${project.id} mw-line-${project.line}`}
                            >
                                <div className="home-project-art" aria-hidden="true">
                                    <Art />
                                </div>
                                <div className="home-project-body">
                                    <p className="home-project-meta">
                                        <span className="mw-line-badge">{project.lineCode}</span>
                                        <span>{project.kind}</span>
                                        <span className="home-project-time">
                                            <Clock size={14} aria-hidden="true" />
                                            {project.duration}
                                        </span>
                                    </p>
                                    <h3>
                                        <Link to={project.path} className="home-project-link">{project.title}</Link>
                                    </h3>
                                    <p>{project.description}</p>
                                    <span className="home-project-cta" aria-hidden="true">
                                        看这个项目
                                        <ArrowRight size={15} />
                                    </span>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

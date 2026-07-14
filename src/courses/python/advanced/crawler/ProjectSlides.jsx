import { useState } from 'react';
import { Download, PlayCircle } from 'lucide-react';
import { CodeBlock } from './Shared';

export const BingWallpaperProjectSlide = () => {
    const [activeTab, setActiveTab] = useState('api'); // api, code

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
                        <Download size={20} /> 项目二：必应 (Bing) 壁纸下载器
                    </h3>
                    <div className="flex gap-1 bg-slate-900 p-1 rounded-lg border border-slate-700">
                        <button
                            onClick={() => setActiveTab('api')}
                            className={`px-3 py-1 rounded text-xs font-bold transition-all ${activeTab === 'api' ? 'bg-cyan-500 text-black' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            1. API 揭秘
                        </button>
                        <button
                            onClick={() => setActiveTab('code')}
                            className={`px-3 py-1 rounded text-xs font-bold transition-all ${activeTab === 'code' ? 'bg-cyan-500 text-black' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            2. 编写代码
                        </button>
                    </div>
                </div>

                {activeTab === 'api' && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                        <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-xl text-blue-200 text-sm">
                            <strong className="block mb-2 text-blue-400">🔍 必应隐藏 API</strong>
                            <p className="mb-2">必应搜索每天的背景图都非常精美。他们有一个公开的接口供我们获取：</p>
                            <code className="block bg-black/50 p-2 rounded text-cyan-300 font-mono text-xs break-all">
                                https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1
                            </code>
                            <ul className="mt-3 space-y-2 text-slate-400 list-disc list-inside">
                                <li><code className="text-orange-300">format=js</code>: 返回 JSON 格式数据</li>
                                <li><code className="text-orange-300">idx=0</code>: 0表示今天，1表示昨天，以此类推</li>
                                <li><code className="text-orange-300">n=1</code>: 返回图片的数量</li>
                            </ul>
                        </div>
                        <div className="bg-slate-900 p-4 rounded-xl border border-slate-700">
                            <div className="text-xs text-slate-500 mb-2 font-mono">API Response Preview (JSON)</div>
                            <pre className="text-xs font-mono text-green-400 overflow-x-auto">
                                {`{
  "images": [
    {
      "startdate": "20231024",
      "fullstartdate": "202310241600",
      "enddate": "20231025",
      "url": "/th?id=OHR.RedSquirrel_ZH-CN8668738367_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp",
      "urlbase": "/th?id=OHR.RedSquirrel_ZH-CN8668738367",
      "copyright": "红松鼠 (© MST/Getty Images)",
      ...
    }
  ]
}`}
                            </pre>
                        </div>
                    </div>
                )}

                {activeTab === 'code' && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                        <p className="text-slate-300 text-sm">
                            我们需要做三件事：1. 请求API获取JSON；2. 解析出图片URL；3. 下载图片二进制数据并保存。
                        </p>
                        <CodeBlock code={`import requests
import os

def download_bing_wallpaper():
    # 1. 连接必应图库 API
    api_url = "https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1"
    print("正在连接必应图库...")

    try:
        # 获取 JSON 数据
        data = requests.get(api_url).json()

        # 2. 提取信息
        image_data = data['images'][0]
        img_base = image_data['url']
        copyright_info = image_data['copyright']

        # 拼接高清大图地址
        full_img_url = "https://cn.bing.com" + img_base
        print(f"今日壁纸: {copyright_info}")

        # 3. 下载并保存
        print("正在下载...")
        img_content = requests.get(full_img_url).content

        filename = "bing_today.jpg"
        with open(filename, 'wb') as f:
            f.write(img_content)

        print(f"✅ 下载成功！已保存为 {filename}")

        # 【注意】二进制文件保存需要用 'wb' 模式 (Write Binary)

    except Exception as e:
        print(f"出错啦: {e}")

download_bing_wallpaper()`} />

                        <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-xl text-yellow-200 text-sm">
                            <strong className="block mb-1 text-yellow-400">💡 思考题</strong>
                            接口里的 <code className="bg-black/20 px-1 rounded">idx=0</code> 代表今天。能不能写个 <code className="bg-black/20 px-1 rounded">for</code> 循环，把 <code className="bg-black/20 px-1 rounded">idx</code> 从 0 变到 6，自动把过去一周的壁纸全抓下来？
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export const BilibiliProjectSlide = () => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                <h3 className="text-xl font-bold text-pink-400 flex items-center gap-2 mb-6">
                    <PlayCircle size={20} /> 项目三：B站热门视频爬虫
                </h3>

                <div className="space-y-6">
                    <div className="bg-pink-500/10 border border-pink-500/30 p-4 rounded-xl text-pink-200 text-sm">
                        <strong className="block mb-2 text-pink-400">📺 目标分析</strong>
                        <p className="mb-2">我们发现 B 站视频链接非常有规律：</p>
                        <code className="block bg-black/50 p-2 rounded text-cyan-300 font-mono text-xs break-all mb-2">
                            https://www.bilibili.com/video/<span className="text-yellow-400">BVxxxxxxxx</span>
                        </code>
                        <p>只要拿到视频的 <strong>BV号</strong>，就能拼接出播放地址！</p>
                    </div>

                    <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3 bg-black/40 border-b border-slate-700">
                            <span className="text-xs font-mono text-slate-500">bilibili_crawler.py</span>
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                            </div>
                        </div>
                        <CodeBlock code={`import requests
import csv
import time

def scrape_bilibili_hot_with_urls():
    # B站热门接口
    url = "https://api.bilibili.com/x/web-interface/popular"

    params = {
        'ps': 20,  # 每页20条
        'pn': 1    # 第1页
    }

    headers = {
        'User-Agent': 'Mozilla/5.0 ... (记得换成你的UA)',
        'Referer': 'https://www.bilibili.com/v/popular/all'
    }

    print("正在连接 Bilibili 热门视频接口...\\n")

    try:
        response = requests.get(url, headers=headers, params=params)

        if response.status_code == 200:
            json_data = response.json()

            if json_data['code'] == 0:
                video_list = json_data['data']['list']
                results = []

                for i, video in enumerate(video_list, 1):
                    # 1. 获取基础信息
                    title = video['title']
                    owner = video['owner']['name']
                    bvid = video['bvid']  # 关键的 BV 号

                    # 2. 【关键步骤】拼接视频网址
                    video_url = f"https://www.bilibili.com/video/{bvid}"

                    # 3. 打印到屏幕 (可以在终端直接点击)
                    print(f"{i}. {title}")
                    print(f"   👤 UP主: {owner}")
                    print(f"   🔗 网址: {video_url}")
                    print("-" * 50)

                    results.append({
                        '排名': i,
                        '标题': title,
                        'UP主': owner,
                        '播放量': video['stat']['view'],
                        '网址': video_url  # 保存到 CSV 里
                    })

                return results
            else:
                print("B站返回错误:", json_data['message'])
        else:
            print("网络请求失败")

    except Exception as e:
        print(f"发生错误: {e}")

    return []

def save_to_csv(data, filename='bilibili_hot_urls.csv'):
    if not data:
        return
    with open(filename, 'w', encoding='utf-8-sig', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=data[0].keys())
        writer.writeheader()
        writer.writerows(data)
    print(f"\\n✅ 数据已保存至 {filename}")

if __name__ == '__main__':
    data = scrape_bilibili_hot_with_urls()
    save_to_csv(data)`} />
                    </div>
                </div>
            </div>
        </div>
    );
};

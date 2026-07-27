"use client";

import { useEffect, useMemo, useState } from "react";

type Tool = {
  name: string;
  domain: string;
  category: string;
  desc: string;
  tags: string[];
  badge?: string;
};

const categories = [
  ["全部工具", "✦"],
  ["AI 对话", "◉"],
  ["图像设计", "◇"],
  ["视频创作", "▷"],
  ["写作办公", "▤"],
  ["AI 编程", "⌘"],
  ["智能体", "⬡"],
  ["音乐语音", "♬"],
  ["学习资源", "◎"],
] as const;

const tools: Tool[] = [
  { name: "豆包", domain: "doubao.com", category: "AI 对话", desc: "字节跳动推出的全能 AI 助手，支持对话、写作、图像与深度思考。", tags: ["国产可用", "免费"], badge: "热门" },
  { name: "DeepSeek", domain: "deepseek.com", category: "AI 对话", desc: "擅长推理、代码与知识问答的国产大模型助手。", tags: ["国产可用", "免费"], badge: "热门" },
  { name: "ChatGPT", domain: "chatgpt.com", category: "AI 对话", desc: "OpenAI 推出的通用 AI 助手，覆盖研究、创作、编程和多模态任务。", tags: ["海外", "免费试用"], badge: "精选" },
  { name: "Claude", domain: "claude.ai", category: "AI 对话", desc: "Anthropic 推出的 AI 助手，擅长长文本、分析、写作与代码。", tags: ["海外", "免费试用"] },
  { name: "Kimi", domain: "kimi.com", category: "AI 对话", desc: "月之暗面推出的智能助手，支持长文本、搜索与本地智能体。", tags: ["国产可用", "免费"], badge: "热门" },
  { name: "腾讯元宝", domain: "yuanbao.tencent.com", category: "AI 对话", desc: "腾讯推出的 AI 助手，接入混元与 DeepSeek 模型。", tags: ["国产可用", "免费"] },
  { name: "千问", domain: "qianwen.com", category: "AI 对话", desc: "阿里旗下全能 AI 助手，支持对话、创作、视觉与办公。", tags: ["国产可用", "免费"] },
  { name: "秘塔 AI 搜索", domain: "metaso.cn", category: "AI 对话", desc: "无广告、可溯源的 AI 搜索与研究工具。", tags: ["国产可用", "免费"] },
  { name: "Perplexity", domain: "perplexity.ai", category: "AI 对话", desc: "面向研究与知识发现的答案引擎，提供来源引用。", tags: ["海外", "免费试用"] },
  { name: "即梦 AI", domain: "jimeng.jianying.com", category: "图像设计", desc: "字节跳动旗下图片与视频创作平台，支持中文提示与多模态参考。", tags: ["国产可用", "免费试用"], badge: "热门" },
  { name: "Midjourney", domain: "midjourney.com", category: "图像设计", desc: "高质量 AI 图像生成与视觉创意平台。", tags: ["海外", "付费"], badge: "精选" },
  { name: "Adobe Firefly", domain: "firefly.adobe.com", category: "图像设计", desc: "Adobe 的生成式 AI 创作工具，覆盖生图、编辑与设计。", tags: ["海外", "免费试用"] },
  { name: "Canva 可画", domain: "canva.cn", category: "图像设计", desc: "融合 AI 生图、文案与模板的一站式在线设计平台。", tags: ["国产可用", "免费试用"] },
  { name: "LiblibAI", domain: "liblib.art", category: "图像设计", desc: "国内 AI 模型与工作流创作社区，支持在线生图。", tags: ["国产可用", "免费试用"] },
  { name: "稿定 AI", domain: "gaoding.com", category: "图像设计", desc: "面向营销、电商和新媒体场景的 AI 设计平台。", tags: ["国产可用", "免费试用"] },
  { name: "堆友", domain: "d.design", category: "图像设计", desc: "阿里旗下全能 AI 创作平台，覆盖图片、视频和设计 Agent。", tags: ["国产可用", "免费试用"] },
  { name: "可灵 AI", domain: "klingai.com", category: "视频创作", desc: "快手推出的电影级 AI 视频与图片生成平台。", tags: ["国产可用", "免费试用"], badge: "热门" },
  { name: "Runway", domain: "runwayml.com", category: "视频创作", desc: "专业 AI 视频生成、编辑与视觉特效工作台。", tags: ["海外", "免费试用"], badge: "精选" },
  { name: "海螺 AI", domain: "hailuoai.video", category: "视频创作", desc: "MiniMax 推出的 AI 视频生成平台，支持文本和图片生成视频。", tags: ["国产可用", "免费试用"] },
  { name: "Vidu", domain: "vidu.com", category: "视频创作", desc: "生数科技推出的视频大模型，支持主体一致性与参考生成。", tags: ["国产可用", "免费试用"] },
  { name: "HeyGen", domain: "heygen.com", category: "视频创作", desc: "AI 数字人、视频翻译和口播视频制作平台。", tags: ["海外", "免费试用"] },
  { name: "剪映", domain: "capcut.cn", category: "视频创作", desc: "集成智能剪辑、字幕、文案和数字人的视频创作工具。", tags: ["国产可用", "免费试用"] },
  { name: "Gamma", domain: "gamma.app", category: "写作办公", desc: "用 AI 快速生成演示文稿、文档与网页。", tags: ["海外", "免费试用"], badge: "热门" },
  { name: "AiPPT", domain: "aippt.cn", category: "写作办公", desc: "面向中文用户的一键 AI PPT 生成与在线编辑平台。", tags: ["国产可用", "免费试用"] },
  { name: "飞书妙记", domain: "feishu.cn", category: "写作办公", desc: "音视频转文字、智能摘要与会议内容协作工具。", tags: ["国产可用", "免费试用"] },
  { name: "通义听悟", domain: "tingwu.aliyun.com", category: "写作办公", desc: "阿里推出的音视频内容分析、转写、翻译与总结工具。", tags: ["国产可用", "免费试用"] },
  { name: "秘塔写作猫", domain: "xiezuocat.com", category: "写作办公", desc: "中文写作纠错、改写、续写与内容创作助手。", tags: ["国产可用", "免费试用"] },
  { name: "Paperpal", domain: "paperpal.com", category: "写作办公", desc: "面向英文论文的学术写作、润色与投稿检查工具。", tags: ["海外", "免费试用"] },
  { name: "Notion AI", domain: "notion.so", category: "写作办公", desc: "集成在 Notion 工作空间中的写作、总结与知识问答助手。", tags: ["海外", "付费"] },
  { name: "Trae", domain: "trae.ai", category: "AI 编程", desc: "字节跳动推出的 AI 原生开发环境，支持智能体式编程。", tags: ["国产可用", "免费"], badge: "热门" },
  { name: "Cursor", domain: "cursor.com", category: "AI 编程", desc: "AI 原生代码编辑器，支持代码库理解与 Agent 编程。", tags: ["海外", "免费试用"], badge: "精选" },
  { name: "GitHub Copilot", domain: "github.com/features/copilot", category: "AI 编程", desc: "GitHub 的 AI 编程助手，覆盖补全、聊天、审查与 Agent。", tags: ["海外", "付费"] },
  { name: "通义灵码", domain: "lingma.aliyun.com", category: "AI 编程", desc: "阿里云推出的智能编码助手与 AI IDE。", tags: ["国产可用", "免费"] },
  { name: "CodeBuddy", domain: "codebuddy.ai", category: "AI 编程", desc: "腾讯云推出的 AI 编程助手与智能开发工作台。", tags: ["国产可用", "免费试用"] },
  { name: "Replit", domain: "replit.com", category: "AI 编程", desc: "浏览器内使用 AI 构建、运行和部署应用。", tags: ["海外", "免费试用"] },
  { name: "Coze 扣子", domain: "coze.cn", category: "智能体", desc: "字节跳动推出的 AI Bot 与智能体开发平台。", tags: ["国产可用", "免费"], badge: "热门" },
  { name: "Dify", domain: "dify.ai", category: "智能体", desc: "开源大模型应用开发平台，支持工作流、知识库与 Agent。", tags: ["开源", "免费试用"], badge: "精选" },
  { name: "FastGPT", domain: "fastgpt.cn", category: "智能体", desc: "基于大模型的知识库问答与可视化工作流平台。", tags: ["国产可用", "开源"] },
  { name: "腾讯元器", domain: "yuanqi.tencent.com", category: "智能体", desc: "腾讯推出的智能体创作与分发平台。", tags: ["国产可用", "免费"] },
  { name: "ModelScope 魔搭", domain: "modelscope.cn", category: "智能体", desc: "阿里推出的模型即服务共享社区与开发平台。", tags: ["国产可用", "免费"] },
  { name: "Suno", domain: "suno.com", category: "音乐语音", desc: "通过文字生成完整歌曲、伴奏和人声。", tags: ["海外", "免费试用"], badge: "热门" },
  { name: "ElevenLabs", domain: "elevenlabs.io", category: "音乐语音", desc: "自然语音合成、配音、声音克隆与音频 Agent 平台。", tags: ["海外", "免费试用"] },
  { name: "讯飞智作", domain: "peiyin.xunfei.cn", category: "音乐语音", desc: "科大讯飞推出的 AI 配音、数字人与视频创作平台。", tags: ["国产可用", "免费试用"] },
  { name: "网易天音", domain: "tianyin.music.163.com", category: "音乐语音", desc: "网易云音乐推出的一站式 AI 音乐创作工具。", tags: ["国产可用", "免费试用"] },
  { name: "OpenAI Academy", domain: "academy.openai.com", category: "学习资源", desc: "OpenAI 面向所有人的 AI 学习与社区资源平台。", tags: ["海外", "免费"], badge: "最新" },
  { name: "DeepLearning.AI", domain: "deeplearning.ai", category: "学习资源", desc: "吴恩达创办的 AI 课程与开发者学习平台。", tags: ["海外", "免费试用"] },
  { name: "Hugging Face", domain: "huggingface.co", category: "学习资源", desc: "全球开源模型、数据集与 AI 应用社区。", tags: ["海外", "免费"] },
  { name: "Learning Prompt", domain: "learningprompt.wiki", category: "学习资源", desc: "面向中文用户的免费提示工程学习教程。", tags: ["国产可用", "免费"] },
];

const trendNames = ["DeepSeek", "即梦 AI", "豆包", "Trae"];

function logoUrl(domain: string) {
  const clean = domain.split("/")[0];
  return `https://www.google.com/s2/favicons?domain=${clean}&sz=128`;
}

export default function Home() {
  const [view, setView] = useState<"home" | "library">("home");
  const [category, setCategory] = useState("全部工具");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("全部");
  const [selected, setSelected] = useState<Tool | null>(null);
  const [followOpen, setFollowOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      setFavorites(JSON.parse(localStorage.getItem("ada-ai-favorites") || "[]"));
    } catch {}
  }, []);

  function toggleFavorite(name: string) {
    const next = favorites.includes(name)
      ? favorites.filter((item) => item !== name)
      : [...favorites, name];
    setFavorites(next);
    localStorage.setItem("ada-ai-favorites", JSON.stringify(next));
  }

  const filteredTools = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return tools.filter((tool) => {
      const categoryMatch = category === "全部工具" || tool.category === category;
      const queryMatch =
        !keyword ||
        [tool.name, tool.desc, tool.category, ...tool.tags]
          .join(" ")
          .toLowerCase()
          .includes(keyword);
      const filterMatch =
        filter === "全部" ||
        (filter === "收藏" && favorites.includes(tool.name)) ||
        tool.tags.includes(filter) ||
        tool.badge === filter;
      return categoryMatch && queryMatch && filterMatch;
    });
  }, [category, query, filter, favorites]);

  function enterLibrary(nextCategory = "全部工具") {
    setCategory(nextCategory);
    setView("library");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      {view === "home" ? (
        <>
          <header className="topbar">
            <button className="brand" onClick={() => setView("home")} aria-label="返回首页">
              <span className="brand-mark">AI</span>
              <span>Ada <b>AI导航</b></span>
            </button>
            <nav className="desktop-nav" aria-label="主导航">
              <button className="active">首页</button>
              <button onClick={() => enterLibrary()}>工具库</button>
              <button onClick={() => document.getElementById("ranking")?.scrollIntoView({ behavior: "smooth" })}>AI 榜单</button>
              <button onClick={() => enterLibrary()}>最新收录</button>
              <button onClick={() => alert("工具提交入口将在下一版接入审核后台。")}>提交工具</button>
            </nav>
            <button className="follow-btn" onClick={() => setFollowOpen(true)}>关注我 <span>↗</span></button>
          </header>

          <section className="hero">
            <div className="hero-badge"><span /> 已收录 500+ AI 工具 · 持续更新</div>
            <h1>探索 AI 的<br /><span>无限可能</span></h1>
            <p>从海量 AI 工具中，发现真正适合你的下一代生产力。</p>
            <form
              className="hero-search"
              onSubmit={(event) => {
                event.preventDefault();
                enterLibrary();
              }}
            >
              <span className="search-icon">⌕</span>
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="你想用 AI 做什么？例如：生成短视频" />
              <button type="submit">开始探索 <span>→</span></button>
            </form>
            <div className="quick-categories">
              {categories.slice(1, 7).map(([name, icon]) => (
                <button key={name} onClick={() => enterLibrary(name)}>
                  <span>{icon}</span>{name}
                </button>
              ))}
            </div>
          </section>

          <section className="ranking-section" id="ranking">
            <div className="section-heading">
              <div><small>WEEKLY TRENDING</small><h2>本周 AI 热榜</h2></div>
              <button onClick={() => enterLibrary()}>查看完整榜单 →</button>
            </div>
            <div className="ranking-grid">
              {trendNames.map((name, index) => {
                const tool = tools.find((item) => item.name === name)!;
                return (
                  <article className="rank-card" key={name} onClick={() => setSelected(tool)}>
                    <span className="rank-number">0{index + 1}</span>
                    <img src={logoUrl(tool.domain)} alt={`${tool.name} logo`} />
                    <div><h3>{tool.name}</h3><p>{tool.desc}</p></div>
                    <span className="card-arrow">↗</span>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="creator-strip">
            <div>
              <small>ABOUT THE CURATOR</small>
              <h2>和我一起，把 AI 真正用起来</h2>
              <p>持续分享 AI 工具实测、零基础教程和高效工作流。</p>
            </div>
            <div className="creator-actions">
              {["抖音", "小红书", "微信"].map((name) => <button key={name} onClick={() => setFollowOpen(true)}>{name}<span>扫码关注</span></button>)}
            </div>
          </section>
        </>
      ) : (
        <div className="library-layout">
          <aside className="sidebar">
            <button className="brand sidebar-brand" onClick={() => setView("home")}>
              <span className="brand-mark">AI</span><span>Ada <b>AI导航</b></span>
            </button>
            <p className="side-label">发现</p>
            <nav className="side-nav" aria-label="工具分类">
              {categories.map(([name, icon]) => (
                <button key={name} className={category === name ? "active" : ""} onClick={() => setCategory(name)}>
                  <span>{icon}</span>{name}<i>{name === "全部工具" ? tools.length : tools.filter((tool) => tool.category === name).length}</i>
                </button>
              ))}
            </nav>
            <div className="side-follow">
              <p>关注主理人</p><span>获取 AI 工具实测与教程</span>
              <div className="mini-qr-row">{[1,2,3].map((n) => <button key={n} onClick={() => setFollowOpen(true)} aria-label="打开关注二维码"><i /></button>)}</div>
            </div>
            <button className="back-home" onClick={() => setView("home")}>← 返回品牌首页</button>
          </aside>

          <section className="library-main">
            <div className="mobile-library-head">
              <button className="brand" onClick={() => setView("home")}><span className="brand-mark">AI</span><span>Ada <b>AI导航</b></span></button>
              <button className="mobile-follow" onClick={() => setFollowOpen(true)}>关注</button>
            </div>
            <div className="library-header">
              <div><small>TOOL LIBRARY</small><h1>找到真正好用的 AI 工具</h1><p>官方直达 · 精选分类 · 持续更新</p></div>
              <span className="tool-count"><b>{filteredTools.length}</b> 个结果</span>
            </div>
            <div className="library-search">
              <span>⌕</span>
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="搜索工具、能力或使用场景…" />
              {query && <button onClick={() => setQuery("")}>×</button>}
            </div>
            <div className="mobile-categories">
              {categories.map(([name]) => <button key={name} className={category === name ? "active" : ""} onClick={() => setCategory(name)}>{name}</button>)}
            </div>
            <div className="filters">
              {["全部", "国产可用", "免费", "免费试用", "热门", "收藏"].map((name) => (
                <button key={name} className={filter === name ? "active" : ""} onClick={() => setFilter(name)}>{name}</button>
              ))}
            </div>
            <div className="tool-grid">
              {filteredTools.map((tool) => (
                <article className="tool-card" key={tool.name}>
                  <button className="card-main" onClick={() => setSelected(tool)}>
                    <img src={logoUrl(tool.domain)} alt={`${tool.name} logo`} />
                    <div><h2>{tool.name}{tool.badge && <em>{tool.badge}</em>}</h2><p>{tool.desc}</p></div>
                  </button>
                  <div className="card-bottom">
                    <div>{tool.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                    <button className={favorites.includes(tool.name) ? "fav active" : "fav"} onClick={() => toggleFavorite(tool.name)} aria-label={`${favorites.includes(tool.name) ? "取消收藏" : "收藏"} ${tool.name}`}>♡</button>
                    <a href={`https://${tool.domain}`} target="_blank" rel="noreferrer" aria-label={`访问 ${tool.name} 官网`}>↗</a>
                  </div>
                </article>
              ))}
            </div>
            {!filteredTools.length && <div className="empty"><span>⌕</span><h2>没有找到匹配工具</h2><p>换个关键词或清除筛选后再试试。</p><button onClick={() => {setQuery("");setFilter("全部");setCategory("全部工具");}}>查看全部工具</button></div>}
          </section>
        </div>
      )}

      {selected && (
        <div className="modal-backdrop" onMouseDown={() => setSelected(null)}>
          <section className="tool-modal" onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <button className="modal-close" onClick={() => setSelected(null)}>×</button>
            <div className="modal-title"><img src={logoUrl(selected.domain)} alt="" /><div><small>{selected.category}</small><h2>{selected.name}</h2></div></div>
            <p>{selected.desc}</p>
            <div className="modal-tags">{selected.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            <div className="modal-note"><b>访问提示</b><p>即将前往该工具官方网站。第三方服务的可用性、价格和地区限制可能发生变化。</p></div>
            <div className="modal-actions">
              <button onClick={() => toggleFavorite(selected.name)}>{favorites.includes(selected.name) ? "已收藏" : "♡ 收藏工具"}</button>
              <a href={`https://${selected.domain}`} target="_blank" rel="noreferrer">访问官网 ↗</a>
            </div>
          </section>
        </div>
      )}

      {followOpen && (
        <div className="modal-backdrop" onMouseDown={() => setFollowOpen(false)}>
          <section className="follow-modal" onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <button className="modal-close" onClick={() => setFollowOpen(false)}>×</button>
            <small>FOLLOW ADA</small>
            <h2>关注我，持续获取 AI 工具</h2>
            <p>二维码将在你提供原图后替换，目前已预留完整展示位置。</p>
            <div className="qr-grid">
              {["抖音", "小红书", "微信"].map((name) => (
                <div key={name}><div className="qr-placeholder"><span>Ada</span><i /></div><b>{name}</b><small>扫码关注</small></div>
              ))}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

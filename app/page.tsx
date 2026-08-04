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

type CategoryName = (typeof categories)[number][0];

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
  { name: "Qoder", domain: "qoder.com/en", category: "AI 编程", desc: "阿里巴巴推出的新一代智能编程平台，支持代码补全、对话式编程与智能体任务开发。", tags: ["国产可用", "免费试用"], badge: "最新" },
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
  { name: "讯飞星火", domain: "xinghuo.xfyun.cn", category: "AI 对话", desc: "科大讯飞推出的认知智能大模型助手，支持搜索、写作与多模态问答。", tags: ["国产可用", "免费"] },
  { name: "阿贝 AI", domain: "abeiai.com", category: "图像设计", desc: "面向中文创作者的 AI 绘画与视觉内容生成平台。", tags: ["国产可用", "免费试用"] },
  { name: "绘蛙", domain: "ihuiwa.com", category: "图像设计", desc: "面向电商场景的 AI 模特图、商品图与营销文案创作工具。", tags: ["国产可用", "免费试用"] },
  { name: "艾绘 AI", domain: "aiyou.art", category: "图像设计", desc: "提供 AI 绘画、模型与创作工作流的在线平台。", tags: ["国产可用", "免费试用"] },
  { name: "MX 绘画", domain: "mxai.cn", category: "图像设计", desc: "支持文生图、图生图与风格创作的中文 AI 绘画平台。", tags: ["国产可用", "免费试用"] },
  { name: "图星人", domain: "tuxingren.com", category: "图像设计", desc: "集 AI 商品图、抠图、换背景与营销设计于一体。", tags: ["国产可用", "免费试用"] },
  { name: "LinkFox AI", domain: "ai.linkfox.com", category: "图像设计", desc: "跨境电商 AI 图片与营销内容生成工具。", tags: ["国产可用", "免费试用"] },
  { name: "OpenFlow", domain: "openflowai.net", category: "图像设计", desc: "在线使用生成模型与节点工作流的 AI 创作平台。", tags: ["国产可用", "免费试用"] },
  { name: "千问创作", domain: "create.qianwen.com", category: "图像设计", desc: "通义千问提供的 AI 图片与创意内容生成空间。", tags: ["国产可用", "免费"] },
  { name: "包图 AI", domain: "ibaotu.com", category: "图像设计", desc: "面向设计、电商与营销场景的 AI 图片创作工具。", tags: ["国产可用", "免费试用"] },
  { name: "Holopix AI", domain: "holopix.cn", category: "图像设计", desc: "面向游戏美术与视觉资产生产的 AI 创作平台。", tags: ["国产可用", "免费试用"] },
  { name: "吐司 AI", domain: "tusi.cn", category: "图像设计", desc: "国内 AI 绘画模型、作品与在线生成社区。", tags: ["国产可用", "免费试用"] },
  { name: "触手 AI", domain: "acgnai.art", category: "图像设计", desc: "专注插画、动漫与二次元风格的 AI 绘画平台。", tags: ["国产可用", "免费试用"] },
  { name: "RunningHub", domain: "runninghub.cn", category: "图像设计", desc: "在线运行与分享 ComfyUI 工作流的 AI 创作平台。", tags: ["国产可用", "免费试用"] },
  { name: "海艺 AI", domain: "haiyi.art", category: "图像设计", desc: "提供模型、工作流与在线生成能力的 AI 艺术社区。", tags: ["国产可用", "免费试用"] },
  { name: "Niji Journey", domain: "nijijourney.com", category: "图像设计", desc: "专注动漫和插画风格的 AI 图像生成工具。", tags: ["海外", "付费"] },
  { name: "秒画", domain: "miaohua.sensetime.com", category: "图像设计", desc: "商汤科技推出的 AI 绘画与创意生成平台。", tags: ["国产可用", "免费试用"] },
  { name: "Clipdrop", domain: "clipdrop.co", category: "图像设计", desc: "提供抠图、扩图、清理和生成式编辑的一站式图像工具。", tags: ["海外", "免费试用"] },
  { name: "AniShort", domain: "anishort.cn", category: "视频创作", desc: "用 AI 快速生成动漫短剧与分镜内容。", tags: ["国产可用", "免费试用"] },
  { name: "有言", domain: "youyan3d.com", category: "视频创作", desc: "一站式 AI 数字人视频与 3D 内容创作平台。", tags: ["国产可用", "免费试用"] },
  { name: "闪剪", domain: "shanjian.tv", category: "视频创作", desc: "面向口播、营销与短视频场景的 AI 数字人创作工具。", tags: ["国产可用", "免费试用"] },
  { name: "WonderClip", domain: "yikeai.com", category: "视频创作", desc: "自动完成文案、素材与剪辑的 AI 视频创作平台。", tags: ["国产可用", "免费试用"] },
  { name: "OiiOii", domain: "oiioii.tv", category: "视频创作", desc: "面向动画与视觉叙事的 AI 视频生成平台。", tags: ["国产可用", "免费试用"] },
  { name: "腾讯混元视频", domain: "video.hunyuan.tencent.com", category: "视频创作", desc: "腾讯混元提供的文本和图片生成视频能力。", tags: ["国产可用", "免费试用"] },
  { name: "ZeroCut", domain: "zerocut.cn", category: "视频创作", desc: "自动成片、智能剪辑与短视频批量生产工具。", tags: ["国产可用", "免费试用"] },
  { name: "X·FUN", domain: "xfun.design", category: "写作办公", desc: "融合 AI 生成与灵感管理的创意效率工具。", tags: ["国产可用", "免费试用"] },
  { name: "MonkeyCode", domain: "monkeycode-ai.com", category: "AI 编程", desc: "面向产品与开发场景的 AI 编程和应用构建助手。", tags: ["国产可用", "免费试用"] },
  { name: "iSlide", domain: "islide.cc", category: "写作办公", desc: "集模板、设计与 AI 生成为一体的 PPT 效率工具。", tags: ["国产可用", "免费试用"] },
  { name: "蛙蛙写作", domain: "wawawriter.com", category: "写作办公", desc: "小说、故事与长文本创作的 AI 写作助手。", tags: ["国产可用", "免费试用"] },
  { name: "笔灵 AI", domain: "ibiling.cn", category: "写作办公", desc: "覆盖公文、论文、营销与新媒体场景的中文 AI 写作工具。", tags: ["国产可用", "免费试用"] },
  { name: "讯飞绘文", domain: "turbodesk.xfyun.cn", category: "写作办公", desc: "科大讯飞推出的新媒体选题、写作与排版助手。", tags: ["国产可用", "免费试用"] },
  { name: "FeelFish", domain: "feelfish.com", category: "写作办公", desc: "面向跨境电商的 AI 商品内容与营销文案工具。", tags: ["国产可用", "免费试用"] },
  { name: "万能小 in", domain: "xiaoin.com.cn", category: "写作办公", desc: "面向办公场景的文档阅读、总结与内容生成助手。", tags: ["国产可用", "免费试用"] },
  { name: "MedPeer", domain: "medpeer.cn", category: "写作办公", desc: "服务医学研究者的文献、科研与学术写作平台。", tags: ["国产可用", "免费试用"] },
  { name: "小鱼 AI 写作", domain: "xiaoyuxiezuo.com", category: "写作办公", desc: "覆盖文章、公文与营销内容的中文 AI 写作工具。", tags: ["国产可用", "免费试用"] },
  { name: "慧言 AI", domain: "aigc.huiyan-ai.cn", category: "写作办公", desc: "提供内容创作、改写与办公文案生成服务。", tags: ["国产可用", "免费试用"] },
  { name: "摄图 AI", domain: "ai.699pic.com", category: "图像设计", desc: "摄图网推出的 AI 图片、设计与营销素材创作平台。", tags: ["国产可用", "免费试用"] },
  { name: "AI 内容管家", domain: "guanjia.seowhy.com", category: "写作办公", desc: "面向网站运营和 SEO 场景的 AI 内容生产工具。", tags: ["国产可用", "免费试用"] },
  { name: "小橡皮 AI", domain: "xiangpiai.cn", category: "写作办公", desc: "中文内容生成、润色与多场景写作助手。", tags: ["国产可用", "免费试用"] },
  { name: "橙篇", domain: "cp.baidu.com", category: "写作办公", desc: "百度推出的长文理解、研究与内容创作工具。", tags: ["国产可用", "免费"] },
  { name: "Postme", domain: "postme.cn", category: "写作办公", desc: "面向自媒体与社交平台的 AI 内容创作和发布工具。", tags: ["国产可用", "免费试用"] },
  { name: "有道写作", domain: "write.youdao.com", category: "写作办公", desc: "网易有道提供的英文写作批改、润色与表达建议工具。", tags: ["国产可用", "免费"] },
  { name: "百度文库 AI", domain: "wenku.baidu.com", category: "写作办公", desc: "支持文档总结、内容生成、PPT 与资料检索的办公助手。", tags: ["国产可用", "免费试用"] },
  { name: "博思 AIPPT", domain: "pptgo.cn", category: "写作办公", desc: "输入主题即可生成大纲、设计和完整演示文稿。", tags: ["国产可用", "免费试用"] },
  { name: "ChatPPT", domain: "chatppt.cn", category: "写作办公", desc: "对话式生成和修改中文演示文稿。", tags: ["国产可用", "免费试用"] },
  { name: "咔片 PPT", domain: "cappt.cc", category: "写作办公", desc: "自动生成内容结构与视觉版式的 AI PPT 工具。", tags: ["国产可用", "免费试用"] },
  { name: "办公小浣熊", domain: "xiaohuanxiong.com", category: "写作办公", desc: "商汤推出的表格分析、文档处理与办公智能助手。", tags: ["国产可用", "免费试用"] },
  { name: "笔格 AIPPT", domain: "bigppt.cn", category: "写作办公", desc: "中文 AI PPT 生成、模板匹配与在线编辑平台。", tags: ["国产可用", "免费试用"] },
  { name: "Pi 智能演示", domain: "pi.deepvinci.tech", category: "写作办公", desc: "面向商业表达的 AI 演示文稿生成工具。", tags: ["国产可用", "免费试用"] },
  { name: "二狗 AI PPT", domain: "2dogppt.com", category: "写作办公", desc: "从主题或文档快速生成中文 PPT。", tags: ["国产可用", "免费试用"] },
  { name: "迅捷 AIPPT", domain: "xunjieppt.com", category: "写作办公", desc: "支持多种模板与场景的一键 AI 演示生成工具。", tags: ["国产可用", "免费试用"] },
  { name: "课灵 PPT", domain: "classppt.cn", category: "写作办公", desc: "面向教师与教学场景的 AI 课件生成平台。", tags: ["国产可用", "免费试用"] },
  { name: "讯飞智文", domain: "zhiwen.xfyun.cn", category: "写作办公", desc: "科大讯飞推出的 AI 文档与演示生成工具。", tags: ["国产可用", "免费试用"] },
  { name: "PPT 百科", domain: "pptwiki.com", category: "写作办公", desc: "集 AI 生成、模板与演示设计资源于一体。", tags: ["国产可用", "免费试用"] },
  { name: "MotionGo", domain: "motion.yoo-ai.com", category: "写作办公", desc: "用 AI 为 PPT 自动生成动画与演示效果。", tags: ["国产可用", "免费试用"] },
  { name: "GitMind", domain: "gitmind.cn", category: "写作办公", desc: "AI 驱动的思维导图、流程图与知识整理工具。", tags: ["国产可用", "免费试用"] },
  { name: "万兴 PDF", domain: "pdf.wondershare.cn", category: "写作办公", desc: "集 AI 阅读、总结、翻译与 PDF 编辑于一体。", tags: ["国产可用", "免费试用"] },
  { name: "萝卜简历", domain: "luobojianli.com", category: "写作办公", desc: "AI 简历生成、优化与求职内容辅助工具。", tags: ["国产可用", "免费试用"] },
  { name: "秒哒", domain: "miaoda.cn", category: "AI 编程", desc: "百度推出的无代码 AI 应用搭建平台。", tags: ["国产可用", "免费试用"] },
  { name: "CodeGeeX", domain: "codegeex.cn", category: "AI 编程", desc: "智谱推出的代码生成、补全、解释与智能体编程助手。", tags: ["国产可用", "免费"] },
  { name: "Windsurf", domain: "windsurf.com", category: "AI 编程", desc: "面向智能体式开发的 AI 原生代码编辑器。", tags: ["海外", "免费试用"] },
  { name: "Amazon Q Developer", domain: "aws.amazon.com/q/developer", category: "AI 编程", desc: "AWS 提供的代码生成、调试和云开发智能助手。", tags: ["海外", "免费试用"] },
  { name: "即时 AI", domain: "js.design", category: "AI 编程", desc: "即时设计推出的 AI 原型、网页与界面生成能力。", tags: ["国产可用", "免费试用"] },
  { name: "DuMate", domain: "dumate.cn", category: "智能体", desc: "面向团队业务场景的企业级 AI 智能体平台。", tags: ["国产可用", "免费试用"] },
  { name: "WorkBuddy", domain: "workbuddy.cn", category: "智能体", desc: "可连接知识与工作流程的 AI 办公智能体。", tags: ["国产可用", "免费试用"] },
  { name: "Marvis", domain: "marvis.qq.com", category: "智能体", desc: "腾讯推出的个人智能体与任务协作助手。", tags: ["国产可用", "免费试用"] },
  { name: "LobsterAI", domain: "lobsterai.youdao.com", category: "智能体", desc: "网易有道推出的桌面 AI 智能体与效率助手。", tags: ["国产可用", "免费试用"] },
  { name: "国家智慧教育平台", domain: "smartedu.cn", category: "学习资源", desc: "国家级数字教育资源与课程公共服务平台。", tags: ["国产可用", "免费"] },
  { name: "国家终身教育平台", domain: "le.ouchn.cn", category: "学习资源", desc: "面向全民终身学习的免费数字课程平台。", tags: ["国产可用", "免费"] },
  { name: "Day of AI", domain: "dayofai.org", category: "学习资源", desc: "面向师生的免费人工智能课程与教学资源。", tags: ["海外", "免费"] },
  { name: "Prompt Engineering Guide", domain: "promptingguide.ai", category: "学习资源", desc: "系统学习提示工程、模型能力与实践方法的开放教程。", tags: ["海外", "免费"] },
  { name: "Papers With Code", domain: "paperswithcode.com", category: "学习资源", desc: "连接机器学习论文、代码实现和评测数据的平台。", tags: ["海外", "免费"] },
  { name: "机器之心", domain: "jiqizhixin.com", category: "学习资源", desc: "人工智能产业、研究与技术内容平台。", tags: ["国产可用", "免费"] },
  { name: "量子位", domain: "qbitai.com", category: "学习资源", desc: "聚焦人工智能前沿、产品与产业动态的内容平台。", tags: ["国产可用", "免费"] },
  { name: "飞桨", domain: "paddlepaddle.org.cn", category: "学习资源", desc: "百度开源深度学习平台与开发者学习资源。", tags: ["国产可用", "开源"] },
  { name: "动手学深度学习", domain: "zh.d2l.ai", category: "学习资源", desc: "可运行代码、数学与实践结合的免费深度学习教材。", tags: ["国产可用", "免费"] },
  { name: "OpenBayes", domain: "openbayes.com", category: "学习资源", desc: "面向 AI 开发者的算力、数据与模型实践平台。", tags: ["国产可用", "免费试用"] },
  { name: "EasyAI", domain: "easyai.tech", category: "学习资源", desc: "面向初学者的人工智能知识库与教程。", tags: ["国产可用", "免费"] },
];

const trendNames = ["DeepSeek", "即梦 AI", "豆包", "Trae"];

const contacts = [
  {
    name: "微信",
    short: "微",
    image: "/contact/wechat.jpeg",
    account: "扫码添加好友",
    note: "交流合作与 AI 工具分享",
    tone: "wechat",
  },
  {
    name: "抖音",
    short: "抖",
    image: "/contact/douyin.jpeg",
    account: "好心情. · w979046217",
    note: "AI 工具实测与成长记录",
    tone: "douyin",
  },
  {
    name: "小红书",
    short: "红",
    image: "/contact/xiaohongshu.jpeg",
    account: "Ada聊AI · 63895799592",
    note: "AI 教程、工作流与经验分享",
    tone: "xiaohongshu",
  },
  {
    name: "B站",
    short: "B",
    image: "/contact/bilibili.jpeg",
    account: "佛系卷王王摆摆 · UID 3546875359660999",
    note: "系统化 AI 视频与学习内容",
    tone: "bilibili",
  },
] as const;

const intentDefinitions = [
  {
    category: "视频创作",
    keywords: ["生成短视频", "短视频", "文生视频", "图生视频", "视频生成", "视频制作", "视频剪辑", "剪视频", "数字人", "口播", "动画", "分镜", "字幕", "视频翻译", "做视频"],
  },
  {
    category: "图像设计",
    keywords: ["生成图片", "图片生成", "画图", "绘画", "海报", "商品图", "模特图", "换背景", "抠图", "扩图", "修图", "去水印", "头像", "插画", "动漫图", "设计图片", "做图"],
  },
  {
    category: "写作办公",
    keywords: ["写文章", "写文案", "写作", "做ppt", "生成ppt", "演示文稿", "论文", "开题报告", "简历", "公文", "文档", "表格", "excel", "会议纪要", "总结文档", "润色", "改写", "降重", "翻译文章"],
  },
  {
    category: "AI 编程",
    keywords: ["写代码", "编程", "代码", "开发网站", "做网站", "开发app", "做app", "开发应用", "程序", "debug", "调试", "ide", "前端", "后端", "网页开发"],
  },
  {
    category: "智能体",
    keywords: ["智能体", "agent", "工作流", "知识库", "机器人", "自动化任务", "搭建助手", "企业助手", "bot"],
  },
  {
    category: "音乐语音",
    keywords: ["配音", "生成音乐", "写歌", "作曲", "音乐", "歌曲", "声音克隆", "语音合成", "人声", "音频", "朗读", "唱歌"],
  },
  {
    category: "学习资源",
    keywords: ["学习ai", "学ai", "ai课程", "人工智能课程", "提示词", "prompt", "教程", "论文代码", "深度学习", "机器学习", "模型社区", "开源模型"],
  },
  {
    category: "AI 对话",
    keywords: ["聊天", "问答", "ai搜索", "搜索资料", "查资料", "研究", "总结", "长文本", "大模型", "翻译", "分析文件", "回答问题", "对话"],
  },
] as const satisfies ReadonlyArray<{ category: Exclude<CategoryName, "全部工具">; keywords: readonly string[] }>;

type SearchResolution =
  | { mode: "none"; category: "全部工具"; terms: string[] }
  | { mode: "direct" | "intent"; category: CategoryName; terms: string[] };

function normalizeSearchText(value: string) {
  return value.toLowerCase().replace(/[\s·、，。！？,.!?：:；;（）()【】[\]_-]/g, "");
}
function resolveSearch(value: string): SearchResolution {
  const keyword = normalizeSearchText(value);
  if (!keyword) return { mode: "none", category: "全部工具", terms: [] };

  const exactTools = tools.filter((tool) => normalizeSearchText(tool.name) === keyword);
  if (exactTools.length) {
    return { mode: "direct", category: exactTools[0].category as CategoryName, terms: [keyword] };
  }

  if (keyword.length >= 3) {
    const partialTools = tools.filter((tool) => normalizeSearchText(tool.name).includes(keyword));
    if (partialTools.length) {
      return { mode: "direct", category: partialTools[0].category as CategoryName, terms: [keyword] };
    }
  }

  const intentMatches = intentDefinitions
    .map((intent) => {
      const terms = intent.keywords
        .map(normalizeSearchText)
        .filter((term) => keyword.includes(term) || (term.length >= 2 && term.includes(keyword)));
      const score = terms.reduce((total, term) => total + term.length * term.length, 0);
      return { ...intent, terms, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  if (intentMatches.length) {
    return {
      mode: "intent",
      category: intentMatches[0].category,
      terms: intentMatches[0].terms,
    };
  }

  const textMatches = tools.filter((tool) =>
    normalizeSearchText([tool.name, tool.desc, tool.category, ...tool.tags].join(" ")).includes(keyword),
  );
  if (textMatches.length) {
    const matchedCategories = [...new Set(textMatches.map((tool) => tool.category))];
    return {
      mode: "direct",
      category: matchedCategories.length === 1 ? matchedCategories[0] as CategoryName : "全部工具",
      terms: [keyword],
    };
  }

  return { mode: "none", category: "全部工具", terms: [] };
}

function searchScore(tool: Tool, rawQuery: string, resolution: SearchResolution) {
  if (!rawQuery || resolution.mode === "none") return 0;
  const keyword = normalizeSearchText(rawQuery);
  const coreKeyword = keyword.replace(/^(我想|我要|帮我|请帮我|如何|怎么)?(生成|制作|做|写|开发|学习|查找|查|找)/, "");
  const name = normalizeSearchText(tool.name);
  const content = normalizeSearchText([tool.name, tool.desc, tool.category, ...tool.tags].join(" "));
  let score = tool.category === resolution.category ? 30 : 0;
  if (name === keyword) score += 200;
  else if (name.includes(keyword)) score += 120;
  if (content.includes(keyword)) score += 55;
  if (coreKeyword.length >= 2 && name.includes(coreKeyword)) score += 90;
  else if (coreKeyword.length >= 2 && content.includes(coreKeyword)) score += 60;
  resolution.terms.forEach((term) => {
    if (name.includes(term)) score += 45;
    if (content.includes(term)) score += 24;
  });
  if (tool.badge === "热门") score += 8;
  if (tool.badge === "精选") score += 5;
  return score;
}

function logoUrl(domain: string) {
  const clean = domain.split("/")[0];
  return `https://www.google.com/s2/favicons?domain_url=https://${clean}&sz=128`;
}

const localToolLogos: Record<string, string> = {
  "OpenAI Academy": "/logos/openai-academy.png",
};

function ToolLogo({ tool }: { tool: Tool }) {
  const [failed, setFailed] = useState(false);
  return (
    <span className={`tool-logo ${tool.name === "OpenAI Academy" ? "openai-academy-logo" : ""}`}>
      {!failed && (
        <img
          src={localToolLogos[tool.name] || logoUrl(tool.domain)}
          alt={`${tool.name} logo`}
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
        />
      )}
      {failed && <b aria-hidden="true">{tool.name.replace(/\s/g, "").slice(0, 2)}</b>}
    </span>
  );
}

type View = "home" | "library" | "advisor" | "resources" | "lab" | "vibe" | "about";
const vibeSubmissionUrl = "https://ycnd2i22pji6.feishu.cn/share/base/form/shrcnpdwydtrpMJxp1Ye1vYHffg";

const mainNav: Array<{ view: View; label: string }> = [
  { view: "home", label: "首页" },
  { view: "library", label: "AI 工具库" },
  { view: "advisor", label: "AI 帮我选" },
  { view: "resources", label: "学习资源" },
  { view: "lab", label: "我的 AI 实验室" },
  { view: "vibe", label: "Vibe Coding 大赏" },
];

const resourceGroups = [
  { title: "推荐学习路径", icon: "✦", desc: "按阶段完成从会用 AI 到做出产品的完整升级。", featured: true, href: "https://ycnd2i22pji6.feishu.cn/docx/PrN6dcQozobhHUxIzascU0munSb?from=from_copylink", external: true, meta: "1 条精选路径" },
  { title: "AI 入门", icon: "01", desc: "从真实任务出发，掌握对话、提示词和结果核查。", href: "/learn/ai-basics/", meta: "5 章 · 1 个阶段项目" },
  { title: "AI 提效", icon: "02", desc: "把文档、资料、会议和重复工作交给 AI。", href: "/learn/ai-productivity/", meta: "5 章 · 1 套 AI SOP" },
  { title: "AI 编程与产品开发", icon: "03", desc: "借助 AI 把想法做成网站、应用和可用产品。", href: "/learn/ai-building/", meta: "5 章 · 发布真实产品" },
  { title: "Agent 与工作流", icon: "04", desc: "连接工具、知识库与流程，让 AI 连续完成任务。", href: "/learn/agents/", meta: "5 章 · 设计研究 Agent" },
  { title: "AI 产品与商业化", icon: "05", desc: "从需求、产品验证到获客和可持续变现。", href: "/learn/ai-business/", meta: "5 章 · 完成商业验证" },
];

const realms = [
  ["水", "贵船神社", "水显影"],
  ["鱼", "川越冰川神社", "钓鱼签"],
  ["晴", "气象神社", "晴天娃娃签"],
  ["恋", "布忍神社", "当代恋爱文字签"],
  ["缘", "安井金比罗宫", "切缘与结缘"],
  ["珏", "台北龙山寺", "筊杯确认式求签"],
  ["诗", "黄大仙祠", "签诗与职业解签"],
  ["风", "车公庙", "转风车改运"],
  ["莲", "四马路观音堂", "南洋观音签"],
  ["签", "曼谷龙莲寺", "泰式เซียมซี"],
  ["烟", "胡志明市天后宫", "盘香与越南求签"],
  ["林", "奥孙—奥索博圣林", "Ifá 神谕"],
];

const advisorSteps = [
  {
    key: "task",
    title: "你现在最想用 AI 完成什么？",
    hint: "先选最接近的任务，之后还可以修改。",
    options: ["内容创作", "学习与研究", "工作提效", "求职与成长", "编程与产品", "Agent 与自动化", "商业与营销"],
  },
  {
    key: "scope",
    title: "这是谁要完成的任务？",
    hint: "使用范围会影响协作、安全和部署建议。",
    options: ["我个人使用", "团队共同使用", "企业或正式业务"],
  },
  {
    key: "stage",
    title: "你现在处于哪个阶段？",
    hint: "Ada 会决定先讲方案，还是直接帮你比较工具。",
    options: ["还不知道有哪些方法", "知道几种方法但不会选", "已经知道要找什么工具", "正在寻找现有工具的替代品"],
  },
  {
    key: "setup",
    title: "你希望以什么方式完成？",
    hint: "选择你愿意承担的配置和学习成本。",
    options: ["开箱即用", "可以接受简单配置", "可以写代码", "暂时不确定"],
  },
  {
    key: "priority",
    title: "你最在意什么？",
    hint: "首版请选择最重要的一项，结果页会提供条件切换建议。",
    options: ["效果质量", "操作简单", "完成速度", "免费或低成本", "中文体验", "国内稳定访问", "隐私与数据安全", "可定制性"],
  },
  {
    key: "data",
    title: "任务中包含什么类型的数据？",
    hint: "高敏感数据不会推荐直接上传到普通公共 AI 服务。",
    options: ["公开信息", "普通个人资料", "公司内部资料", "客户或业务数据", "身份、财务或医疗等敏感数据", "不确定"],
  },
] as const;

const taskRecommendations: Record<string, { type: string; tools: string[]; steps: string[]; done: string[] }> = {
  "内容创作": {
    type: "通用 AI 助手 + 垂直创作工具",
    tools: ["豆包 / ChatGPT：梳理内容与初稿", "即梦 AI / Canva：制作视觉素材", "剪映：字幕、包装与成片"],
    steps: ["定义受众与最终发布形式", "用通用 AI 完成结构和初稿", "用垂直工具生成视觉或视频素材", "人工核对事实、风格与版权", "按平台规格完成发布"],
    done: ["内容表达完整且符合目标受众", "事实、引用和版权已经检查", "移动端观看或阅读体验正常"],
  },
  "学习与研究": {
    type: "可溯源搜索 + 长文分析 + 知识整理",
    tools: ["秘塔 AI 搜索 / Perplexity：查找来源", "Kimi / Claude：阅读和比较长资料", "Notion AI：沉淀学习笔记"],
    steps: ["把目标改写成可回答的问题", "优先检索一手资料和可信来源", "对多个来源进行交叉比较", "整理概念、证据与未确定结论", "用练习或输出验证是否掌握"],
    done: ["关键结论都有来源", "能区分事实、推断和观点", "可以用自己的语言完成一次输出"],
  },
  "工作提效": {
    type: "办公 AI + 标准模板 + 可复用工作流",
    tools: ["飞书妙记：会议转写与摘要", "通义听悟 / Kimi：资料归纳", "办公小浣熊：表格与数据分析"],
    steps: ["选出重复频率最高的任务", "明确输入、输出和人工确认点", "先用单一工具跑通一次", "固定提示模板和交付格式", "记录节省时间与错误情况"],
    done: ["同类任务可以重复执行", "结果仍有明确人工复核点", "实际用时或错误率得到改善"],
  },
  "求职与成长": {
    type: "岗位分析 + 材料优化 + 模拟练习",
    tools: ["ChatGPT / 豆包：拆解岗位要求", "Kimi：分析简历与项目材料", "Gamma：制作作品集和项目陈述"],
    steps: ["确定目标岗位与能力差距", "从经历中提取可验证成果", "按岗位要求重写材料", "生成问题并进行模拟面试", "根据真实反馈继续迭代"],
    done: ["简历内容与岗位要求对应", "每段经历都有行动和结果", "能够脱离稿件讲清核心项目"],
  },
  "编程与产品": {
    type: "AI 编程工具 + GitHub 版本管理 + 部署平台",
    tools: ["Trae / Cursor：生成与修改代码", "GitHub：保存完整版本历史", "Cloudflare Pages / Vercel：公开部署"],
    steps: ["写清用户、场景和最小功能", "先生成可以操作的第一版", "将完整源代码纳入版本管理", "进行桌面端和手机端测试", "部署后按真实反馈迭代"],
    done: ["核心流程可以真实使用", "代码与静态资源均已保存", "电脑和手机均能访问", "可以从 GitHub 重新部署"],
  },
  "Agent 与自动化": {
    type: "低代码工作流 / Agent + 知识库 + 人工确认",
    tools: ["Coze 扣子：低门槛智能体", "Dify：知识库与工作流", "FastGPT：可视化知识问答"],
    steps: ["选择一个边界清楚的重复任务", "拆成输入、判断、工具和输出", "准备可靠知识和测试样例", "加入失败处理与人工确认", "使用固定任务集持续评测"],
    done: ["连续任务可以稳定完成", "异常情况不会静默失败", "敏感操作必须经过人工确认"],
  },
  "商业与营销": {
    type: "市场研究 + 内容生产 + 小规模验证",
    tools: ["秘塔 AI 搜索：市场与竞品资料", "ChatGPT / Claude：策略和卖点整理", "Canva / 即梦 AI：营销素材"],
    steps: ["定义具体用户和付费问题", "收集竞品、价格与用户证据", "形成可验证的最小方案", "制作一套真实营销素材", "用点击、咨询或付费验证需求"],
    done: ["目标用户和问题足够具体", "有真实市场证据而非 AI 猜测", "完成至少一次小规模验证"],
  },
};

export default function Home() {
  const [view, setView] = useState<View>("home");
  const [category, setCategory] = useState("全部工具");
  const [query, setQuery] = useState("");
  const [activeQuery, setActiveQuery] = useState("");
  const [searchNotice, setSearchNotice] = useState("");
  const [filter, setFilter] = useState("全部");
  const [selected, setSelected] = useState<Tool | null>(null);
  const [followOpen, setFollowOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [advisorStep, setAdvisorStep] = useState(0);
  const [advisorAnswers, setAdvisorAnswers] = useState<Record<string, string>>({});
  const [advisorDone, setAdvisorDone] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    try {
      // Hydrate the browser-only preference after the first client render.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFavorites(JSON.parse(localStorage.getItem("ada-ai-favorites") || "[]"));
    } catch {}
    if (window.location.hash === "#resources") {
      // Allow learning detail pages to return directly to the resource hub.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setView("resources");
    }
  }, []);

  function toggleFavorite(name: string) {
    const next = favorites.includes(name)
      ? favorites.filter((item) => item !== name)
      : [...favorites, name];
    setFavorites(next);
    localStorage.setItem("ada-ai-favorites", JSON.stringify(next));
  }

  const searchResolution = useMemo(() => resolveSearch(activeQuery), [activeQuery]);

  const filteredTools = useMemo(() => {
    const normalizedActiveQuery = normalizeSearchText(activeQuery);
    const hasExactToolMatch = Boolean(activeQuery) &&
      tools.some((tool) => normalizeSearchText(tool.name) === normalizedActiveQuery);
    const result = tools.filter((tool) => {
      const categoryMatch = category === "全部工具" || tool.category === category;
      const queryMatch = !activeQuery || searchResolution.mode === "intent" ||
        (hasExactToolMatch
          ? normalizeSearchText(tool.name) === normalizedActiveQuery
          : normalizeSearchText([tool.name, tool.desc, tool.category, ...tool.tags].join(" "))
            .includes(normalizedActiveQuery));
      const filterMatch =
        filter === "全部" ||
        (filter === "收藏" && favorites.includes(tool.name)) ||
        tool.tags.includes(filter) ||
        tool.badge === filter;
      return categoryMatch && queryMatch && filterMatch;
    });
    return result.sort(
      (a, b) => searchScore(b, activeQuery, searchResolution) - searchScore(a, activeQuery, searchResolution),
    );
  }, [category, activeQuery, searchResolution, filter, favorites]);

  function resetSearch(nextCategory: CategoryName = "全部工具") {
    setQuery("");
    setActiveQuery("");
    setSearchNotice("");
    setFilter("全部");
    setCategory(nextCategory);
  }

  function selectCategory(nextCategory: CategoryName) {
    resetSearch(nextCategory);
  }

  function applySearch(value: string) {
    const trimmed = value.trim();
    if (!trimmed) {
      resetSearch("全部工具");
      return false;
    }
    const resolution = resolveSearch(trimmed);
    if (resolution.mode === "none") {
      setQuery("");
      setActiveQuery("");
      setCategory("全部工具");
      setFilter("全部");
      setSearchNotice(`暂未识别“${trimmed}”，已为你展示全部 AI 工具`);
      return false;
    }
    setQuery(trimmed);
    setActiveQuery(trimmed);
    setCategory(resolution.category);
    setFilter("全部");
    setSearchNotice(
      resolution.mode === "direct"
        ? `已找到与“${trimmed}”相关的 AI 工具`
        : `已为你定位到「${resolution.category}」，并按相关性推荐工具`,
    );
    return true;
  }

  function enterLibrary(nextCategory: CategoryName = "全部工具") {
    resetSearch(nextCategory);
    setView("library");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function go(nextView: View) {
    setView(nextView);
    setMobileMenu(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function chooseAdvisorAnswer(value: string) {
    const step = advisorSteps[advisorStep];
    const next = { ...advisorAnswers, [step.key]: value };
    setAdvisorAnswers(next);
    if (advisorStep === advisorSteps.length - 1) setAdvisorDone(true);
    else setAdvisorStep(advisorStep + 1);
  }

  function resetAdvisor() {
    setAdvisorStep(0);
    setAdvisorAnswers({});
    setAdvisorDone(false);
  }

  useEffect(() => {
    if (view !== "library") return;
    const trimmed = query.trim();
    if (!trimmed) {
      if (activeQuery) {
        // Clearing the field restores the full catalog immediately.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setActiveQuery("");
        setCategory("全部工具");
        setFilter("全部");
      }
      return;
    }
    if (trimmed === activeQuery) return;
    setSearchNotice("");
    const timer = window.setTimeout(() => applySearch(trimmed), 450);
    return () => window.clearTimeout(timer);
    // applySearch intentionally uses the current component state and runs only
    // after the debounced query changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, activeQuery, view]);

  const recommendation = taskRecommendations[advisorAnswers.task || "编程与产品"];
  const sensitive = ["公司内部资料", "客户或业务数据", "身份、财务或医疗等敏感数据"].includes(advisorAnswers.data);

  return (
    <main>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      {!["home", "library"].includes(view) && (
        <header className="topbar">
          <button className="brand" onClick={() => go("home")} aria-label="返回首页">
            <span className="brand-mark">AI</span><span>Ada <b>AI导航</b></span>
          </button>
          <nav className="desktop-nav" aria-label="主导航">
            {mainNav.map((item) => <button key={item.view} className={view === item.view ? "active" : ""} onClick={() => go(item.view)}>{item.label}</button>)}
          </nav>
          <div className="top-actions">
            <button className="menu-btn" onClick={() => setMobileMenu(!mobileMenu)} aria-label="打开导航菜单">☰</button>
            <button className="follow-btn" onClick={() => setFollowOpen(true)}>关注我 <span>↗</span></button>
          </div>
          {mobileMenu && <nav className="mobile-menu">{mainNav.map((item) => <button key={item.view} onClick={() => go(item.view)}>{item.label}</button>)}<button onClick={() => go("about")}>关于 Ada</button></nav>}
        </header>
      )}

      {view === "home" && (
        <>
          <header className="topbar">
            <button className="brand" onClick={() => setView("home")} aria-label="返回首页">
              <span className="brand-mark">AI</span>
              <span>Ada <b>AI导航</b></span>
            </button>
            <nav className="desktop-nav" aria-label="主导航">
              {mainNav.map((item) => (
                <button key={item.view} className={view === item.view ? "active" : ""} onClick={() => go(item.view)}>{item.label}</button>
              ))}
            </nav>
            <div className="top-actions">
              <button className="menu-btn" onClick={() => setMobileMenu(!mobileMenu)} aria-label="打开导航菜单">☰</button>
              <button className="follow-btn" onClick={() => setFollowOpen(true)}>关注我 <span>↗</span></button>
            </div>
            {mobileMenu && (
              <nav className="mobile-menu" aria-label="移动端主导航">
                {mainNav.map((item) => <button key={item.view} onClick={() => go(item.view)}>{item.label}</button>)}
                <button onClick={() => go("about")}>关于 Ada</button>
              </nav>
            )}
          </header>

          <section className="hero">
            <div className="hero-badge"><span /> 已收录 {tools.length} 款 AI 工具 · 持续更新</div>
            <h1>不只找到工具<br /><span>更找到下一步</span></h1>
            <p>Ada 根据你的目标、基础和约束，帮你选择工具、拆解路径，并把想法真正做出来。</p>
            <div className="dual-entry">
              <button className="entry-card primary" onClick={() => go("advisor")}><small>不知道该怎么选</small><b>让 AI 帮我选</b><span>诊断目标 · 拆解路径 · 推荐工具 →</span></button>
              <button className="entry-card" onClick={() => enterLibrary()}><small>已经知道要找什么</small><b>直接搜索工具</b><span>关键词 · 分类 · 标签筛选 →</span></button>
            </div>
            <form
              className="hero-search"
              onSubmit={(event) => {
                event.preventDefault();
                applySearch(query);
                setView("library");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <span className="search-icon">⌕</span>
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="搜索 AI 工具，例如：生成短视频" />
              <button type="submit">搜索工具 <span>→</span></button>
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
                    <ToolLogo tool={tool} />
                    <div><h3>{tool.name}</h3><p>{tool.desc}</p></div>
                    <span className="card-arrow">↗</span>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="feature-split">
            <article className="feature-panel resource-feature">
              <small>FEATURED LEARNING PATH</small><span className="pill">站长推荐</span>
              <h2>AI 从 0-1 实践实操学习全流程</h2>
              <p>从会使用 AI，到让 AI 替你完成任务，再到做出自己的工具和产品。</p>
              <a href="https://ycnd2i22pji6.feishu.cn/docx/PrN6dcQozobhHUxIzascU0munSb?from=from_copylink" target="_blank" rel="noreferrer">开始学习 ↗</a>
            </article>
            <article className="feature-panel lab-feature">
              <small>ADA AI LAB</small><span className="pill">首个实验 · 东方灵境</span>
              <h2>我的 AI 实验室</h2>
              <p>用 AI 把想法做成真正可以体验的产品。这里收录我独立设计和开发的 AI 工具、互动体验与产品实验。</p>
              <button onClick={() => go("lab")}>进入我的 AI 实验室 →</button>
            </article>
          </section>

          <section className="creator-strip">
            <div>
              <small>COMMUNITY SHOWCASE</small>
              <h2>大家的 Vibe Coding 大赏</h2>
              <p>首个审核通过的作品已经入选，欢迎继续提交你的 Vibe Coding 产品。</p>
            </div>
            <div className="showcase-actions">
              <button className="text-action" onClick={() => go("vibe")}>查看投稿规则</button>
              <a className="big-action" href={vibeSubmissionUrl} target="_blank" rel="noreferrer">立即投稿 ↗</a>
            </div>
          </section>
        </>
      )}
      {view === "library" && (
        <div className="library-layout">
          <aside className="sidebar">
            <button className="brand sidebar-brand" onClick={() => setView("home")}>
              <span className="brand-mark">AI</span><span>Ada <b>AI导航</b></span>
            </button>
            <p className="side-label">发现</p>
            <nav className="side-nav" aria-label="工具分类">
              {categories.map(([name, icon]) => (
                <button key={name} className={category === name ? "active" : ""} onClick={() => selectCategory(name)}>
                  <span>{icon}</span>{name}<i>{name === "全部工具" ? tools.length : tools.filter((tool) => tool.category === name).length}</i>
                </button>
              ))}
            </nav>
            <div className="side-follow">
              <p>关注主理人</p><span>获取 AI 工具实测与教程</span>
              <div className="mini-qr-row">
                {contacts.map((contact) => (
                  <button key={contact.name} className={contact.tone} onClick={() => setFollowOpen(true)} aria-label={`打开${contact.name}二维码`}>
                    {contact.short}
                  </button>
                ))}
              </div>
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
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSearchNotice("");
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") applySearch(query);
                }}
                placeholder="搜索工具、能力或使用场景…"
              />
              {query && <button onClick={() => resetSearch("全部工具")} aria-label="清除搜索">×</button>}
            </div>
            {searchNotice && (
              <div className={`search-feedback ${activeQuery ? "matched" : "fallback"}`} role="status">
                <span>{activeQuery ? "✦" : "ℹ"}</span>
                <p>{searchNotice}</p>
                <button onClick={() => resetSearch("全部工具")}>查看全部工具</button>
              </div>
            )}
            <div className="mobile-categories">
              {categories.map(([name]) => <button key={name} className={category === name ? "active" : ""} onClick={() => selectCategory(name)}>{name}</button>)}
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
                    <ToolLogo tool={tool} />
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
            {!filteredTools.length && <div className="empty"><span>⌕</span><h2>当前筛选下没有工具</h2><p>搜索内容不会阻止你继续浏览，可以随时返回全部工具。</p><button onClick={() => resetSearch("全部工具")}>查看全部工具</button></div>}
          </section>
        </div>
      )}

      {view === "advisor" && (
        <section className="page-shell advisor-page">
          <div className="page-kicker">ADA DECISION GUIDE</div>
          {!advisorDone ? (
            <>
              <div className="advisor-intro">
                <div><h1>不知道该用哪个 AI？</h1><p>回答几个真正会改变推荐结果的问题，Ada 会为你生成一条可执行路径。</p></div>
                <span>{advisorStep + 1} / {advisorSteps.length}</span>
              </div>
              <div className="progress"><i style={{ width: `${((advisorStep + 1) / advisorSteps.length) * 100}%` }} /></div>
              <article className="question-card">
                <small>问题 {advisorStep + 1}</small>
                <h2>{advisorSteps[advisorStep].title}</h2>
                <p>{advisorSteps[advisorStep].hint}</p>
                <div className="answer-grid">
                  {advisorSteps[advisorStep].options.map((option) => <button key={option} onClick={() => chooseAdvisorAnswer(option)}>{option}<span>→</span></button>)}
                </div>
                {advisorStep > 0 && <button className="text-action" onClick={() => setAdvisorStep(advisorStep - 1)}>← 返回上一步</button>}
              </article>
            </>
          ) : (
            <div className="result-wrap">
              <div className="result-head">
                <div><span className="pill">推荐已生成</span><h1>你的 AI 执行路径</h1></div>
                <button className="outline-btn" onClick={resetAdvisor}>重新诊断</button>
              </div>
              <article className="diagnosis-card">
                <small>任务判断</small><h2>{advisorAnswers.task} · {advisorAnswers.scope}</h2>
                <p>你希望以“{advisorAnswers.setup}”的方式完成任务，最看重“{advisorAnswers.priority}”，目前处于“{advisorAnswers.stage}”阶段。</p>
              </article>
              <div className="result-columns">
                <article className="result-card">
                  <small>推荐方案类型</small><h2>{sensitive ? "安全优先的本地 / 企业方案" : recommendation.type}</h2>
                  <p>{sensitive ? "任务涉及非公开数据。请先完成脱敏，优先选择支持私有部署、关闭训练或具备企业数据条款的产品。" : "先确定方案组合，再选择具体品牌，避免被单一热门工具限制。"}</p>
                </article>
                <article className="result-card"><small>候选工具与角色</small><ul>{recommendation.tools.map((item) => <li key={item}>{item}</li>)}</ul></article>
              </div>
              <article className="timeline-card"><small>推荐执行路径</small><ol>{recommendation.steps.map((item, index) => <li key={item}><i>{index + 1}</i><span>{item}</span></li>)}</ol></article>
              <div className="result-columns">
                <article className="result-card warning-card"><small>风险与边界</small><ul><li>{sensitive ? "不要把原始敏感数据上传到普通公共 AI 服务。" : "AI 结果必须进行事实、版权和可用性检查。"}</li><li>免费额度、价格和地区可用性可能变化。</li><li>高风险决策和外部发布保留人工确认。</li></ul></article>
                <article className="result-card"><small>完成标准</small><ul>{recommendation.done.map((item) => <li key={item}>{item}</li>)}</ul></article>
              </div>
              <div className="result-actions"><button onClick={() => enterLibrary()}>查看相关工具</button><button className="outline-btn" onClick={() => navigator.clipboard?.writeText(`${advisorAnswers.task}：${recommendation.steps.join(" → ")}`)}>复制这条路径</button></div>
            </div>
          )}
        </section>
      )}

      {view === "resources" && (
        <section className="page-shell">
          <div className="page-hero"><small>LEARNING RESOURCES</small><h1>一条真正能走完的<br /><span>AI 学习路径</span></h1><p>不追逐工具热点，从真实任务开始，逐步形成可复用的能力和产品。</p></div>
          <article className="learning-feature">
            <div><span className="pill">第一推荐 · 免费公开</span><h2>AI 从 0-1 实践实操学习全流程</h2><p>适合 AI 初学者、大学生和希望系统提升工作能力的人。从对话使用、真实任务实践，到 AI 编程、产品开发与商业化。</p><div className="meta-row"><span>零基础可学</span><span>实践导向</span><span>持续更新</span></div></div>
            <a href="https://ycnd2i22pji6.feishu.cn/docx/PrN6dcQozobhHUxIzascU0munSb?from=from_copylink" target="_blank" rel="noreferrer">打开飞书文档 ↗</a>
          </article>
          <div className="resource-grid">
            {resourceGroups.map((group) => (
              <a
                key={group.title}
                className={`resource-card ${group.featured ? "active" : ""}`}
                href={group.href}
                target={group.external ? "_blank" : undefined}
                rel={group.external ? "noreferrer" : undefined}
              >
                <span>{group.icon}</span>
                <h2>{group.title}</h2>
                <p>{group.desc}</p>
                <small>{group.meta}</small>
                <b>进入学习 <i>→</i></b>
              </a>
            ))}
          </div>
        </section>
      )}

      {view === "lab" && (
        <section className="page-shell">
          <div className="page-hero lab-hero"><small>ADA AI LAB</small><h1>东方灵境</h1><p>Ada AI实验室：用AI把想法做成真正可以体验的产品。</p><div className="hero-note">十二种文化仪式互动体验 · 正式链接准备中</div></div>
          <div className="realm-grid">
            {realms.map(([mark, place, ritual], index) => (
              <article className="realm-card" key={place}><span className="realm-index">{String(index + 1).padStart(2, "0")}</span><div className="realm-mark">{mark}</div><small>{place}</small><h2>{ritual}</h2><p>以文化仪式为灵感的沉浸式互动体验。</p><button disabled>即将开放</button></article>
            ))}
          </div>
        </section>
      )}

      {view === "vibe" && (
        <section className="page-shell">
          <div className="page-hero vibe-hero"><small>COMMUNITY SHOWCASE</small><h1>大家的<br /><span>Vibe Coding 大赏</span></h1><p>每个人都可以用 AI，把自己的想法做成真正能用的产品。</p><a className="big-action" href={vibeSubmissionUrl} target="_blank" rel="noreferrer">提交我的作品 ↗</a></div>
          <section className="vibe-winners">
            <div className="vibe-section-head"><div><small>SELECTED WORK · 001</small><h2>首个审核通过的 Vibe Coding 作品</h2></div><span>人工审核通过</span></div>
            <a className="vibe-product-card" href="https://aixuxie.xyz/landing" target="_blank" rel="noreferrer">
              <div className="vibe-product-cover"><span>AI × EDUCATION</span><strong>高考英语<br />读后续写训练</strong><i>01</i></div>
              <div className="vibe-product-copy">
                <div className="vibe-tags"><span>学习教育</span><span>AI 写作</span><span>支持手机端</span></div>
                <h2>高考英语读后续写训练</h2>
                <p>面向高考英语学习场景的 AI 智能写作指导系统，提供读后续写与应用文的导读、写作训练和批改点评。</p>
                <div className="vibe-product-meta"><span>首个入选作品</span><b>访问产品 ↗</b></div>
              </div>
            </a>
          </section>
          <div className="submission-layout">
            <article className="submission-card"><small>可以投稿</small><h2>真实可访问的 Vibe Coding 产品</h2><ul><li>网站与效率工具</li><li>学习教育与内容创作</li><li>AI Agent 与自动化</li><li>游戏、互动和艺术实验</li></ul></article>
            <article className="submission-card"><small>审核标准</small><h2>先保证真实、安全与可用</h2><ul><li>至少具备一项可使用功能</li><li>介绍真实且拥有发布权</li><li>不存在欺诈、恶意下载和侵权</li><li>链接可以稳定访问</li></ul></article>
          </div>
          <article className="form-template">
            <div><small>HOW TO SUBMIT</small><h2>三步完成投稿</h2><p>打开飞书报名表，填写作品信息并提交。审核通过后，作品将在大赏中公开展示。</p><a className="big-action" href={vibeSubmissionUrl} target="_blank" rel="noreferrer">前往飞书投稿 ↗</a></div>
            <div className="field-cloud">{["作品名称", "作品链接", "一句话介绍", "详细介绍", "作品分类", "作者昵称", "作者主页", "作品封面", "使用的 AI 工具", "免费 / 付费", "手机端支持", "审核联系方式", "发布权确认", "展示授权"].map((field) => <span key={field}>{field}</span>)}</div>
          </article>
          <p className="legal-note">Ada AI导航仅提供作品展示与导航，不对第三方产品的数据安全、服务质量和交易行为作保证。访问和使用前请自行判断风险。</p>
        </section>
      )}

      {view === "about" && (
        <section className="page-shell about-page">
          <div className="page-hero"><small>ABOUT ADA</small><h1>把 AI 真正用起来</h1><p>Ada 持续整理工具、学习路径和产品实践，帮助更多人从“知道 AI”走到“做出成果”。</p></div>
          <div className="about-grid">
            <article><span>AI</span><h2>Ada AI导航</h2><p>帮助你判断下一步该做什么、为什么、用什么，以及如何判断完成。</p></article>
            <article className="support-card"><span>☕</span><h2>支持本站持续更新</h2><p>微信赞赏码将在这里展示。赞赏完全自愿，不影响网站任何功能。</p><div className="qr-placeholder"><b>微信赞赏码</b><small>占位符 · 待替换</small></div></article>
          </div>
        </section>
      )}

      {selected && (
        <div className="modal-backdrop" onMouseDown={() => setSelected(null)}>
          <section className="tool-modal" onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <button className="modal-close" onClick={() => setSelected(null)}>×</button>
            <div className="modal-title"><ToolLogo tool={selected} /><div><small>{selected.category}</small><h2>{selected.name}</h2></div></div>
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
            <h2>在你常用的平台找到我</h2>
            <p>持续分享 AI 工具实测、零基础教程、工作流和成长记录。</p>
            <div className="qr-grid">
              {contacts.map((contact) => (
                <article className={`qr-card ${contact.tone}`} key={contact.name}>
                  <div className="qr-card-head">
                    <span>{contact.short}</span>
                    <div><b>{contact.name}</b><small>{contact.account}</small></div>
                  </div>
                  <button
                    className="qr-image"
                    onClick={() => window.open(contact.image, "_blank", "noopener,noreferrer")}
                    aria-label={`放大查看${contact.name}二维码`}
                  >
                    <img src={contact.image} alt={`${contact.name}关注二维码`} />
                  </button>
                  <p>{contact.note}</p>
                  <span className="qr-tip">点击二维码可放大 · 长按可保存</span>
                </article>
              ))}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

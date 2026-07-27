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
  { name: "66 论文", domain: "66paper.cn", category: "写作办公", desc: "提供论文选题、结构与写作辅助的 AI 学术工具。", tags: ["国产可用", "付费"] },
  { name: "千笔 AI 论文", domain: "qianbixiezuo.com", category: "写作办公", desc: "面向中文论文场景的结构生成与写作辅助平台。", tags: ["国产可用", "付费"] },
  { name: "Aibiye", domain: "aibiye.com", category: "写作办公", desc: "毕业论文、开题报告与文献写作辅助工具。", tags: ["国产可用", "付费"] },
  { name: "PaperFake", domain: "paperfake.cn", category: "写作办公", desc: "论文检测、降重与学术写作辅助平台。", tags: ["国产可用", "付费"] },
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
  { name: "PromptHero", domain: "prompthero.com", category: "学习资源", desc: "搜索和学习主流生成式 AI 提示词的社区平台。", tags: ["海外", "免费"] },
  { name: "Prompt Engineering Guide", domain: "promptingguide.ai", category: "学习资源", desc: "系统学习提示工程、模型能力与实践方法的开放教程。", tags: ["海外", "免费"] },
  { name: "Prompt123", domain: "prompt123.cn", category: "学习资源", desc: "中文 AI 提示词导航、案例与学习社区。", tags: ["国产可用", "免费"] },
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

function logoUrl(domain: string) {
  const clean = domain.split("/")[0];
  return `https://www.google.com/s2/favicons?domain_url=https://${clean}&sz=128`;
}

function ToolLogo({ tool }: { tool: Tool }) {
  const [failed, setFailed] = useState(false);
  return (
    <span className="tool-logo">
      {!failed && (
        <img
          src={logoUrl(tool.domain)}
          alt={`${tool.name} logo`}
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
        />
      )}
      {failed && <b aria-hidden="true">{tool.name.replace(/\s/g, "").slice(0, 2)}</b>}
    </span>
  );
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
            <div className="hero-badge"><span /> 已收录 {tools.length} 款 AI 工具 · 持续更新</div>
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
                    <ToolLogo tool={tool} />
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
              {contacts.map((contact) => (
                <button key={contact.name} className={contact.tone} onClick={() => setFollowOpen(true)}>
                  <i>{contact.short}</i>{contact.name}<span>扫码关注</span>
                </button>
              ))}
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
            {!filteredTools.length && <div className="empty"><span>⌕</span><h2>没有找到匹配工具</h2><p>换个关键词或清除筛选后再试试。</p><button onClick={() => {setQuery("");setFilter("全部");setCategory("全部工具");}}>查看全部工具</button></div>}
          </section>
        </div>
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

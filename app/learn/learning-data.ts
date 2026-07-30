export type LearningChapter = {
  title: string;
  concept: string;
  why: string;
  example: string;
  practice: string;
  done: string;
};

export type LearningResource = {
  name: string;
  provider: string;
  description: string;
  meta: string[];
  url: string;
};

export type LearningStage = {
  slug: string;
  number: string;
  eyebrow: string;
  title: string;
  summary: string;
  audience: string;
  duration: string;
  outcome: string;
  route: string[];
  chapters: LearningChapter[];
  project: {
    title: string;
    description: string;
    steps: string[];
    deliverables: string[];
  };
  checklist: string[];
  resources: LearningResource[];
};

export const feishuLearningUrl =
  "https://ycnd2i22pji6.feishu.cn/docx/PrN6dcQozobhHUxIzascU0munSb?from=from_copylink";

export const vibeSubmissionUrl =
  "https://ycnd2i22pji6.feishu.cn/share/base/form/shrcnpdwydtrpMJxp1Ye1vYHffg";

export const learningStages: LearningStage[] = [
  {
    slug: "ai-basics",
    number: "01",
    eyebrow: "AI BASICS",
    title: "AI 入门",
    summary: "不从复杂技术名词开始，先学会判断任务、正确对话和检查结果。",
    audience: "零基础、文科生、大学生和第一次系统学习 AI 的人",
    duration: "2–3 小时",
    outcome: "独立使用 AI 完成一项有来源、有检查的真实任务",
    route: ["认识 AI", "描述任务", "提供上下文", "检查结果", "完成作品"],
    chapters: [
      {
        title: "先分清模型、工具与应用",
        concept: "模型是底层能力，工具是使用模型的入口，应用是把能力放进具体业务场景。普通人不需要先研究所有模型参数，而要先判断自己想完成什么。",
        why: "如果把模型榜单当成学习主线，很容易一直比较工具却没有真正完成任务。",
        example: "写一份调研报告时，大模型负责理解与生成；ChatGPT、豆包等是工具入口；“竞品调研助手”则是面向具体场景的应用。",
        practice: "从你最近使用过的三个 AI 产品中，各写一句：它是什么工具、解决什么场景、最终交付什么结果。",
        done: "能用自己的话解释模型、工具和应用的区别，并根据任务而不是热度选择入口。",
      },
      {
        title: "把模糊想法改成清晰任务",
        concept: "有效任务至少包含目标、背景、材料、限制和输出格式。AI 不知道你没有告诉它的信息。",
        why: "“帮我写一个方案”通常只会得到泛泛答案；清晰任务能显著减少反复修改。",
        example: "把“写活动方案”改为“面向 200 名应届生，设计一场 90 分钟 AI 入门活动，预算 3000 元，输出流程、物料和风险清单”。",
        practice: "选择今天的一项真实任务，按照目标、背景、材料、限制、格式五项重写需求。",
        done: "AI 第一版结果可以直接作为草稿，而不是只有空泛观点。",
      },
      {
        title: "用上下文和示例提高质量",
        concept: "上下文告诉 AI 你的真实情况，示例告诉 AI 什么叫“符合要求”。一段好示例往往比很多形容词更有效。",
        why: "没有上下文的回答只能依赖通用概率，无法理解你的用户、语气、已有资料和真实约束。",
        example: "要求 AI 写口播稿时，同时提供受众、时长、已有观点，以及一段你满意的历史文案作为风格参考。",
        practice: "为上一章的任务补充一份参考材料和一个正反示例，再比较两次输出差异。",
        done: "能够明确指出加入哪段上下文后，结果的准确性或风格一致性得到提升。",
      },
      {
        title: "检查幻觉、来源与边界",
        concept: "AI 输出是候选答案，不是天然正确的事实。数字、引用、法规、医疗、金融和重要决策必须回到原始来源确认。",
        why: "表达流畅会让错误更难被发现。真正会用 AI 的人必须保留验证步骤。",
        example: "让 AI 总结行业数据后，逐条打开原始报告，检查年份、样本范围、统计口径和链接是否真实。",
        practice: "找一段包含五个事实的 AI 输出，为每个事实标注“已验证、待验证或无法验证”。",
        done: "能区分观点与事实，并为高风险内容保留人工确认。",
      },
      {
        title: "完成第一个端到端任务",
        concept: "学习 AI 的最小闭环不是看完教程，而是完成“输入材料—生成草稿—检查—修改—交付”。",
        why: "只有完整交付才能暴露任务描述、资料质量和验收标准中的真实问题。",
        example: "围绕一个熟悉主题，完成资料搜集、结构整理、初稿生成、事实核查和最终发布稿。",
        practice: "选择一项 30 分钟内能完成的小任务，保存原始需求、第一版结果、修改意见和最终成果。",
        done: "最终成果可被自己或他人实际使用，并能复盘 AI 帮助了哪一步。",
      },
    ],
    project: {
      title: "完成一次有证据的 AI 研究任务",
      description: "围绕一个你真实关心的问题，完成从资料搜集到最终交付的完整过程。",
      steps: ["定义问题与受众", "提供背景和可信材料", "生成结构与初稿", "逐项核查事实", "整理最终成果与复盘"],
      deliverables: ["一份清晰的任务说明", "一份带来源的最终成果", "一页过程复盘"],
    },
    checklist: ["我能按任务选择工具", "我能提供必要上下文", "我会要求可核查来源", "我不会直接相信高风险答案", "我完成过至少一个真实交付"],
    resources: [
      {
        name: "AI Foundations",
        provider: "OpenAI Academy",
        description: "学习 AI、大语言模型和 ChatGPT 基础，并练习清晰指令、上下文、结果复核与负责任使用。",
        meta: ["官方", "英文", "入门"],
        url: "https://academy.openai.com/",
      },
      {
        name: "Introduction to Machine Learning",
        provider: "Google for Developers",
        description: "用较短时间理解机器学习的基本类型，以及机器学习问题和传统程序问题的区别。",
        meta: ["官方", "支持中文", "选学"],
        url: "https://developers.google.com/machine-learning/intro-to-ml",
      },
      {
        name: "AI 从 0-1 实践实操学习全流程",
        provider: "Ada",
        description: "以中文真实任务为主线，从会使用 AI 逐步走向产品实践。",
        meta: ["中文", "免费", "主路径"],
        url: feishuLearningUrl,
      },
    ],
  },
  {
    slug: "ai-productivity",
    number: "02",
    eyebrow: "AI PRODUCTIVITY",
    title: "AI 提效",
    summary: "把文档、资料、会议和重复工作交给 AI，同时保留可靠的人工检查点。",
    audience: "学生、职场新人、内容创作者和需要处理大量信息的人",
    duration: "3–4 小时",
    outcome: "把一项重复工作改造成可复用、可检查的 AI 工作流",
    route: ["盘点任务", "拆解步骤", "设计模板", "设置检查", "重复运行"],
    chapters: [
      {
        title: "先找到值得自动化的任务",
        concept: "优先选择高频、规则相对稳定、输入输出明确、出错风险可控的任务。",
        why: "并非所有工作都适合 AI。错误地自动化低频或高风险任务，维护成本可能高于节省的时间。",
        example: "每周整理会议纪要适合模板化；最终绩效决定不适合完全交给 AI。",
        practice: "列出本周十项任务，按频率、耗时、规则稳定度和风险各打 1–5 分。",
        done: "选出一个高频、低风险、可明确验收的提效目标。",
      },
      {
        title: "把复杂工作拆成稳定步骤",
        concept: "把工作拆成输入、处理、检查和输出。每一步只解决一个明确问题。",
        why: "一次性让 AI 完成复杂任务，出错后很难定位；分步流程更容易复用和修改。",
        example: "会议处理可拆为转写、提取决定、识别待办、补齐负责人、人工确认和分发。",
        practice: "把目标任务画成 4–7 个步骤，并标注每一步需要的材料和产出。",
        done: "任何同事都能按照步骤复现，而不是依赖你临场解释。",
      },
      {
        title: "建立可复用的输入模板",
        concept: "模板应包含固定指令、可替换变量、输出格式和质量标准，而不只是收藏一句提示词。",
        why: "可复用模板能减少每次重新描述需求，也能让多次结果保持一致。",
        example: "周报模板固定包含本周目标、完成情况、数据证据、风险、下周计划和需要支持。",
        practice: "把一次成功对话改造成模板，用方括号标出每次需要替换的变量。",
        done: "换一份新材料后，模板仍能产出结构一致的结果。",
      },
      {
        title: "给工作流设置人工检查点",
        concept: "在来源、判断、敏感信息和对外发布前保留人工确认，避免错误一路传递。",
        why: "自动化越长，前面的小错误越可能在后面放大。",
        example: "AI 提取会议待办后，先由参会者确认负责人和截止时间，再写入项目看板。",
        practice: "为你的流程标记三个位置：AI 可自动执行、必须人工检查、禁止交给公共 AI。",
        done: "能说明每个检查点防止什么风险，以及谁负责确认。",
      },
      {
        title: "用数据判断是否真的提效",
        concept: "提效需要比较运行前后的耗时、返工次数、准确率和主观负担。",
        why: "“感觉更快”可能只是把时间从执行转移到了修改和检查。",
        example: "连续运行三次会议流程，记录原耗时、AI 处理时间、人工校对时间和遗漏数量。",
        practice: "为流程建立一个最小记录表，至少跟踪三次运行。",
        done: "能够用数据说明节省了多少时间，以及仍需优化的环节。",
      },
    ],
    project: {
      title: "把一项重复工作改造成 AI SOP",
      description: "选择你每周都会做的任务，建立可复用模板、人工检查点和提效指标。",
      steps: ["选择高频低风险任务", "绘制当前流程", "设计 AI 模板", "加入人工检查点", "运行三次并比较数据"],
      deliverables: ["一张工作流图", "一份可复制模板", "三次运行记录与优化结论"],
    },
    checklist: ["任务边界清楚", "输入输出可重复", "模板变量明确", "关键节点有人确认", "有运行前后数据"],
    resources: [
      {
        name: "Applied AI Foundations",
        provider: "OpenAI Academy",
        description: "把重复任务拆成可复用流程，识别 ChatGPT 可介入的位置并设置复核节点。",
        meta: ["官方", "英文", "实践"],
        url: "https://academy.openai.com/",
      },
      {
        name: "Prompt Engineering Guide",
        provider: "OpenAI",
        description: "了解如何通过清晰指令、上下文、示例和结构化输出提高任务稳定性。",
        meta: ["官方", "英文", "参考"],
        url: "https://platform.openai.com/docs/guides/prompt-engineering",
      },
      {
        name: "AI 从 0-1 实践实操学习全流程",
        provider: "Ada",
        description: "从真实工作任务出发练习对话、文档处理和可复用流程。",
        meta: ["中文", "免费", "主路径"],
        url: feishuLearningUrl,
      },
    ],
  },
  {
    slug: "ai-building",
    number: "03",
    eyebrow: "AI BUILDING",
    title: "AI 编程与产品开发",
    summary: "不会编程也可以从小产品开始，用 AI 把想法做成真正可访问的网页和工具。",
    audience: "产品经理、文科生、独立创作者和第一次做产品的人",
    duration: "6–10 小时",
    outcome: "完成一个手机和电脑都能使用、可以公开分享的小产品",
    route: ["定义问题", "写清需求", "生成原型", "测试修改", "部署发布"],
    chapters: [
      {
        title: "从用户问题而不是功能开始",
        concept: "先明确谁在什么场景遇到什么问题，再决定做网页、工具、Agent 或内容产品。",
        why: "“做一个 AI App”不是需求。没有清晰问题，AI 只会生成看起来完整但没人使用的功能集合。",
        example: "把“做学习 App”改成“帮助高三学生把错题按遗忘程度排出今日复习顺序”。",
        practice: "用一句话写出目标用户、使用场景、核心问题和现有替代方案。",
        done: "陌生人读完能理解为什么需要这个产品，而不是只看到技术名词。",
      },
      {
        title: "把需求写成 AI 能执行的规格",
        concept: "规格包含页面、内容、交互、数据、边界、响应式要求和验收标准。",
        why: "需求越模糊，生成结果越依赖随机猜测；清楚的规格能跨多轮开发保持一致。",
        example: "描述按钮时不仅写“好看”，还要写位置、文案、点击行为、加载状态和手机端表现。",
        practice: "为产品写一页最小 PRD，列出必须有、可以晚点做和明确不做。",
        done: "每个功能都能通过实际操作判断是否完成。",
      },
      {
        title: "用 Vibe Coding 完成第一个版本",
        concept: "Vibe Coding 不是完全不看代码，而是用自然语言指导 AI 规划、实现、解释和修改，并由人掌握目标与验收。",
        why: "一次性要求“做完整 App”难以控制质量；小步实现能减少上下文丢失和连锁错误。",
        example: "先完成静态首页，再加入交互，再处理移动端，最后接入数据，而不是一次生成全部。",
        practice: "让 AI 先输出实施计划，再只实现第一块可见功能，并解释文件变化。",
        done: "能够独立描述修改需求、看懂基本文件结构并恢复到上一个可用版本。",
      },
      {
        title: "测试、描述 Bug 与持续修改",
        concept: "好的 Bug 描述包括环境、操作步骤、实际结果、预期结果、截图和控制台信息。",
        why: "“这里坏了”无法帮助 AI 定位问题，也容易让修复破坏其他功能。",
        example: "记录“iPhone Safari 点击投稿后无响应”，而不是笼统写“手机端不行”。",
        practice: "分别用电脑和手机完成三条核心路径，建立问题清单并逐个复测。",
        done: "核心路径无阻塞，文字不溢出，按钮可触达，失败状态有提示。",
      },
      {
        title: "用 GitHub 管理版本并部署",
        concept: "Git 保存可回退的历史，部署平台把指定版本发布到互联网。测试分支和生产分支要分开。",
        why: "没有版本管理时，一次错误修改可能丢失整个可用版本；直接改生产站也会影响真实用户。",
        example: "先在测试分支生成预览，确认后合并 main，再由 Vercel 或 Cloudflare 自动发布。",
        practice: "为项目建立仓库、测试分支和生产分支，完成一次预览—确认—发布流程。",
        done: "产品有稳定正式地址、完整源码、构建配置和可追溯提交记录。",
      },
    ],
    project: {
      title: "发布一个可使用的 Vibe Coding 产品",
      description: "围绕一个真实小问题，完成需求、实现、测试、版本管理和公开部署。",
      steps: ["写一句话问题定义", "完成最小 PRD", "分阶段生成页面", "电脑与手机测试", "测试确认后正式发布"],
      deliverables: ["可公开访问的产品链接", "GitHub 源码仓库", "功能说明与测试清单"],
    },
    checklist: ["问题真实明确", "MVP 范围可控", "主要交互可用", "手机电脑均已测试", "源码和版本历史完整"],
    resources: [
      {
        name: "Developer Quickstart",
        provider: "OpenAI",
        description: "从第一次 API 调用开始，了解文本、图片、文件与 Agent 应用的基本开发方式。",
        meta: ["官方", "英文", "开发"],
        url: "https://platform.openai.com/docs/quickstart",
      },
      {
        name: "Spec-Driven Development with Coding Agents",
        provider: "DeepLearning.AI",
        description: "学习用规格、计划、实施和验证流程控制 Coding Agent，减少上下文债务。",
        meta: ["英文", "课程", "进阶"],
        url: "https://www.deeplearning.ai/courses/spec-driven-development-with-coding-agents",
      },
      {
        name: "提交 Vibe Coding 作品",
        provider: "Ada AI导航",
        description: "完成产品后提交到“大家的 Vibe Coding 大赏”，通过审核后公开展示。",
        meta: ["中文", "作品展示", "人工审核"],
        url: vibeSubmissionUrl,
      },
    ],
  },
  {
    slug: "agents",
    number: "04",
    eyebrow: "AGENTS & WORKFLOWS",
    title: "Agent 与工作流",
    summary: "连接工具、知识和判断步骤，让 AI 连续完成任务，同时保持过程可控。",
    audience: "已经会使用 AI，希望处理多步骤任务或构建智能体的人",
    duration: "5–8 小时",
    outcome: "设计一个包含工具、分支、人工确认和评测的 Agent 流程",
    route: ["判断模式", "拆解流程", "连接工具", "加入控制", "评测迭代"],
    chapters: [
      {
        title: "先判断 Chat、Workflow 还是 Agent",
        concept: "Chat 适合即时交流；Workflow 适合步骤固定的重复任务；Agent 适合需要根据环境动态决策和调用工具的任务。",
        why: "把简单任务做成 Agent 会增加成本和不确定性，把动态任务硬写成固定流程又会失去适应能力。",
        example: "润色一段文字用 Chat；每周报告生成用 Workflow；跨多个来源持续研究并选择下一步可用 Agent。",
        practice: "为五项任务分别选择 Chat、Workflow 或 Agent，并写出判断依据。",
        done: "选择模式时考虑任务变化、工具数量、风险和可预测性。",
      },
      {
        title: "设计状态、步骤与条件分支",
        concept: "工作流需要明确当前状态、下一步条件、成功结果、失败处理和最大循环次数。",
        why: "没有停止条件的 Agent 可能重复调用工具、消耗成本或做出越权操作。",
        example: "研究流程在来源少于三个时继续搜索，来源足够后进入总结，外部发布前等待人工确认。",
        practice: "画出一个包含至少一个条件分支、一个重试和一个人工确认的流程图。",
        done: "每个节点都有输入、输出、负责人和退出条件。",
      },
      {
        title: "工具调用、知识库与 RAG",
        concept: "工具让 Agent 执行动作；知识库提供可信材料；RAG 在生成前检索相关内容并带入上下文。",
        why: "仅靠模型记忆无法保证企业资料和实时信息准确，工具权限过大又会带来安全风险。",
        example: "客服 Agent 先检索最新政策，再生成答案；退款操作必须调用受限工具并由人工批准。",
        practice: "为你的流程列出每个工具需要读取和写入的最小权限。",
        done: "能说明哪些知识应检索、哪些动作需工具、哪些权限不能开放。",
      },
      {
        title: "加入人工确认和安全边界",
        concept: "高风险、不可逆、涉及隐私或对外发布的动作必须设置确认或审批。",
        why: "Agent 的价值是减少重复劳动，不是把责任和控制权全部交给模型。",
        example: "Agent 可以起草邮件，但发送给客户前由负责人确认收件人、附件和措辞。",
        practice: "给流程标注敏感数据、外部写入、资金、删除和公开发布节点。",
        done: "任何不可逆操作都有清晰的授权人和取消路径。",
      },
      {
        title: "用评测和日志持续迭代",
        concept: "评测既看最终答案，也看工具选择、步骤路径、失败恢复、耗时和成本。",
        why: "只凭一次演示无法判断 Agent 是否稳定，问题也可能隐藏在中间步骤。",
        example: "为研究 Agent 准备 20 个测试任务，记录来源准确率、完成率、人工接管率和平均成本。",
        practice: "建立至少 10 条测试集，定义成功、部分成功和失败的判定规则。",
        done: "每次修改后能用同一测试集比较，而不是依赖主观感觉。",
      },
    ],
    project: {
      title: "设计一个可控的研究 Agent",
      description: "让 Agent 搜集多个来源、整理证据并生成报告，同时加入人工确认和评测。",
      steps: ["定义输入和最终报告", "设计搜索与筛选步骤", "加入来源要求", "设置人工确认", "用测试集评估"],
      deliverables: ["一张 Agent 流程图", "工具和权限清单", "十条评测样例与结果"],
    },
    checklist: ["模式选择合理", "流程有停止条件", "工具权限最小化", "高风险操作需确认", "有稳定测试集和日志"],
    resources: [
      {
        name: "Agents and Workflows",
        provider: "OpenAI Academy",
        description: "练习为 Agent 提供上下文、定义输出和边界、复核草稿并复用有效流程。",
        meta: ["官方", "英文", "实践"],
        url: "https://academy.openai.com/",
      },
      {
        name: "Building Agentic RAG with LlamaIndex",
        provider: "DeepLearning.AI",
        description: "通过文档检索、工具调用和推理循环构建研究型 Agent。",
        meta: ["英文", "代码示例", "进阶"],
        url: "https://www.deeplearning.ai/alpha/short-courses/building-agentic-rag-with-llamaindex",
      },
      {
        name: "Evaluating AI Agents",
        provider: "DeepLearning.AI",
        description: "学习 Agent 可观测性、组件评测、LLM-as-a-Judge 和实验迭代。",
        meta: ["英文", "评测", "课程"],
        url: "https://www.deeplearning.ai/courses/evaluating-ai-agents",
      },
    ],
  },
  {
    slug: "ai-business",
    number: "05",
    eyebrow: "AI PRODUCT & BUSINESS",
    title: "AI 产品与商业化",
    summary: "从真实需求、产品验证到第一批用户，让作品逐步变成可持续的产品资产。",
    audience: "独立开发者、产品经理、内容创作者和希望用 AI 变现的人",
    duration: "5–8 小时",
    outcome: "完成一套产品验证、介绍、定价和首批用户获取方案",
    route: ["发现问题", "验证需求", "定义 MVP", "获得用户", "数据迭代"],
    chapters: [
      {
        title: "从真实问题寻找产品机会",
        concept: "好的 AI 产品不是在旧产品上加聊天框，而是在 AI 能力变化后重新设计任务完成方式。",
        why: "技术新颖不等于用户愿意改变行为或付费，问题的频率和强度更重要。",
        example: "用户需要的不是“AI 错题本”，而是每天自动告诉他最应该复习哪几道题并验证是否真正掌握。",
        practice: "记录五个你或身边人反复遇到的问题，标注频率、损失和现有解决方式。",
        done: "选择的问题有具体人群、真实场景和可观察的现有行为。",
      },
      {
        title: "先验证需求，再扩大开发",
        concept: "通过访谈、原型、人工服务或落地页验证用户是否愿意投入时间、数据或金钱。",
        why: "口头说“不错”不代表真实需求，实际行动比态度反馈更可信。",
        example: "在开发完整家教平台前，先用表单和人工流程帮助十名学生生成个性化复习计划。",
        practice: "设计五个不引导答案的用户问题，并邀请三个目标用户访谈。",
        done: "记录真实过去行为、付出和替代方案，而不只收集未来意愿。",
      },
      {
        title: "定义最小可验证产品",
        concept: "MVP 只保留验证核心假设所需的最少功能，其他能力进入后续清单。",
        why: "功能过多会延长周期，也让你无法判断用户究竟为什么留下或离开。",
        example: "错题产品第一版只做拍照收题、今日抽题和掌握验证，不先做社区和积分商城。",
        practice: "把功能分成必须有、应该有、以后再做、明确不做四组。",
        done: "两周内可以完成并交给真实用户，而不是无限扩展。",
      },
      {
        title: "设计商业模式和首批用户路径",
        concept: "商业模式需要同时回答谁付费、为什么付费、何时付费、按什么计价以及如何持续交付价值。",
        why: "广告、订阅、买断和服务的成本结构不同，不能在产品完成后才临时决定。",
        example: "免费提供基础学习路径，用付费模板、工具会员或企业定制承接不同用户价值。",
        practice: "为产品写三个价格假设，并说明每个价格对应的用户、权益和交付成本。",
        done: "定价能与用户获得的结果和你的持续成本对应。",
      },
      {
        title: "用行为数据推动下一版",
        concept: "关注激活、完成核心任务、留存、转化和推荐，而不是只看访问量。",
        why: "访问量说明有人进来，核心任务完成率才说明产品是否真的创造价值。",
        example: "导航站不仅看 PV，还看搜索使用率、工具点击率、学习路径完成率和投稿转化。",
        practice: "定义一个北极星指标和四个过程指标，并写出指标变化后的行动。",
        done: "每个指标都能对应一个产品判断，而不是为了报表而收集。",
      },
    ],
    project: {
      title: "完成一套最小商业验证",
      description: "为一个 AI 产品建立问题证据、MVP、定价假设和首批用户获取路径。",
      steps: ["访谈三个目标用户", "整理问题证据", "定义 MVP", "制作产品介绍页", "邀请首批用户试用并记录行为"],
      deliverables: ["需求验证记录", "MVP 范围表", "产品介绍与定价假设", "第一轮数据复盘"],
    },
    checklist: ["问题来自真实行为", "核心假设可验证", "MVP 范围明确", "商业模式能覆盖成本", "下一版由数据驱动"],
    resources: [
      {
        name: "AI 从 0-1 实践实操学习全流程",
        provider: "Ada",
        description: "从工具使用、产品实践到商业化，建立适合普通人的中文行动路线。",
        meta: ["中文", "免费", "主路径"],
        url: feishuLearningUrl,
      },
      {
        name: "ChatGPT for Small Businesses",
        provider: "OpenAI Academy",
        description: "了解小型团队如何把 ChatGPT 用于真实业务、内容、流程和客户场景。",
        meta: ["官方", "英文", "案例"],
        url: "https://academy.openai.com/",
      },
      {
        name: "Google for Startups",
        provider: "Google",
        description: "面向创业者的产品、增长、技术与商业资源，适合作为产品验证后的延伸阅读。",
        meta: ["官方", "英文", "选学"],
        url: "https://startup.google.com/",
      },
    ],
  },
];

export function getLearningStage(slug: string) {
  return learningStages.find((stage) => stage.slug === slug)!;
}

import type { LearningStage } from "./learning-data";
import { feishuLearningUrl, learningStages, vibeSubmissionUrl } from "./learning-data";

export default function LearningPage({ stage }: { stage: LearningStage }) {
  const stageIndex = learningStages.findIndex((item) => item.slug === stage.slug);
  const previous = learningStages[stageIndex - 1];
  const next = learningStages[stageIndex + 1];

  return (
    <main className={`learning-page learning-${stage.slug}`}>
      <header className="learning-topbar">
        <a className="brand" href="/#resources" aria-label="返回 Ada AI导航学习资源">
          <span className="brand-mark">AI</span>
          <span>Ada <b>AI导航</b></span>
        </a>
        <nav>
          <a href="/#resources">学习资源</a>
          <a href={feishuLearningUrl} target="_blank" rel="noreferrer">完整教程 ↗</a>
        </nav>
      </header>

      <section className="learning-hero">
        <div className="learning-number">{stage.number}</div>
        <div className="learning-hero-copy">
          <small>{stage.eyebrow}</small>
          <h1>{stage.title}</h1>
          <p>{stage.summary}</p>
          <div className="learning-meta">
            <span>适合人群：{stage.audience}</span>
            <span>建议用时：{stage.duration}</span>
          </div>
          <div className="learning-outcome"><b>学完你将做到</b><span>{stage.outcome}</span></div>
        </div>
        <a className="learning-start" href="#chapter-1">开始学习 ↓</a>
      </section>

      <section className="learning-map" aria-label="五阶段学习地图">
        {learningStages.map((item, index) => (
          <a className={item.slug === stage.slug ? "active" : index < stageIndex ? "passed" : ""} href={`/learn/${item.slug}/`} key={item.slug}>
            <i>{index < stageIndex ? "✓" : item.number}</i>
            <span>{item.title}</span>
          </a>
        ))}
      </section>

      <section className="learning-route">
        <small>本阶段路径</small>
        <div>{stage.route.map((item, index) => <span key={item}><i>{index + 1}</i>{item}</span>)}</div>
      </section>

      <div className="learning-layout">
        <aside className="learning-toc">
          <small>本页目录</small>
          <ol>
            {stage.chapters.map((chapter, index) => (
              <li key={chapter.title}><a href={`#chapter-${index + 1}`}><i>{String(index + 1).padStart(2, "0")}</i>{chapter.title}</a></li>
            ))}
          </ol>
          <a className="toc-project" href="#stage-project">阶段项目</a>
          <a className="toc-back" href="/#resources">← 返回学习资源</a>
        </aside>

        <article className="learning-content">
          {stage.chapters.map((chapter, index) => (
            <section className="learning-chapter" id={`chapter-${index + 1}`} key={chapter.title}>
              <div className="chapter-heading"><span>{String(index + 1).padStart(2, "0")}</span><div><small>CHAPTER</small><h2>{chapter.title}</h2></div></div>
              <div className="chapter-block">
                <h3>你需要理解什么</h3>
                <p>{chapter.concept}</p>
              </div>
              <div className="chapter-grid">
                <div><h3>为什么重要</h3><p>{chapter.why}</p></div>
                <div><h3>具体案例</h3><p>{chapter.example}</p></div>
              </div>
              <div className="practice-card">
                <span>立即实践</span>
                <h3>{chapter.practice}</h3>
                <p><b>完成标准</b>{chapter.done}</p>
              </div>
            </section>
          ))}

          <section className="stage-project" id="stage-project">
            <small>STAGE PROJECT</small>
            <h2>{stage.project.title}</h2>
            <p>{stage.project.description}</p>
            <div className="project-columns">
              <div><h3>执行步骤</h3><ol>{stage.project.steps.map((item) => <li key={item}>{item}</li>)}</ol></div>
              <div><h3>最终交付</h3><ul>{stage.project.deliverables.map((item) => <li key={item}>{item}</li>)}</ul></div>
            </div>
            {stage.slug === "ai-building" && <a href={vibeSubmissionUrl} target="_blank" rel="noreferrer">完成后投稿 Vibe Coding 大赏 ↗</a>}
          </section>

          <section className="completion-card">
            <small>完成检查</small>
            <h2>这一阶段，你应该已经做到</h2>
            <div>{stage.checklist.map((item) => <span key={item}>✓ {item}</span>)}</div>
          </section>

          <section className="external-resources">
            <div className="learning-section-head"><small>OFFICIAL RESOURCES</small><h2>官方延伸学习</h2><p>站内负责中文解释和实践闭环，外部资源用于继续深入。</p></div>
            <div className="official-grid">
              {stage.resources.map((resource) => (
                <a href={resource.url} target="_blank" rel="noreferrer" key={resource.name}>
                  <small>{resource.provider}</small>
                  <h3>{resource.name}</h3>
                  <p>{resource.description}</p>
                  <div>{resource.meta.map((item) => <span key={item}>{item}</span>)}</div>
                  <b>访问资源 ↗</b>
                </a>
              ))}
            </div>
          </section>

          <nav className="stage-navigation" aria-label="学习阶段导航">
            {previous ? <a href={`/learn/${previous.slug}/`}><small>上一阶段</small><b>← {previous.title}</b></a> : <a href="/#resources"><small>学习地图</small><b>← 返回学习资源</b></a>}
            {next ? <a className="next" href={`/learn/${next.slug}/`}><small>下一阶段</small><b>{next.title} →</b></a> : <a className="next" href={vibeSubmissionUrl} target="_blank" rel="noreferrer"><small>完成学习</small><b>提交你的作品 ↗</b></a>}
          </nav>
        </article>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import LearningPage from "../LearningPage";
import { getLearningStage } from "../learning-data";

export const metadata: Metadata = {
  title: "AI 编程与产品开发｜Ada AI导航学习路径",
  description: "从用户问题、最小 PRD、Vibe Coding、测试到 GitHub 和部署，做出一个真实可访问的产品。",
};

export default function Page() {
  return <LearningPage stage={getLearningStage("ai-building")} />;
}

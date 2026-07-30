import type { Metadata } from "next";
import LearningPage from "../LearningPage";
import { getLearningStage } from "../learning-data";

export const metadata: Metadata = {
  title: "AI 入门｜Ada AI导航学习路径",
  description: "从真实任务出发学习 AI、提示词、上下文与结果核查，完成第一个端到端 AI 任务。",
};

export default function Page() {
  return <LearningPage stage={getLearningStage("ai-basics")} />;
}

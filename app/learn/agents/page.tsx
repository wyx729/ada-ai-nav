import type { Metadata } from "next";
import LearningPage from "../LearningPage";
import { getLearningStage } from "../learning-data";

export const metadata: Metadata = {
  title: "Agent 与工作流｜Ada AI导航学习路径",
  description: "理解 Chat、Workflow 和 Agent，学习工具调用、知识库、人工确认与 Agent 评测。",
};

export default function Page() {
  return <LearningPage stage={getLearningStage("agents")} />;
}

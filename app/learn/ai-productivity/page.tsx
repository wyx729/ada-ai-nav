import type { Metadata } from "next";
import LearningPage from "../LearningPage";
import { getLearningStage } from "../learning-data";

export const metadata: Metadata = {
  title: "AI 提效｜Ada AI导航学习路径",
  description: "学习任务拆解、提示词模板、人工检查点与效果评估，把重复工作变成 AI 工作流。",
};

export default function Page() {
  return <LearningPage stage={getLearningStage("ai-productivity")} />;
}

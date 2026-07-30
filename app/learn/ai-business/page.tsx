import type { Metadata } from "next";
import LearningPage from "../LearningPage";
import { getLearningStage } from "../learning-data";

export const metadata: Metadata = {
  title: "AI 产品与商业化｜Ada AI导航学习路径",
  description: "从真实问题、需求验证、MVP、定价到首批用户和数据迭代，把 AI 作品变成产品资产。",
};

export default function Page() {
  return <LearningPage stage={getLearningStage("ai-business")} />;
}

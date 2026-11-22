import type { Metadata } from "next";
import TeamClient from "./TeamClient";

export const metadata: Metadata = {
  title: "Team Images — Admin",
};

export default function AdminTeamImages() {
  return <TeamClient />;
}

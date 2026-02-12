import { useParams } from "react-router-dom";
import ProjectDetail from '@/components/ProjectDetail';

export default function ProjectPage() {
  const { name } = useParams<{ name: string }>();
  document.title = `${name} - Simpelcity`;

  return <ProjectDetail />;
}
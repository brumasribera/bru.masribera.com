import { Project } from "../../types/types";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ProjectContributeProps {
  project: Project;
  onBack: () => void;
}

export function ProjectContribute({ project, onBack }: ProjectContributeProps) {
  const { t } = useTranslation('reserve');

  return (
    <div className="w-full h-full bg-gradient-to-br from-green-50 to-emerald-100 overflow-y-auto" style={{ maxHeight: '700px', maxWidth: '380px' }}>
      <div className="p-4">
        <button onClick={onBack} className="mb-4">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1>Contribute - {project.name}</h1>
        <p>This is the contribute page for {project.name}</p>
      </div>
    </div>
  );
}

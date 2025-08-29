import { Project } from "../../types/types";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ProjectLearnMoreProps {
  project: Project;
  onBack: () => void;
}

export function ProjectLearnMore({ project, onBack }: ProjectLearnMoreProps) {
  const { t } = useTranslation('reserve');

  return (
    <div className="w-full h-full bg-gradient-to-br from-green-50 to-emerald-100 overflow-y-auto" style={{ maxHeight: '700px', maxWidth: '380px' }}>
      <div className="p-4">
        <button onClick={onBack} className="mb-4 w-10 h-10 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 border border-gray-200/50">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1>Learn More - {project.name}</h1>
        <p>This is the learn more page for {project.name}</p>
      </div>
    </div>
  );
}

"use client";

import { motion } from 'framer-motion';
import { LanguageStats } from './LanguageStats';
import type { Project } from '@/types/project';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

function parseLanguages(technologies: string[]) {
  return technologies
    .map(tech => {
      const [name, percentage] = tech.split(' ');
      return {
        name,
        percentage: parseFloat(percentage?.replace('%', '') || '0'),
        color: ''
      };
    })
    .filter(lang => lang.percentage > 0);
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const languages = parseLanguages(project.technologies);
  const hasLanguageStats = languages.length > 0 && languages.some(lang => lang.percentage > 0);

  return (
    <motion.div
      onClick={onClick}
      className="block-bg p-6 cursor-pointer group hover:border-[var(--accent)] border-2 
        transition-all duration-300"
      whileHover={{ y: -5 }}
    >
      <h3 className="text-2xl font-bold mb-2 text-[var(--text-primary)]">
        {project.title}
      </h3>
      
      <p className="text-gray-400 mb-4">
        {project.description}
      </p>

      {hasLanguageStats ? (
        <LanguageStats languages={languages} />
      ) : (
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-sm rounded-full bg-[var(--block-border)] 
                text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {project.demo && (
        <div className="flex gap-4 mt-4 pt-4 border-t border-[var(--block-border)]">
          <span
            className="text-gray-400 hover:text-[var(--accent)] transition-colors"
          >
            {project.demo}
          </span>
        </div>
      )}
    </motion.div>
  );
} 
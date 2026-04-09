'use client'

import ParticleBackground from '@/components/layout/ParticleBackground'
import HeroSection from '@/components/portfolio/HeroSection'
import AboutSection from '@/components/portfolio/AboutSection'
import SkillsSection from '@/components/portfolio/SkillsSection'
import ExperienceSection from '@/components/portfolio/ExperienceSection'
import ProjectsSection from '@/components/portfolio/ProjectsSection'
import EducationSection from '@/components/portfolio/EducationSection'
import ContactSection from '@/components/portfolio/ContactSection'
import useScrollReveal from '@/hooks/useScrollReveal'

export default function AboutPage() {
  useScrollReveal()

  return (
    <>
      <ParticleBackground />
      <div className="page-wrap">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <EducationSection />
        <ContactSection />
      </div>
    </>
  )
}

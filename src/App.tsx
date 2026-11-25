import { AboutSection } from './components/AboutSection';
import { DeploymentsSection } from './components/DeploymentsSection';
import { EdgeIntelligenceSection } from './components/EdgeIntelligenceSection';
import { EvaluationKitSection } from './components/EvaluationKitSection';
import { FieldHardwareSection } from './components/FieldHardwareSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { SiliconSection } from './components/SiliconSection';

export function App() {
  return (
    <div className="min-h-screen bg-[#F7F9F5] text-[#132219]">
      <Navbar />
      <HeroSection />
      <main>
        <SiliconSection />
        <FieldHardwareSection />
        <EdgeIntelligenceSection />
        <DeploymentsSection />
        <AboutSection />
        <EvaluationKitSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;

import { useState } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { Sidebar } from '@/components/sidebar';
import { ClassList } from '@/components/class-list';
import { Settings } from '@/components/settings';
import { LoginForm } from '@/components/login-form';
import { useAuth } from '@/stores/auth';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [experimentalMode, setExperimentalMode] = useState(false);
  const [selectedView, setSelectedView] = useState<'classes' | 'settings'>('classes');
  const { isAuthenticated } = useAuth();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const toggleExperimentalMode = () => {
    setExperimentalMode(!experimentalMode);
  };

  return (
    <ThemeProvider defaultTheme={darkMode ? 'dark' : 'light'}>
      <div className="min-h-screen bg-background flex items-center justify-center">
        {!isAuthenticated ? (
          <LoginForm />
        ) : (
          <div className="w-full h-full">
            <div className="flex">
              <Sidebar
                onClassesClick={() => setSelectedView('classes')}
                onSettingsClick={() => setSelectedView('settings')}
              />
              <main className="flex-1 p-6">
                {selectedView === 'classes' ? (
                  <ClassList />
                ) : (
                  <Settings
                    darkMode={darkMode}
                    experimentalMode={experimentalMode}
                    onDarkModeToggle={toggleDarkMode}
                    onExperimentalModeToggle={toggleExperimentalMode}
                  />
                )}
              </main>
            </div>
          </div>
        )}
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;
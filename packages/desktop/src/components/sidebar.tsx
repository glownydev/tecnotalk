import { Button } from './ui/button';
// No import needed

interface SidebarProps {
  onClassesClick: () => void;
  onSettingsClick: () => void;
}

export function Sidebar({ onClassesClick, onSettingsClick }: SidebarProps) {
  return (
    <div className="w-64 min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <h1 className="text-2xl font-bold mb-6 text-primary">Tecnotalk</h1>
      
      <nav className="space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={onClassesClick}
        >
          Classes
        </Button>
        
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={onSettingsClick}
        >
          Paramètres
        </Button>
      </nav>
    </div>
  );
}
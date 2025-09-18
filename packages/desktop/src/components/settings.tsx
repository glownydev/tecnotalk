import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface SettingsProps {
  darkMode: boolean;
  experimentalMode: boolean;
  onDarkModeToggle: () => void;
  onExperimentalModeToggle: () => void;
}

export function Settings({
  darkMode,
  experimentalMode,
  onDarkModeToggle,
  onExperimentalModeToggle,
}: SettingsProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Paramètres</h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="dark-mode">Mode sombre</Label>
          <Switch
            id="dark-mode"
            checked={darkMode}
            onCheckedChange={onDarkModeToggle}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="experimental-mode">Mode expérimental</Label>
            <p className="text-sm text-muted-foreground">
              Active la détection vocale pour la gestion automatique des croix
            </p>
          </div>
          <Switch
            id="experimental-mode"
            checked={experimentalMode}
            onCheckedChange={onExperimentalModeToggle}
          />
        </div>
      </div>
    </div>
  );
}
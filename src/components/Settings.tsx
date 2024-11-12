import { useTaskStore } from '../store/taskStore';
import { database } from '../services/database';
import { useState, useEffect } from 'react';

// Update the UserSettings type to include the privacy property
type UserSettings = {
  name?: string;
  avatar?: string;
  theme?: 'light' | 'dark' | 'blackout';
  timezone?: string;
  notifications?: boolean;
  language?: string;
  privacy?: 'public' | 'private';
  backup?: boolean;
};

const Settings = () => {
  const { settings, updateSettings } = useTaskStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setIsLoading(true);
        const userSettings = await database.settings.get();
        if (userSettings) {
          updateSettings(userSettings);
        }
      } catch (err) {
        setError('Failed to fetch settings');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSettingUpdate = async (newSettings: Partial<UserSettings>) => {
    try {
      await database.settings.upsert(newSettings);
      updateSettings(newSettings);
    } catch (err) {
      console.error('Failed to update settings:', err);
      // Add error handling UI here
    }
  };

  if (isLoading) return <div>Loading settings...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h2 className="text-2xl font-bold">Settings</h2>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Profile Settings</h3>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              value={settings.name || ''}
              title="Enter your name"
              placeholder="Your Name"
              onChange={(e) => handleSettingUpdate({ name: e.target.value })}
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Avatar URL</label>
            <input
              type="url"
              value={settings.avatar || ''}
              onChange={(e) => handleSettingUpdate({ avatar: e.target.value })}
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              placeholder="https://example.com/avatar.jpg"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Appearance</h3>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Theme</label>
            <select
              value={settings.theme || 'light'}
              onChange={(e) => handleSettingUpdate({ theme: e.target.value as 'light' | 'dark' | 'blackout' })}
              title="Select your theme"
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="blackout">Blackout</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Time Settings</h3>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Timezone</label>
            <select
              value={settings.timezone || ''}
              onChange={(e) => handleSettingUpdate({ timezone: e.target.value })}
              title="Select your timezone"
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            >
              {['UTC', 'GMT', 'PST', 'CST', 'EST', 'MST'].map((tz) => (
                <option key={tz} value={tz}>
                  {tz}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Notification Settings</h3>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Enable Notifications</label>
            <input
              type="checkbox"
              checked={settings.notifications || false}
              onChange={(e) => handleSettingUpdate({ notifications: e.target.checked })}
              className="h-4 w-4"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Language Preference</h3>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Language</label>
            <select
              value={settings.language || 'en'}
              onChange={(e) => handleSettingUpdate({ language: e.target.value })}
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              {/* Add more languages as needed */}
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Privacy Settings</h3>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Profile Visibility</label>
            <select
              value={settings.privacy || 'public'}
              onChange={(e) => handleSettingUpdate({ privacy: e.target.value })}
              title="Select your profile visibility"
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Backup Settings</h3>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Automatic Backups</label>
            <input
              type="checkbox"
              checked={settings.backup || false}
              onChange={(e) => handleSettingUpdate({ backup: e.target.checked })}
              className="h-4 w-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
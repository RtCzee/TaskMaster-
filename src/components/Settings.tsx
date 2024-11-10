import { useTaskStore } from '../store/taskStore';

const Settings = () => {
  const { settings, updateSettings } = useTaskStore();

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
              onChange={(e) => updateSettings({ name: e.target.value })}
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Avatar URL</label>
            <input
              type="url"
              value={settings.avatar || ''}
              onChange={(e) => updateSettings({ avatar: e.target.value })}
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
              onChange={(e) => updateSettings({ theme: e.target.value as 'light' | 'dark' })}
              title="Select your theme"
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Time Settings</h3>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Timezone</label>
            <select
              value={settings.timezone || ''}
              onChange={(e) => updateSettings({ timezone: e.target.value })}
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
      </div>
    </div>
  );
};

export default Settings;
# TaskMaster

A modern task management application built with React, TypeScript, and Supabase.

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Supabase account

### Environment Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/taskmaster.git
   cd taskmaster
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Environment Configuration:
   - Copy `.env.example` to create a new `.env` file:
     ```bash
     cp .env.example .env
     ```
   - Update `.env` with your Supabase credentials:
     - VITE_SUPABASE_URL: Your Supabase project URL
     - VITE_SUPABASE_ANON_KEY: Your Supabase project anon/public key
   
   You can find these values in your Supabase project dashboard under Settings > API.

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

### Features
- Task Management
- Calendar View
- User Authentication
- Dark/Light Theme
- Real-time Updates

### Tech Stack
- React
- TypeScript
- Tailwind CSS
- Supabase
- Vite

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
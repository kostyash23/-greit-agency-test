import './App.css';
import ProjectsGrid from './components/projectsGrid';

function App() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Проєкти нерухомості</h1>
      <ProjectsGrid />
    </main>
  );
}

export default App;

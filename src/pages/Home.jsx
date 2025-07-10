import { useState, useEffect, useContext } from 'react'
import TaskManager from '../components/TaskManager'
import { useTheme } from '../context/ThemeContext'

const Home = () => {
  const { theme } = useTheme();

  // Sample API fetch
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch data');
        setLoading(false);
      });
  }, []);

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'} min-h-screen`}>
      <h1 className="text-2xl mb-4">Task Manager</h1>
      <TaskManager />
      
      <h2 className="text-xl mb-2 mt-8">API Data</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <ul>
          {posts.map(post => (
            <li key={post.id} className="border-b py-2">{post.title}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Home;
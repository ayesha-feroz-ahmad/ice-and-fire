import { BrowserRouter } from 'react-router-dom'
import Navbar from './Navbar';
import Layout from './Layout';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Layout />
    </BrowserRouter>
  );
}

export default App;

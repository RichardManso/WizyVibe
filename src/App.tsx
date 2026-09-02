import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { LexiconApp } from './pages/LexiconApp';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/app" element={<LexiconApp />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

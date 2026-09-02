import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { LexiconApp } from './pages/LexiconApp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<LexiconApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

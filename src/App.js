import logo from './logo.svg';
import './App.css';
import GameSection from './components/GameSection';
import TextSection from './components/TextSection';
import { GameProvider } from './contexts/GameContext';

function App() {
    return (
        <div className="container">
            <GameProvider>
                <TextSection />
                <GameSection />
            </GameProvider>
        </div>
    );
}

export default App;

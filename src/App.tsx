
import './App.css'
import { 
  HashRouter,
  Routes,
  Route,
} from 'react-router';
import { Home } from './Home';
import { Setup } from './Setup';
import { Play } from './Play';
import { useState } from 'react';
import { getGeneralFacts, type GameResult } from './GameResults';

const dummyGameResults: GameResult[] = [
    {
        winner: "Harry",
        players: [
            "Harry",
            "Hermione",
            "Ron",
        ],

        start: "2026-01-16T01:33:35.465Z",
        end: "2026-01-16T02:21:35.465Z"
    },
    {
        winner: "Hermione",
        players: [
            "Harry",
            "Hermione",
            "Ron",
        ],

        start: "2026-01-16T03:13:35.465Z",
        end: "2026-01-16T03:49:35.465Z"
    },  
];

const App = () => {

  //
  // React Hooks...
  //

  const[gameResults, setGameResults] = useState(dummyGameResults);
  // const [gameResults, setGameResults] = useState<GameResult[]>([]);

  //
  // Calculated state and other functions
  //
  
  const addNewGameResult = (gameResult: GameResult) => setGameResults(
    [
      ...gameResults,
      gameResult,
    ]
  );
  //
  // Return JSX...
  //

  return (
    <div>
      <HashRouter>
        <Routes>
          <Route 
            path='/'
            element={
              <Home 
                generalFacts={
                  getGeneralFacts(gameResults)
                }
              />
            }
          />
          <Route 
            path='/setup'
            element={
              <Setup />
            }
          />
          <Route 
            path='/play'
            element={
              <Play 
              addNewGameResult={
                addNewGameResult
              }
              />
            }
          />
        </Routes>
      </HashRouter>
    </div>
  )
}
export default App

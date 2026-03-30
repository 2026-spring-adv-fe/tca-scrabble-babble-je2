
import './App.css'
import { 
  HashRouter,
  Routes,
  Route,
} from 'react-router';
import { Home } from './Home';
import { Setup } from './Setup';
import { Play } from './Play';
import { 
    getGeneralFacts,
    getLeaderboard,
    type GameResult,
  } from './GameResults';
import { useState } from 'react';


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
      <div 
        className="navbar bg-primary text-primary-content"
      >
        <p className='text-xl font-bold'>
          Scrabble-Babble Scrabble Companion
        </p>
      </div>
      <div
        className="p-3"
      >
        <HashRouter>        
          <Routes>
            <Route 
              path='/'
              element={
                <Home 
                  generalFacts={
                    getGeneralFacts(gameResults)
                  }
                  leaderboard={
                    getLeaderboard(gameResults)
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
    </div>
  )
}
export default App

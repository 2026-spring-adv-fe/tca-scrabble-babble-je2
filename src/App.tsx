
import './App.css'
import { 
  HashRouter,
  Routes,
  Route,
} from 'react-router';
import { Home } from './Home';
import { Setup } from './Setup';
import { Play } from './Play';
import type { GameResult } from './GameResults';


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

  return (
    <div>
      <HashRouter>
        <Routes>
          <Route 
            path='/'
            element={
              <Home />
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
              <Play />
            }
          />
        </Routes>
      </HashRouter>
    </div>
  )
}
export default App

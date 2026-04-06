
import './App.css'
import { 
  HashRouter,
  Routes,
  Route,
} from 'react-router';
import { APP_TITLE, Home } from './Home';
import { Setup } from './Setup';
import { Play } from './Play';
import { 
    getGeneralFacts,
    getLeaderboard,
    getPreviousPlayers,
    type GameResult,
  } from './GameResults';
import { useState } from 'react';
import localforage from 'localforage';


const dummyGameResults: GameResult[] = [
    {
        winner: "Bobby",
        players: [
            "Alice",
            "Bobby",
            "Carol",
        ],

        start: "2026-01-16T01:33:35.465Z",
        end: "2026-01-16T02:21:35.465Z"
    },
    {
        winner: "Jan",
        players: [
            "Alice",
            "Greg",
            "Jan",
        ],

        start: "2026-01-16T03:13:35.465Z",
        end: "2026-01-16T03:49:35.465Z"
    }, 
    {
        winner: "Greg",
        players: [
            "Marcia",
            "Peter",
            "Alice",
            "Greg",
        ],

        start: "2026-02-26T03:10:40.465Z",
        end: "2026-02-26T03:55:55.465Z"
    },
    {
        winner: "Bobby",
        players: [
            "Bobby",
            "Carol",
            "Peter",
        ],

        start: "2026-04-02T04:08:32.795Z",
        end: "2026-04-02T04:09:52.795Z"
    }, 
    {
      winner: "Marcia",
      players: [
          "Carol",
          "Marcia",
      ],

      start: "2026-04-04T02:23:32.795Z",
      end: "2026-04-04T03:13:52.795Z"
    },   

    
];

const App = () => {

  //
  // React Hooks...
  //

  const [gameResults, setGameResults] = useState(dummyGameResults);
  // const [gameResults, setGameResults] = useState<GameResult[]>([]);
  const [title, setTitle] = useState(APP_TITLE);

  const [theme, setTheme] = useState("emerald");

  // this allows us to store the array of two items that comes back from the function
  // rather than destructuring into the two consts (this happens further down the code)
  // in destructuring the tuple, we refer by index [] whether first or second item in the array

  const currentPlayersStateTuple = useState<string[]>([]);

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
    <div
      className='min-h-screen'
      data-theme={ theme }
      >
      <div 
        
        className="navbar bg-primary text-primary-content overflow-x-hidden flex flex-row "
      >
        <p className='text-xl font-bold'>
          {
            title
          }
        </p>
        <label className="swap swap-rotate ml-auto">
          {/* this hidden checkbox controls the state */}
          <input 
            type="checkbox"
            onClick={
              async () => {
                const result = await localforage.setItem<string>(
                  'theme', 
                  theme === "emerald"
                    ? "forest"
                    : "emerald"
                );

                  setTheme(
                    result);
              }
          }
            // checked={true}

          />

          {/* moon icon */}
          <svg
            className="swap-off h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path
              d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>

          {/* sun icon */}
          <svg
            className="swap-on h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path
              d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

        </label>
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
                  setTitle={setTitle}
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
                <Setup
                  setTitle={setTitle}
                  previousPlayers={
                    getPreviousPlayers(gameResults)
                  }
                  setCurrentPlayers={currentPlayersStateTuple[1]}
                />
              }
             />
            <Route 
              path='/play'
              element={
                <Play 
                setTitle={setTitle}
                addNewGameResult={
                  addNewGameResult
                }
                players={currentPlayersStateTuple[0]}
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

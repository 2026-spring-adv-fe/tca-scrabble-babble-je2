import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div 
      className='p-3'
      data-theme='pastel'
    >
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 
        className='text-3xl font-bold'       
      >
         Vite + React
      </h1>
      <div className="card">
        <button 
          onClick={() => setCount((count) => count + 1)}
          className='btn btn-lg btn-outline btn-primary w-full lg:w-64 my-5'
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <div className="card bg-base-100 w-full shadow-lg my-3">
        <div className="card-body p-2">
          <h2 className="card-title">Leaderboard</h2>
          <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
        </div>
      </div>
      <div className="card bg-base-100 w-full shadow-lg my-3">
        <div className="card-body p-2">
          <h2 className="card-title">What's the Move?</h2>
            <label className="swap swap-flip text-3xl">
              {/* this hidden checkbox controls the state */}
              <input type="checkbox" />

              <div className="swap-on">Play a Word🟪</div>
              <div className="swap-off">🟧Swap Tiles</div>
            </label>
        </div>
      </div>

      <div className="card bg-base-100 w-full shadow-lg my-3">
        <div className="card-body p-2">
          <h2 className="card-title">Scrabble Babble, A Tabletop-Game Companion-App</h2>
      <div className="chat chat-start">
        <div className="chat-bubble chat-bubble-primary">
          Scrabble!
          </div>
      </div>
      <div className="chat chat-end">
        <div className="chat-bubble chat-bubble-success">
          Babble!
        </div>
      </div>
      <div className="chat chat-start">
        <div className="chat-bubble chat-bubble-primary">
          Wordsmiths match wits!
        </div>
      </div>
      <div className="chat chat-end">
        <div className="chat-bubble chat-bubble-success">
          Math nerds rate words!
          </div>
      </div>
      <div className="chat chat-start">
        <div className="chat-bubble chat-bubble-primary">
          Letters, meet Science!
          </div>
      </div>
      <div className="chat chat-end">
        <div className="chat-bubble chat-bubble-success">
          The pleasure's all mind.
          </div>
      </div>
              </div>
            </div>

      <div className="card bg-base-100 w-full shadow-lg my-3">
        <div className="card-body p-2">
          <h2 className="card-title">Counting on Hit</h2>
        {/* For TSX uncomment the commented types below */}
        <span className="countdown font-mono text-6xl">
          <span style={{"--value":count, "--digits":2} /* as React.CSSProperties */ } aria-live="polite">{count}</span>
        </span>
        </div>
      </div>

      <div className="card bg-base-100 w-full shadow-lg my-3">
        <div className="card-body p-2">
          <h2 className="card-title">Timeline</h2>
      <ul className="timeline timeline-vertical">
            <li>
              <div className="timeline-start timeline-box">First Macintosh computer</div>
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="text-primary h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <hr className="bg-primary" />
            </li>
            <li>
              <hr className="bg-primary" />
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="text-primary h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-end timeline-box">iMac</div>
              <hr className="bg-primary" />
            </li>
            <li>
              <hr className="bg-primary" />
              <div className="timeline-start timeline-box">iPod</div>
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="text-primary h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <hr />
            </li>
            <li>
              <hr />
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-end timeline-box">iPhone</div>
              <hr />
            </li>
            <li>
              <hr />
              <div className="timeline-start timeline-box">Apple Watch</div>
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </li>
          </ul>
                  </div>
                </div>

                <div className="card bg-base-100 w-full shadow-lg">
                  <div className="card-body p-2">
                    <h2 className="card-title">Table Topping</h2>

          <div className="overflow-x-auto">
            <table className="table table-xs">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Job</th>
                  <th>company</th>
                  <th>location</th>
                  <th>Last Login</th>
                  <th>Favorite Color</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>1</th>
                  <td>Cy Ganderton</td>
                  <td>Quality Control Specialist</td>
                  <td>Littel, Schaden and Vandervort</td>
                  <td>Canada</td>
                  <td>12/16/2020</td>
                  <td>Blue</td>
                </tr>
                <tr>
                  <th>2</th>
                  <td>Hart Hagerty</td>
                  <td>Desktop Support Technician</td>
                  <td>Zemlak, Daniel and Leannon</td>
                  <td>United States</td>
                  <td>12/5/2020</td>
                  <td>Purple</td>
                </tr>
                <tr>
                  <th>3</th>
                  <td>Brice Swyre</td>
                  <td>Tax Accountant</td>
                  <td>Carroll Group</td>
                  <td>China</td>
                  <td>8/15/2020</td>
                  <td>Red</td>
                </tr>
                <tr>
                  <th>4</th>
                  <td>Marjy Ferencz</td>
                  <td>Office Assistant I</td>
                  <td>Rowe-Schoen</td>
                  <td>Russia</td>
                  <td>3/25/2021</td>
                  <td>Crimson</td>
                </tr>
                <tr>
                  <th>5</th>
                  <td>Yancy Tear</td>
                  <td>Community Outreach Specialist</td>
                  <td>Wyman-Ledner</td>
                  <td>Brazil</td>
                  <td>5/22/2020</td>
                  <td>Indigo</td>
                </tr>
                <tr>
                  <th>6</th>
                  <td>Irma Vasilik</td>
                  <td>Editor</td>
                  <td>Wiza, Bins and Emard</td>
                  <td>Venezuela</td>
                  <td>12/8/2020</td>
                  <td>Purple</td>
                </tr>
                <tr>
                  <th>7</th>
                  <td>Meghann Durtnal</td>
                  <td>Staff Accountant IV</td>
                  <td>Schuster-Schimmel</td>
                  <td>Philippines</td>
                  <td>2/17/2021</td>
                  <td>Yellow</td>
                </tr>
                <tr>
                  <th>8</th>
                  <td>Sammy Seston</td>
                  <td>Accountant I</td>
                  <td>O'Hara, Welch and Keebler</td>
                  <td>Indonesia</td>
                  <td>5/23/2020</td>
                  <td>Crimson</td>
                </tr>
                <tr>
                  <th>9</th>
                  <td>Lesya Tinham</td>
                  <td>Safety Technician IV</td>
                  <td>Turner-Kuhlman</td>
                  <td>Philippines</td>
                  <td>2/21/2021</td>
                  <td>Maroon</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Job</th>
                  <th>company</th>
                  <th>location</th>
                  <th>Last Login</th>
                  <th>Favorite Color</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

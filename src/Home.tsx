import { useNavigate } from "react-router";
import type { GeneralFacts, LeaderboardEntry } from "./GameResults";
export const APP_TITLE = "Scrabble-Babble! A Scrabble Companion";
type HomeProps = {
    generalFacts: GeneralFacts
    leaderboard: LeaderboardEntry[],
    setTitle: (t: string) => void;
};

export const Home: React.FC<HomeProps> = ({
    generalFacts,
    leaderboard,
    setTitle,
} ) => {

    setTitle(APP_TITLE);
    const nav = useNavigate();



    //We'll write code here. . .

    //then return some jsx...
    return (
        <>

            <button 
                className="btn btn-outline btn-secondary btn-lg w-full lg:w-64"
                onClick={
                    () => nav('/setup')}
            >
                Setup a Game
            </button>

            <div className="card bg-base-100 w-full shadow-lg my-5">
                <div className="card-body p-2">
                    <h2 className="card-title">General Facts</h2>
                    <table className="table table-zebra">
                        <tbody>
                            <tr>
                                <td>Last Played</td>
                                <th>{generalFacts.lastPlayed}</th>
                            </tr>
                            <tr>
                                <td>Total Games</td>
                                <th>{generalFacts.totalGames}</th>
                            </tr>
                            <tr>
                                <td>Shortest Game</td>
                                <th>{generalFacts.shortestGame}</th>
                            </tr>
                            <tr>
                                <td>Longest Game</td>
                                <th>{generalFacts.longestGame}</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="card bg-base-100 w-full shadow-lg my-5">
                <div className="card-body p-2">
                    <h2 className="card-title">Wins-Losses Leaderboard</h2>
                    <table className="table table-zebra">
                        <thead>
                            <tr>
                                <th>W</th>
                                <th>L</th>
                                <th>AVG</th>
                                <th>PLAYER</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                leaderboard.map(
                                    x => (
                                        <tr>
                                            <td>
                                                { x.wins }                        
                                            </td>
                                            <td>
                                                { x.losses }                        
                                            </td>
                                            <td>
                                                { x.avg }                        
                                            </td>
                                            <td>
                                                { x.name }                        
                                            </td>
                                        </tr>
                                    )
                                )
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
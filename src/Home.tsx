import { useNavigate } from "react-router";
import type { GeneralFacts, LeaderboardEntry, ScoreInsights } from "./GameResults";
import { useEffect } from "react";

export const APP_TITLE = "Scrabble-Babble! A Scrabble Companion";

type HomeProps = {
    generalFacts: GeneralFacts
    leaderboard: LeaderboardEntry[],
    scoreInsights: ScoreInsights,
    setTitle: (t: string) => void,
};

export const Home: React.FC<HomeProps> = ({
    generalFacts,
    leaderboard,
    scoreInsights,
    setTitle,
}) => {

    useEffect(
        () => setTitle(APP_TITLE), 
        [setTitle],
    );
   
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

            <div className="card bg-base-100 w-full shadow-lg my-5 overflow-x-scroll">
                <div className="card-body p-2">
                    <h2 className="card-title">All-Games: General Facts and Scoring Insights</h2>
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
                            <tr>
                                <td>Total Player Entries</td>
                                <th>{scoreInsights.totalPlayerEntries}</th>
                            </tr>
                            <tr>
                                <td>Avg Word Score</td>
                                <th>{scoreInsights.avgWordScorePerPlayerGame}</th>
                            </tr>
                            <tr>
                                <td>Avg Game Score</td>
                                <th>{scoreInsights.avgGameScorePerPlayerGame}</th>
                            </tr>
                            <tr>
                                <td>Top Word-Score Total</td>
                                <th>{scoreInsights.topWordScoreTotal}</th>
                            </tr>
                            <tr>
                                <td>Top Game Score</td>
                                <th>{scoreInsights.topGameScore}</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="card bg-base-100 w-full shadow-lg my-2 overflow-x-scroll">
                <div className="card-body p-2">
                    <h2 className="card-title">Wins-Losses Leaderboard</h2>
                    <table className="table table-zeb">
                        <thead>
                            <tr>
                                <th>Player</th>
                                <th>W</th>
                                <th>L</th>
                                <th>W %</th>
                                <th>Avg Word</th>
                                <th>Avg Game</th>
                                <th>Cumulative</th>
                                <th>DL</th>
                                <th>TL</th>
                                <th>DW</th>
                                <th>TW</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                leaderboard.map(
                                    x => (
                                        <tr
                                            key={x.name}
                                        >
                                            <td>{x.name}</td>
                                            <td>{x.wins}</td>
                                            <td>{x.losses}</td>
                                            <td>{x.avg}</td>
                                            <td>{x.avgWordScore}</td>
                                            <td>{x.avgGameScore}</td>
                                            <td>{x.totalGameScore}</td>
                                            <td>{x.doubleLetterCount}</td>
                                            <td>{x.tripleLetterCount}</td>
                                            <td>{x.doubleWordCount}</td>
                                            <td>{x.tripleWordCount}</td>
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
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
    // Debug: Show Play moves and word scores for each player
    const debugGameResults = (window as any)?.debugGameResults;
    return (
        <>
            <div className="flex flex-col gap-2 mb-4 w-full lg:w-64">
                <button 
                    className="btn btn-outline btn-secondary btn-lg w-full"
                    onClick={() => nav('/setup')}
                >
                    Setup a Game
                </button>
                <button
                    className="btn btn-outline btn-primary btn-lg w-full"
                    onClick={() => nav('/play')}
                >
                    Resume Game
                </button>
            </div>

            <div className="card bg-base-100 w-full shadow-lg my-5 overflow-x-scroll">
                <div className="card-body p-2">
                    <h2 className="card-title">All-Games: General Facts and Scoring Insights</h2>
                    <table className="table table-zebra">
                        <tbody>
                            <tr>
                                <td>Last Game Played</td>
                                <th>{generalFacts.lastPlayed}</th>
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
                                <td>Total Number of Games Played</td>
                                <th>{generalFacts.totalGames}</th>
                            </tr>
                            <tr>
                                <td>Total Player Entries</td>
                                <th>{scoreInsights.totalPlayerEntries}</th>
                            </tr>
                            <tr>
                                <td>Total Number of Player Moves - all Move Types</td>
                                <th>{scoreInsights.totalMoves}</th>
                            </tr>
                            <tr>
                                <td>Mean Moves per Game</td>
                                <th>{scoreInsights.avgMovesPerGame}</th>
                            </tr>
                            <tr>
                                <td>Highest Single Player-Word-Score</td>
                                <th>{scoreInsights.topWordScoreTotal}</th>
                            </tr>
                            <tr>
                                <td>Mean Player-Word-Score (Play moves only)</td>
                                <th>{scoreInsights.avgWordScorePerPlayerGame}</th>
                            </tr>
                            <tr>
                                <td>Mean Player-Move-Score (all move types)</td>
                                <th>{scoreInsights.avgMoveScore}</th>
                            </tr>
                            <tr>
                                <td>Highest Single Game Score</td>
                                <th>{scoreInsights.topGameScore}</th>
                            </tr>
                            <tr>
                                <td>Mean Game Score</td>
                                <th>{scoreInsights.avgGameScorePerPlayerGame}</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="card bg-base-100 w-full shadow-lg my-2 overflow-x-scroll">
                <div className="card-body p-2">
                    <h2 className="card-title">Player Stats & Leaderboard</h2>
                    <table className="table table-xs">
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
                                        <tr key={x.name}>
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
                    {/* Debug output for Play moves and word scores per player */}
                    {/* <div className="mt-4">
                        <h3 className="font-bold">Debug: Player Play Moves & Word Scores</h3>
                        {leaderboard.map(x => (
                            <div key={x.name} className="mb-2">
                                <div className="font-semibold">{x.name}</div>
                                <ul className="text-xs">
                                    {(() => {
                                        // Find all Play moves for this player from all games
                                        const allGameResults = debugGameResults || [];
                                        const playMoves = allGameResults
                                            .flatMap((g: any) => g.moves)
                                            .filter((m: any) => m.player === x.name && m.moveType === "Play");
                                        if (playMoves.length === 0) return <li>No Play moves found.</li>;
                                        return playMoves.map((m: any, idx: number) => (
                                            <li key={idx}>Move {m.moveNumber}: wordScore={m.wordScore}</li>
                                        ));
                                    })()}
                                </ul>
                            </div>
                        ))}
                    </div> */}
                </div>
            </div>
        </>
    )
}
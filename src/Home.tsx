import { useNavigate } from "react-router";
import type { GeneralFacts, LeaderboardEntry, ScoreInsights, AvgGameDuration } from "./GameResults";
import { useEffect } from "react";

export const APP_TITLE = "Scrabble-Babble! A Scrabble Companion";

type HomeProps = {
    generalFacts: GeneralFacts,
    avgGameDuration: AvgGameDuration[],
    leaderboard: LeaderboardEntry[],
    scoreInsights: ScoreInsights,
    setTitle: (t: string) => void,
    // gameHistory: any,
    // gameHistory: {
    //     date: string;
    //     duration: string;
    //     players: string;
    // }[];
};

// export const gameHistory

export const Home: React.FC<HomeProps> = ({
    generalFacts,
    avgGameDuration,
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
    // const debugGameResults = (window as any)?.debugGameResults;

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
                    Resume or Start Game
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
                                <td>Games Played</td>
                                <th>{generalFacts.totalGames}</th>
                            </tr>
                            <tr>
                                <td>Player Entries</td>
                                <th>{scoreInsights.totalPlayerEntries}</th>
                            </tr>
                            <tr>
                                <td>Player Moves - all Types</td>
                                <th>{scoreInsights.totalMoves}</th>
                            </tr>
                            <tr>
                                <td>Avg Moves per Game</td>
                                <th>{scoreInsights.avgMovesPerGame}</th>
                            </tr>
                            <tr>
                                <td>Max Word Score</td>
                                <th>{scoreInsights.topWordScoreTotal}</th>
                            </tr>
                            <tr>
                                <td>Avg Word Score</td>
                                <th>{scoreInsights.avgWordScorePerPlayerGame}</th>
                            </tr>
                            <tr>
                                <td>Avg Move Score</td>
                                <th>{scoreInsights.avgMoveScore}</th>
                            </tr>
                            <tr>
                                <td>Max Game Score</td>
                                <th>{scoreInsights.topGameScore}</th>
                            </tr>
                            <tr>
                                <td>Avg Game Score</td>
                                <th>{scoreInsights.avgGameScorePerPlayerGame}</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="card bg-base-100 w-full shadow-lg my-2 overflow-x-scroll">
                <div className="card-body p-2">
                    <h2 className="card-title">Player Stats & Leaderboard</h2>
                    <div className="hidden sm:block overflow-x-auto">
                        <table className="table table-xs table-fixed w-full text-[0.8rem] sm:text-xs">
                            <thead>
                                <tr>
                                    <th className="whitespace-nowrap">Player</th>
                                    <th className="whitespace-nowrap">W</th>
                                    <th className="whitespace-nowrap">L</th>
                                    <th className="whitespace-nowrap">W%</th>
                                    <th className="whitespace-nowrap">Avg Word</th>
                                    <th className="whitespace-nowrap">Avg Game</th>
                                    <th className="whitespace-nowrap">Cumulative</th>
                                    <th colSpan={4} className="text-center">Plays with Multipliers</th>
                                </tr>
                                <tr>
                                    <th colSpan={7}></th>
                                    <th className="whitespace-nowrap">DL</th>
                                    <th className="whitespace-nowrap">TL</th>
                                    <th className="whitespace-nowrap">DW</th>
                                    <th className="whitespace-nowrap">TW</th>
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
                    </div>
                    <div className="space-y-3 sm:hidden">
                        {
                            leaderboard.map((x) => (
                                <div key={x.name} className="card bg-base-200 shadow-sm p-3">
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <div className="text-base font-semibold">{x.name}</div>
                                            <div className="text-sm text-base-content/70">W {x.wins} • L {x.losses} • W% {x.avg}</div>
                                        </div>
                                        <div className="text-right text-sm">
                                            <div>Avg Word</div>
                                            <div className="font-semibold">{x.avgWordScore}</div>
                                        </div>
                                    </div>
                                    <div className="mt-3 grid gap-2 sm:grid-cols-2 text-sm">
                                        <div className="rounded-lg bg-base-100 p-2">
                                            <div className="text-[0.75rem] uppercase text-base-content/70">Avg Game</div>
                                            <div className="font-semibold">{x.avgGameScore}</div>
                                        </div>
                                        <div className="rounded-lg bg-base-100 p-2">
                                            <div className="text-[0.75rem] uppercase text-base-content/70">Cumulative</div>
                                            <div className="font-semibold">{x.totalGameScore}</div>
                                        </div>
                                        <div className="sm:col-span-2 rounded-lg bg-base-100 p-2">
                                            <div className="text-[0.75rem] uppercase text-base-content/70">Multipliers</div>
                                            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                                                <span className="badge badge-accent">DL {x.doubleLetterCount}</span>
                                                <span className="badge badge-accent">TL {x.tripleLetterCount}</span>
                                                <span className="badge badge-accent">DW {x.doubleWordCount}</span>
                                                <span className="badge badge-accent">TW {x.tripleWordCount}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
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
            <div className="card bg-base-100 w-full shadow-lg my-5 overflow-x-scroll">
                <div className="card-body p-2">
                    <h2 className="card-title">Game Durations (AVG) by Number of Players</h2>
                    <table className="table table-zebra">
                        <thead>
                            <tr>
                                <th>Players</th>
                                <th>Games</th>
                                <th>Avg Duration</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                avgGameDuration.map(
                                    x => (
                                        <tr
                                            key={x.numberOfPlayers}
                                        >
                                            <td>
                                                { x.numberOfPlayers }                        
                                            </td>
                                            <td>
                                                { x.numberOfGames }                        
                                            </td>
                                            <td>
                                                { x.avgGameDuration }                        
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
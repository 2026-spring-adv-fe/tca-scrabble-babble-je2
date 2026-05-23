import { useNavigate } from "react-router";
import type { GameResult } from "./GameResults";
import { useState, useEffect, useMemo } from "react";

type PlayProps = {
    addNewGameResult: (g: GameResult) => void;
    setTitle: (t: string) => void;
    players?: string[];
};

type MoveType = "Play" | "Swap" | "Pass" | "Out";
type CurrentMoveType = MoveType | null;

type TileMultiplier = "None" | "Dbl Letter" | "Trpl Letter" | "Dbl Word" | "Trpl Word";

// type currentRound = number;

type MoveRecord = {
    moveNumber: number;
    roundNumber: number;
    player: string;
    moveType: MoveType;
    wordScore: number;
    tileMultipliers?: TileMultiplier[];
    scoreDelta: number;
};

// COUNTING USE-EFFECTS: #1
export const Play: React.FC<PlayProps> = ({ 
    addNewGameResult,
    setTitle,
    players,
}) => {
    useEffect(
        () => {
            setTitle("Play your Game!")
        }, [setTitle]
    )

    const nav = useNavigate();
    const [startTimestamp] = useState(new Date().toISOString());
    const [moves, setMoves] = useState<MoveRecord[]>([]);
    const [currentMoveType, setCurrentMoveType] = useState<CurrentMoveType>(null);
    const [wordScore, setWordScore] = useState("");
    const [activePlayerIndex, setActivePlayerIndex] = useState(0);
    const [tileAdjustments, setTileAdjustments] = useState<Record<string, string>>(
        Object.fromEntries((players ?? []).map((player) => [player, ""]))
    );

    // State for selected tile multipliers for the current move

    // CONSIDER ENABLING INCREMENTATION OF SELECTED TILE MULTIPLIERS (THINK: "ADD +# TO SHOPPING CART"-TYPE FUNCTIONALITY) IN ORDER TO ACHIEVE ACCURATE TALLIES
    // FOR SCENARIOS WHERE THE SAME MULTIPLIER-TYPE OCCURS IN THE SAME WORD/PLAY - NOT A FREQUENT OCCURRANCE, BUT HAPPENS.
    const [selectedTileMultipliers, setSelectedTileMultipliers] = useState<TileMultiplier[]>([]);
    const [completedGame, setCompletedGame] = useState<GameResult | null>(null);
    const [showExitConfirm, setShowExitConfirm] = useState(false);
    const isGameFinished = completedGame !== null;



    const hasUnsavedGame = !isGameFinished && (
        moves.length > 0 ||
        currentMoveType !== null ||
        wordScore.trim() !== "" ||
        selectedTileMultipliers.length > 0
    );

    const handleHomeClick = () => {
        if (hasUnsavedGame) {
            setShowExitConfirm(true);
            return;
        }

        nav("/");
    };

    const confirmExitHome = () => {
        setShowExitConfirm(false);
        nav("/");
    };

// CONSIDER ADDING SOME CONSTRAINT ON THE ABILITY TO INPUT A TILE-ADJUSTMENT IN MID-PLAY - A PLAYER SHOULD BE "OUT" OF THE GAME AND BEFORE THE GAME
// IS FINISHED TO ENSURE GAME SCORE IS PROPERLY TABULATED, ONLY ONE TILE-ADJUSTMENT IS ALLOWED PER HAME, AND IS NOT ENTERED IN ERROR AFFECTING A PLAYER
// PLAYER SCORE BEFORE THE GAME ACTUALLY ENDS.
// COUNTING USE-EFFECTS: #2
    useEffect(() => {
    if (players) {
        setTileAdjustments(
            Object.fromEntries(players.map((player) => [player, ""]))
            );
        }
    }, [players]);

    const activePlayer = players?.[activePlayerIndex] ?? "";

    const roundNumber = players && players.length > 0
        ? Math.floor(moves.length / players.length) + 1
        : 1;

    const normalizedWordScore = currentMoveType === "Play"
        ? Math.max(0, Number.parseInt(wordScore) || 0)
        : 0;

    const playerTotals = useMemo(() => {
        if (!players) {
            return {} as Record<string, {                    
                wordScoreTotal: number;
                tileAdjustment: number;
                gameScore: number;
            }>;
        }

            return Object.fromEntries(
                players.map((player) => {
                    const wordScoreTotal = moves
                        .filter((move) => move.player === player)
                        .reduce((sum, move) => sum + move.scoreDelta, 0);
                    const tileAdjustment = Number.parseInt(tileAdjustments[player]) || 0;
                    const gameScore = wordScoreTotal + tileAdjustment;
                    return [player, {
                        wordScoreTotal,
                        tileAdjustment,
                        gameScore,
                    }];
                })
            );
    }, [moves, players, tileAdjustments]);

    const hasMoveType = currentMoveType !== null;
    const hasValidWordScore = Number.parseInt(wordScore) > 0;
    const hasMultiplier = selectedTileMultipliers.length > 0;

    const canAddMove = 
        players && 
        players.length > 0 && 
        !isGameFinished &&
        hasMoveType &&
        (
            currentMoveType !== "Play" ||
            (hasValidWordScore && hasMultiplier)
        );

    const addMove = () => {
        const nextMoveNumber = moves.length + 1;
        const currentRound = players && players.length > 0
            ? Math.floor(moves.length / players.length) + 1
            : 1;

        const nextMove: MoveRecord = {
            moveNumber: nextMoveNumber,            
            roundNumber: currentRound,
            player: activePlayer,
            moveType: currentMoveType!,
            wordScore: normalizedWordScore,
            tileMultipliers: selectedTileMultipliers.length > 0 ? [...selectedTileMultipliers] : undefined,
            scoreDelta: normalizedWordScore,
        };

        setMoves((previousMoves) => [
            ...previousMoves,
            nextMove,
        ]);

        setWordScore("");
        setSelectedTileMultipliers([]);
        setCurrentMoveType(null);

        setActivePlayerIndex((previousIndex) => {
            if (!players || players.length === 0) {
                return 0;
            }
            return (previousIndex + 1) % players.length;
        });
    };

    const handleTileAdjustmentChange = (player: string, value: string) => {
        setTileAdjustments((previous) => ({
            ...previous,
            [player]: value,
        }));
    };

    const rematch = () => {
        setMoves([]);
        setCurrentMoveType(null);
        setWordScore("");
        setActivePlayerIndex(0);
        setTileAdjustments(
            Object.fromEntries((players ?? []).map((player) => [player, ""]))
        );
        setSelectedTileMultipliers([]);
        setCompletedGame(null);
    };

    const finishGame = () => {
        if (!players || players.length === 0) {
            return;
        }

        const playerScores = players.map((player) => {
            const totals = playerTotals[player] ?? {
                wordScoreTotal: 0,
                tileAdjustment: tileAdjustments[player] ?? 0,
                gameScore: 0,
            };

            return {
                player,
                wordScoreTotal: totals.wordScoreTotal,
                tileAdjustment: totals.tileAdjustment,
                gameScore: totals.gameScore,
            };
        });

        const winner = playerScores.reduce(
            (best, current) =>
                current.gameScore > best.gameScore ? current : best,
            playerScores[0],
        )?.player ?? "";

        const finishedResult: GameResult = {
            winner,
            players,
            start: startTimestamp,
            end: new Date().toISOString(),
            moves,
            playerScores,
        };

        addNewGameResult(finishedResult);
        setCompletedGame(finishedResult);
    };

    if (!players || players.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-4">
                <div className="text-center">
                    <p className="text-lg font-semibold">No players have been selected.</p>
                    <p className="mt-2">Go to setup and choose 2 to 4 players.</p>
                </div>
                <div className="flex flex-col gap-2 w-full sm:w-64">
                    <button
                        className="btn btn-outline btn-primary btn-lg w-full"
                        onClick={() => nav("/setup")}
                    >
                        Setup
                    </button>
                    <button
                        className="btn btn-outline btn-secondary btn-lg w-full"
                        onClick={() => nav("/")}
                    >
                        Home
                    </button>
                </div>
            </div>
        );
    }

    const predictedWinner = Object.entries(playerTotals)
        .reduce(
            (best, [player, totals]) =>
                totals.gameScore > best.score
                    ? { player, score: totals.gameScore }
                    : best,
            { player: players[0], score: Number.NEGATIVE_INFINITY },
        ).player;

    return (
        <>
            <div className="flex flex-col gap-2 mb-4 w-full lg:w-64">
                <button
                    className="btn btn-outline btn-primary btn-lg w-full"
                    onClick={handleHomeClick}
                >
                    Home
                </button>
                <button
                    className="btn btn-outline btn-secondary btn-lg w-full"
                    onClick={() => nav("/setup")}
                >
                    Setup
                </button>
            </div>
            {showExitConfirm && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Are you sure you want to go Home?</h3>
                        <p className="py-4">
                            ⚠️Exiting before you Finish Game will delete current entries!
                            Short on time? "Finish Game" while you're ahead!🏅 Declare a fast-game winner and save your stats!
                        </p>
                        <div className="modal-action">
                            <button
                                className="btn btn-warning"
                                onClick={confirmExitHome}
                            >
                                Take me Home
                            </button>
                            <button
                                className="btn"
                                onClick={() => setShowExitConfirm(false)}
                            >
                                I'll stay and play! 
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {isGameFinished && completedGame && (
                <div className="card bg-neutral text-neutral-content shadow-lg p-4 mb-4">
                    <div className="grid gap-4 lg:grid-cols-[auto_1fr] items-center">
                        <div className="avatar placeholder self-start">
                            <div className="bg-white text-success-content rounded-full w-24 h-24 flex items-center justify-center text-4xl font-bold">
                                {completedGame.winner.charAt(0).toUpperCase()}
                            </div>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold">Behold, the After-Scrabble Babble!</h2>
                            <p className="text-lg mt-2">Winner: <strong>{completedGame.winner}</strong></p>
                            <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-black">
                                <div className="rounded-lg bg-white/90 p-3">
                                    <div className="text-sm uppercase">Word-Score Total</div>
                                    <div className="text-2xl font-semibold">
                                        {completedGame.playerScores.find((score) => score.player === completedGame.winner)?.wordScoreTotal ?? 0}
                                    </div>
                                </div>
                                <div className="rounded-lg bg-white/90 p-3">
                                    <div className="text-sm uppercase">Tile Adjustment</div>
                                    <div className="text-2xl font-semibold">
                                        {completedGame.playerScores.find((score) => score.player === completedGame.winner)?.tileAdjustment ?? 0}
                                    </div>
                                </div>
                                <div className="rounded-lg bg-white/90 p-3">
                                    <div className="text-sm uppercase">Final Game Score</div>
                                    <div className="text-2xl font-semibold">
                                        {completedGame.playerScores.find((score) => score.player === completedGame.winner)?.gameScore ?? 0}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 flex flex-col sm:flex-row gap-2">
                        <button
                            className="btn btn-outline btn-primary"
                            onClick={rematch}
                        >
                            Rematch
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={() => nav(-2)}
                        >
                            Return Home
                        </button>
                    </div>
                </div>
            )}
            <div className="grid gap-4 lg:grid-cols-2">
                <div className="card bg-base-100 shadow-lg p-4">
                    <h2 className="card-title">Current Move</h2>
                    <p className="mb-2">Round {roundNumber} — {activePlayer}&apos;s turn</p>

                    <div className="btn-group mb-4">
                        {(["Play", "Swap", "Pass", "Out"] as MoveType[]).map((type) => (
                            <button
                                key={type}
                                className={`btn ${currentMoveType === type ? "btn-primary" : "btn-outline"}`}
                                onClick={() => setCurrentMoveType(type)}
                                disabled={isGameFinished}
                            >
                                {type}
                            </button>
                        ))}
                    </div>

                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Word Score</span>
                        </label>
                        <input
                            type="number"
                            className="input input-bordered"
                            min="0"
                            value={wordScore}
                            placeholder="Enter your word score!"
                            disabled={currentMoveType !== "Play" || isGameFinished}
                            onChange={(e) => setWordScore(e.target.value)}
                            onFocus={e => e.target.select()}
                            inputMode="numeric"
                        />
                    </div>

                    {/* TileMultiplier checkboxes */}
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Tile Multipliers</span>
                        </label>
                        <div className="flex gap-4">
                            {(["None", "Dbl Letter", "Trpl Letter", "Dbl Word", "Trpl Word"] as TileMultiplier[]).map((mult) => (
                                <label key={mult} className="flex items-center gap-2">
                                    <input
                                        type="checkbox" className="checkbox checkbox-info" 
                                        checked={selectedTileMultipliers.includes(mult)}
                                        disabled={currentMoveType !== "Play" || isGameFinished}
                                        onChange={() => {
                                            setSelectedTileMultipliers((prev) => {
                                                const isSelected = prev.includes(mult);

                                                if (isSelected) {
                                                    return prev.filter((m) => m !== mult);
                                                }

                                                if (mult === "None") {
                                                    return ["None"];
                                                }

                                                return prev.includes("None")
                                                    ? [mult]
                                                    : [...prev, mult];
                                            });
                                        }}
                                    />
                                    {mult}
                                </label>
                            ))}
                        </div>
                    </div>

                    <button
                        className="btn btn-secondary w-full"
                        onClick={addMove}
                        disabled={!canAddMove}
                    >
                        Add Move
                    </button>
                </div>

                <div className="card bg-base-100 shadow-lg p-4">
                    <h2 className="card-title">Player Totals</h2>
                    <div className="space-y-3">
                        {players.map((player) => {
                            const totals = playerTotals[player] ?? {
                                wordScoreTotal: 0,
                                tileAdjustment: tileAdjustments[player] ?? 0,
                                gameScore: 0,
                            };

                            return (
                                <div key={player} className="rounded-lg border p-3">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-semibold">{player}</span>
                                        <span className="badge badge-primary">Game Score {totals.gameScore}</span>
                                    </div>
                                    <p>Word score total: {totals.wordScoreTotal}</p>

                                    <div className="form-control mt-2">
                                        <label className="label">
                                            <span className="label-text">Tile Adjustment</span>
                                        </label>
                                        <input
                                            type="number"
                                            className="input input-bordered"
                                            value={tileAdjustments[player] ?? ""}
                                            inputMode="numeric"
                                            step="1"
                                            onChange={(e) => handleTileAdjustmentChange(player, e.target.value)}
                                            onFocus={e => e.target.select()}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <p className="mt-4 text-sm">Predicted winner: <span className="font-semibold">{predictedWinner}</span></p>
                </div>
            </div>

            <div className="card bg-base-100 shadow-lg p-4 mt-4">
                <h2 className="card-title">Move History</h2>
                {moves.length === 0 ? (
                    <p className="mt-2">No moves recorded yet.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Round</th>
                                    <th>Player</th>
                                    <th>Move</th>
                                    <th>Word Score</th>
                                    <th>Tile Multipliers</th>
                                </tr>
                            </thead>
                            <tbody>
                                {moves.map((move) => (
                                    <tr key={move.moveNumber}>
                                        <td>{move.moveNumber}</td>
                                        <td>{move.roundNumber}</td>
                                        <td>{move.player}</td>
                                        <td>{move.moveType}</td>
                                        <td>{move.wordScore}</td>
                                        <td>{move.tileMultipliers?.join(", ") ?? ""}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <button
                className="btn btn-primary btn-block mt-4"
                onClick={finishGame}
                disabled={moves.length === 0}
            >
                Finish Game
            </button>
        </>
    );
};
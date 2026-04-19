import { durationFormatter } from 'human-readable';

//
// Exported type definitions...
//

export type MoveType = "Play" | "Swap" | "Pass" | "Out";

export type TileMultiplier = "Dbl Letter" | "Trpl Letter" | "Dbl Word" | "Trpl Word";
export type MoveRecord = {
    moveNumber: number;
    roundNumber: number;
    player: string;
    moveType: MoveType;
    wordScore: number;
    tileMultipliers?: TileMultiplier[];
    scoreDelta: number;
};

export type PlayerGameScore = {
    player: string;
    wordScoreTotal: number;
    tileAdjustment: number;
    gameScore: number;
};

export type GameResult = {
    winner: string;
    players: string[];
    start: string;
    end: string;
    moves: MoveRecord[];
    playerScores: PlayerGameScore[];
};

export type LeaderboardEntry = {
    wins: number;
    losses: number;
    avg: string;
    totalWordScore: number;
    avgWordScore: string;
    totalGameScore: number;
    avgGameScore: string;
    name: string;
    doubleLetterCount: number;
    tripleLetterCount: number;
    doubleWordCount: number;
    tripleWordCount: number;
};

export type GeneralFacts = {
    lastPlayed: string;
    totalGames: number;
    shortestGame: string;
    longestGame: string;
};

export type AvgGameDuration = {
    numberOfPlayers: number;
    numberOfGames: number;
    avgGameDuration: string;
};

export type ScoreInsights = {
    totalPlayerEntries: number;
    totalWordScore: number;
    totalGameScore: number;
    totalMoves: number;
    avgMovesPerGame: string;
    avgWordScorePerPlayerGame: string; // Only 'Play' moves
    avgMoveScore: string; // All move types
    avgGameScorePerPlayerGame: string;
    topWordScoreTotal: number;
    topGameScore: number;
};

//
// Exported functions..
//

export const getGeneralFacts = (games: GameResult[]): GeneralFacts => {

    if (games.length === 0) {
        return {
            lastPlayed: "N/A",
            totalGames: 0,
            shortestGame: "N/A",
            longestGame: "N/A",
        };
    }

    // const now = Date.now();

    const gamesDurationSinceLastPlayed = games.map(
        x => Date.now() - Date.parse(x.end)
    );

    const mostRecentlyPlayedinMilliseconds = Math.min(
        ...gamesDurationSinceLastPlayed
    );
    
    const gameDurationsInMilliseconds = games.map(
        x => Date.parse(x.end) - Date.parse(x.start)
    );

//  console.log(
//     gamesDurationSinceLastPlayed
//  );   
    return {
        lastPlayed: `${ formatLastPlayed(
            mostRecentlyPlayedinMilliseconds)} ago`,

        totalGames: games.length,

        shortestGame: formatGameDuration(
            Math.min(
                ...gameDurationsInMilliseconds
            ),            
        ),
        
        longestGame: formatGameDuration(
            Math.max(
                ...gameDurationsInMilliseconds
            ),
        )
    };
};

export const getLeaderboard = (
        games: GameResult[]
    ): LeaderboardEntry[] => getPreviousPlayers(games)
        .map(
            x => ({
                ...getLeaderboardEntry(
                    games,
                    x,
                )
            })
        )
        .sort(
            (a, b) => Number.parseFloat(b.avg) === Number.parseFloat(a.avg)
                ? Number.parseFloat(b.avgGameScore) - Number.parseFloat(a.avgGameScore)
                : Number.parseFloat(b.avg) - Number.parseFloat(a.avg)
        )
    ;

export const getPreviousPlayers = (
        games: GameResult[]
        ) => games 
        .flatMap(
            x => x.players
        )
        .filter(
            (x, i, a) => i == a.findIndex(
                y => y == x
            )
        )
        .sort(
            (a, b) => a.localeCompare(b)
        )
        ;


export const getScoreInsights = (games: GameResult[]): ScoreInsights => {
    const playerScores = games.flatMap((game) => game.playerScores);
    const allMoves = games.flatMap((game) => game.moves);

    const totalPlayerEntries = playerScores.length;
    const totalWordScore = playerScores.reduce(
        (acc, score) => acc + score.wordScoreTotal,
        0,
    );
    const totalGameScore = playerScores.reduce(
        (acc, score) => acc + score.gameScore,
        0,
    );

    // Total number of moves (turns) for all players/games
    const totalMoves = allMoves.length;
    // Average number of moves per game
    const avgMovesPerGame = games.length > 0
        ? totalMoves / games.length
        : 0;

    // Only 'Play' moves for avgWordScore
    const playMoves = allMoves.filter(move => move.moveType === "Play");
    const totalWordScoreFromPlayMoves = playMoves.reduce((acc, move) => acc + move.wordScore, 0);
    const avgWordScorePerPlayerGame = playMoves.length > 0
        ? totalWordScoreFromPlayMoves / playMoves.length
        : 0;

    // All move types for avgMoveScore
    const totalWordScoreFromAllMoves = allMoves.reduce((acc, move) => acc + move.wordScore, 0);
    const avgMoveScore = totalMoves > 0
        ? totalWordScoreFromAllMoves / totalMoves
        : 0;

    // Average game score remains based on player entries
    const avgGameScorePerPlayerGame = totalPlayerEntries > 0
        ? totalGameScore / totalPlayerEntries
        : 0;

    // Top single word score from all moves
    const topWordScoreTotal = totalMoves > 0
        ? Math.max(...allMoves.map((move) => move.wordScore))
        : 0;

    const topGameScore = totalPlayerEntries > 0
        ? Math.max(...playerScores.map((score) => score.gameScore))
        : 0;

    return {
        totalPlayerEntries,
        totalWordScore,
        totalGameScore,
        totalMoves,
        avgMovesPerGame: `${avgMovesPerGame.toFixed(1)}`,
        avgWordScorePerPlayerGame: `${avgWordScorePerPlayerGame.toFixed(1)}`,
        avgMoveScore: `${avgMoveScore.toFixed(1)}`,
        avgGameScorePerPlayerGame: `${avgGameScorePerPlayerGame.toFixed(1)}`,
        topWordScoreTotal,
        topGameScore,
    };
};

export const getAvgGameDurationsByPlayerCount = (results: GameResult[]): AvgGameDuration[] => {

    const grouped = Map.groupBy(
        results,
        (x) => x.players.length,
    );

    // console.log(
    //     [
    //         ...grouped
    //     ]
    // );

    return [
        ...grouped
    ]
        .map(
            x => ({
                numberOfPlayers: x[0],
                numberOfGames: x[1].length,
                avgGameDuration: formatGameDuration(
                    getAvgGameDurationInMilliseconds(x[1])
                ),
            })
        )
        .sort(
            (a, b) => a.numberOfPlayers - b.numberOfPlayers
        )
    ;
};

//
// Helper functions
//
    const formatGameDuration = durationFormatter<string>();
    const formatLastPlayed = durationFormatter<string>(
        {
            allowMultiples: [
                "y",
                "mo",
                "d",
            ]
        }
    );

    const getLeaderboardEntry = (
        games: GameResult[],
        player: string,
    ): LeaderboardEntry => {

        const countOfWins = games.filter(
            x => x.winner == player
        ).length;

        const totalGames = games.filter(
            x => x.players.some(
                y => y == player
            )
        ).length;

        const playerScores = games
            .flatMap(x => x.playerScores)
            .filter(x => x.player == player)
        ;

        const totalWordScore = playerScores.reduce(
            (acc, x) => acc + x.wordScoreTotal,
            0,
        );

        const totalGameScore = playerScores.reduce(
            (acc, x) => acc + x.gameScore,
            0,
        );


        const avgGameScore = totalGames > 0
            ? totalGameScore / totalGames
            : 0;

        // Average word score should be based on number of moves (turns) for this player
        const playerMovesCount = games
            .flatMap(x => x.moves)
            .filter(x => x.player === player && x.moveType === "Play");

        const totalWordScoreFromPlayMoves = playerPlayMoves.reduce((acc, move) => acc + move.wordScore, 0);
        const avgWordScore = playerPlayMoves.length > 0
            ? totalWordScoreFromPlayMoves / playerPlayMoves.length
            : 0;

        const avg = totalGames > 0
            ? countOfWins / totalGames
            : 0
        ;

        // Tabulate tile multiplier usage by type for this player
        const playerMoves = games
            .flatMap(x => x.moves)
            .filter(x => x.player === player && x.tileMultipliers && Array.isArray(x.tileMultipliers));

        const doubleLetterCount = playerMoves.reduce(
            (acc, move) => acc + (move.tileMultipliers?.filter(t => t === "Dbl Letter").length ?? 0),
            0
        );
        const tripleLetterCount = playerMoves.reduce(
            (acc, move) => acc + (move.tileMultipliers?.filter(t => t === "Trpl Letter").length ?? 0),
            0
        );
        const doubleWordCount = playerMoves.reduce(
            (acc, move) => acc + (move.tileMultipliers?.filter(t => t === "Dbl Word").length ?? 0),
            0
        );
        const tripleWordCount = playerMoves.reduce(
            (acc, move) => acc + (move.tileMultipliers?.filter(t => t === "Trpl Word").length ?? 0),
            0
        );

        // DEBUG: Log playerPlayMoves for inspection
        if (typeof window !== 'undefined' && window.console) {
            console.log(`Leaderboard debug for player: ${player}`);
            console.log('Play moves:', playerPlayMoves);
            console.log('Total word score from Play moves:', totalWordScoreFromPlayMoves);
        }

        return {
            wins: countOfWins,
            losses: totalGames - countOfWins,
            avg: `${avg.toFixed(3)}`,
            totalWordScore,
            avgWordScore: `${avgWordScore.toFixed(1)}`,
            totalGameScore,
            avgGameScore: `${avgGameScore.toFixed(1)}`,
            name: player,
            doubleLetterCount,
            tripleLetterCount,
            doubleWordCount,
            tripleWordCount,
        };
    };

    const getGameDurationInMilliseconds = (result: GameResult) => Date.parse(result.end) 
        - Date.parse(result.start)
    ;

    const getAvgGameDurationInMilliseconds = (results: GameResult[]) => {

    // Add up the game durations for a total, simple reduce.
    const sum = results.reduce(
        (acc, x) => acc + getGameDurationInMilliseconds(x),
        0,
    );

    // Avg is total divided by number of games, accounting for divide by zero...
    return results.length > 0
        ? sum / results.length
        : 0
    ;
};
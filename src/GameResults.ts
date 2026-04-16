import { durationFormatter } from 'human-readable';

//
// Exported type definitions...
//
export type GameResult = {
    winner: string;
    players: string[];

    start: string;
    end: string;
};

 export type LeaderboardEntry = {
    wins: number;
    losses: number;
    avg: string;
    name: string;
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
            (a, b) => a.avg == b.avg
                ? a.wins == 0 && b.wins == 0
                    ? (a.wins + a.losses) - (b.wins + b.losses)
                    : (b.wins + b.losses) - (a.wins + a.losses)
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


export const getAvgGameDurationsByPlayerCount = (results: GameResult[]): AvgGameDuration[] => {

    const grouped = Map.groupBy(
        results,

        (x) => x.players.length,
        // ({ players }) => players.length,
        
        // (x) => x.winner,
        // (x) => new Date(x.start).getMonth(),
        // (x) => new Date(x.start).toLocaleString(
        //     'default',
        //     {
        //         month: 'short',
        //     },
        // ),
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

        const avg = totalGames > 0
            ? countOfWins / totalGames
            : 0
        ;

        return {
            wins: countOfWins,
            losses: totalGames - countOfWins,
            avg: `${avg.toFixed(3)}`,
            name: player

        };
    };


    // console.log(
    //     getPreviousPlayers(
    //         dummyGameResults
    //     ),
    //     getLeaderboard(
    //         dummyGameResults
    //     ),
    // );


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
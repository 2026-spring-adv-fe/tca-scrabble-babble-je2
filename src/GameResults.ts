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

export type GeneralFacts = {
    lastPlayed: string;
    totalGames: number;
    shortestGame: string;
    longestGame: string;
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

    const now = Date.now();

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
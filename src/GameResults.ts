type GameId = number;
type MoveNumber = number;
type RoundNumber = number;
type PlayerName = string;

type Action = "Play" | "Pass" | "Swap" | "Out";

type GameMove = {
  game: GameId;
  move: MoveNumber;
  round: RoundNumber;
  player: PlayerName;
  action: Action;
  wordScore: number;
};

type PlayerGameStats = {
  player: PlayerName;
  game: GameId;
  totalScore: number;
  playCount: number;
  averageWordScore: number;
};

type GameResult = {
  game: GameId;
  players: PlayerGameStats[];
  winner: PlayerName | null;
  winningScore: number;
  bestMove: GameMove | null;
};

type PlayerCareerStats = {
  player: PlayerName;
  gamesPlayed: number;
  totalGameScore: number;     // running total across all games
  averageGameScore: number;
  totalWordScore: number;     // same as totalGameScore in this model
  playCount: number;
  averageWordScore: number;
  wins: number;
};

type RankedStat =
  | "totalGameScore"
  | "averageGameScore"
  | "averageWordScore"
  | "wins";


// --------------------------------------------------
// SAMPLE DATA
// Add more games by continuing the same array
// --------------------------------------------------

const playerMoves: GameMove[] = [
  { game: 1, move: 1, round: 1, player: "Alice", action: "Play", wordScore: 6 },
  { game: 1, move: 2, round: 1, player: "Bobby", action: "Play", wordScore: 33 },
  { game: 1, move: 3, round: 1, player: "Cindy", action: "Play", wordScore: 12 },
  { game: 1, move: 4, round: 1, player: "Doug", action: "Play", wordScore: 30 },
  { game: 1, move: 5, round: 2, player: "Alice", action: "Play", wordScore: 14 },
  { game: 1, move: 6, round: 2, player: "Bobby", action: "Play", wordScore: 17 },
  { game: 1, move: 7, round: 2, player: "Cindy", action: "Play", wordScore: 8 },
  { game: 1, move: 8, round: 2, player: "Doug", action: "Play", wordScore: 28 },
  { game: 1, move: 9, round: 3, player: "Alice", action: "Play", wordScore: 24 },
  { game: 1, move: 10, round: 3, player: "Bobby", action: "Play", wordScore: 36 },
  { game: 1, move: 11, round: 3, player: "Cindy", action: "Swap", wordScore: 0 },
  { game: 1, move: 12, round: 3, player: "Doug", action: "Play", wordScore: 33 },

  // game 2 example
  { game: 2, move: 1, round: 1, player: "Alice", action: "Play", wordScore: 18 },
  { game: 2, move: 2, round: 1, player: "Bobby", action: "Play", wordScore: 22 },
  { game: 2, move: 3, round: 1, player: "Cindy", action: "Play", wordScore: 10 },
  { game: 2, move: 4, round: 1, player: "Doug", action: "Play", wordScore: 14 },
  { game: 2, move: 5, round: 2, player: "Alice", action: "Play", wordScore: 25 },
  { game: 2, move: 6, round: 2, player: "Bobby", action: "Swap", wordScore: 0 },
  { game: 2, move: 7, round: 2, player: "Cindy", action: "Play", wordScore: 27 },
  { game: 2, move: 8, round: 2, player: "Doug", action: "Play", wordScore: 9 },

  // game 3 example
  { game: 3, move: 1, round: 1, player: "Picard", action: "Play", wordScore: 23 },
  { game: 3, move: 2, round: 1, player: "Riker", action: "Play", wordScore: 19 },
  { game: 3, move: 3, round: 2, player: "Picard", action: "Play", wordScore: 12 },
  { game: 3, move: 4, round: 2, player: "Riker", action: "Play", wordScore: 16 },
  { game: 3, move: 5, round: 3, player: "Picard", action: "Play", wordScore: 26 },
  { game: 3, move: 6, round: 3, player: "Riker", action: "Play", wordScore: 28 },
  { game: 3, move: 7, round: 4, player: "Picard", action: "Play", wordScore: 18 },
  { game: 3, move: 8, round: 4, player: "Riker", action: "Play", wordScore: 20 },

  // game 4 example
  { game: 4, move: 1, round: 1, player: "Picard", action: "Play", wordScore: 25 },
  { game: 4, move: 2, round: 1, player: "Riker", action: "Play", wordScore: 14 },
  { game: 4, move: 3, round: 1, player: "Cindy", action: "Play", wordScore: 30 },
  { game: 4, move: 4, round: 2, player: "Picard", action: "Play", wordScore: 20 },
  { game: 4, move: 5, round: 2, player: "Riker", action: "Play", wordScore: 24 },
  { game: 4, move: 6, round: 2, player: "Cindy", action: "Play", wordScore: 12 },
  { game: 4, move: 7, round: 3, player: "Picard", action: "Play", wordScore: 22 },
  { game: 4, move: 8, round: 3, player: "Riker", action: "Play", wordScore: 16 },
  { game: 4, move: 9, round: 3, player: "Cindy", action: "Play", wordScore: 18 },
  { game: 4, move: 10, round: 4, player: "Picard", action: "Play", wordScore: 13 },
  { game: 4, move: 11, round: 4, player: "Riker", action: "Play", wordScore: 15 },
  { game: 4, move: 12, round: 4, player: "Cindy", action: "Play", wordScore: 11 },
  { game: 4, move: 13, round: 5, player: "Picard", action: "Play", wordScore: 20 },
  { game: 4, move: 14, round: 5, player: "Riker", action: "Play", wordScore: 28 },
  { game: 4, move: 15, round: 5, player: "Cindy", action: "Play", wordScore: 27 },
];


// --------------------------------------------------
// HELPERS
// --------------------------------------------------

function round2(value: number): number {
  return Number(value.toFixed(2));
}

function getUniqueGames(moves: GameMove[]): GameId[] {
  return [...new Set(moves.map((m) => m.game))].sort((a, b) => a - b);
}

function getMovesForGame(moves: GameMove[], gameId: GameId): GameMove[] {
  return moves.filter((m) => m.game === gameId);
}


// --------------------------------------------------
// 1. GAME RESULTS
// --------------------------------------------------

function getGameResults(moves: GameMove[]): GameResult[] {
  const gameIds = getUniqueGames(moves);

  return gameIds.map((gameId) => {
    const gameMoves = getMovesForGame(moves, gameId);

    const playerBuckets: Record<string, { totalScore: number; playCount: number }> = {};

    for (const move of gameMoves) {
      if (!playerBuckets[move.player]) {
        playerBuckets[move.player] = { totalScore: 0, playCount: 0 };
      }

      playerBuckets[move.player].totalScore += move.wordScore;

      if (move.action === "Play") {
        playerBuckets[move.player].playCount += 1;
      }
    }

    const players: PlayerGameStats[] = Object.entries(playerBuckets)
      .map(([player, stats]) => ({
        player,
        game: gameId,
        totalScore: stats.totalScore,
        playCount: stats.playCount,
        averageWordScore:
          stats.playCount > 0 ? round2(stats.totalScore / stats.playCount) : 0,
      }))
      .sort((a, b) => b.totalScore - a.totalScore);

    const winner = players.length > 0 ? players[0].player : null;
    const winningScore = players.length > 0 ? players[0].totalScore : 0;

    const bestMove =
      gameMoves.length > 0
        ? gameMoves.reduce((best, current) =>
            current.wordScore > best.wordScore ? current : best
          )
        : null;

    return {
      game: gameId,
      players,
      winner,
      winningScore,
      bestMove,
    };
  });
}


// --------------------------------------------------
// 2. PLAYER CAREER STATS ACROSS ALL GAMES
// --------------------------------------------------

function getPlayerCareerStats(moves: GameMove[]): PlayerCareerStats[] {
  const gameResults = getGameResults(moves);

  const career: Record<string, PlayerCareerStats> = {};

  for (const result of gameResults) {
    for (const p of result.players) {
      if (!career[p.player]) {
        career[p.player] = {
          player: p.player,
          gamesPlayed: 0,
          totalGameScore: 0,
          averageGameScore: 0,
          totalWordScore: 0,
          playCount: 0,
          averageWordScore: 0,
          wins: 0,
        };
      }

      career[p.player].gamesPlayed += 1;
      career[p.player].totalGameScore += p.totalScore;
      career[p.player].totalWordScore += p.totalScore;
      career[p.player].playCount += p.playCount;

      if (result.winner === p.player) {
        career[p.player].wins += 1;
      }
    }
  }

  for (const player of Object.values(career)) {
    player.averageGameScore =
      player.gamesPlayed > 0
        ? round2(player.totalGameScore / player.gamesPlayed)
        : 0;

    player.averageWordScore =
      player.playCount > 0
        ? round2(player.totalWordScore / player.playCount)
        : 0;
  }

  return Object.values(career);
}


// --------------------------------------------------
// 3. LEADERBOARDS
// --------------------------------------------------

function getLeaderboard(
  stats: PlayerCareerStats[],
  rankBy: RankedStat
): PlayerCareerStats[] {
  return [...stats].sort((a, b) => b[rankBy] - a[rankBy]);
}

function getAllLeaderboards(stats: PlayerCareerStats[]) {
  return {
    byTotalGameScore: getLeaderboard(stats, "totalGameScore"),
    byAverageGameScore: getLeaderboard(stats, "averageGameScore"),
    byAverageWordScore: getLeaderboard(stats, "averageWordScore"),
    byWins: getLeaderboard(stats, "wins"),
  };
}


// --------------------------------------------------
// RUN IT
// --------------------------------------------------

const gameResults = getGameResults(playerMoves);
const playerCareerStats = getPlayerCareerStats(playerMoves);
const leaderboards = getAllLeaderboards(playerCareerStats);

console.log("GAME RESULTS");
console.log(gameResults);

console.log("PLAYER CAREER STATS");
console.log(playerCareerStats);

console.log("LEADERBOARDS");
console.log(leaderboards);
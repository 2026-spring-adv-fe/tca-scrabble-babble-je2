import { useNavigate } from "react-router";
import type { GameResult } from "./GameResults";
import { useState } from "react";

type PlayProps = {
    addNewGameResult: (g: GameResult) => void;
    setTitle: (t: string) => void;
};

export const Play: React.FC<PlayProps> = ({ 
    addNewGameResult,
    setTitle,
    }) => {

    setTitle("Play Your Game!");
    
    const nav = useNavigate();
    const [startTimestamp] = useState(new Date().toISOString());

    //We'll write code here. . .

    //then return some jsx...
    return (
        <>
            <button 
                className="btn btn-outline btn-secondary btn-lg w-full lg:w-64"
                onClick={
                    () => {
                        addNewGameResult({
                            winner: "Snape",
                            players: [
                                "Snape",
                                "Dumbledore",
                                "Voldemort",
                            ],
                            start: startTimestamp,
                            end: new Date().toISOString(),
                        });
                        nav(-2);
                    }
                }
            >
                Game Over
            </button>
        </>
    );
};
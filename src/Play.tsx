import { useNavigate } from "react-router";
import type { GameResult } from "./GameResults";
import { useState, useEffect } from "react";



type PlayProps = {
    addNewGameResult: (g: GameResult) => void;
    setTitle: (t: string) => void;
    players?: string[];
};

export const Play: React.FC<PlayProps> = ({ 
    addNewGameResult,
    setTitle,
    players,
}) => {
        console.log(players);
        useEffect(
            () => {
                setTitle("Play your Game!")
            }, [setTitle]
        )
    
    const nav = useNavigate();
    const [startTimestamp] = useState(new Date().toISOString());

    //We'll write code here. . .

    //then return some jsx...
    return (
        <>
            {
                players?.map(
                    x => (            
                        <button 
                            key = {x}
                            className="btn btn-outline btn-secondary btn-lg w-full lg:w-64 mb-2"
                            onClick={
                                () => {
                                    addNewGameResult({
                                        winner: x,
                                        players: players,
                                        start: startTimestamp,
                                        end: new Date().toISOString(),
                                    });
                                    nav(-2);
                        }
                    }
            >
                        {
                            `${x} Won!`
                        }
                        </button>
                    )
                )
            }
        </>
    );

    
};
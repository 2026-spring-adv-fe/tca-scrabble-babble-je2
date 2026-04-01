import { useEffect } from "react";
import { useNavigate } from "react-router";

type SetupProps = {
    setTitle: (t: string) => void;
    previousPlayers: string[];
};

export const Setup: React.FC<SetupProps> = ({ 
    setTitle,
    previousPlayers,    
 }) => {

        console.log("Previous Players: ", previousPlayers);

        useEffect(
            () => {
                setTitle("Set Up Your Game!")
            }, []
        )

    const nav = useNavigate();

    // setTitle("Set Up Your Game!");

    //We'll write code here. . .

    //then return some jsx...
    return (
        <>  
            <button 
                className="btn btn-outline btn-secondary btn-lg w-full lg:w-64"
                onClick={
                    () => nav('/play')}
            >
                Start the Game
            </button>
        </>
    )
}
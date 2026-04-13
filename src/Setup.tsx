import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

type SetupProps = {
    setTitle: (t: string) => void;
    previousPlayers: string[];
    setCurrentPlayers: (p: string[]) => void;
};

export const Setup: React.FC<SetupProps> = ({ 
    setTitle,
    previousPlayers,
    setCurrentPlayers,
 }) => {

    // 
    // React Hooks
    // . local state
    // . effects
    // . navigation
    // 

        const [availablePlayers, setAvailablePlayers] = useState(
            previousPlayers.map(
                x => ({
                    name: x,
                    selected: false,
                })
            )
        )

        // console.log("Previous Players: ", previousPlayers);

        useEffect(
            () => {
                setTitle("Set Up Your Game!")
            }, [setTitle]
        )

    const nav = useNavigate();

    const [newPlayerName, setNewPlayerName] = useState("");

    // 
    // Derived state or other code
    // 

    // setTitle("Set Up Your Game!");

    //We'll write code here. . .

    //then return some jsx...
    return (
        <>  
            <button 
                className="btn btn-outline btn-secondary btn-lg w-full lg:w-64"
                onClick={
                    () => {
                        setCurrentPlayers(
                            availablePlayers
                                .filter(x => x.selected)
                                .map(x => x.name)
                        );
                        nav("/play");
                    }               
                }
            >
                Start the Game
            </button>
                <div className="join mt-4 w-full"
                >
            <input 
                className="input join-item" 
                placeholder="New Player Name" 
                value={newPlayerName}
                onChange={
                    (e) => setNewPlayerName(
                        e.target.value
                    )
                }
            />
            <button 
                className="btn join-item rounded-r-full"
                onClick={
                    () => setAvailablePlayers(
                        [
                            ...availablePlayers,
                            {
                                name: newPlayerName,
                                selected: true,
                            },
                        ]
                    )
                }
                >
                Add New Player
            </button>
            </div>
            <div className="mt-4">
                {availablePlayers.map(player => (
                    <div key={player.name} className="form-control">
                        <label className="block mt-2">
                            {/* <span className="label-text">{player.name}</span> */}
                            <input
                                type="checkbox"
                                className="checkbox mr-3"
                                checked={player.selected}
                                onChange={() => {
                                    setAvailablePlayers(
                                        availablePlayers.map((x) =>
                                            x.name === player.name
                                                ? { ...x, selected: !x.selected }
                                                : x
                                        )
                                    );
                                }}
                            />
                            <span className="label-text">{player.name}</span>
                        </label>
                    </div>
                ))}
            </div>
        </>
    )
}
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

    // DUPE STATE
    // const [dupePlayerName, setDupePlayerName] = useState(false);

    const nav = useNavigate();

    const [newPlayerName, setNewPlayerName] = useState("");


    // 
    // Derived state or other code
    // 

    const dupePlayerName = availablePlayers.some(
        x => x.name === newPlayerName
    );

    const selectedCount = availablePlayers.filter(
        x => x.selected
    ).length;

    const twoToFourPlayersChosen = selectedCount >= 2 && selectedCount <= 4;
    // const onePlayerChosen = selectedCount === 1;

    // setTitle("Set Up Your Game!");

    //We'll write code here. . .

    //then return some jsx...
    return (
        <>
            <div className="flex flex-col gap-2 mb-4 w-full lg:w-64">
                <button
                    className="btn btn-outline btn-primary btn-lg w-full"
                    onClick={() => nav("/")}
                >
                    Home
                </button>
                <button 
                    className="btn btn-outline btn-secondary btn-lg w-full"
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
                    disabled={
                        !twoToFourPlayersChosen
                    }            
                >    
                    {
                        !twoToFourPlayersChosen
                            ? 'Choose 2 to 4 Players'
                            : 'Start Game'
                    }
                </button>
            </div>
                <div className="join mt-4 w-full"
                >
            {/* ADD NEW PLAYER - INPUT */}
            <input 
                type = "text"
                className={`input join-item ${dupePlayerName ? 'input-error' : ''}`} 
                placeholder="New Player Name" 
                value={newPlayerName}
                onChange={
                    (e) => setNewPlayerName(
                        e.target.value
                    )
                }
            />
            {/* ADD NEW PLAYER NAME - ENTER */}
            <button 
                className="btn join-item rounded-r-full"
                onClick={
                    () => {
                        setAvailablePlayers(
                            [
                                ...availablePlayers,
                                {
                                    name: newPlayerName,
                                    selected: true,
                                },
                            ].sort(
                                (a, b) => a.name.localeCompare(b.name)
                            )
                        );

                        setNewPlayerName(
                            ""
                        );
                    }
                }
                // PREVENTS INPUT OF BLANK NAME - REQUIRES INPUT TO ENABLE BUTTON
                disabled={
                    newPlayerName.length === 0 || dupePlayerName
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
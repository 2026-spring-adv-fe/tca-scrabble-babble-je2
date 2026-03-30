import { useNavigate } from "react-router";

export const Setup = () => {
    const nav = useNavigate();

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
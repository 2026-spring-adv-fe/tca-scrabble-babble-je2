import { useNavigate } from "react-router";

type SetupProps = {
    setTitle: (t: string) => void;
};

export const Setup: React.FC<SetupProps> = ({ 
    setTitle }) => {

    const nav = useNavigate();

    setTitle("Set Up Your Game!");

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
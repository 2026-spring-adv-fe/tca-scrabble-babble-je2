import { useNavigate } from "react-router";

export const Play = () => {
    const nav = useNavigate();

    //We'll write code here. . .

    //then return some jsx...
    return (
        <>
            <h1>
                Play
            </h1>
                <button 
                    className="btn btn-primary btn-outline"
                    onClick={
                        () => nav(-2)}
                >
                    Game Over
                </button>
        </>
    )
}
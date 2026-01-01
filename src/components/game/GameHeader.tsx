import { useEffect, useState, useRef } from "react";

interface GameHeaderProps {
    score: number;
    moves: number;
    isGameActive: boolean;
}

export const GameHeader = ({ score, moves, isGameActive }: GameHeaderProps) => {
    const [timer, setTimer] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (isGameActive) {
            intervalRef.current = setInterval(() => {
                setTimer((prev) => prev + 10);
            }, 10);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isGameActive]);

    // Reset timer when game resets (score and moves become 0)
    useEffect(() => {
        if (score === 0 && moves === 0) {
            setTimer(0);
        }
    }, [score, moves]);

    const minutes = Math.floor((timer / 60000) % 60);
    const seconds = Math.floor((timer / 1000) % 60);
    const milliseconds = Math.floor((timer / 10) % 100);

    const formatTime = (value: number) => value.toString().padStart(2, "0");

    return (
        <header className="dark text-card-foreground text-center text-xl uppercase mb-4">
            <h1 className="mb-4">Memory Game</h1>
            <div className="flex justify-center gap-2 max-w-[400px] mx-auto">
                <div className="flex flex-col items-center bg-blue-500/10 backdrop-blur-sm p-3 rounded-lg justify-center">
                    <div className="text-xs opacity-30">Score</div>
                    <div className="text-2xl text-blue-300">{score}</div>
                </div>
                <div className="flex flex-col items-center bg-blue-500/10 backdrop-blur-sm py-3 px-5 rounded-lg justify-center">
                    <div className="text-3xl text-blue-300 tabular-nums">
                        {formatTime(minutes)}:{formatTime(seconds)}:{formatTime(milliseconds)}
                    </div>
                </div>
                <div className="flex flex-col items-center bg-blue-500/10 backdrop-blur-sm p-3 rounded-lg justify-center">
                    <div className="text-xs opacity-30">Moves</div>
                    <div className="text-2xl text-blue-300">{moves}</div>
                </div>
            </div>
        </header>
    );
};
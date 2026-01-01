import { motion } from "motion/react";
import type { Card as CardType } from "@/types";
import animeSeekLogo from "../../assets/anime-seeklogo.png";
import Lottie from "lottie-react";
import explodeAnimation from "../../assets/explode.json";
import { useEffect, useState, memo } from "react";

interface CardProps {
    card: CardType;
    handleChoice: (card: CardType) => void;
    flipped: boolean;
    disabled: boolean;
}

export const Card = memo(({ card, handleChoice, flipped, disabled }: CardProps) => {
    const [showExplosion, setShowExplosion] = useState(false);

    useEffect(() => {
        if (card.matched) {
            setShowExplosion(true);
        } else {
            setShowExplosion(false);
        }
    }, [card.matched]);

    const handleClick = () => {
        if (!disabled && !flipped) {
            handleChoice(card);
        }
    };

    return (
        <div className="relative w-full aspect-square cursor-pointer perspective-[1000px] h-full " onClick={handleClick}>
             {showExplosion && (
                <div className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center scale-[4.0]">
                    <Lottie 
                        animationData={explodeAnimation} 
                        loop={false} 
                        autoplay={true}
                        renderer={"canvas" as any}
                        onComplete={() => setShowExplosion(false)}
                    />
                </div>
            )}
            <motion.div
                className="relative size-full transform-3d"
                initial={false}
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration: 0.2 }}
            >
                {/* Back Face (Pattern) - Visible at 0deg */}
                <div className="absolute inset-0 backface-hidden rounded-sm bg-linear-to-br from-primary/100 to-purple-600/100 shadow-xl flex items-center justify-center p-2">
                   <img src={animeSeekLogo} className="w-full h-full max-w-[50px] max-h-[100px] object-contain opacity-50 pointer-events-none" alt="Anime Seek Logo" />
                </div>

                {/* Front Face (Image) - Visible at 180deg */}
                <div
                    className="absolute inset-0 backface-hidden rounded-sm overflow-hidden  shadow-xl bg-black"
                    style={{ transform: "rotateY(180deg)" }}
                >
                    <img src={card.src} alt="card" className="size-full object-cover" />
                </div>
            </motion.div>
        </div>
    );
});

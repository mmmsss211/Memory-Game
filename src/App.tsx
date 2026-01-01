import { useEffect, useState, useCallback } from "react";
import { GameHeader } from "./components/game/GameHeader";
import { GridBg } from "./components/game/GridBg";
import { Card } from "./components/game/Card";
import cardData from "./data/cards.json";
import type { Card as CardType } from "./types";
import { InteractiveHoverButton } from "./components/ui/interactive-hover-button";

export function App() {
  const [cards, setCards] = useState<CardType[]>([]);
  const [turns, setTurns] = useState(0);
  const [score, setScore] = useState(0); 
  const [choiceOne, setChoiceOne] = useState<CardType | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<CardType | null>(null);
  const [disabled, setDisabled] = useState(false);

  const [isPreview, setIsPreview] = useState(false);
  const [isGameActive, setIsGameActive] = useState(false);

  // Shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardData, ...cardData]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    setScore(0);
    setIsGameActive(false);
    
    // Preview mode
    setIsPreview(true);
    setTimeout(() => {
        setIsPreview(false);
        setIsGameActive(true);
    }, 1000);
  };

  // Handle a choice
  const handleChoiceCallback = useCallback((card: CardType) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }, [choiceOne]);

  // Compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        setScore(prev => prev + 10);
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // Check for game completion
  useEffect(() => {
      if (cards.length > 0 && cards.every(card => card.matched)) {
          setIsGameActive(false);
      }
  }, [cards]);

  // Timer logic - REMOVED (moved to GameHeader)

  // Reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  // Start a new game automatically
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <main className="h-[100vh] w-full overflow-hidden flex flex-col items-center bg-background text-foreground">
      <div className="absolute inset-0 z-0">
         <GridBg />
      </div>
      
      <div className="relative z-10 h-full w-full flex flex-col justify-between p-6 gap-4">
        <div className="shrink-0">
            <GameHeader score={score} moves={turns} isGameActive={isGameActive} />
        </div>
        
        <div className="flex-1 flex items-center justify-center h-full">
            <div className="grid grid-cols-6 gap-3 aspect-square max-h-full max-w-full w-full h-auto md:h-full md:w-auto">
            {cards.map((card) => (
                <Card
                key={card.id}
                card={card}
                handleChoice={handleChoiceCallback}
                flipped={isPreview || card === choiceOne || card === choiceTwo || card.matched}
                disabled={disabled || isPreview}
                />
            ))}
            </div>
        </div>
        <div className="shrink-0 flex justify-center mt-4">
            <InteractiveHoverButton className="pr-8 pl-6 text-sm hover:opacity-90 transition-opacity shadow-lg cursor-pointer" onClick={shuffleCards}>New Game</InteractiveHoverButton>
        </div>
      </div>
    </main>
  );
}

export default App;
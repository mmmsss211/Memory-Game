export interface Card {
    id: number;
    src: string;
    matched: boolean;
}

export interface GameState {
    cards: Card[];
    turns: number;
    score: number;
}

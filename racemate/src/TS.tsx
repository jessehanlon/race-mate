export type Boat = {
    boat: string;
    sail_no: number;
    design: string;
    owner: string;
    rating: number;
    start: string;
    finish: Date;
    elapsed: number;
    tcf: number;
    corrected: number;
    place: number;
    comments: string;
}

export type Race = {
    race: string;
    start: Date;
}
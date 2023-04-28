export type Boat = {
    boat: string;
    sail_no: number;
    design: string;
    owner: string;
    rating: number;
    start: Date;
    finish: Date;
    elapsed: number;
    corrected_seconds;
    tcf: number;
    corrected: number;
    place: number;
    comments: string;
}

export type Race = {
    race: string;
    start: Date;
}
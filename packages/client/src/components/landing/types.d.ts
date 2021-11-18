import { LandingEvent } from "./event-constants";

export interface CreateData {
    name: string;
    story: string;
    event: LandingEvent.CREATE;
}

export interface JoinData {
    name: string;
    roomCode: string;
    event: LandingEvent.JOIN;
}
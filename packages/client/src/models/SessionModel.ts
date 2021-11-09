import { RoundModel } from "./RoundModel";
import { UserModel } from "./UserModel";

export class SessionModel {
    public id: string;
    public users: UserModel[];
    public rounds: RoundModel[];
    public currentRound: RoundModel;
}
import { ROLETYPE, USERTYPE } from "../enums/userType.enum";

export interface User {
    name: string;
    type: USERTYPE;
    role: ROLETYPE;
    company: string;
    sub?: string;
    iat?: Date;
}
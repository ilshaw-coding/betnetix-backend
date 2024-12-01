import { Socket } from "socket.io";

import { UserEntity } from "@common/entities/user.entity";

export interface SocketInterface extends Socket {
    readonly user: UserEntity
}
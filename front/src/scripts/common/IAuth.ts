interface IAuth {
    isAuth: boolean;
    user?: IUser;
}

interface IUser {
    id: number,
    username: string,
    email: string,
    provider: string,
    confirmed: boolean,
    blocked: boolean,
    createdAt: string,
    updatedAt: string,
    role?: IRole,
}

interface IStrapiUser {
    jwt: string,
    user: IUser,
};

interface IRole {
    id: number,
    name: string,
    type: string,
    description: string,
    createdAt: string,
    updatedAt: string
}

export type {
    IAuth, IStrapiUser, IRole, IUser
}
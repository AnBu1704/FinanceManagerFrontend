export interface IAccountInfoAccount
{
    id: number,     
    name: string,
    description: string,
    eMail: string,
    users: IAccountInfoUser[]
}

export interface IAccountInfoUser 
{
    id: number,     
    name: string,
    color: number
}
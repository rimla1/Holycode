export type CreateUserInput = {
    name: string,
    age: number,
    email: string,
    password: string
}

export type User = CreateUserInput & {
    id: string,
}

export type EditUserInput = {
    name?: string,
    age?: number,
    password?: string
}
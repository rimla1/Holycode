export type CreateUserInput = {
    name: string,
    age: number,
    email: string,
    password: string
}

export type User = CreateUserInput & {
    id: string,
}


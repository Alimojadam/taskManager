export interface User{
    name: string;
    email: string;
    pass: string;
    profilIMG?: string;
}

export const users:User[]=[
    {
        name : "ALI",
        email : "Ali@gmail.com",
        pass : "12345678",
        profilIMG: "",
    }
]
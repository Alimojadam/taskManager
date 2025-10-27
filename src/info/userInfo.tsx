export interface User{
    tasksId:number[],
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
        tasksId: [1,2,3,4,5],
        profilIMG: "",
    }
]
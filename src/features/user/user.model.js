

export default class UserModel{
    constructor(name , password , email , phone , age , type){
           
        this.name = name;
        this.password = password;
        this.email = email;
        this.phone = phone;
        this.age = age;
        this.type = type;
    }

    createUser(name,password, email,mobile,age,type){

        const newUser = new UserModel(
            name,
            password,
            email,
            mobile,
            age,
            type
        )

        return newUser;
    }
}
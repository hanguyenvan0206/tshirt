export class User{
    public id: string;
    public username: string;
    public password: string;
    public fullname: string;
    public email: string;
    public phone: string
    constructor(username?, email?, password?, fullname?, phone?){
        this.username = username,
        this.password = password,
        this.fullname = fullname,
        this.email = email,
        this.phone = phone
    }

}
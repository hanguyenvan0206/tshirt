export class Product{
    public id: string;
    public name: string;
    public price: number;
    public img: string;
    public status: boolean;
    constructor(name, price, img, status){
        this.name = name,
        this.price = price,
        this.img = img,
        this.status = status
    }

}
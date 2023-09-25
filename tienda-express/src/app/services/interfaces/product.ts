export class Product
{
    id!: number
    name!: string
    description!: string
    count!: number
    unit_price!: number
    img!: string
    issale!: boolean

    constructor()
    {
        this.id = 0;
    }
}
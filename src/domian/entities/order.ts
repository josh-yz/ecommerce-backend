export class OrderModel {
    id?: string
    products: any
    user: any
    address : string    
    total: number
    sub_total: number
    note : string
    send_cost : number
    track : string
    method_payment : string
    created_at : Date
}


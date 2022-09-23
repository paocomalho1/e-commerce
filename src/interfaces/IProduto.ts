import {IComments} from './IComments'

export default interface IProduto{
    id: number
    nome:string
    img: string
    titulo: string
    preco: number
    subclasse: string
    new: boolean
    vendas: number
    rate: number
    votes: number
    Comments:IComments[]

}
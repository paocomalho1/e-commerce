<template>
    <main class="carrinho">
        <h1 class="carrinho__titulo">Carrinho</h1>
        <div class="carrinho__conteiner">
            <ul class="carrinho__itens">
                <CarrinhoItem v-for="carrinho in Carrinho" :key="carrinho.index" :carrinho="carrinho" :titulo='titulo' :preco="preco" :quantidade="quantidade" :img="img" @aoComprar="mudarTotal"/>
            </ul>
        </div>
        <div class="carrinho__conteiner-botao">
            <button class="cabecalho__tela-comprar" id="botaoComprar" @click="mudarNotificacao" disabled><svg width="22" height="20" xmlns="http://www.w3.org/2000/svg" class="corpo__carrinho"><path d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z" fill="#ffd700" fill-rule="nonzero"/></svg>Comprar</button>
        </div>
        <NotificacaoSite v-if="this.notificacao" @aoNotificacao="mudarNotificacao" :total="total" :usuario="this.usuario"/>
    </main>
</template>

<script>
import {defineComponent,computed} from 'vue'
import {useStore} from '../store'
import NotificacaoSite from './NotificacaoSite.vue'
import CarrinhoItem from './CarrinhoItem.vue'

export default defineComponent({
    nome:'CarrinhoSite',
    components:{
        NotificacaoSite,
        CarrinhoItem
    },
    methods:{
        mudarTotal(valor){
            this.total += valor
        },
        mudarNotificacao(){
            this.notificacao = !this.notificacao
        }
    },
    setup(){
        const store = useStore()
        return{
            Carrinho: computed(() => store.state.Carrinho),
    }
    },
    props:{
        titulo: String,
        preco: Number,
        quantidade: Number,
        img: String,
        usuario: Number
    },
    data(){
        return{
            notificacao:false,
            total:0
        }
    }
})

</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Kdam+Thmor+Pro&display=swap');
@mixin Inter-400{
    font-family: 'Inter', sans-serif;
    font-weight: 400;
}
@mixin mini-celular{
    @media only screen and (max-width: 600.0px){ @content;}
}
@mixin celular {
    @media only screen and (max-width: 960.00px){ @content;}
}
    .carrinho{
        background-color: var(--fundo);
        &__titulo{
            text-align: center;
            color: var(--texto);
            @include Inter-400;
            font-weight: bold;
            font-size: 2.5rem;
            margin-bottom: 2rem;
            
        }
        &__item-conteiner{
            @include celular{
                display:flex;
                flex-direction: column;
                width: calc(100% - 4rem);
            }
            padding: 2rem;
            display: flex;
            justify-content: space-between;
            height: calc(100% - 6rem);
            :last-child{

                width: 65%;
                display: flex;
                justify-content: space-around;
            }
        }
        &__img-conteiner{
            background-color: orange;
            &:first-child{
                background-color: white;
            }
            display: flex;
            width: 25%;
            height: 100%;
            border-radius: 1rem;
            padding: 1rem;
            align-items: center;
            @include celular{
                width: calc(100% - 2rem);
                &:last-child{
                    margin-top: 2rem;
                    width: calc(100% - 2rem);
                }
            }
            @include celular{
                &:first-child{
                    flex-flow: column;
                    justify-content: space-around;
                }
                }
        }
        &__img{
            height: 100px;
            width: 100px;
        }
        &__nome{
            margin-left: 1rem;
            color: orange;
            @include Inter-400;
            font-weight: bold;
            font-size: 1.0rem;


        }
        &__conteiner-quantidade{
            display: flex;
            flex-flow: column;
            justify-content: space-around;
            align-items: center;
            width: 100%;
            height: 100%;

        }
        &__conteiner-quantidade2{
            display: flex;
            justify-content: space-around !important;
            align-items: center;
            border: 2px solid white;
            padding-top: 1rem;
            padding-bottom: 1rem;
            border-radius: 1rem;

        }
        &__quantidade-svg{
            width: 12px !important;
            &:hover{
                cursor: pointer;
            }
        }
        &__quantidade{
            margin-left: 0.2rem;
            color: white;
            @include Inter-400;
            font-weight: bold;
            font-size: 1.0rem;
            &:last-child{
                color: orange !important;
            }
        }
        &__conteiner-preco{
            display: flex;
            flex-flow: column;
            justify-content: space-around;
            align-items: center;
            width: 100%;
            height: 100%;
        }
        &__preco{
            margin-left: 1rem;
            color: white;
            @include Inter-400;
            font-weight: bold;
            font-size: 1.0rem;
        }
        &__conteiner-botao{
            display: flex;
            justify-content: center;
        }
    }
</style>
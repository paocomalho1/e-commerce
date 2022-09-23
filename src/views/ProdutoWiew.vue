<template>
    <main class="produto">
        <h2 class="produto__titulo">{{this.titulo}}</h2>
        <div class="produto__conteiner">
            <div class="produto__conteiner-img">
                <div class="produto__img">
                    <img :src="this.img" class="produto__img" alt="">
                </div>
            </div>
            <div class="produto__conteiner-texto">
                <div>
                    <div class="corpo__conteiner-cabecalho">
                        <p class="corpo__texto-star">({{produto.rate}})</p>
                        <div class="corpo__conteiner-star">
                            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
                            <span class="fa fa-star estrela" @click="rate(0)"></span>
                            <span class="fa fa-star estrela" @click="rate(1)"></span>
                            <span class="fa fa-star estrela" @click="rate(2)"></span>
                            <span class="fa fa-star estrela" @click="rate(3)"></span>
                            <span class="fa fa-star estrela" @click="rate(4)"></span>
                        </div>
                    </div>
                    <div class="produto__conteiner-botao">
                        <p class="produto__preco">R${{this.
                            preco}}</p>
                        <button class="produto__comprar" @click="comprar"><svg width="22" height="20" xmlns="http://www.w3.org/2000/svg" class="corpo__carrinho"><path d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z" fill="#ffd700" fill-rule="nonzero"/></svg>Adicionar ao carrinho</button>
                    </div>
                    <p class="produto__texto">Em até 10x de R$ 999,99 sem juros no cartão
                    Ou em 1x no cartão com até 10% OFF
                    </p>
                </div>
                <!-- <div class="produto__conteiner-nav">
                <ul class="produto__itens">
                    <li class="produto__item">
                        <img src="../assets/imagens/Celulares/Celular-1.jpg" alt="" class="produto__item-img" @mouseover="trocarImagem('Celular-1')">
                    </li>
                    <li class="produto__item">
                        <img src="../assets/imagens/Celulares/Celular-2.jpg" alt="" class="produto__item-img" @mouseover="trocarImagem('Celular-2')">
                    </li>
                    <li class="produto__item">
                        <img src="../assets/imagens/Celulares/Celular-3.jpg" alt="" class="produto__item-img" @mouseover="trocarImagem('Celular-3')">
                    </li>
                    <li class="produto__item">
                        <img src="../assets/imagens/Celulares/Celular-4.png" alt="" class="produto__item-img" @mouseover="trocarImagem('Celular-4')">
                    </li>
                </ul>
            </div> -->
            </div>
        </div>
    </main>
    <section class="corpo__Cmensagem">
        <h1 class="produto__texto-comments">Perguntas e Respostas</h1>
        <CommentsS :id="this.usuario" :produto="produto" :estrela='this.estrela'/>
    </section>
</template>

<script >
import {defineComponent, computed} from 'vue'
import {store, useStore} from '../store'
import CommentsS from '../views/CommentsS.vue'

export default defineComponent({
    name: 'ProdutoWiew',
    components:{
        CommentsS
    },
    emits:[
        "aoBotao"
    ],
    props:{
        id:{
            type: String
        },
        usuario: Number
    },
    data(){
        return{
            img: '',
            titulo:"",
            preco: 0,
            produto:{

            },
            estrela:-1

        }
    },
    mounted(){
        if(this.id){
            const produto = store.state.Produto.find(prod => prod.id == this.id)
            this.produto = produto
            this.img = produto.img
            this.titulo = produto.titulo
            this.preco = produto.preco
        }
    },
    setup(){
        const store = useStore()
        return{
            Produto: computed(() => store.state.Produto),
            Carrinho: computed(() => store.state.Carrinho),
    }
    },
    methods:{
        trocarImagem(valor){
            const imagens = document.querySelector('.produto__img')
            imagens.classList.remove('Celular-1','Celular-2','Celular-3','Celular-4')
            imagens.classList.add(valor)
        },
        comprar(){
            this.$emit("aoBotao",[this.titulo,this.preco,this.img])
            store.commit('addItem',this.produto)
        },
        rate(valor){
            const star = document.querySelectorAll('.estrela')
            if(star.length == 1){
                star[valor].classList.add('checked')

            }else{
                let cont = 0
                star.forEach(str =>{
                    if(valor >= cont){
                        cont++
                        str.classList.add('checked')
                    }else{
                        str.classList.remove('checked')
                    }
                })
                this.estrela = valor+1
            }
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
@mixin tablet {
    @media only screen and (min-width: 960.00px) and (max-width: 1150.00px){ @content;}
}
    .produto{
        padding: 2rem;
        background-color: var(--fundo);
        &__titulo{
            margin-top: 2rem;
            margin-bottom: 2rem;
            @include Inter-400;
            font-size: 1.4rem;
            text-align: center;
            color: var(--texto);

        }
        &__conteiner{
            display: flex;
            @include celular{
                flex-direction: column;
                justify-content: center;
            }
            
            
        }
        &__conteiner-img{
            margin-right: 2rem;
            @include celular{
                margin-right: 0rem;
            }
        }
        &__img{
            width: 569px;
            height: 554px;
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            border-radius: 1rem;
            border: 2px solid navy;
            background-color: white;
            @include celular{
                width: 100%;
                margin-bottom: 0rem;
            }
        }
        &__conteiner-texto{
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-top: 2rem;
            line-height: 1.6rem;
            @include celular{
                margin-top: 0rem;
                margin-bottom: 3rem;
                flex-direction: column-reverse;
            }

        }
        &__conteiner-botao{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            @include celular{
                margin-top: 1rem;
                
            }
        }
        &__preco{
            color: var(--texto);
            @include Inter-400;
            font-weight: bold;
            font-size: 2rem;
        }
        &__comprar{
            padding: 0.75rem;
            padding-right: 2rem;
            padding-left: 2rem;
            @include Inter-400;
            margin-bottom: 1rem;
            border: none;
            background-color: navy;
            border-radius: 0.2rem;
            color: white;
            border: 2px solid navy;
            display: flex;
            align-items: center;
            justify-content: center;
            @include tablet{
                padding-right: 1rem;
                padding-left: 1rem;
            }
            @include celular{
                padding-right: 0.4rem;
                padding-left: 0.4rem;
            }
            &:hover{
                cursor: pointer;
                background-color: white;
                color: navy;
                border: 2px solid navy;
            }
        }
        &__texto{
            color: var(--texto);
            @include Inter-400;
            font-size: 1.2rem;
        }
        &__conteiner-nav{
            display: flex;
            width: 100%;
            margin-bottom: 2rem;
            @include celular{
                margin-top: 4rem;
                
            }
        }
        &__itens{
            width: 100%;
            display: flex;
            justify-content: space-around;
        }
        &__item{
            display: flex;
            align-items: center;
        }
        &__item-img{
            transition: all 300ms ease-in-out;
            border: 2px solid navy;
            border-radius: 0.5rem;
            width: 100px;
            height: 100px;
            &:hover{
                opacity: 0.7;
                cursor: pointer;
            }
            @include celular{
                width: 100%;
                height: 50%;
            }
        }
        &__texto-comments{
                color: var(--texto);
                font-weight: bold;
                @include Inter-400;
                font-size: 1.5rem;
                align-self: flex-start;
            }
        .Celular-1{
            background-image: url(../assets/imagens/Celulares/Celular-1.jpg);
        }
        .Celular-2{
            background-image: url(../assets/imagens/Celulares/Celular-2.jpg);
        }
        .Celular-3{
            background-image: url(../assets/imagens/Celulares/Celular-3.jpg);
        }
        .Celular-4{
            background-image: url(../assets/imagens/Celulares/Celular-4.png);
        }
    }
</style>
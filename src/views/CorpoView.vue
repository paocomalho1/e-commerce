<template>
    <main class="corpo">
        <section class="corpo__secao">
            <h1 class="corpo__titulo">
                Lançamentos
            </h1>
            <ul class="corpo__itensP">
                <CorpoItem  v-for="lancamentos in Lancamentos" :key="lancamentos.index" :produto="lancamentos"/>
            </ul>
        </section>
        <section class="corpo__secao">
            <h1 class="corpo__titulo">
                Produtos
            </h1>
            <ul class="corpo__itensP">
                <li class="corpo__itemP">
                    <router-link to="/Produtos/Perifericos">
                    <figure class="corpo__conteiner">
                        <img src="../assets/imagens/Perifericos/Periferico-4.png" class="corpo__imgP">
                        <figcaption class="corpo__img-texto">Perifericos</figcaption>
                    </figure>
                    </router-link>
                </li>
                <li class="corpo__itemP">
                    <router-link to="/Produtos/Hardware">
                    <figure class="corpo__conteiner">
                        <img src="../assets/imagens/Hardware/Hardware-2.png" class="corpo__imgP">
                        <figcaption class="corpo__img-texto">Hardware</figcaption>
                    </figure>
                    </router-link>
                </li>
                <li class="corpo__itemP">
                    <router-link to="/Produtos/Celulares">
                    <figure class="corpo__conteiner">
                        <img src="../assets/imagens/Celulares/Celular-1.jpg" class="corpo__imgP">
                        <figcaption class="corpo__img-texto">Celulares</figcaption>
                    </figure>
                    </router-link>
                </li>
                <li class="corpo__itemP">
                    <router-link to="/Produtos/Notebooks">
                    <figure class="corpo__conteiner">
                        <img src="../assets/imagens/Notebooks/Notebook-1.jpg" class="corpo__imgP">
                        <figcaption class="corpo__img-texto">Notebooks</figcaption>
                    </figure>
                    </router-link>
                </li>
                <li class="corpo__itemP">
                    <router-link to="/Produtos/Computadores">
                    <figure class="corpo__conteiner">
                        <img src="../assets/imagens/Computadores/Computador-1.jpg" class="corpo__imgP">
                        <figcaption class="corpo__img-texto">Computadores</figcaption>
                    </figure>
                    </router-link>
                </li>
            </ul>
        </section>
        <section class="corpo__secao">
            <h1 class="corpo__titulo">
                Mais vendidos
            </h1>
            <ul class="corpo__itensP">
                <CorpoItem v-for="maisVendidos in MaisVendidos" :key="maisVendidos.index" :produto="maisVendidos"/>
            </ul>
        </section>
    </main>
    
</template>

<script lang='ts'>
import { defineComponent,computed} from "vue";
import CorpoItem from '../views/CorpoItem.vue'
import {useStore} from '../store'

export default defineComponent ({
    name: 'CorpoView',
    components:{
        CorpoItem
    },
    setup(){
        const store = useStore()
        const Comments = store.state.Produto.sort((a, b) => (a.vendas < b.vendas) ? 1 : -1).slice(0,4)
        const MaisVendidos = computed(() => Comments)
        return{
            Produto: computed(() => store.state.Produto),
            Lancamentos: computed(() => store.state.Produto.filter(prod => prod.new == true).slice(0,4)),
            MaisVendidos
    }
    },
})
</script>

<style lang="scss">
@mixin mini-celular{
    @media only screen and (max-width: 600.00px){ @content;}
}
@mixin celular {
    @media only screen and (max-width: 960.00px) and (min-width: 600.00px){ @content;}
}
@mixin tablet {
    @media only screen and (min-width: 960.00px) and (max-width: 1150.00px){ @content;}
}
@mixin desktop {
    @media only screen and (min-width: 1150.00px) and (max-width: 1300.00px){ @content;}
}
@import url('https://fonts.googleapis.com/css2?family=Kdam+Thmor+Pro&display=swap');
@mixin Inter-400{
    font-family: 'Inter', sans-serif;
    font-weight: 400;
}
textarea:focus, input:focus, select:focus {
    box-shadow: 0 0 0 0;
    outline: 0;
} 
.corpo{ 
        background-color: var(--fundo);
        padding-right: 2rem;
        padding-left: 2rem;
        &__titulo{
            @include Inter-400;
            color: white;
            font-size: 2.5rem;
            font-weight: 500;
            margin-bottom: 2rem;
            padding: 0.5rem;
            background-color: var(--botao);
            border: 2px solid black;
        }
        &__conteiner-select{
            display: flex;
            justify-content: space-between;
            width: 100%;
            align-items: center;
            margin-bottom: 1rem;
            @include mini-celular{
                flex-direction: column;
            }
        }
        &__seletor{
            padding: 0.2rem;
            border: 2px solid var(--texto);
            color: navy;
            font-weight: bold;
            @include Inter-400;
            @include mini-celular{
                margin-bottom: 1rem;
                width: 100%;
            }
        }
        &__opcao{
            padding: 0.2rem;
            border: 1px solid navy;
            color: navy;
            font-weight: bold;
            @include Inter-400;
        }
        &__label{
            font-weight: bold;
            color: navy;
            @include Inter-400;

        }
        &__input{
            padding: 0.3rem;
            font-size: 1.2rem;
            @include Inter-400;
            color: navy;
            border: 2px solid navy;
            border-radius: 0.2rem
        }
        &__buscar{
            color: white;
            font-weight: bold;
            @include Inter-400;
            padding: 0.5rem;
            border: 2px solid var(--botao);
            background-color: var(--botao);
            border-radius: 0.2rem;
            &:hover{
                color: navy;
                background-color: white;
                cursor: pointer;
            }

        }
        &__conteiner-total{
            display: flex;
            width: 100%;
            @include mini-celular{
                flex-direction: column;
            }
            @include celular{
                flex-direction: column;
            }
        }
        &__conteiner-fitragem{
            background-color: white;
            padding: 2rem;
            border: 2px solid var(--texto);
            width: calc(25% - 4rem);
            border-radius: 0.2rem;
            margin-bottom: 1rem;
            margin-right: 1rem;
            height: 525px;
            @include mini-celular{
                width: calc(100% - 4rem);
                height: 510px;
                margin-bottom: 1rem;
            }
            @include celular{
                width: calc(100% - 4rem);
                height: 450px;
                margin-bottom: 1rem;
            }
        }
        &__titulo-filtro{
            margin-bottom: 1rem;
            color: navy;
            font-weight: bold;
            @include Inter-400;
        }
        &__checkbox{
            margin-right: 1rem;
        }
        &__conteiner-filtro{
            display: flex;
            justify-content: center;
            flex-direction: column;
            width: 33%;
            
}
        &__continer-checkbox{
            display: flex;
            margin-bottom: 0.5rem;
            color: navy;
            font-weight: bold;
            @include Inter-400;
            align-items: center;
        }
        &__secao{
            padding-top: 2rem;
            padding-bottom: 1rem;
        }
        &__itensP{
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 1rem;
            width: 100%;
            @include mini-celular{
                flex-wrap: wrap;
            }
            @include celular{
                flex-wrap: wrap;
            }
            @include tablet{
                flex-wrap: wrap;
            }
            @include desktop{
                flex-wrap: wrap;
            }


            
        }
        &__itemP{
            height: 440px;
            @include mini-celular{
                width: 100%;
                margin-right: 0rem;
                margin-bottom: 1rem;
            }
            @include celular{
                width: 100%;
                margin-right: 0;
                margin-bottom: 1rem;
                flex-wrap: wrap;
            }
            @include tablet{
                flex-wrap: wrap;
                margin-bottom: 1rem;
                width: calc(50% - 0.75rem);
                margin-right: 1rem;
                &:nth-child(2n){
                    margin-right: 0rem;
                    
                }
                &:nth-child(4n){
                    margin-right: 0rem !important;
                }
            }
            @include desktop{
                flex-wrap: wrap;
                margin-bottom: 1rem;
                width: calc(33% - 0.75rem);
                margin-right: 1rem;
                &:nth-child(3n){
                    margin-right: 0rem !important;
                }
                &:nth-child(4n){
                    margin-right: 1rem !important;
                }
            }
            border: 2px solid var(--texto);
            width: calc(25% - 1.0rem);
            margin-right: 1rem;
            border-radius: 0.5rem;
            background-color: white;
            margin-bottom: 1rem;
            &:nth-child(4n){
                margin-right: 0rem;
            }
        }
        &__conteiner{
            display: flex;
            flex-direction: column;
            align-items: center;
            
        }
        &__imgP{
            height: 200px;

        }
        &__img-texto{
            margin-top: 1rem;
            @include Inter-400;
            font-size: 1.2rem;
            padding: 1rem;
            text-align: center;
            color: navy;
        }
        &__preco{
            padding: 1rem;
            align-self: flex-start;
            @include Inter-400;
            //margin-bottom: 1rem;
            font-size: 1.5rem;
            color: navy;
            @include celular{
                align-self: center;
            }
        }
        &__comprar{
            width: 90%;
            padding: 0.75rem;
            @include Inter-400;
            margin-bottom: 1rem;
            border: none;
            background-color: var(--botao);
            border-radius: 0.2rem;
            color: white;
            border: 2px solid var(--botao);
            display: flex;
            align-items: center;
            justify-content: center;
            &:hover{
                cursor: pointer;
                background-color: white;
                color: navy;
                border: 2px solid navy;
            }
        }
        &__carrinho{
            margin-right: 0.5rem;
        }
    }
</style>
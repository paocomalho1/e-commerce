<template>
    <div class="notificacao">
        <div class="notificacao__conteiner">
            <h1 class="notificacao__titulo" v-if="this.sim">
                    {{this.aviso}}
            </h1>
            <button class="notificacao__botao" @click="cancelar" v-if="this.sim">Fechar</button>
            <div class="notificacao__aviso" v-if="!this.sim">
                <h1 class="notificacao__titulo">
                    Confirmar compra?
                </h1>
                <p class="notificacao__texto">Tem certeza de que deseja efetuar esta comprar?</p>
                <p class="notificacao__total">Total: R$ {{this.total}}</p>
                <div class="notificacao__conteiner-botao">
                    <button class="notificacao__botao" @click="comprar">Sim</button>
                    <button class="notificacao__botao" @click="cancelar">Não</button>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
import {defineComponent,computed} from 'vue'
import {store, useStore} from '../store'

export default defineComponent({
    name:'NotificacaoSite',
    emits:[
        'aoNotificacao'
    ],
    setup(){
        const store = useStore()

        return{
            Users: computed(() => store.state.Users),
    }
    },
    computed:{
        aviso(){
            if(this.compra){
                return `Compra feita com sucesso saldo R$:${this.saldo}`
            }else{
                return `Saldo Insuficiente`
            }
        }
    },
    props:{
        total:Number,
        usuario:Number
    },
    data(){
        return{
            sim:false,
            saldo:0,
            compra:false
        }
    },
    methods:{
        comprar(){
            this.sim = !this.sim
            const botao = document.getElementById('botaoComprar')
            if(this.total > this.Users[this.usuario].balanco){
                this.compra = false
                store.commit('limparCarrinho')
                botao.disabled = true
            }else{
                this.saldo = this.Users[this.usuario].balanco - this.total
                store.commit('EDIT_USER',[this.saldo,this.usuario])
                store.commit('limparCarrinho')
                console.log('lol2')
                this.compra = true
                botao.disabled = true
                
            }
        },
        cancelar(){
            this.$emit('aoNotificacao')
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
@mixin celular {
    @media only screen and (max-width: 960.00px){ @content;}
}
    .notificacao{
        position: fixed;
        top:0;
        left: 0;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #000000aa;
        @include celular{
            width: 100%;
            left: 0;
            }
        &__aviso{
            height: 100%;
            width: 100%;
            display: flex;
            align-items: center;
            flex-flow: column;
            justify-content: space-around;
        }
        &__conteiner{
            opacity: 1;
            padding: 1rem;
            background-color: white;
            width: 300px;
            height: 200px;
            @include celular{
                width: 80%;
            }
            border-radius: 1rem;
            display: flex;
            flex-flow: column;
            align-items: center;
            justify-content: space-around;
        }
        &__titulo{

            @include Inter-400;
            font-weight: bold;
            font-size: 1.5rem;
            color: navy;
        }
        &__texto{

            @include Inter-400;
            font-size: 1.2rem;
            color: navy;
        }
        &__total{
            @include Inter-400;
            font-size: 1.2rem;
            color: navy;
            font-weight: bold;

        }
        &__conteiner-botao{
            display: flex;
            justify-content: space-around;
            width:80%;
        }
        &__botao{
            padding: 0.75rem;
            padding-left: 2rem;
            padding-right: 2rem;
            border: none;
            @include Inter-400;
            color:white;
            background-color: green;
            border-radius: 0.2rem;
            border: 2px solid green;
            &:last-child{
                background-color: red;
                border: 2px solid red;
                &:hover{
                    color: red;
                }
            }
            &:hover{
                background-color: white;
                cursor: pointer;
                }
            &:hover{
                    color: green;
                }
        }
    }
</style>
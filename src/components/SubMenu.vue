<template>
        <ul class="submenu">
            <router-link :to="`/Produtos/${opcao1}`" @click="submenu('produtos')">
            <li class="submenu__item perifericos" @mouseover="submenu('perifericos')">
                <a href="#" class="submenu__link">{{opcao1}}</a>
                <img src="../assets/imagens/Icones/right-arrow.png" class="submenu__ceta" alt="" v-if="tela1 == null && this.telaAtivo == false">
            </li>
            </router-link>
            <router-link :to="`/Produtos/${opcao2}`" @click="submenu('produtos')">
            <li class="submenu__item hardware" @mouseover="submenu('hardware')">
                <a href="#" class="submenu__link">{{opcao2}}</a>
                <img src="../assets/imagens/Icones/right-arrow.png" class="submenu__ceta" alt="" v-if="tela1 == null && this.telaAtivo == false">
            </li>
            </router-link>
            <router-link :to="`/Produtos/${opcao3}`" @click="submenu('produtos')">
            <li class="submenu__item notebook">
                <a href="#" class="submenu__link">{{opcao3}}</a>
            </li>
            </router-link>
            <router-link :to="`/Produtos/${opcao4}`" @click="submenu('produtos')">
            <li class="submenu__item notebook">
                <a href="#" class="submenu__link">{{opcao4}}</a>
            </li>
            </router-link>
            <router-link :to="`/Produtos/${opcao5}`" @click="submenu('produtos')">
            <li class="submenu__item computador">
                <a href="#" class="submenu__link">{{opcao5}}</a>
            </li>
            </router-link>
        </ul>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'SubMenu',

    computed:{
        opcao1(){
            if(this.tela1 == 'perifericos'){
                return 'Mouse'
            }
            else if(this.tela1 == 'hardware'){
                return 'Coolers'
            }
            else{
                return 'Perifericos'
            }
        },
        opcao2(){
            if(this.tela1 == 'perifericos'){
                return 'Teclado'
            }
            else if(this.tela1 == 'hardware'){
                return 'Placa mae'
            }
            else{
                return 'Hardware'
            }
        },
        opcao3(){
            if(this.tela1 == 'perifericos'){
                return 'Caixa de som'
            }
            else if(this.tela1 == 'hardware'){
                return 'Memoria ram'
            }
            else{
                return 'Celulares'
            }
        },
        opcao4(){
            if(this.tela1 == 'perifericos'){
                return 'Microfone'
            }
            else if(this.tela1 == 'hardware'){
                return 'Placa de video'
            }
            else{
                return 'Notebooks'
            }
        },
        opcao5(){
            if(this.tela1 == 'perifericos'){
                return 'Gabinete'
            }
            else if(this.tela1 == 'hardware'){
                return 'Processadores'
            }
            else{
                return 'Computadores'
            }
        }
    },
    emits:[
        'aoAtivar'
    ],
    props: {
        tela1: String,
        telaAtivo: Boolean,
    },
    methods: {
        submenu(valor){
            this.$emit('aoAtivar',valor)
         },
    },
    
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
    .submenu{
        
        box-shadow: 5px 8px 12px -9px #000000;
        background-color: white;
        border: 2px solid white;
        border-right: 1px solid white;
        border-left: 1px solid white;
        margin-top:0.3rem;
        margin-bottom: 1rem;
        &__item{
            padding: 1.2rem;
            padding-right: 2rem;
            padding-left: 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: all 300ms ease-in-out;
            color:orange;
            &:hover{
                background-color:orange;
                color: white
            }

        }
        &__link{
            @include Inter-400;
            font-weight: bold;
            font-size: 1.3rem;
            color:inherit;
        }
        &__ceta{
            margin-left: 0.3rem;
            width: 10px;
            height: 7px;
        }
    
    }
</style>

<template>
    <header class="cabecalho">
        <div class="cabecalho__conteiner">
        <a href="#/Main" class="cabecalho__logo">GamersClub</a>
        <div class="cabecalho__conteiner-botao">
        <input style="text-transform: capitalize;" placeholder="Buscar" type="text" name="input" id='input' class="cabecalho__input" @input="ir" v-model="filtro"> 
        </div>
            <li class="cabecalho__item">
                <div class="cabecalho__conteiner-radio">
                    <span class="cabecalho__moon">
                    </span>
                    <label class="switch">
                        <input type="checkbox" @click="modoDark">
                        <span class="slider round"></span>
                    </label>
                </div>
            </li> 
        <li class="cabecalho__item">
                <a class="cabecalho__link">
                    <svg width="22" height="20" xmlns="http://www.w3.org/2000/svg" @mouseenter="carrinho" v-if="this.modoDarkAtivo == true"><path d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z" fill="#FFA500" fill-rule="nonzero"/></svg>
                    <svg width="22" height="20" xmlns="http://www.w3.org/2000/svg" @mouseenter="carrinho" v-if="this.modoDarkAtivo == false"><path d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z" fill="#FFA500" fill-rule="nonzero"/></svg>
                    <span class="cabecalho__notificacao" v-if="this.notificacaoAtivo">{{Carrinho.length}}</span>
                </a>
                <div class="cabecalho__tela" v-if="this.telaAtivo && this.notificacaoAtivo">
                    <h4 class="cabecalho__tela-texto">Ultimo item adicionado</h4>
                    <h4 class="cabecalho__tela-titulo">{{this.titulo}}</h4>
                    <p class="cabecalho__tela-preco">R${{this.preco}}</p>
                    <router-link to="/carrinho" @click="carrinhoEmit">
                    <button class="cabecalho__tela-comprar"><svg width="22" height="20" xmlns="http://www.w3.org/2000/svg" class="corpo__carrinho"><path d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z" fill="#ffd700" fill-rule="nonzero"/></svg>Ir ao carrinho</button>
                    </router-link>
                </div>
            </li>
        <li class="cabecalho__item" v-if="this.usuarioAtivo">
            <img :src="Users[this.usuario].image.webp" alt="" class="cabecalho__user" @click="ativarTelaUser">
            <div class="cabecalho__tela-user" v-if="this.telaUserAtivo">
                <p class="cabecalho__balanco">Balanço R$:{{Users[this.usuario].balanco}}</p>
                <router-link to="/">
                    <button class="cabecalho__botao-user" @click="ativarTelaUser"> Trocar de usuario </button>
                </router-link>
            </div>
        </li>
        <span class="cabecalho__hamburger" @click="hamburger"></span>
        </div>
        <nav class="cabecalho__menu">
        <ul class="cabecalho__itens">
            <li class="cabecalho__item-nav">
                <router-link to="/Produtos/all">
                    <a class="cabecalho__link"  @mouseover="submenu('produtos')">Produtos</a>
                </router-link>
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="7" class="cabecalho__ceta"><path fill="none" stroke="#FFF" stroke-width="2" opacity=".75" d="M1 1l4 4 4-4"/></svg>
                <!-- <svg xmlns="http://www.w3.org/2000/svg" v-if="this.modoDarkAtivo == true" width="10" height="7" class="cabecalho__ceta"><path fill="none" stroke="#000080" stroke-width="2" opacity=".75" d="M1 1l4 4 4-4"/></svg> -->
                <span class="cabecalho__link"></span>
            </li>
            <li class="cabecalho__item-nav">
                <router-link to="/Produtos/new">
                <a class="cabecalho__link">Lançamentos</a>
                </router-link>
            </li>
            <li class="cabecalho__item-nav">
                <a href="#/Main" class="cabecalho__link">Pagina Principal</a>
            </li>
        </ul>
            <div class="cabecalho__submenu-conteiner">
                <SubMenu v-if="tela === 'produtos'" @aoAtivar="submenu1"/>
                <SubMenu v-if="tela1 === 'perifericos'" @aoAtivar="submenu1" tela1="perifericos"/>
                <SubMenu v-if="tela1 === 'hardware'" @aoAtivar="submenu1" tela1="hardware"/>
            </div>
        </nav>
    </header>
</template>

<script>
import { defineComponent, computed, ref } from 'vue'
import SubMenu from './SubMenu.vue'
import {useStore} from '../store'
import { useRouter } from "vue-router";


export default defineComponent({
    name: 'CabecalhoSite',
    components:{
        SubMenu,
    },
    setup(){
        const store = useStore()
        const router = useRouter()
        const filtro = ref("")
        return{
            Carrinho: computed(() => store.state.Carrinho),
            Users: computed(() => store.state.Users),
            filtro,
            router
    }
    },
    props:{
        notificacaoAtivo: Boolean,
        quantidade: Number,
        titulo:String,
		preco:Number,
        usuario: Number,
        usuarioAtivo:Boolean,
    },
    computed:{
      tema(){
        if(this.modoDarkAtivo == true){
            return ''
        }
        else{
            return 'Escuro'
        }
      }  
    },
    emits:[ 
	'aoHamburger',
    'aoCarrinho',
	],
    data(){
        return{
            tela: '',
            tela1: '',
            modoDarkAtivo: false,
            telaAtivo: false,
            telaUserAtivo:false,

        } 
    },
    methods: {
        ir(){
            this.router.push(`/Produtos/${this.filtro || 'all'}`)
        },
        ativarTelaUser(){
            this.telaUserAtivo = !this.telaUserAtivo
        },
        submenu(valor){
            if(this.tela == 'produtos'){
                this.tela = ''
                this.tela1 = '';
            }else{
                this.tela = valor;
                this.tela1 = '';
            }
            var animacoes = []
            const produtos = document.querySelector('.cabecalho__ceta')
            animacoes = ['rotacao-in','rotacao-out']
            this.animar(produtos,animacoes)
                
            
        },
        animar(elemento,animacao){
            if(elemento.classList.contains(animacao[0])){
                elemento.classList.remove(animacao[0])
                elemento.classList.add(animacao[1])
            }else{
                elemento.classList.add(animacao[0])
                elemento.classList.remove(animacao[1])
            }
        },
        submenu1(valor){
            if(valor == 'produtos'){
                this.tela = '';
                this.tela1 = '';
                var animacoes = []
                const produtos = document.querySelector('.cabecalho__ceta')
                animacoes = ['rotacao-in','rotacao-out']
                this.animar(produtos,animacoes)
            }
            this.tela1 = valor;

        },
        hamburger(){
            const hamburger = document.querySelector('.cabecalho__hamburger')
            if(hamburger.classList.contains('x')){
                hamburger.classList.remove('x')
                this.$emit('aoHamburger')
            }else if(hamburger.classList.contains('x-dark')){
                hamburger.classList.remove('x-dark')
                this.$emit('aoHamburger')
            }
            else{
                if(this.modoDarkAtivo == true){
                    hamburger.classList.add('x-dark')
                }else{
                    hamburger.classList.add('x')
                }
                this.$emit('aoHamburger')
            }
        },
        carrinhoEmit(){
            this.$emit('aoCarrinho',this.quantidade)
            this.telaAtivo = !this.telaAtivo
        },
        modoDark(){
            const tema = document.querySelectorAll(".cabecalho__moon")
            const hamburger = document.querySelector('.cabecalho__hamburger')
            if(this.modoDarkAtivo == false){
                document.body.style.setProperty('--fundo', '#131862');
                document.body.style.setProperty('--primario', 'navy');
                document.body.style.setProperty('--texto', 'white');
                document.body.style.setProperty('--botao', 'orange');
                tema.forEach(item =>{
                    item.classList.add('trocarParaLua')
                })
                hamburger.classList.add('hamburger')
                this.modoDarkAtivo = !this.modoDarkAtivo
            }
            else{
                document.body.style.setProperty('--fundo', 'white')
                document.body.style.setProperty('--primario', 'white');
                document.body.style.setProperty('--texto', 'navy');
                document.body.style.setProperty('--botao', 'navy');
                tema.forEach(item =>{
                    item.classList.remove('trocarParaLua');
                })
                hamburger.classList.remove('hamburger')
                this.modoDarkAtivo = !this.modoDarkAtivo
            }
    },
    carrinho(){
        this.telaAtivo = !this.telaAtivo
        
    }
    
    },
    
})
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Kdam+Thmor+Pro&display=swap');
@mixin Inter-400{
    font-family: 'Inter', sans-serif;
    font-weight: 400;
}
    a{
        text-decoration: none;
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

@keyframes rotacao-in{
    from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(180deg);
      }
}
@keyframes rotacao-out{
    from {
        transform: rotate(180deg);
      }
      to {
        transform: rotate(0deg);
      }
}

    .cabecalho{
        @include celular{
            padding-right: 1rem;
            padding-left: 1rem;
            border-bottom: 2px solid navy;
        }
        padding-right: 2.5rem;
        padding-left: 2.5rem;
        padding-top: 1.3rem;
        background-color: var(--primario);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        &__conteiner{
            margin-bottom: 1rem;
            display: flex;
            justify-content: space-between;
            width: 100%;
            align-items: center;
        }
        &__logo{
            margin-right: 2rem;
            @include Inter-400;
            color:var(--texto);
            font-size: 3rem;
            font-weight: 500;
            @include tablet{
                font-size: 2.5rem;
                margin-right: 1rem;
            }
            @include celular{
                font-size: 2.0rem;
                margin-right: 0.2rem;
            }
            @include mini-celular{
                font-size: 1.2rem;
                margin-right: 0.2rem;
            }
        }
        &__conteiner-botao{
            display: flex;
            align-items: center;
        }
        &__input{
            padding: 0.45rem;
            font-size: 1.2rem;
            @include Inter-400;
            color: navy;
            border: 2px solid navy;
            border-radius: 0.2rem;
            padding-right: 1rem;
            padding-left: 1rem;
            width: 400px;
            @include tablet{
                width: 250px;
            }
            @include celular{
                width: 175px;
            }
            @include mini-celular{
                width: 110px;
                padding: 0.3rem;
            }
        }
        &__conteiner-radio{
            display:flex;
            align-items: center;
            @include celular{
                display:none
            }
        }
        &__menu{
            
            justify-content: center;
            width: 80%;
            padding-right: calc(10% + 2.5rem);
            padding-left: calc(10% + 2.5rem);
            background-color: orange;
            position: relative;
            border-top: 5px solid orange;
            border-bottom: 5px solid orange;
            @include celular{
                display:none;
            }
        }
        &__user{
            width: 30px;
            height: 30px;
            @include celular{
                display: none;
            }

            margin-right: 1rem;
            border-radius: 50%;
            border: 2px solid gold;
            transition: all 300ms ease-in-out;
            &:hover{
                cursor: pointer;
                opacity: 0.7;
            } 
        }
        &__balanco{
            color: navy;
            @include Inter-400;
            font-weight: bold;
            font-size: 0.9rem;
            line-height: 1.2rem;
            text-align: center;
            @include mini-celular{
                font-size: 0.75rem;
                margin-right: 0;
            }
        }
        &__botao-user{
            margin-top: 1rem;
            border:none;
            border-radius: 0.2rem;
            padding: 0.2rem;
            color: white;
            background-color: var(--botao);
            &:hover{
                cursor: pointer;
            }
            &:active{
                background-color: green;
                color: white
            }
        }
        &__itens{
            display: flex;
            align-items: center;
            transition: all 300ms ease-in-out;
            display: flex;
            width: 100%;
            justify-content: space-between;
            
        }
        &__item{
            position: relative;
            display: flex;
            align-items: center;
            @include mini-celular{
            margin-right: 0rem;
            }

        }
        &__item-nav{
            padding: 0.6rem;
            padding-right: 3.9rem;
            padding-left: 3.9rem;
            position: relative;
            display: flex;
            align-items: center;
            border-right: 1px solid white;
            border-left: 1px solid white;
            @include mini-celular{
            margin-right: 0rem;
            }
        }
        &__link{
            @include Inter-400;
            font-weight: bold;
            color: white;
            font-size: 100%;
            &:hover{
                cursor: pointer;
            }
            
        }
        &__moon{
            height: 20px;
            width: 22px;
            background: url(../assets/imagens/Icones/brilho-do-sol.png) no-repeat;
            display:block;
            background-size: 20px;
            margin-right: 1rem;
            transition: all 300ms ease-in-out;
        }
        &__ceta{
            margin-left: 0.3rem;
            width: 10px;
            height: 7px;
        }
        &__submenu-conteiner{
            display: flex;
            position: absolute;
        }
        &__tela{
            display: flex;
            flex-direction: column;
            background-color: white;
            position:absolute;
            left: -100px;
            top: 50px;
            width: 200px;
            border-radius: 1rem;
            box-shadow: 5px 8px 12px -9px #000000;
            padding: 1rem;
            z-index: 3;
        }
        &__tela-user{
            display: flex;
            flex-direction: column;
            background-color: white;
            position:absolute;
            left: -52px;
            top: 50px;
            width: 100px;
            border-radius: 1rem;
            box-shadow: 5px 8px 12px -9px #000000;
            padding: 1rem;
            z-index: 3;
        }
        &__tela-texto{
            color: navy;
            @include Inter-400;
            font-weight: bold;
            margin-bottom: 1rem;
        }
        &__tela-titulo{
            color: navy;
            @include Inter-400;
            font-weight: bold;
        }
        &__tela-preco{
            margin-top: 1rem;
            @include Inter-400;
            font-size: 1.2rem;
            color: navy;
            margin-bottom: 0.2rem;
        }
        &__tela-comprar{
            padding: 0.60rem;
            padding-right: 2rem;
            padding-left: 2rem;
            @include Inter-400;
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
        &__hamburger{
            width: 32px;
            height: 18px;
            background: url(../assets/imagens/Icones/icon-hamburger-light.svg);
            display: none;
            transition: all 300ms ease-in-out;
            &:hover{
                cursor: pointer;
            }
            @include celular{
                display: block;
            }
        }
        &__notificacao{
            display: block;
            width: 18px;
            height: 18px;
            position: absolute;
            background-color: orange;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.7rem;
            color: white;
            top: -8px;
            left: 12px;
        }
    }
    //https://www.w3schools.com/howto/howto_css_switch.asp
    /* The switch - the box around the slider */
.switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }
  
  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--secundario);
    -webkit-transition: .4s;
    transition: .4s;
  }

  
  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 30px;
    bottom: 4px;
    background-color: var(--primario);
    -webkit-transition: .4s;
    transition: .4s;
  }
  
  input:checked + .slider {
    background-color: white;
  }
  
  input:focus + .slider {
    box-shadow: 0 0 1px #2196F3;
  }
  
  input:checked + .slider:before {
    -webkit-transform: translateX(-26px);
    -ms-transform: translateX(-26px);
    transform: translateX(-26px);
  }
  
  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
    &--Dark{
        &:before{
            background-color: hsl(232, 19%, 17%);
        }
    }
    
  }
  
  .slider.round:before {
    border-radius: 50%;

  }
    // trocar icones

    .trocarParaLua{
        background-image: url(../assets/imagens/Icones/moon.png);
        background-repeat: no-repeat;
    }
    .hamburger{
        background: url(../assets/imagens/Icones/icon-hamburger.svg) no-repeat center;
    }
    .x{
        background: url(../assets/imagens/Icones/icon-close-light.svg) no-repeat center;
    }

    //animacoes

    .rotacao-in{
        animation: rotacao-in 300ms ease-in-out forwards;

    }
    .rotacao-out{
        animation: rotacao-out 300ms ease-in-out forwards;

    }
    .celular{
        display:flex;
        @include celular{
            display:none !important
        }
    &__notificacao{
        position: relative;
        right: 0.5rem;
    }
    &__tela{
        margin-top: 2.1rem;
        display: none;
        @include celular{
            display:flex;
            left: 27%;
        }
        @include mini-celular{
            margin-right: 0rem;
            left: 20%;
            }

    }
    }
</style>

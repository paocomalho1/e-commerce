<template>
    <div class="tela">
        <nav class="tela__menu">
            <ul class="tela__itens">
                <router-link to="/Produtos/all">
                <li class="tela__item" @click="submenu('produtos')">
                    <a href="" class="tela__link" >Produtos</a>
                    <svg xmlns="http://www.w3.org/2000/svg" v-if="this.modoDarkAtivo == true" width="10" height="7" class="cabecalho__ceta"><path fill="none" stroke="#FFF" stroke-width="2" opacity=".75" d="M1 1l4 4 4-4"/></svg>
                <svg xmlns="http://www.w3.org/2000/svg" v-if="this.modoDarkAtivo == false" width="10" height="7" class="cabecalho__ceta"><path fill="none" stroke="#000080" stroke-width="2" opacity=".75" d="M1 1l4 4 4-4"/></svg>
                </li>
                </router-link>
                <SubMenu v-if="tela === 'produtos'" telaAtivo='true'/>
                <router-link to="/Produtos/new">
                <li class="tela__item">
                    <a href="" class="tela__link">Lançamentos</a>
                </li>
                </router-link>
                <router-link to="/Main">
                <li class="tela__item">
                    <a href="" class="tela__link">Pagina Principal</a>
                </li>
                </router-link>
                <li class="tela__item-switch">
                    <div class="conteudo__conteiner-radio">
                        <span class="cabecalho__moon">
                        </span>
                        <label class="switch">
                            <input type="checkbox" @click="modoDark">
                            <span class="slider round"></span>
                        </label>
                    </div>
                </li>
                <li class="tela__item-user" v-if="this.usuarioAtivo">
                    <img :src="Users[this.usuario].image.webp" alt="" class="tela__user" @click="ativarTelaUser">
                    <p class="tela__nome">{{Users[this.usuario].username}}</p>
                    <p class="tela__balanco">Balanço R$:{{Users[this.usuario].balanco}}</p>
                    <router-link to="/">
                        <button class="tela__botao-user" @click="ativarTelaUser"> Trocar de usuario </button>
                    </router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
import {defineComponent,computed} from 'vue'
import SubMenu from './SubMenu.vue'
import {useStore} from '../store'
export default defineComponent({
    name:'TelaS',
    components:{
        SubMenu
    },
    emits:[
        'aoDark'
    ],
    data(){
        return{
            tela: '',
            tela1: '',
            modoDarkAtivo: false,
        } 
    },
    props:{
        usuario: Number,
        usuarioAtivo:Boolean
    },
    setup(){
        const store = useStore()
        return{
            Users: computed(() => store.state.Users),
        }
    },
    methods: {
         submenu(valor){
            if(this.tela == 'produtos'){
                this.tela = ''
            }else{
                this.tela = valor;
            }
         },
         modoDark(){
            const tema = document.querySelectorAll(".cabecalho__moon")
            const hamburger = document.querySelector('.cabecalho__hamburger')
            if(this.modoDarkAtivo == false){
                document.body.style.setProperty('--fundo', '#131862');
                document.body.style.setProperty('--primario', 'navy');
                document.body.style.setProperty('--texto', 'white');
                document.body.style.setProperty('--botao', 'orange');
                document.body.style.setProperty('--switch', 'gold');
                tema.forEach(item =>{
                    item.classList.add('trocarParaLua')
                })
                hamburger.classList.add('hamburger')
                hamburger.classList.add('x-dark')
                hamburger.classList.remove('x')
                
                this.modoDarkAtivo = !this.modoDarkAtivo
            }
            else{
                document.body.style.setProperty('--fundo', 'white')
                document.body.style.setProperty('--primario', 'white');
                document.body.style.setProperty('--texto', 'navy');
                document.body.style.setProperty('--botao', 'navy');
                document.body.style.setProperty('--switch', 'navy');
                tema.forEach(item =>{
                    item.classList.remove('trocarParaLua');
                })
                hamburger.classList.remove('x-dark')
                hamburger.classList.add('x')
                hamburger.classList.remove('hamburger')
                this.modoDarkAtivo = !this.modoDarkAtivo
            }
            this.$emit('aoDark',this.modoDarkAtivo)
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
@mixin celular {
    @media only screen and (max-width: 960.00px){ @content;}
}
    .tela{
        top: 0px;
        width: 100vw;
        background-color: orange;
        position: relative;
        height: calc(100% - 92px);
        display: none;
        border-bottom: 2px solid var(--texto);
        @include celular{
            display: block;
        }
        &__menu{
            padding: 2rem;
        }
        &__item{
            color:white;
            &:hover{
                background-color: white;
                color:orange;
                cursor: pointer;
            
            }
            border-radius: 1rem;
            padding: 1rem;
            margin-bottom: 1.85rem;
            margin-top: 1.85rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        &__item-user{
            color:white;
            &:hover{
                background-color: white;
                color:orange;
                cursor: pointer;
            
            }
            border-radius: 1rem;
            padding: 1rem;
            margin-bottom: 1.85rem;
            margin-top: 1.85rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            @include celular{
                &:last-child{
                flex-direction: column;
            }    
            }
        }
        &__item-switch{
            padding: 1rem;
            border-radius: 1rem;
            width: 100px;
            &:hover{
                background-color: var(--fundo)
            }
        }
        &__link{
            @include Inter-400;
            font-size: 2rem;
            color: inherit;
        }
        &__user{
            border-radius: 50%;
            border: 2px solid white;
            height: 50px;
            width: 50px;
            @include celular{
                margin-bottom: 1rem;  
            }
        }
        &__nome{
            @include Inter-400;
            font-size: 2rem;
            color: inherit;
            @include celular{
                margin-bottom: 1rem;  
            }

        }
        &__balanco{
            @include Inter-400;
            font-size: 1.5rem;
            color: inherit;
            @include celular{
                margin-bottom: 1rem;  
            }
        }
        &__botao-user{
            background-color: green;
            color: white;
            padding: 0.5rem;
            border: 2px solid white;
            &:hover{
                cursor: pointer;
            }
            &:active{
                background-color: red;
            }
        }
    }
    .cabecalho__moon{
            height: 20px;
            width: 22px;
            background: url(../assets/imagens/Icones/brilho-do-sol.png) no-repeat;
            display:block;
            background-size: 20px;
            margin-right: 1rem;
            transition: all 300ms ease-in-out;
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
  .conteudo__conteiner-radio{
    display:flex;
    align-items: center;
  }
  .slider.round:before {
    border-radius: 50%;

  }
    .trocarParaLua{
        background-image: url(../assets/imagens/Icones/moon.png);
        background-repeat: no-repeat;
    }
    .hamburger{
        background: url(../assets/imagens/Icones/icon-hamburger.svg) no-repeat center;
    }
    .x-dark{
        background: url(../assets/imagens/Icones/icon-close.svg) no-repeat center;
    }
</style>
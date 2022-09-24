<template>
  <li class="carrinho__item">
    <div class="carrinho__item-conteiner">
      <div class="carrinho__img-conteiner">
        <img :src="this.carrinho.img" class="carrinho__img" alt="" />
        <p class="carrinho__nome">{{ this.carrinho.titulo }}</p>
      </div>
      <div class="carrinho__img-conteiner">
        <div class="carrinho__conteiner-quantidade">
          <p class="carrinho__quantidade">Quantidade</p>
          <div class="carrinho__conteiner-quantidade2">
            <svg
              width="12"
              height="4"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              class="carrinho__quantidade-svg"
              @click="diminuir()"
            >
              <defs>
                <path
                  d="M11.357 3.332A.641.641 0 0 0 12 2.69V.643A.641.641 0 0 0 11.357 0H.643A.641.641 0 0 0 0 .643v2.046c0 .357.287.643.643.643h10.714Z"
                  id="a"
                ></path>
              </defs>
              <use fill="#FF7E1B" fill-rule="nonzero" xlink:href="#a"></use>
            </svg>
            <p class="carrinho__quantidade-numero">{{ valorComputed }}</p>
            <svg
              width="12"
              height="12"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              class="carrinho__quantidade-svg"
              @click="aumentar()"
            >
              <defs>
                <path
                  d="M12 7.023V4.977a.641.641 0 0 0-.643-.643h-3.69V.643A.641.641 0 0 0 7.022 0H4.977a.641.641 0 0 0-.643.643v3.69H.643A.641.641 0 0 0 0 4.978v2.046c0 .356.287.643.643.643h3.69v3.691c0 .356.288.643.644.643h2.046a.641.641 0 0 0 .643-.643v-3.69h3.691A.641.641 0 0 0 12 7.022Z"
                  id="b"
                ></path>
              </defs>
              <use fill="#FF7E1B" fill-rule="nonzero" xlink:href="#b"></use>
            </svg>
          </div>
        </div>
        <div class="carrinho__conteiner-preco">
          <p class="carrinho__preco">Preço R$ {{ precoComputed }}</p>

          <button class="carrinho__confirmar" :id="this.carrinho.titulo" @click="confirmar">Confirmar</button>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import { useStore } from "@/store";
import { defineComponent } from "vue";


export default defineComponent({
  nome: "CarrinhoSite",
  props: {
    titulo: String,
    preco: Number,
    quantidade: Number,
    img: String,
    carrinho: {

    }
  },
  emits:[
    'aoComprar'
  ],
  computed:{
        valorComputed(){
            return this.valor
        },
        precoComputed(){
            return this.carrinho.preco * this.valor
        }

    },
    methods:{
        aumentar(){
            return this.valor++
        },
        diminuir(){
            if(this.valor == 0){
                return
            }
            return this.valor--
        },
        confirmar(){
            const botao = document.getElementById(this.carrinho.titulo)
            const botao2 = document.getElementById('botaoComprar')
            botao.disabled = true
            botao2.disabled = false
            botao.classList.add('desabilitado')
            this.$emit('aoComprar',(this.carrinho.preco * this.valor))
        }
    },
  data() {
    return {
      valor: 0,
    };
  },
});
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Kdam+Thmor+Pro&display=swap");
@mixin Inter-400 {
  font-family: "Inter", sans-serif;
  font-weight: 400;
}
@mixin mini-celular {
  @media only screen and (max-width: 600px) {
    @content;
  }
}
@mixin celular {
  @media only screen and (max-width: 960px) {
    @content;
  }
}
.carrinho {
  padding: 2rem;
  background-color: var(--fundo);
  &__titulo {
    text-align: center;
    color: var(--texto);
    @include Inter-400;
    font-weight: bold;
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }

  &__itens {
    padding: 2rem;
    margin-bottom: 1rem;
  }
  &__item {
    width: 100%;
    height: 300px;
    border: 1px solid orange;
    border: 1px solid orange;
    background-color: orange;
    margin-bottom: 1rem;
    @include celular {
      height: 100%;
    }
  }
  &__img-conteiner {
    background-color: orange;
    display: flex;
    width: 25%;
    height: 100%;
    border-radius: 1rem;
    padding: 1rem;
    align-items: center;
    @include celular {
      flex-direction: column;
      width: calc(100% - 2rem);
      &:last-child {
        margin-top: 2rem;
        width: calc(100% - 2rem);
      }
    }
    @include celular {
      &:first-child {
        flex-flow: column;
        justify-content: space-around;
      }
    }
  }
  &__img {
    height: 100px;
    width: 100px;
  }
  &__nome {
    margin-left: 1rem;
    color: navy;
    @include Inter-400;
    font-weight: bold;
    font-size: 1rem;
    
  }
  &__conteiner-quantidade {
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
    
  }
  &__conteiner-quantidade2 {
    display: flex;
    justify-content: space-around !important;
    align-items: center;
    background-color: white;
    border: 2px solid navy;
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-radius: 1rem;
    @include celular{
      margin-bottom: 1rem;
    }
  }
  &__quantidade-svg {
    width: 12px !important;
    
    &:hover {
      cursor: pointer;
    }
  }
  &__quantidade {
    @include celular{
      &:first-child{
        margin-bottom: 1rem;
        color: white;
      }
    }
    margin-left: 1rem;
    color: orange;
    @include Inter-400;
    font-weight: bold;
    font-size: 1rem;
    
  }
  &__quantidade-numero{
    color: orange;
    @include Inter-400;
    font-weight: bold;
    font-size: 1rem;
  }
  &__conteiner-preco {
    @include celular{
      margin-bottom: 1rem;
    }
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  &__preco {
    margin-left: 1rem;
    color: navy;
    @include Inter-400;
    font-weight: bold;
    font-size: 1rem;
    @include celular{
      margin-left: 0rem !important;
      margin-bottom: 0.2rem;
    }
  }
  &__conteiner-botao {
    display: flex;
    justify-content: center;
  }
  &__confirmar{
    border: none;
    background-color: navy;
    color: white;
    padding: 1rem;
    border: 2px solid navy;
    &:hover{
        border: 2px solid navy;
        color: navy;
        background-color: white;
        cursor: pointer;
    }
  }
}
.desabilitado{
    background-color: gray;
    color: white;
    border: 2px solid gray;
    &:hover{
        cursor: no-drop;
        opacity: 0.7;
        background-color: gray;
        color: white;
        
    }
}
</style>
<template>
  <li class="corpo__itemP">
    <div class="corpo__conteiner-cabecalho">
      <p class="corpo__texto-star">({{produto.rate}})</p>
      <div class="corpo__conteiner-star">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <span class="fa fa-star" :class="{ checked: produto.rate / produto.votes > 0}"></span>
        <span class="fa fa-star" :class="{ checked: produto.rate / produto.votes > 1}"></span>
        <span class="fa fa-star" :class="{ checked: produto.rate / produto.votes > 2}"></span>
        <span class="fa fa-star" :class="{ checked: produto.rate / produto.votes > 3}"></span>
        <span class="fa fa-star" :class="{ checked: produto.rate / produto.votes > 4}"></span>
      </div>
    </div>
    <router-link :to="`/Produto/${produto.id}`" class="router">
    <figure class="corpo__conteiner">
      <img :src="produto.img" class="corpo__imgP" />
      <figcaption class="corpo__img-texto">{{produto.titulo}}</figcaption>
      <div class="corpo__conteiner-new">
        <p class="corpo__preco">R${{produto.preco}}</p>
        <span class="corpo__new" v-if="produto.new">NEW</span>
      </div>
      <button class="corpo__comprar">
        <svg
          width="22"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          class="corpo__carrinho"
        >
          <path
            d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
            fill="#ffd700"
            fill-rule="nonzero"
          /></svg
        >Ir a pagina
      </button>
    </figure>
    </router-link>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType} from "vue";
import IProduto from '../interfaces/IProduto'

export default defineComponent ({
    name: 'CorpoItem',
    props:{
        produto:{
             type: Object as PropType<IProduto>,
        }
    },
    data(){
      return{
        checked:[],
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
  .corpo{
    &__conteiner-cabecalho{
      padding: 0.5rem;
      display: flex;
      justify-content: flex-end;
      align-items: center
      
    }
    &__texto-star{
      @include Inter-400;
      color: var(--botao);
      margin-right: 0.5rem;

    }
    &__conteiner-new{
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 90%;
      margin-bottom: 1rem;
    }
    &__new{
      padding: 0.2rem;
      border: 1px solid var(--botao);
      background-color: var(--botao);
      color: white;
      border-radius: 0.3rem;
      font-weight: bold;
      @include Inter-400;
      display: flex;
    }
  }
  .estrela{
    &:hover{
      cursor: pointer;
    }
  }
  .checked{
    color: orange;
  }
</style>
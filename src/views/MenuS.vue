<template>
  <ul class="cabecalhoM">
    <h1 class="cabecalhoM__titulo">Escolha sua conta:</h1>
    <li class="cabecalhoM__item">
    <img src="../images/avatars/image-juliusomo.png" class="cabecalhoM__img" alt="" @click="mudarUser(0)">
    <p class="cabecalhoM__balanco">Balanço: R$ {{Users[0].balanco}}</p>
    </li>
    <li class="cabecalhoM__item">
    <img src="../images/avatars/image-amyrobson.png" class="cabecalhoM__img" alt="" @click="mudarUser(1)">
    <p class="cabecalhoM__balanco">Balanço: R$ {{Users[1].balanco}}</p>
    </li>
    <li class="cabecalhoM__item">
    <img src="../images/avatars/image-maxblagun.png" class="cabecalhoM__img" alt="" @click="mudarUser(2)">
    <p class="cabecalhoM__balanco">Balanço: R$ {{Users[2].balanco}}</p>
    </li>
    <li class="cabecalhoM__item">
    <img src="../images/avatars/image-ramsesmiron.png" class="cabecalhoM__img" alt="" @click="mudarUser(3)">
    <p class="cabecalhoM__balanco">Balanço: R$ {{Users[3].balanco}}</p>
    </li>
  </ul>
</template>

<script lang='ts'>
import { defineComponent, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "../store";
export default defineComponent({
  name: "MensagemS",
  components: {
  },
  emits:[
    'aoUsuario'
  ],
  methods:{
    mudarUser(valor : number){
        this.$emit('aoUsuario',valor)
        this.router.push('/Main')
        },
  },
  setup(){

    const router = useRouter()
    const store = useStore()
    return{
      Users: computed(() => store.state.Users),
      router,

    }
}
});
</script>
<style lang="scss">
@mixin mini-celular{
    @media only screen and (max-width: 600.0px){ @content;}
}
@mixin celular {
    @media only screen and (max-width: 960.00px){ @content;}
}
@mixin tablet {
    @media only screen and (min-width: 960.00px) and (max-width: 1150.00px){ @content;}
}
$Moderateblue: hsl(238, 40%, 52%);
$SoftRed: hsl(358, 79%, 66%);
$Lightgrayishblue: hsl(239, 57%, 85%);
$Palered: hsl(357, 100%, 86%);

//neutral

$Darkblue: hsl(212, 24%, 26%);
$GrayishBlue: hsl(211, 10%, 45%);
$Lightgray: hsl(223, 76%, 72%);
$Verylightgray: hsl(228, 33%, 97%);
$White:hsl(0, 0%, 100%);

//fonts

@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&display=swap');


@mixin Rubik-400{
    font-family: 'Rubik', sans-serif;
    font-weight: 400;
}
@mixin Rubik-500{
    font-family: 'Rubik', sans-serif;
    font-weight: 500;
}
@mixin Rubik-700{
    font-family: 'Rubik', sans-serif;
    font-weight: 700;
}

.cabecalhoM{
  background-color: navy;
  width: 100vw;
  height: 100vh;
  display: flex;
  position: fixed;
  right: 0%;
  top: 0;
  align-items: center;
  justify-content: space-around;
   @include celular{
    flex-direction: column;
   }
   &__titulo{
    @include Rubik-700;
    color:white;
    font-size: 1.6rem;
   }
  &__img{
    transition: 300ms ease-in-out;
    border-radius: 50%;
    border: 2px solid gold;
    height: 50px;
    &:hover{
      cursor: pointer;
      transform: scale(2);

    }
  }
  &__item{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

  }
  &__balanco{
    margin-top: 1rem;
    color: white;
    @include Rubik-700;

  }
}
</style>

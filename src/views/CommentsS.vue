<template>
<div class="corpo__Creply">
    <router-link to="/" class="textdecorationone">
    <div class="corpo__voltar">
        <a class="corpo__botaoLink white">MENU</a>
    </div>
    </router-link>
  <CommentS v-for="Comment in produto.Comments" :key="Comment.id" :Comment="Comment" :User="Users" :produtoID="produto.id" :estrela='this.estrela'/>
  <FormularioS :Users="Users" :produtoID="produto.id" :estrela='this.estrela'/>
</div>
</template>

<script lang='ts'>
import { useStore } from "../store";
import { computed, defineComponent, ref ,PropType} from "vue";
import FormularioS from '../components/FormularioS.vue'
import CommentS from '../components/CommentS.vue'
import IProduto from "../interfaces/IProduto";
export default defineComponent({
  name: "MensagemS",
  components: {
    CommentS,
    FormularioS
  },
  props:{
    id:{
        type: Number
    },
    produto:{
        type: Object as PropType<IProduto>
    },
    estrela:Number
  },
  setup(props){
    const store = useStore()
    const Comments = computed(() => store.state.Comments)
    const index = ref(props.id)
    console.log(index.value)
    let Users = computed(() => store.state.Users[index.value || 0])


    return{
      Comments,
      Users,

    }
}
});
</script>

<style lang='scss'>
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
$Lightgray: hsl(223, 19%, 93%);
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

body{
  background: var(--fundo);
}
.corpo {
.textdecorationone{
    text-decoration: none;
}
  @include celular{
  }
  &__Cmensagem{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    margin-top: 5%;
    margin-bottom: 5%;
    margin-right: 5%;
    margin-left: calc(5% + 1.25rem);
  }
  &__mensagem {
    width: calc(100% - 1.25rem);
    background-color: $White;
    padding: 1.25rem;
    border-radius: 0.5rem;
    display: flex;
    margin-top: 1rem;
    border: 1px solid navy;

  }

  &__Clikes {
    margin-right: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    background-color: $Lightgray;
    border-radius: 0.5rem;
    padding-top: 0rem;
    padding-bottom: 0.1rem;
    padding-left: 1rem;
    padding-right: 1rem;
    height: 100px;
  }

  &__numero {
    text-align: center;
    @include Rubik-700;
    color: $Moderateblue;
  }
  &__icone {
    align-self: center;
    margin-top: 0.1rem;
    margin-bottom: 0.1rem;
  }
  &__plus {
    width: 11px;
    height: 11px;
    background: url(../images/icon-plus.svg);
    transition: 300ms ease-in-out;
    &:hover {
      cursor: pointer;
      background: url(../images/icon-plus-violet.svg);
    }
  }
  &__minus {
    width: 11px;
    height: 11px;
    background: url(../images/icon-minus.svg) no-repeat center;
    transition: 300ms ease-in-out;
    &:hover {
      cursor: pointer;
      background: url(../images/icon-minus-violet.svg) no-repeat center;
    }
  }
  &__Cconteudo{
    width: 100%;
  }
  &__conteudo {
    display: flex;
    flex-direction: column;
    word-break: break-all
    
  }
  &__Chead {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
  &__Cuser {
    display: flex;
    align-items: center;
  }
  &__user {
    align-self: center;
    width: 32px;
    height: 32px;
    margin-right: 1rem;
  }
  &__name {
    align-self: center;
    margin-right: 1rem;
    @include Rubik-500;
  }
  &__mes {
    align-self: center;
    margin-right: 1rem;
    @include Rubik-400;
  }
  &__Cbotaolink{
    @include celular{
      
    }
  }
  &__botaoLink {
    display: block;
    align-self: center;
    @include Rubik-500;
    text-decoration: none;
    color: $Moderateblue;
    transition: 300ms ease-in-out;
    &:hover {
      opacity: 0.5;
      cursor: pointer;
    }
  }
  &__conteudo {
    @include Rubik-400;
    color: $GrayishBlue;
    font-size: 0.9rem;
    line-height: 1.35rem;
    @include celular{
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
    }
  }
  &__Creply{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
  }
  &__Cbotaolink{
    width: 30%;
    display: flex;
    justify-content: flex-end;
    @include celular{
      display: none;
    }
  }
  &__CbotaolinkC{
    width: 30%;
    display: flex;
    justify-content: flex-end;
  }

}
.deletelink{
  color:$SoftRed;
  margin-left: 1rem;
  &:hover{
    cursor: not-allowed;
  }
  &::before {
      content: url(../images/icon-delete.svg);
      margin-right: 0.5rem;
    }
}
.editlink{
  &::before {
      content: url(../images/icon-edit.svg);
      margin-right: 0.5rem;
    }
}
.replylink{
  margin-left: 1rem;
  &::before {
      content: url(../images/icon-reply.svg);
      margin-right: 0.5rem;
    }
}
.white{
  color:white
}
</style>
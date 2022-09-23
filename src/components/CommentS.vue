<template>
  <NotificacaoS v-if="this.deleteAtivo" :id="Comment.id" @aoDelete="deleteComment" :produtoID='produtoID'/>
  <div class="corpo__mensagem">
    <LikeS :Comment="Comment"/>
    <div class="corpo__Cconteudo">
      <div class="corpo__Chead">
        <div class="corpo__Cuser">
          <img
            :src="Comment.user.image.webp"
            alt=""
            class="corpo__user"
          />
          <p class="h3 corpo__name">{{Comment.user.username}}</p>
          <p class="corpo__you" v-if="Comment.user.username == Users.username">Você</p>
          <p class="corpo__mes">{{Comment.createdAt}}</p>
          <div class="corpo__conteiner-star desktop" v-if="Comment.votes > 0">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
            <span class="fa fa-star" :class="{checked:Comment.votes > 0}"></span>
            <span class="fa fa-star" :class="{checked:Comment.votes > 1}"></span>
            <span class="fa fa-star" :class="{checked:Comment.votes > 2}"></span>
            <span class="fa fa-star" :class="{checked:Comment.votes > 3}"></span>
            <span class="fa fa-star" :class="{checked:Comment.votes > 4}"></span>
          </div>
        </div>
        <div class="corpo__Cbotaolink">
        <a class="corpo__botaoLink editlink" @click="mudarEdit" v-if="Comment.user.username == Users.username">Editar</a>
        <a class="corpo__botaoLink deletelink" @click="deleteComment" v-if="Comment.user.username == Users.username">Deletar</a>
        <a class="corpo__botaoLink replylink" @click="mudarReply" v-if="Comment.user.username != Users.username">Responder</a>
        </div>
      </div>
      <p class="corpo__conteudo">
        {{Comment.content}}
      </p>
    </div>
    <div class="corpo__Ccelular">
    <LikeS :Comment="Comment" :celular="celular"/>
    <div class="corpo__CbotaolinkC">
        <a class="corpo__botaoLink editlink" @click="mudarEdit" v-if="Comment.user.username == Users.username">Editar</a>
        <a class="corpo__botaoLink deletelink" @click="deleteComment" v-if="Comment.user.username == Users.username">Deletar</a>
        <a class="corpo__botaoLink replylink" @click="mudarReply" v-if="Comment.user.username != Users.username">Responder</a>
    </div>
    </div>
    <div class="corpo__conteiner-star celular" v-if="Comment.votes > 0">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
            <span class="fa fa-star" :class="{checked:Comment.votes > 0}"></span>
            <span class="fa fa-star" :class="{checked:Comment.votes > 1}"></span>
            <span class="fa fa-star" :class="{checked:Comment.votes > 2}"></span>
            <span class="fa fa-star" :class="{checked:Comment.votes > 3}"></span>
            <span class="fa fa-star" :class="{checked:Comment.votes > 4}"></span>
          </div>
  </div>
  <ReplyS v-for="Reply in Comment.replies" :key="Reply.id" :Reply="Reply" :Comment="Comment" :User="Users" :produtoID='produtoID' :estrela='this.estrela'/>
  <FormularioS @aoReply="mudarReply" v-if="this.replyAtivo" :replyAtivo="this.replyAtivo" :username="Comment.user.username" :Comment="Comment" :Users="Users" :produtoID='produtoID' :estrela='this.estrela'/>
  <FormularioS @aoEdit="mudarEdit" v-if="this.editAtivo" :editAtivo="this.editAtivo" :username="this.username" :Comment="Comment" :Users="Users" :produtoID='produtoID' :estrela='this.estrela'/>
</template>
<script lang='ts'>

import { defineComponent,PropType, ref } from "vue";
import LikeS from "./LikesS.vue";
import FormularioS from './FormularioS.vue'
import { IComments } from "../interfaces/IComments";
import ReplyS from './ReplyS.vue'
import NotificacaoS from './NotificacaoS.vue'
import { IUser } from "../interfaces/IUser";

export default defineComponent({
  name: "MensagemUnit",
  components: {
    LikeS,
    FormularioS,
    ReplyS,
    NotificacaoS,
  },
  props:{
    Comment:{
      type: Object as PropType<IComments>,
    },
    User:{
      type: Object as PropType<IUser>,
    },
    produtoID:Number,
    estrela:Number
  },
  setup(props){
    const Users = ref(props.User)
    const replyAtivo = ref(false)
    const editAtivo = ref(false)
    const deleteAtivo = ref(false)
    const botao = ref("REPLY")
    const celular = ref(true)

    const mudarReply = () :void => {
      replyAtivo.value = !replyAtivo.value;
    }
    const deleteComment = () :void => {
      deleteAtivo.value = !deleteAtivo.value;
    }
    const mudarEdit = () :void => {
      editAtivo.value = !editAtivo.value;
    }
    return{
      Users,
      replyAtivo,
      editAtivo,
      deleteAtivo,
      botao,
      celular,
      mudarReply,
      deleteComment,
      mudarEdit
    }
  },
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



.corpo{
  &__Ccelular{
    display: none;
    @include celular{
      display: flex;
      justify-content: space-between;
      width: 100%;
      align-items: center;
    }
  }
}
.desktop{
  @include celular{
    display: none
  }
}

</style>

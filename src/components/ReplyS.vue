<template>
    <NotificacaoS v-if="this.deleteAtivo" :id="id" :idR="Reply.id" @aoDelete="deleteReply" :Comment="Comment" :produtoID='produtoID'/>
    <div class="corpo__mensagem reply">
    <LikeS :Reply="Reply" :Comment="Comment"/>
    <div class="corpo__Cconteudo">
      <div class="corpo__Chead">
        <div class="corpo__Cuser">
          <img
            :src="Reply.user.image.webp"
            alt=""
            class="corpo__user"
          />
          <p class="h3 corpo__name">{{Reply.user.username}}</p>
          <p class="corpo__you" v-if="Reply.user.username == Users.username">Você</p>
          <p class="corpo__mes">{{Reply.createdAt}}</p>
        </div>
        <div class="corpo__Cbotaolink">
        <a class="corpo__botaoLink editlink" @click="mudarEdit" v-if="Reply.user.username == Users.username">Editar</a>
        <a class="corpo__botaoLink deletelink" @click="deleteReply" v-if="Reply.user.username == Users.username">Deletar</a>
        <a class="corpo__botaoLink replylink" @click="mudarReply" v-if="Reply.user.username != Users.username">Responder</a>
        </div>
      </div>
      <p class="corpo__conteudo">
        <strong class="corpo__userReply">{{`@${Reply.replyingTo}`}}</strong>{{Reply.content}}
      </p>
    </div>
    <div class="corpo__Ccelular">
    <LikeS :Comment="Comment" :Reply="Reply" :celular="celular"/>
    <div class="corpo__CbotaolinkC">
        <a class="corpo__botaoLink editlink" @click="mudarEdit" v-if="Reply.user.username == Users.username">Editar</a>
        <a class="corpo__botaoLink deletelink" @click="deleteReply" v-if="Reply.user.username == Users.username">Deletar</a>
        <a class="corpo__botaoLink replylink" @click="mudarReply" v-if="Reply.user.username != Users.username">Responder</a>
    </div>
    </div>
  </div>
   <FormularioS @aoReply="mudarReply"  v-if="replyAtivo" :username="Reply.user.username" :replyAtivo="this.replyAtivo" :Comment="Comment" :Reply="Reply" :Users="Users" :produtoID='produtoID' :estrela='this.estrela'/>
   <FormularioS @aoEdit="mudarEdit"  v-if="editReplyAtivo" :editReplyAtivo="this.editReplyAtivo" :replyAtivo="this.replyAtivo" :Comment="Comment" :Reply="Reply" :Users="Users" :produtoID='produtoID' :estrela='this.estrela'/>
</template>
<script lang="ts">
import { defineComponent,PropType, ref } from "vue";
import LikeS from "./LikesS.vue";
import NotificacaoS from './NotificacaoS.vue';
import FormularioS from './FormularioS.vue';

import { IComments } from "../interfaces/IComments";
import { IReplies } from "../interfaces/IReplies";
import { IUser } from "../interfaces/IUser";
export default defineComponent({
  name: "MensagemUnit",
  components: {
    LikeS,
    FormularioS,
    NotificacaoS,
  },
  props:{
    User:{
      type: Object as PropType<IUser>
    },
    Reply:{
      type: Object as PropType<IReplies>
    },
    Comment:{
       type: Object as PropType<IComments>
    },
    produtoID:Number,
    estrela:Number
  },

  setup(props){
    const Users = ref(props.User)
    const replyAtivo = ref(false)
    const editReplyAtivo = ref(false)
    const deleteAtivo = ref(false)
    const botao = ref("REPLY")
    const celular = ref(true)

    const mudarReply = () :void =>  {
      replyAtivo.value = !replyAtivo.value;
    }
    const deleteReply = () :void =>  {
      deleteAtivo.value = !deleteAtivo.value;
    }
    const mudarEdit = () :void =>  {
      editReplyAtivo.value = !editReplyAtivo.value;
    }
    

    return{
      Users,
      replyAtivo,
      editReplyAtivo,
      deleteAtivo,
      botao,
      celular,
      mudarReply,
      deleteReply,
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


.reply{
    width: 85% !important;
}
.corpo{

  &__userReply{
    color: $Moderateblue;
  }
  &__you{
    font-size: 12px;
    align-self: center;
    background-color: $Moderateblue;
    color: $White;
    padding-top: 0.15rem;
    padding-bottom: 0.2rem;
    padding-right: 0.4rem;
    padding-left: 0.4rem;
    border-radius: 4px;
    @include Rubik-400;
    margin-right: 1rem;
  }
}


</style>

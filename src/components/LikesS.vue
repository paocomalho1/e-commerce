<template>
  <div class="corpo__Clikes" :class="{'celular' : this.celular}">
    <i class="corpo__icone corpo__plus" :class="{'ativoP': ativoP }" @click="add(Comment,Reply)"></i>
    <p class="corpo__numero" :class="{'celularNumero' : this.celular}">{{quantidadeLikes}}</p>
    <i class="corpo__icone corpo__minus" :class="{'ativoM': ativoM }" @click="remove(Comment,Reply)"></i>
  </div>
</template>

<script lang="ts">
import { IComments } from "../interfaces/IComments";
import { IReplies } from "../interfaces/IReplies";
import { store } from "../store";
import { defineComponent, PropType, } from "vue";


export default defineComponent({
  name: "LikeS",
  data(){
      return{
          quantidadeLikes: this.Reply?.score || this.Comment?.score,
          quantidadeControle: this.Reply?.score || this.Comment?.score,
      }
  },
  computed:{
    ativoP() : boolean{
      if(this.quantidadeControle != undefined){
        if(this.quantidadeLikes == this.quantidadeControle+1){
          return true
      }else{
          return false
      }
      }
      return false
    },
    ativoM() : boolean{
      if(this.quantidadeControle != undefined){
        if(this.quantidadeLikes == this.quantidadeControle-1){
          return true
      }else{
          return false
      }
      }
      return false
    }
  },
  props:{
    Comment:{
      type: Object as PropType<IComments>,

    },
    Reply:{
      type: Object as PropType<IReplies>
    },
    celular:{
      type: Boolean,
      default: false
    }
  },
  methods:{
      add(Comment: IComments,Reply: IReplies){
          if(this.quantidadeLikes === undefined){
            this.quantidadeLikes = 1
          }
          else if(this.quantidadeControle != undefined){
            if(this.quantidadeControle == this.quantidadeLikes -1){
              return
            }
          }
          this.quantidadeLikes += 1
          // if(Reply == undefined){
          //   console.log(Reply)
          //   this.mudar_ScoreComment(Comment)
          // }
          // else{
          //   this.mudar_ScoreReply(Comment,Reply)
          // }
          
      },
      remove(Comment: IComments,Reply: IReplies){
        if(this.quantidadeLikes === undefined){
          this.quantidadeLikes = 1
          }else if(this.quantidadeLikes === 1){
              return
          }else if(this.quantidadeControle != undefined){
            if(this.quantidadeControle == this.quantidadeLikes +1){
              return
            } 
          }
          this.quantidadeLikes -= 1
          // if(Reply == undefined){
          //   this.mudar_ScoreComment(Comment)
          // }
          // else{
          //    this.mudar_ScoreReply(Comment,Reply)
          // }
      },
    mudar_ScoreComment(Comment: IComments){
      store.dispatch('MUDAR_SCORE',{
            id: Comment.id,
            content: Comment.content,
            createdAt: Comment.createdAt,
            score: this.quantidadeLikes,
            user: Comment.user,
            replies: Comment.replies
          })
    },
    mudar_ScoreReply(Comment : IComments,Reply : IReplies){
      const index = Comment.replies.findIndex(resp => resp.id == Reply.id)
            Comment.replies[index] = {
            id:Reply.id,
            content: Reply.content,
            createdAt:Reply.createdAt,
            score:this.quantidadeLikes || 1,
            replyingTo:Reply.replyingTo,
            user:Reply.user,
          }
          store.dispatch('MUDAR_SCORE',{
            id: Comment.id,
            content: Comment.content,
            createdAt: Comment.createdAt,
            score: Comment.score,
            user: Comment.user,
            replies: Comment.replies
          })
    }
  },
});
</script>

<style lang="scss">
@mixin img-celular{
    @media only screen and (max-width: 375.0px){ @content;}
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



 .ativoP{
    background: url(../images/icon-plus-violet.svg) !important;
 }
 .ativoM{
    background: url(../images/icon-minus-violet.svg) no-repeat center !important;
 }
 .celular{
    display: none;
    @include celular{
      display: flex !important;
      height: 50px !important;
      align-items: center !important;
      flex-direction: row !important;
      padding-bottom: 0rem !important;
    }
    }
  .celularNumero{
    @include celular{
        margin-right: 1rem;
        margin-left: 1rem;
        }
  }
</style>

<style lang="scss" scoped>
@mixin img-celular{
    @media only screen and (max-width: 375.0px){ @content;}
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
  &__Clikes{
    @include celular{
      display: none ;
    }
  }
  &__numero{
    margin-top: 1rem !important;
    margin-bottom: 1rem !important;
  }
 }
</style>
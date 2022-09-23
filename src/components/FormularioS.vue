<template>
  <section class="corpo__mensagem" :class="{'reply' : replyAtivo || editReplyAtivo}">
    <div class="corpo__Cform">
      <img
        :src="Users.image.webp"
        alt=""
        class="corpo__img"
      />
      <textarea
        name=""
        id=""
        class="corpo__textarea"
        v-model="conteudo"
        placeholder="Adicionar a Comentário..."
      ></textarea>
      <div class="corpo__CCform">
        <img
        :src="Users.image.webp"
        alt=""
        class="corpo__imgC"
      />
      <button class="corpo__botao" @click="getConteudo()">{{botao}}</button>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { IComments } from "../interfaces/IComments";
import { IReplies } from "../interfaces/IReplies";
import { IUser } from "../interfaces/IUser";
import { store, useStore } from "../store";
import { computed, defineComponent, PropType } from "vue";

export default defineComponent({
  name: "FormularioS",
  data(){
      return{
          conteudo: '',
          replyAtivo1: this.replyAtivo,
          editReplyAtivo1: this.editReplyAtivo
      }
  },
  emits:[
    "aoReply",
    "aoEdit"
  ],
  setup(){
    const store = useStore()
    return{
      User: computed(() => store.state.Users),
      Produto: computed(() => store.state.Produto),
      Comments: computed(() => store.state.Comments),
    }
  },
  computed:{
      botao() : string{
          if(this.replyAtivo){
              return 'RESPONDER'
          }
          else if(this.editAtivo || this.editReplyAtivo){
            return 'EDITAR'
          }
          return 'ENVIAR'
      }
  },
  props:{
      replyAtivo: Boolean,
      editAtivo: Boolean,
      editReplyAtivo: Boolean,
      username: {
        type:String,
        default:''
        },
      Comment:{
        type: Object as PropType<IComments>
      },
      Reply:{
        type: Object as PropType<IReplies>,
      },
      Users:{
        type: Object as PropType<IUser>,
      },
      produtoID:Number,
      estrela:Number


  },
  methods:{
      getConteudo(){
        if(this.editAtivo){
          this.editarComment()
          return
        }else if(this.replyAtivo){
          this.adicionarReply()
          return
        }else if(this.editReplyAtivo){
          this.editarReply()
          return
        }
        this.adicionarComment()
      },
      idGeneratorC(){
        let id = 0
        if(this.Produto[this.Produto.findIndex(prod => prod.id == this.produtoID)].Comments.length == 0){
          return id = 1
        }
        for(let i = 10; i >= 1; i--){
          let numerosDiferentes = 0
          this.Produto[this.Produto.findIndex(prod => prod.id == this.produtoID)].Comments.forEach(comment => {
            if(comment.id != i){
              numerosDiferentes++
               if(numerosDiferentes == this.Produto[this.Produto.findIndex(prod => prod.id == this.produtoID)].Comments.length){
                return id = i
              }
              }
          })
        }
        return id
      },
      idGeneratorR(){
        let id = 0
        if(this.Comment?.replies.length == 0){
          return id = 1
        }
        for(let i = 10; i > 1; i--){
          let numerosDiferentes = 0
          this.Comment?.replies.forEach(comment => {
            if(comment.id != i){
              numerosDiferentes++
               if(numerosDiferentes == this.Comment?.replies.length){
                return id = i
              }
              }
          })
        }
        return id
      },
      modeloComment(id:number, conteudo:string,createdAt:string, score:number,votes:number, user: IUser ,replies: IReplies[]): IComments{
        const comment = {
          id: id ,
          content: conteudo,
          createdAt:createdAt,
          score:score,
          votes:votes,
          user:user,
          replies: replies
        } as IComments
        return comment
      },
      modeloReply(id:number, conteudo:string,createdAt:string, score:number, user: IUser ,replyingTo : string): IReplies{
        const reply = {
          id: id ,
          content: conteudo,
          createdAt:createdAt,
          score:score,
          user:user,
          replyingTo: replyingTo
        } as IReplies
        return reply
      },
      adicionarComment(){
        const id = this.idGeneratorC()
        if(id != 0){
        const createdAt = new Date().toISOString().substr(11,8)
        console.log(this.estrela)
        const comment = this.modeloComment(id,this.conteudo,createdAt,1,this?.estrela || 0,this.Users || this.User[0],[])
        store.commit('ADD_COMMENT',[comment,this.produtoID])
        }else{
          alert('Comment limit has been reached.')
        }
        
        this.conteudo = ''
      },
      editarComment(){
        const comment = this.modeloComment(this.Comment?.id || 0,
        this.conteudo,
        this.Comment?.createdAt || 'error',
        this.Comment?.score || 1,
        this.Comment?.votes || 0,
        this.Comment?.user || this.Users || this.User[0],
        this.Comment?.replies || [])
        console.log('index=',this.produtoID)
        store.commit('EDIT_COMMENT',[comment,this.produtoID])
        this.conteudo = ''
        this.editReplyAtivo1 = this.editReplyAtivo
        this.$emit('aoEdit',this.editReplyAtivo1)
      },
      adicionarReply(){
        const id = this.idGeneratorR()
        if(id != 0){
            const createdAt = new Date().toISOString().substr(11,8)
            const comment = this.modeloComment(this.Comment?.id || 0,
            this.Comment?.content || 'error',
            this.Comment?.createdAt || 'error',
            this.Comment?.score || 1,
            this.Comment?.votes || 0,
            this.Comment?.user || this.Users || this.User[0],
            this.Comment?.replies || [])
            const reply = this.modeloReply(id ,this.conteudo,createdAt,1,this.Users || this.User[0],this.username)
            comment.replies.push(reply)
            store.commit('EDIT_COMMENT',[comment,this.produtoID])
        }else{
          alert('Reply limit has been reached.')
        }
        
        this.conteudo = ''
        this.replyAtivo1 = !this.replyAtivo
        this.$emit('aoReply',this.replyAtivo1)
      },
      editarReply(){
        const comment = this.modeloComment(this.Comment?.id || 0,
        this.Comment?.content || 'error',
        this.Comment?.createdAt || 'error',
        this.Comment?.score || 1,
        this.Comment?.votes || 0,
        this.Comment?.user || this.Users || this.User[0],
        this.Comment?.replies || [])
        const reply = this.modeloReply(
          this.Reply?.id || 0,
          this.conteudo,
          this.Reply?.createdAt || 'error',
          this.Reply?.score || 1,
          this.Reply?.user || this.Users || this.User[0],
          this.Reply?.replyingTo || 'error')
        const index = comment.replies.findIndex(resp => resp.id == this.Reply?.id)
        comment.replies[index] = reply
        this.conteudo = ''
        store.commit('EDIT_COMMENT',[comment,this.produtoID])
        this.editReplyAtivo1 = !this.editReplyAtivo
        this.$emit('aoEdit',this.editReplyAtivo1)
      },
      

  }
});
</script>

<style lang="scss">
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
.corpo {




    &__mensagem {
    width: 85%;
    background-color: $White;
    padding: 1.25rem;
    border-radius: 0.5rem;
    display: flex;
    margin-top: 1rem;
    @include celular{
      justify-content: flex-end;
      align-items: flex-start;
      flex-direction: column;
    }
  }
  &__Cform{
    @include celular{
      flex-direction: column;
    }
      display: flex;
      align-items: flex-start;
      width: 100%;
  }
  &__img{
      height: 50px;
      height: 50px;
      @include celular{
        display: none;
      }
  }
  &__textarea {
    @include celular{
      margin-right: 0rem !important;
      margin-left: 0rem !important;
      margin-bottom: 1rem;
    }
      border-radius: 0.5rem;
      resize: none;
      margin-right: 1rem;
      margin-left: 1rem;
      width: 100%;
      height: 100px;
      @include Rubik-400;
      color: $GrayishBlue;
      padding: 0.8rem;
      padding-left: 1.2rem;
      padding-right: 1.2rem;
      border: $Lightgrayishblue solid 1px;
      box-sizing: border-box;
      &:focus{
         border: $Lightgrayishblue solid 2px;
         outline-style: none;
      }

  }
  &__CCform{
    @include celular{
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;

    }
    }
    &__imgC{
      display:none;
      @include celular{
        display: block;
        height: 32px;
        height: 32px;
      }
  }
  &__botao {
    padding-right: 1.5rem;
    padding-left: 1.5rem;
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
    border: none;
    @include Rubik-400;
    color: $White;
    background-color: $Moderateblue;
    border-radius: 0.2rem;
    transition: 300ms ease-in-out;
    &:hover {
      opacity: 0.5;
      cursor: pointer;
    }
  }
}
</style>
<template>
    <div class="corpo__notificacao">
        <div class="corpo__Cnotificacao">
            <h3 class="corpo__Ntitulo">Deletar comentário</h3>
            <p class="corpo__Nconteudo">
                Tem certeza de que deseja excluir este comentário? Isso removerá o comentário e não poderá ser desfeito.
            </p>
            <div class="corpo__NCbotao">
                <button class="corpo__Nbotao" @click="cancel">NÃO,CANCELA</button>
                <button class="corpo__Nbotao2" @click="deleteALL(id,idR)">SIM,DELETA</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { IComments } from '../interfaces/IComments'
import { IReplies } from '../interfaces/IReplies'
import { IUser } from '../interfaces/IUser'
import { store, useStore } from '../store'
import { computed, defineComponent, PropType } from 'vue'

export default defineComponent({
    name:'NotificacaoS',
    methods:{
        cancel(){
            this.$emit('aoDelete',this.deleteAtivo)
        },
        deleteALL(id : number, idR : number){
            if(idR == undefined){
                this.removerComment(id)
            }
            else{
                this.removeReply(id,idR)
            }
    },
        removerComment(id : number){
            //store.dispatch('REMOVER_COMMENT',id)
            store.commit('REMOVE_COMMENT',[id,this.produtoID])
            this.$emit('aoDelete',this.deleteAtivo)
        },
        removeReply(id : number, idR : number){
            const comment = this.modeloComment(this.Comment?.id || 0,
                this.Comment?.content || 'error',
                this.Comment?.createdAt || 'error',
                this.Comment?.score || 0,
                this.Comment?.user || this.User[0],
                this.Comment?.replies || [])
            const commentF = comment.replies.filter(resp => resp.id != idR)
            comment.replies = commentF
            store.commit('EDIT_COMMENT',[comment,this.produtoID])
            //store.dispatch('CADASTRAR_REPLY',commentF)
            this.$emit('aoDelete',this.deleteAtivo)

        },
        modeloComment(id:number, conteudo:string,createdAt:string, score:number, user: IUser ,replies: IReplies[]): IComments{
        const comment = {
          id: id ,
          content: conteudo,
          createdAt:createdAt,
          score:score,
          user:user,
          replies: replies
        } as IComments
        return comment
        }
    
    },
    emits:['aoDelete'],
    data(){
        return{
            deleteAtivo: false
        }
    },
    props:{
        id: Number,
        idR: Number,
        Comment:{
        type: Object as PropType<IComments>
      },
      produtoID:Number

    },
    setup(){
        const store = useStore()
        return{
            User : computed(() => store.state.Users)
        }
    }
    
        
    
})
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
        &__notificacao{
            z-index: 5;
            transition: 300ms ease-in-out;
            background-color: #00000077;
            position: fixed;
            left: 0;
            width: 100vw;
            height: 100vh;
            top: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            
        }
        &__Cnotificacao{
            height: 160px;
            width: 300px;
            background-color: $White;
            padding: 2rem;
            border-radius: 0.5rem;
        }
        &__Ntitulo{
            margin-bottom: 1.5rem;
            @include Rubik-500;
            font-size: 1.4rem;
            color: $Darkblue;

        }
        &__Nconteudo{
            margin-bottom: 1.5rem;
            @include Rubik-400;
            color: $GrayishBlue;

        }
        &__NCbotao{
            display: flex;
            justify-content: space-between;
            align-items: center;

        }
        &__Nbotao{
            background-color: $GrayishBlue;
            padding: 1.5rem;
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
            border-radius: 0.4rem;
            border: none;
            color: $White;
            @include Rubik-400;
            font-size: 0.9rem;
            transition: 300ms ease-in-out;
            &:hover{
                opacity: 0.5;
                cursor: pointer;
            }

        }
        &__Nbotao2{
            background-color: $SoftRed;
            padding: 1.5rem;
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
            border-radius: 0.4rem;
            border: none;
            color: $White;
            @include Rubik-400;
            font-size: 0.9rem;
            transition: 300ms ease-in-out;
            &:hover{
                opacity: 0.5;
                cursor: pointer;
            }


        }
    }

</style>

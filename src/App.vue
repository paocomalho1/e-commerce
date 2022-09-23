<template>
  <body class="main">
    <CabecalhoSite  @aoHamburger="mudarEstado" :modoDarkAtivo='modoDarkAtivo' :usuarioAtivo='usuarioAtivo' :usuario='this.usuario' :notificacaoAtivo="notificacaoAtivo" :quantidade="quantidade" :titulo="titulo" :preco="preco"/>
	<TelaS v-if="ativarTela" :usuarioAtivo='usuarioAtivo' :usuario='this.usuario' @aoDark="darkmode"/>
	<router-view @aoBotao="mudarNotificacao" @aoUsuario="mudarUsuario"  :usuario='usuario' :titulo='titulo' :preco="preco" :quantidade="quantidade" :img="img"/>
	<RodapeSite/>
  </body>
</template>

<script>
import { defineComponent } from 'vue';
import CabecalhoSite from './components/CabecalhoSite.vue'
import TelaS from './components/TelaS.vue'
import RodapeSite from './components/RodapeSite.vue'

export default defineComponent({
  name: 'App',
  components: {
    CabecalhoSite,
	TelaS,
	RodapeSite,
  },
  data(){
        return{
            ativarTela: false,
			notificacaoAtivo: false,
			quantidade: 0,
			titulo:"",
            preco: 0,
			img:"",
			quantidadeProduto:0,
      usuario:0,
      usuarioAtivo:false,
      modoDarkAtivo: false,

        } 
    },
  methods:{
	mudarEstado(){
		this.ativarTela = !this.ativarTela
	},
	mudarNotificacao(valor){
		this.notificacaoAtivo = true
		this.quantidade++
		this.titulo = valor[0]
		this.preco = valor[1]
		this.img = valor[2]
	},
  mudarUsuario(valor){
    this.usuario = valor
    this.usuarioAtivo = true
  },
  darkmode(valor){
    this.modoDarkAtivo = valor
  } 
  }
});
</script>

<style lang="scss">
  /* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
:root{
	--primario: white;
	--secundario: gold;
	--texto: navy;
	--fundo: white;
	--switch: navy;
  --botao: navy;

}
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


body{
    background-color: $Lightgray;
  }
  // .corpo{
  //   display: flex;
  //   flex-direction: column;
  //   align-items: center;
  //   justify-content: flex-end;
  //   flex-flow: column-reverse;
  //   padding-top: 2rem;
  //   padding-bottom: 2rem;
  // }

</style>



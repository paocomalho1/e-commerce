import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import CorpoView from '../views/CorpoView.vue'
import ProdutoWiew from '../views/ProdutoWiew.vue'
import ProdutosView from '../views/ProdutosView.vue'
import CarrinhoSite from '../views/CarrinhoSite.vue'
import Menu from '../views/MenuS.vue'


const rotas: RouteRecordRaw[] = [
     {
         path: '/Main',
         name: 'CorpoView',
         component: CorpoView,
     },
     {
         path: '/Carrinho',
         name: 'CarrinhoSite',
         component: CarrinhoSite,
         props: true
     },
     {
         path: '/Produto/:id',
         name: 'ProdutoWiew',
         component: ProdutoWiew,
         props: true
     },
     {
         path: '/Produtos/:nome',
         name: 'ProdutosView',
         component: ProdutosView,
         props: true
     },
      {
          path: '/',
          name: 'menu',
          component: Menu,
          props: true
          },
        //  {
        //      path: '/users/:id',
        //      name: 'users',
        //      component: Comments,
        //      props: true
        //  }
    
] 

const roteador = createRouter({
    history: createWebHashHistory(),
    routes: rotas
})


export default roteador
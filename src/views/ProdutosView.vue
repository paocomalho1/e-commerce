<template>
    <main class="corpo">
        <section class="corpo__secao">
            <h1 class="corpo__titulo">
                {{this.nomeComputed}}
            </h1>
            <div class="corpo__conteiner-select">
            <select name="" id="select" class="corpo__seletor">
                <option value="MV" class="corpo__opcao">Mais vendidos</option>
                <option value="AC" class="corpo__opcao">Ordenamento alfabético crescente</option>
                <option value="AD" class="corpo__opcao">Ordenamento alfabético decrescente</option>
                <option value="PC" class="corpo__opcao">Ordenamento por preço crescente</option>
                <option value="PD" class="corpo__opcao">Ordenamento por preço decrescente</option>
            </select>
            <router-link :to="`/Produtos/${this.link}`">
                <button class="corpo__buscar" @click="select"> Buscar </button>
            </router-link>
            </div>
            <div class="corpo__conteiner-total">
            <div class="corpo__conteiner-fitragem">
            <fieldset>
                <legend class="corpo__titulo-filtro">Categorias</legend>
                <div class="corpo__conteiner-filtro">
                    <div class="corpo__continer-checkbox">
                        <input type="checkbox" id="Celulares" name="Celulares" class="corpo__checkbox" checked>
                        <label for="Celulares">Celulares</label>
                    </div>
                    <div class="corpo__continer-checkbox">
                        <input type="checkbox" id="Notebooks" name="Notebooks" class="corpo__checkbox" checked>
                        <label for="Notebooks">Notebooks</label>
                    </div>
                    <div class="corpo__continer-checkbox">
                        <input type="checkbox" id="Computadores" name="Computadores" class="corpo__checkbox" checked>
                        <label for="Computadores">Computadores</label>
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <legend class="corpo__titulo-filtro">Perifericos</legend>
                <div class="corpo__conteiner-filtro">
                    <div class="corpo__continer-checkbox">
                        <input type="checkbox" id="Mouse" name="Mouse" class="corpo__checkbox" checked>
                        <label for="Mouse">Mouse</label>
                    </div>
                    <div class="corpo__continer-checkbox">
                        <input type="checkbox" id="Teclado" name="Teclado" class="corpo__checkbox" checked>
                        <label for="Teclado">Teclado</label>
                    </div>
                    <div class="corpo__continer-checkbox">
                        <input type="checkbox" id="Caixa de som" name="Caixa de som" class="corpo__checkbox" checked>
                        <label for="Caixa de som">Caixa de som</label>
                    </div>
                    <div class="corpo__continer-checkbox">
                        <input type="checkbox" id="Microfone" name="Microfone" class="corpo__checkbox" checked>
                        <label for="Microfone">Microfone</label>
                    </div>
                    <div class="corpo__continer-checkbox">
                        <input type="checkbox" id="Gabinete" name="Gabinete" class="corpo__checkbox" checked>
                        <label for="Gabinete">Gabinete</label>
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <legend class="corpo__titulo-filtro">Hardware</legend>
                <div class="corpo__conteiner-filtro">
                    <div class="corpo__continer-checkbox">
                        <input type="checkbox" id="Coolers" name="Coolers" class="corpo__checkbox" checked>
                        <label for="Coolers">Coolers</label>
                    </div>
                    <div class="corpo__continer-checkbox">
                        <input type="checkbox" id="Memoria ram" name="Memoria ram" class="corpo__checkbox" checked>
                        <label for="Memoria ram">Memoria ram</label>
                    </div>
                    <div class="corpo__continer-checkbox">
                        <input type="checkbox" id="Placa Mae" name="Placa mae" class="corpo__checkbox" checked>
                        <label for="Placa Mae">Placa Mae</label>
                    </div>
                    <div class="corpo__continer-checkbox">
                        <input type="checkbox" id="Placa de video" name="Placa de video" class="corpo__checkbox" checked>
                        <label for="Placa de video">Placa de video</label>
                    </div>
                    <div class="corpo__continer-checkbox">
                        <input type="checkbox" id="Processadores" name="Processadores" class="corpo__checkbox" checked>
                        <label for="Processadores">Processadores</label>
                    </div>
                </div>
            </fieldset>
            </div>
            <ul class="corpo__itensP">
                <CorpoItem v-for="produto in this.produtoComputed" :key="produto.index" :produto="produto"/>
            </ul>
            </div>
        </section>
    </main>
    
</template>

<script>
import { defineComponent,computed,ref} from "vue";
import CorpoItem from '../views/CorpoItem.vue'
import {store, useStore} from '../store'

export default defineComponent ({
    name: 'ProdutosView',
    components:{
        CorpoItem
    },
    methods:{
        select(){
            const select = document.getElementById('select')
            let filtro = `f+${select.value}`
            const checkbox = document.querySelectorAll('.corpo__checkbox')
            checkbox.forEach(checkbox =>{
                if(checkbox.checked){
                    filtro += '+' + checkbox.name
                }
            })
            this.link = filtro
            
        },
    },
    computed:{
        nomeComputed(){
            if(this.nome == 'all'){
                return 'Produtos'
            }else if(this.nome == 'new'){
                return 'Lançamentos'
            }else if(this.nome[0] == 'f'){
                return 'Produtos'
            }
            else{
                return this.nome
            }
        },
        produtoComputed(){
            const inputfiltro = store.state.Produto.filter((p) => !this.filtro || p.titulo.includes(this.filtro))
            const novo = store.state.Produto.filter(prod => prod.new == true)
            let lista = []

            if(this.nome == 'all'){
                return store.state.Produto.filter((p) => !this.filtro.toUpperCase() || p.titulo.toUpperCase().includes(this.filtro.toUpperCase()))
            }
            else if(this.nome[0] == 'f'){
                const nome = this.nome
                const filtragem = nome.split('+')
                const filtro = inputfiltro.filter(prod => prod.nome == filtragem[1] || prod.subclasse == filtragem[1] || 
                prod.nome == filtragem[1] || prod.subclasse == filtragem[1] ||
                prod.nome == filtragem[2] || prod.subclasse == filtragem[2] ||
                prod.nome == filtragem[3] || prod.subclasse == filtragem[3] ||
                prod.nome == filtragem[4] || prod.subclasse == filtragem[4] ||
                prod.nome == filtragem[5] || prod.subclasse == filtragem[5] ||
                prod.nome == filtragem[6] || prod.subclasse == filtragem[6] ||
                prod.nome == filtragem[7] || prod.subclasse == filtragem[7] ||
                prod.nome == filtragem[8] || prod.subclasse == filtragem[8] ||
                prod.nome == filtragem[9] || prod.subclasse == filtragem[9] || 
                prod.nome == filtragem[10] || prod.subclasse == filtragem[10] || 
                prod.nome == filtragem[11] || prod.subclasse == filtragem[11] || 
                prod.nome == filtragem[12] || prod.subclasse == filtragem[12] || 
                prod.nome == filtragem[13] || prod.subclasse == filtragem[13] ||
                prod.nome == filtragem[14] || prod.subclasse == filtragem[14] )
                if(filtragem[1] == 'AC'){
                    lista = filtro.sort((a, b) => (a.titulo > b.titulo) ? 1 : -1)
                }else if(filtragem[1] == 'AD'){
                    lista = filtro.sort((a, b) => (a.titulo < b.titulo) ? 1 : -1)
                }else if(filtragem[1] == 'PC'){
                    lista = filtro.sort((a, b) => (a.preco < b.preco) ? 1 : -1)
                }
                else if(filtragem[1] == 'PD'){
                    lista = filtro.sort((a, b) => (a.preco > b.preco) ? 1 : -1)
                }else if(filtragem[1] == 'MV'){
                    lista = filtro.sort((a, b) => (a.vendas < b.vendas) ? 1 : -1)
                }

                return lista
            }
            else if(this.nome == 'new'){
                return novo
            }
            else if(this.nome == ''){
                return store.state.Produto
            }
            else{
                if(store.state.Produto.filter((p) => !this.nome.toUpperCase() || p.titulo.toUpperCase().includes(this.nome.toUpperCase())).length == 0){
                    return store.state.Produto.filter(prod => prod.nome == this.nome || prod.subclasse == this.nome)
                }
                return store.state.Produto.filter((p) => !this.nome.toUpperCase() || p.titulo.toUpperCase().includes(this.nome.toUpperCase())) || store.state.Produto.filter(prod => prod.nome == this.nome || prod.subclasse == this.nome)
            }

        }
    },
       mounted(){ 
        if(this.nome){
            const produto = store.state.Produto.filter(prod => prod.nome == this.nome)
            if(produto === null){
                const produto = store.state.Produto.filter(prod => prod.subclasse == this.nome)
                return produto
            }
            this.produto = produto
        }
    },
    data(){
        return{
            produto:{
            },
            ordenacao: '',
            link: 'all'

            

        }
    },
    props:{
        nome:{
            type:String
        }
    },
    setup(){
        const store = useStore()
        let filtro = ref("")
        const Produto = computed(() => store.state.Produto.filter((p) => !filtro.value || p.titulo.includes(filtro.value)))
        return{
            Produto,
            filtro
    }
    },
})
</script>

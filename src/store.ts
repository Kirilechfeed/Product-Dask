import {createStore} from 'vuex'
import {products} from './product'
import {ref} from 'vue'

interface IStore{
    id: string
    name: string,
    sales: {
      salesCount: number
      profit: number
    },
  }
  interface IItemProduct {
    id: number;
    orderId: string;
    image: string;
    name: string;
    marketPrice: number;
    newlyAdded: boolean,
    store?: string,
    wholesalePrice?: number;
    profit?: number;
  }
const store = createStore({
    state() {
        return {
            coudownStore: 15,
            topStores: [],
            modal: false,
            maxPriceProfit: 0,
            maxPriceSalesCount: 0,
            progress: 0,
            intervalId: null,
            procent: 0,
            target: 0,
            stores: [] as IStore[],
            products: [] as IItemProduct[],
            todayPrice: {
                webSite: 0,
                initialSales: 0,
                profit: 0
            },
        }
    },
    mutations: {
        getColStores(state, params){
            state.todayPrice.webSite = Number(params.store)
            state.todayPrice.profit = Number(params.amount)
            state.target = Number(params.target)
        },
        addNewStore(state, newStore) {
            state.stores.push(newStore)
            state.todayPrice.webSite = state.stores.length
        },
        openModal(state, isActive) {
            state.modal = isActive
        },
        updateInitial(state) {
            state.todayPrice.initialSales = state.stores.reduce((previs, curent) => {
                return (previs + curent.sales.salesCount)
            }, 0)
        },
        updateProgress(state, store) {
            state.progress = store.sales.profit / 3000 * 100
        },
        addStores(state, stores) {
            state.stores = stores
        },
        updateProcent(state) {
            state.procent = 100 / state.target * state.todayPrice.profit
        },
        updateStore(state, args) {
            const [id, profit] = args
            state.stores.forEach((elem) => {
                if (elem.id == id) {
                    elem.sales.profit += profit
                    elem.sales.salesCount += 1
                }
            })
        },
        addNewProduct(state, newProduct) {
            state.products.unshift(newProduct)
        },
        updateInitialSales(state) {
            state.todayPrice.initialSales += 1
            state.todayPrice.profit += ((0.04 - 0.06) * state.products[0].marketPrice) * -1
        },
        setIntervalId(state, intervalId) {
            state.intervalId = intervalId;
        },
        clearIntervalId(state) {
            state.intervalId = null;
        },
        deleteLastElem(state) {
            if (state.products.length >= 11) {
                state.products.splice(state.products.length - 1, 1)
            }
        },
        widthProgressBarProfit(state) {
            state.maxPriceProfit = state.stores[0].sales.profit
            state.stores.forEach((elem) => {
                if (state.maxPriceProfit <= elem.sales.profit) {
                    state.maxPriceProfit = elem.sales.profit
                }
            })
        },
        widthProgressBarSalesCount(state) {
            state.maxPriceSalesCount = state.stores[0].sales.salesCount
            state.stores.forEach((elem) => {
                if (state.maxPriceSalesCount <= elem.sales.salesCount) {
                    state.maxPriceSalesCount = elem.sales.salesCount
                }
            })
        },
        coldouwNewStore(state){
            state.coudownStore = state.stores.length - 1
            setTimeout(()=>{
                state.coudownStore = state.stores.length
            },10000)
        }
    },
    actions: {
        startProgress({commit, state}) {
            if (!state.intervalId) {
                const intervalId = setInterval(() => {
                    const randomProduct = ref()
                    const idStore = Math.floor(Math.random() * state.coudownStore)
                    randomProduct.value = Math.floor(Math.random() * 28)
                    products[randomProduct.value].store = state.stores[idStore].name
                    products[randomProduct.value].profit = ((0.04 - 0.06) * products[randomProduct.value].marketPrice) * -1
                    products[randomProduct.value].orderId = crypto.randomUUID()
                    commit('updateStore', [state.stores[idStore].id, products[randomProduct.value].profit])
                    commit('addNewProduct', products[randomProduct.value])
                    commit('updateInitialSales')
                    commit('updateProcent')
                    commit('updateInitial', state)
                    setTimeout(() => {
                        commit('deleteLastElem')
                    }, 0)

                }, 3000)
                commit('setIntervalId', intervalId);
                commit('deleteLastElem')
            }
        },
        stopProgress({commit, state}) {
            if (state.intervalId) {
                clearInterval(state.intervalId);
                commit('clearIntervalId');
            }
        },
        openModal({commit}) {
            commit('openModal', true)
            setTimeout(() => {
                commit('openModal', false)
            }, 5000);
        }
    }
})


export default store
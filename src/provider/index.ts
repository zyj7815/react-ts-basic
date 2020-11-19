import { createContext, useContext } from 'react'
import { RootStore, STORE_ROOT } from '@/store'

function createStores() {
    return {
        [STORE_ROOT]: new RootStore(),
    }
}

const stores = createStores()
const StoresContext = createContext(stores)
const useStores = () => useContext(StoresContext)

function useRootStore() {
    const { rootStore } = useStores()
    return rootStore
}

const rootStore = stores[STORE_ROOT]

export { stores, useStores, StoresContext, useRootStore, rootStore }

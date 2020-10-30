import { createContext, useContext } from 'react'
import { STORE_ROOT, RootStore } from '@/store'

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

export { stores, useStores, StoresContext, useRootStore }

import { createContext, useContext } from 'react'
import { STORE_TODO, TodoStore } from '@/pages/page1/store/todo'
import { STORE_ROOT, RootStore } from '@/store'

function createStores() {
    return {
        [STORE_ROOT]: new RootStore(),
        [STORE_TODO]: new TodoStore(),
    }
}

const stores = createStores()
const StoresContext = createContext(stores)
const useStores = () => useContext(StoresContext)

function useRootStore() {
    const { rootStore } = useStores()
    return rootStore
}

function useTodoStore() {
    const { todoStore } = useStores()
    return todoStore
}

export { stores, useStores, StoresContext, useTodoStore, useRootStore }

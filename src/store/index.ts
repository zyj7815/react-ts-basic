import { createContext, useContext } from 'react'
import { STORE_TODO, TodoStore } from '@/pages/page1/store/todo'

function createStores() {
    return {
        [STORE_TODO]: new TodoStore(),
    }
}

const stores = createStores()
const StoresContext = createContext(stores)
const useStores = () => useContext(StoresContext)

function useTodoStore() {
    const { todoStore } = useStores()
    return todoStore
}

export { stores, useStores, StoresContext, useTodoStore }

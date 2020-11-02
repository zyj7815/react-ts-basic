import React from 'react'

interface AnimalListProps {
    dataSource: any[]
    setDataSource: (data: any[]) => void
}

export const AnimalListContext = React.createContext<AnimalListProps>({
    dataSource: [],
    setDataSource: (data: any[]) => {},
})

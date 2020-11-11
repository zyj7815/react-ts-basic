import * as React from 'react'

export interface PastureInfoProps {
    name: string
    phone: string
    email?: string
    description?: string
}

export interface PastureLocationProps {
    latitude: number
    longitude: number
    type: string
}

interface NewPastureProps {
    pastureType: number
    setPastureType: (type: number) => void

    information: PastureInfoProps | null
    setInformation: (info: PastureInfoProps) => void

    location: PastureLocationProps | null
    setLocation: (location: PastureLocationProps) => void
}

export const NewPastureContext = React.createContext<NewPastureProps>({
    pastureType: 1,
    setPastureType: (type: number) => {},

    information: null,
    setInformation: (info: PastureInfoProps) => {},

    location: null,
    setLocation: (location: PastureLocationProps) => {},
})

export const ROUTE_ID = ':id'

export const RouteUris = {
    Login: '/login',

    Root: '/root',

    NotFound: '*',

    NotAuth: '/root/auth',

    MainWrapper: '/root',

    MainPasture: '/root',

    MainDevice: '/root/device',

    PastureWrapper: (id = ROUTE_ID) => `/root/pasture/${id}`,

    PastureAnimal: (id = ROUTE_ID) => `/root/pasture/${id}/animal`,

    PastureAnimalNew: (id = ROUTE_ID) => `/root/pasture/${id}/animal/new`,

    PastureGroup: (id = ROUTE_ID) => `/root/pasture/${id}/group`,

    PastureFence: (id = ROUTE_ID) => `/root/pasture/${id}/fence`,
}

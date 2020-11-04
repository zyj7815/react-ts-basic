import { useLanguage } from '@/language/useLanguage'
import { ObjectProps } from '@/types'

export const SpeciesList: ObjectProps[] = [
    { value: useLanguage.bovine, key: 100 },
    { value: useLanguage.ovis, key: 101 },
    { value: useLanguage.swine, key: 102 },
    { value: useLanguage.horse, key: 103 },
    { value: useLanguage.camel, key: 104 },
    { value: useLanguage.donkey, key: 105 },
    { value: useLanguage.other, key: 0 },
]

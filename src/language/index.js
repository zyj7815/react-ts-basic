import En from './en'
import Zh from './zh'

export const Language = {
    init: () => {
        const isEnPath = window.location.pathname.indexOf('/en') > -1

        if (isEnPath) {
            window.language = En
            window.isEn = true
        } else {
            window.language = Zh
            window.isEn = false
        }
    },
}

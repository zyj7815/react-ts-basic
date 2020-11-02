import { useState, useEffect } from 'react'
import { debounce } from 'lodash'

export const useWindowSize = () => {
    const [offsetHeight, setOffsetHeight] = useState(document.body.offsetHeight)

    useEffect(() => {
        window.onresize = () => updateSize()

        return () => {
            window.onresize = null
        }
    }, [])

    const updateSize = debounce(() => {
        setOffsetHeight(document.body.offsetHeight)
    }, 300)

    return offsetHeight
}

import {useContext} from 'react'
import {OverlayContext} from './OverlayProvider'

export function useOverlay() {
    return useContext(OverlayContext)
}
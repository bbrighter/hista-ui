import AmbrosiaIcon from './ambrosia.svg?react'
import BeifussIcon from './beifuss.svg?react'
import BirkeIcon from './birke.svg?react'
import ErleIcon from './erle.svg?react'
import EscheIcon from './esche.svg?react'
import GraeserIcon from './graeser.svg?react'
import HaselIcon from './hasel.svg?react'
import RoggenIcon from './roggen.svg?react'

export const POLLEN_TYPES = [
  { key: 'ambrosia', label: 'Ambrosia', icon: AmbrosiaIcon },
  { key: 'beifuss', label: 'Beifuss', icon: BeifussIcon },
  { key: 'birke', label: 'Birke', icon: BirkeIcon },
  { key: 'erle', label: 'Erle', icon: ErleIcon },
  { key: 'esche', label: 'Esche', icon: EscheIcon },
  { key: 'graeser', label: 'Gräser', icon: GraeserIcon },
  { key: 'hasel', label: 'Hasel', icon: HaselIcon },
  { key: 'roggen', label: 'Roggen', icon: RoggenIcon },
] as const

export const FIRST_COLUMN_WIDTH = 'max(20%, 100px)' as const

export const intensityToColor = (intensity: number): string => {
  const intensityColorMap: Record<number, string> = {
    1: 'darkgreen',
    2: 'green',
    3: 'greenyellow',
    4: 'yellow',
    5: 'orange',
    6: 'red',
    7: 'purple',
  }
  return intensityColorMap[intensity] ?? '#121212'
}

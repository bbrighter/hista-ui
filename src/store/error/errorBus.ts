import mitt from 'mitt'

type Events = {
  error: unknown
}

export const errorBus = mitt<Events>()

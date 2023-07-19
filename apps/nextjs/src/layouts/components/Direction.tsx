// ** React Imports
import { useEffect, type ReactNode } from 'react'

// ** MUI Imports
import { Direction } from '@mui/material'

// ** Emotion Imports
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'


interface DirectionProps {
  children: ReactNode
  direction: Direction
}


const Direction = (props: DirectionProps) => {
  const { children, direction } = props

  useEffect(() => {
    document.dir = direction
  }, [direction])

  

  return <>{children}</>
}

export default Direction

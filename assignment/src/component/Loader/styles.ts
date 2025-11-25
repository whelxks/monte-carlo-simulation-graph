import tw from 'tailwind-styled-components'

export const LoaderContainer = tw.div`
  flex h-screen w-full items-center justify-center
`

export type ISpinnerColor = 'white' | 'navy'

type SpinnerProps = {
  $size: 'x-small' | 'small' | 'big'
  $color: ISpinnerColor
}

const SpinnerSize = (size: 'x-small' | 'small' | 'big') => {
  switch (size) {
    case 'big':
      return 'w-12'
    case 'x-small':
      return 'w-3'
    case 'small':
    default:
      return 'w-6'
  }
}

const SpinnerColor = (color: ISpinnerColor) => {
  switch (color) {
    case 'white':
      return 'text-white'
    default:
      return 'text-navy'
  }
}

export const SpinnerContainer = tw.div<SpinnerProps>`
  ${(p) => SpinnerSize(p.$size)}
  ${(p) => SpinnerColor(p.$color)}
  aspect-square animate-spin
`

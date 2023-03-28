import { resolve } from 'path'
export const getImageUrl = (name: any) => {
  return new URL(`@/assets/${name}.jpg`, import.meta.url).href
}

export const sleep = async (delay: number = 500) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null)
    }, delay)
  })
}

import { resolve } from 'path'
export const getImageUrl = (name) => {
  return new URL(`@/assets/${name}.jpg`, import.meta.url).href
}

export const sleep = async (delay) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null)
    }, delay)
  })
}

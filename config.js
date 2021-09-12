const deepMerge = require('deepmerge')
const customFormsPlugin = require('@tailwindcss/forms')

const twColors = require('tailwindcss/colors')

const colors = {
  ...twColors,
  primary: twColors.red,
  success: twColors.green,
  danger: twColors.red,
  neutral: twColors.trueGray,
  warning: twColors.yellow,
  info: twColors.blue,
  darkText: twColors.white,
  darkWarning: twColors.orange,
}

const backgroundOpacity = (theme) => ({
  '10': '0.1',
  ...theme('opacity'),
})

const maxHeight = (theme) => ({
  '0': '0',
  xl: '36rem',
  ...theme('spacing'),
})

const windmillConfig = {
  darkMode: 'class',
  purge: {
    content: [
      'node_modules/@windmill/react-ui/lib/defaultTheme.js',
      'node_modules/@windmill/react-ui/dist/index.js',
    ],
  },
  theme: {
    colors,
    backgroundOpacity,
    maxHeight,
  },
  variants: {
    backgroundOpacity: ['responsive', 'hover', 'focus', 'dark'],
    backgroundColor: ['responsive', 'hover', 'focus', 'active', 'odd', 'dark'],
    display: ['responsive', 'dark'],
    textColor: ['responsive', 'focus', 'focus-within', 'hover', 'active', 'dark'],
    placeholderColor: ['responsive', 'focus', 'dark'],
    borderColor: ['responsive', 'hover', 'focus', 'dark'],
    divideColor: ['responsive', 'dark'],
    boxShadow: ['responsive', 'hover', 'focus', 'dark'],
    margin: ['responsive', 'last'],
  },
  plugins: [customFormsPlugin],
}

function arrayMergeFn(destinationArray, sourceArray) {
  return destinationArray.concat(sourceArray).reduce((acc, cur) => {
    if (acc.includes(cur)) return acc
    return [...acc, cur]
  }, [])
}

/**
 * Merge Windmill and Tailwind CSS configurations
 * @param {object} tailwindConfig - Tailwind config object
 * @return {object} new config object
 */
function wrapper(tailwindConfig) {
  let purge
  if (Array.isArray(tailwindConfig.purge)) {
    purge = {
      content: tailwindConfig.purge,
    }
  } else {
    purge = tailwindConfig.purge
  }
  return deepMerge({ ...tailwindConfig, purge }, windmillConfig, { arrayMerge: arrayMergeFn })
}

module.exports = wrapper

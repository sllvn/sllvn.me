import Typography from 'typography'
import theme from 'typography-theme-us-web-design-standards'

theme.baseFontSize = '16px'
theme.overrideThemeStyles = (props, options) => ({
  'code': {
    fontSize: '0.8em !important'
  }
})

const typography = new Typography(theme)

export default typography

import Typography from 'typography'
import theme from 'typography-theme-us-web-design-standards'

// theme.baseFontSize = '16px'
/*theme.overrideThemeStyles = ({ rhythm }, options) => ({
  'ol,ul': {
    listStyleImage: 'none',
    marginTop: rhythm(1)
  },
  'p,ol,ul': {
    marginTop: rhythm(1),
    marginBottom: 0
  }
})*/

const typography = new Typography(theme)

export default typography

import { extendTheme } from '@chakra-ui/react'

/**
 * Research-workstation theme: light neutral surfaces, one restrained accent,
 * tight vertical rhythm and tabular numerals for dense data.
 */
const theme = extendTheme({
  config: { initialColorMode: 'light', useSystemColorMode: false },

  colors: {
    // Single restrained accent used for interactive + "in review" states.
    brand: {
      50: '#eef3ff',
      100: '#dbe4ff',
      200: '#b8c9ff',
      300: '#8ea6f7',
      400: '#6683ec',
      500: '#3f5fd6',
      600: '#2f49b0',
      700: '#25398a',
      800: '#1c2b68',
      900: '#141e49',
    },
    surface: {
      page: '#f7f8fa',
      raised: '#ffffff',
      sunken: '#f1f3f7',
      border: '#e3e6ec',
      borderStrong: '#cfd4de',
    },
  },

  fonts: {
    heading:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "'SF Mono', ui-monospace, 'Cascadia Mono', Menlo, monospace",
  },

  fontSizes: {
    '2xs': '0.6875rem',
    xs: '0.75rem',
    sm: '0.8125rem',
    md: '0.875rem',
  },

  radii: { sm: '4px', md: '6px', lg: '8px' },

  shadows: {
    card: '0 1px 2px rgba(16, 24, 40, 0.04)',
    raised: '0 4px 12px rgba(16, 24, 40, 0.08)',
  },

  styles: {
    global: {
      'html, body, #root': { height: '100%' },
      body: {
        bg: 'surface.page',
        color: 'gray.800',
        fontSize: 'md',
        WebkitFontSmoothing: 'antialiased',
      },
      // Numbers line up column-to-column across every table and stat.
      '.tabular': { fontVariantNumeric: 'tabular-nums' },
      '::selection': { bg: 'brand.100' },
    },
  },

  components: {
    Heading: {
      baseStyle: { fontWeight: 600, letterSpacing: '-0.011em', color: 'gray.900' },
    },
    Badge: {
      baseStyle: {
        textTransform: 'none',
        fontWeight: 600,
        fontSize: '2xs',
        letterSpacing: '0.01em',
        borderRadius: 'sm',
        px: 1.5,
        py: '2px',
      },
    },
    Table: {
      sizes: {
        sm: {
          th: { px: 3, py: 2.5, fontSize: '2xs' },
          td: { px: 3, py: 2.5, fontSize: 'sm' },
        },
      },
      variants: {
        intel: {
          th: {
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'gray.500',
            fontWeight: 600,
            borderBottom: '1px solid',
            borderColor: 'surface.border',
            bg: 'surface.sunken',
            whiteSpace: 'nowrap',
          },
          td: {
            borderBottom: '1px solid',
            borderColor: 'surface.border',
            verticalAlign: 'top',
          },
          tbody: {
            tr: {
              _hover: { bg: 'brand.50' },
              _last: { td: { borderBottom: 'none' } },
            },
          },
        },
      },
      defaultProps: { size: 'sm', variant: 'intel' },
    },
    Button: {
      baseStyle: { fontWeight: 600, borderRadius: 'md' },
      defaultProps: { size: 'sm', colorScheme: 'gray' },
    },
    Input: { defaultProps: { size: 'sm', focusBorderColor: 'brand.400' } },
    Select: { defaultProps: { size: 'sm', focusBorderColor: 'brand.400' } },
    Tooltip: {
      baseStyle: {
        bg: 'gray.800',
        fontSize: 'xs',
        borderRadius: 'md',
        px: 2.5,
        py: 1.5,
        maxW: '280px',
      },
    },
  },
})

export default theme

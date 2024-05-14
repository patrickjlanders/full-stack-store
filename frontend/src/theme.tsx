import { extendTheme } from "@chakra-ui/react"

const disabledStyles = {
  _disabled: {
    backgroundColor: "ui.main",
  },
}

const theme = extendTheme({
  colors: {
    ui: {
      main: "#009688",
      secondary: "#EDF2F7",
      success: "#48BB78",
      danger: "#E53E3E",
      light: "#FAFAFA",
      dark: "#1A202C",
      darkSlate: "#252D3D",
      dim: "#A0AEC0",
    },
  },
  components: {
    Button: {
      variants: {
        primary: {
          backgroundColor: "ui.main",
          color: "ui.light",
          _hover: {
            backgroundColor: "#00766C",
          },
          _disabled: {
            ...disabledStyles,
            _hover: {
              ...disabledStyles,
            },
          },
        },
        danger: {
          backgroundColor: "ui.danger",
          color: "ui.light",
          _hover: {
            backgroundColor: "#E32727",
          },
        },
      },
    },
    Tabs: {
      variants: {
        enclosed: {
          tab: {
            _selected: {
              color: "ui.main",
            },
          },
        },
      },
    },
  },
})


const themeBrit = extendTheme({


  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Raleway', sans-serif`,
  },
  colors: {
    ui: {
      main: "#E97b31",
      secondary: "#EDF2F7",
      success: "#48BB78",
      danger: "#E53E3E",
      light: "#FAFAFA",
      dark: "#1A202C",
      darkSlate: "#252D3D",
      dim: "#A0AEC0",
    },
    brandBackground: '#296fcc', // Example: light gray background
    blue: {
      200: "##296fcc",
    },
    orange: {
      500: '#E97b31', // A general orange color
      600: '#CC8400', // A darker orange for hover
    },
    gray: {
      300: '#e0e0e0', // Input background
      400: '#c0c0c0', // Input hover border
      500: '#a0a0a0', // Input border color
    },
  },
  styles: {
    global: {
      // Apply styles globally across all elements
      body: {
        bg: 'brandBackground', // Use the color from the theme
        color: 'black', // Adjust text color if needed
      },
    },
  },
  components: {
    // Box: {
    //   baseStyle: {
    //     fontWeight: 'bold',
    //   },
    //   variants: {
    //     solid: {
    //       bg: 'orange.500',
    //       color: 'white',
    //       _hover: {
    //         bg: 'orange.500',
    //       },
    //     },
    //   },
    // },
    // Button: {
    //   baseStyle: {
    //     borderRadius: '0',
    //   },
    //   variants: {
    //     solid: {
    //       bg: 'ui.main',
    //       color: 'white',
    //       _hover: {
    //         bg: 'orange.600',
    //       },
    //     },
    //   },
    // },
    Button: {
      baseStyle: {
        borderRadius: '0',
      },
      variants: {
        primary: {
          backgroundColor: "ui.main",
          color: "ui.light",
          _hover: {
            backgroundColor: "#00766C",
          },
          _disabled: {
            ...disabledStyles,
            _hover: {
              ...disabledStyles,
            },
          },
        },
        danger: {
          backgroundColor: "ui.danger",
          color: "ui.light",
          _hover: {
            backgroundColor: "#E32727",
          },
        },
      },
    },
    Input: {
      baseStyle: {
        field: {
          bg: 'orange.300',
          borderRadius: '0',
          borderColor: 'gray.500',
          _hover: {
            borderColor: 'gray.400',
          },
          _focus: {
            borderColor: 'orange.200',
            boxShadow: '0 0 0 1px #FFA500', // Focus ring matches button color
          },
        },

      },
    },
  },
});

export { theme, themeBrit }

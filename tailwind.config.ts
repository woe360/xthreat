import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
      fontFamily: {
        savass: ['Savass Sans', 'sans-serif'],
      },
      scale: {
        102: '1.02',
        103: '1.03',
        104: '1.04',
      },
		animation: {
			move: "move 5s linear infinite",
			shimmer: "shimmer 2s linear infinite",
			pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      scroll: 'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite',
      spotlight: 'spotlight 2s ease .75s 1 forwards',
      'accordion-down': 'accordion-down 0.2s ease-out',
      'accordion-up': 'accordion-up 0.2s ease-out',
      first: 'moveVertical 30s ease infinite',
      second: 'moveInCircle 20s reverse infinite',
      third: 'moveInCircle 40s linear infinite',
      fourth: 'moveHorizontal 40s ease infinite',
      fifth: 'moveInCircle 20s ease infinite',
      marquee: 'marquee var(--duration) infinite linear',
      'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
      orbit: 'orbit calc(var(--duration)*1s) linear infinite'
		},
		keyframes: {
			move: {
			  "0%": { transform: "translateX(-200px)" },
			  "100%": { transform: "translateX(200px)" },
			},
			shimmer: {
				from: {
				  "backgroundPosition": "0 0"
				},
				to: {
				  "backgroundPosition": "-200% 0"
				}
			},
			pulse: {
				'0%, 100%': { opacity: '1' },
				'50%': { opacity: '.5' },
			},
      scroll: {
        to: {
          transform: 'translate(calc(-50% - 0.5rem))'
        }
      },
      spotlight: {
        '0%': {
          opacity: '0',
          transform: 'translate(-72%, -62%) scale(0.5)'
        },
        '100%': {
          opacity: '1',
          transform: 'translate(-50%,-40%) scale(1)'
        }
      },
      moveHorizontal: {
        '0%': {
          transform: 'translateX(-50%) translateY(-10%)'
        },
        '50%': {
          transform: 'translateX(50%) translateY(10%)'
        },
        '100%': {
          transform: 'translateX(-50%) translateY(-10%)'
        }
      },
      moveInCircle: {
        '0%': {
          transform: 'rotate(0deg)'
        },
        '50%': {
          transform: 'rotate(180deg)'
        },
        '100%': {
          transform: 'rotate(360deg)'
        }
      },
      moveVertical: {
        '0%': {
          transform: 'translateY(-50%)'
        },
        '50%': {
          transform: 'translateY(50%)'
        },
        '100%': {
          transform: 'translateY(-50%)'
        }
      },
      'accordion-down': {
        from: {
          height: '0'
        },
        to: {
          height: 'var(--radix-accordion-content-height)'
        }
      },
      'accordion-up': {
        from: {
          height: 'var(--radix-accordion-content-height)'
        },
        to: {
          height: '0'
        }
      },
      marquee: {
        from: {
          transform: 'translateX(0)'
        },
        to: {
          transform: 'translateX(calc(-100% - var(--gap)))'
        }
      },
      'marquee-vertical': {
        from: {
          transform: 'translateY(0)'
        },
        to: {
          transform: 'translateY(calc(-100% - var(--gap)))'
        }
      },
      orbit: {
        '0%': {
          transform: 'rotate(0deg) translateY(calc(var(--radius) * 1px)) rotate(0deg)'
        },
        '100%': {
          transform: 'rotate(360deg) translateY(calc(var(--radius) * 1px)) rotate(-360deg)'
        }
      }
		},
  		backdropBlur: {
  			none: '0',
  			sm: '4px',
  			md: '8px',
  			lg: '12px',
  			xl: '16px',
  			'2xl': '24px',
  			'3xl': '40px'
  		},
  		backgroundImage: {
  			'custom-radial': 'radial-gradient(155% 125% at 10% 10%, #000 10%, #212 100%)'
  		},
  		colors: {
  			'custom-dark': '#1F2429',
  			'bright-orange': '#F97316',
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config

// function addVariablesForColors({ addBase, theme }: any) {
//   let allColors = flattenColorPalette(theme('colors'))
//   let newVars = Object.fromEntries(
//     Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
//   )
//   addBase({
//     ':root': newVars,
//   })
// }

export default config
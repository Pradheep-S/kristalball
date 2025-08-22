module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: { 
    extend: {
      colors: {
        // Military theme with tactical colors
        military: {
          50: '#f7f8f7',
          100: '#eef1ed',
          200: '#d5dbd2',
          300: '#b7c5b2',
          400: '#8fa088',
          500: '#6d7d65',
          600: '#5a6952',
          700: '#495544',
          800: '#3d4539',
          900: '#2a2f26',
          950: '#1a1e17',
        },
        tactical: {
          50: '#f6f7f4',
          100: '#e8ebe4',
          200: '#d2d8c9',
          300: '#b3bfa5',
          400: '#8fa080',
          500: '#6f8162',
          600: '#56674c',
          700: '#44523e',
          800: '#374233',
          900: '#2f372c',
          950: '#191f16',
        },
        camo: {
          light: '#8B9A7A',
          DEFAULT: '#5A6B49',
          dark: '#3D4A30',
          darker: '#2C3622',
        },
        olive: {
          50: '#f6f7f2',
          100: '#eaedde',
          200: '#d6dcbf',
          300: '#bbc597',
          400: '#a2b170',
          500: '#8b9a55',
          600: '#6e7a41',
          700: '#555e35',
          800: '#464c2d',
          900: '#3c4128',
          950: '#202312',
        },
        desert: {
          50: '#faf9f4',
          100: '#f3f1e6',
          200: '#e6e1cd',
          300: '#d6cdaa',
          400: '#c4b584',
          500: '#b39e67',
          600: '#a0895b',
          700: '#856f4d',
          800: '#6d5a42',
          900: '#594a37',
          950: '#32281d',
        },
        accent: {
          light: '#D4AF37',
          DEFAULT: '#B8860B',
          dark: '#8B6914',
        }
      },
      backgroundImage: {
        'gradient-military': 'linear-gradient(135deg, #3d4539 0%, #2a2f26 100%)',
        'gradient-tactical': 'linear-gradient(135deg, #56674c 0%, #44523e 100%)',
        'gradient-camo': 'linear-gradient(135deg, #8B9A7A 0%, #5A6B49 50%, #3D4A30 100%)',
        'gradient-desert': 'linear-gradient(135deg, #d6cdaa 0%, #c4b584 50%, #a0895b 100%)',
        'gradient-dark-military': 'linear-gradient(135deg, #2a2f26 0%, #1a1e17 100%)',
        'military-pattern': `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23556B44' fill-opacity='0.05'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm10 0c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      },
      boxShadow: {
        'military': '0 4px 6px -1px rgba(42, 47, 38, 0.3), 0 2px 4px -1px rgba(42, 47, 38, 0.2)',
        'military-lg': '0 10px 15px -3px rgba(42, 47, 38, 0.3), 0 4px 6px -2px rgba(42, 47, 38, 0.2)',
        'military-xl': '0 20px 25px -5px rgba(42, 47, 38, 0.3), 0 10px 10px -5px rgba(42, 47, 38, 0.2)',
        'military-2xl': '0 25px 50px -12px rgba(42, 47, 38, 0.4)',
        'tactical': '0 8px 25px -5px rgba(86, 103, 76, 0.3)',
        'inner-military': 'inset 0 2px 4px 0 rgba(42, 47, 38, 0.2)',
      },
      fontFamily: {
        'military': ['Rajdhani', 'Orbitron', 'monospace'],
        'tactical': ['Play', 'Exo 2', 'sans-serif'],
      }
    } 
  },
  plugins: [],
};

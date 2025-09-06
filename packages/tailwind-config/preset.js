// Shared design tokens for Disaster Recovery brand
const preset = {
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0D3B66',
          light: '#2D5B86',
          dark: '#082640'
        },
        accent: {
          DEFAULT: '#F4D35E',
          dark: '#C9A93C'
        },
        emergency: {
          DEFAULT: '#EF4444',
          dark: '#DC2626'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      spacing: {
        18: '4.5rem',
        88: '22rem'
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem'
      },
      boxShadow: {
        card: '0 4px 14px rgba(0,0,0,0.08)',
        hover: '0 8px 20px rgba(0,0,0,0.12)'
      }
    }
  }
};

module.exports = preset;

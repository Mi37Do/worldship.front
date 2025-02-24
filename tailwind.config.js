/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui'), require('tailwindcss-rtl'), require('@headlessui/vue')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#012970',
          secondary: '#09abe2',
          accent: '#37cdbe',
          neutral: '#3d4451',
          'base-100': '#ffffff',
        },
      },
    ],
  },
}

/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'default-text': '#E8E8E8', // Menambahkan warna teks default
      },
      textColor: {
        'default': 'var(--color-default-text)', // Mengatur warna teks default sebagai referensi ke warna yang didefinisikan sebelumnya
      },
      fontFamily: {
        quicksand: ['Quicksand', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

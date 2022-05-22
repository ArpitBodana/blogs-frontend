module.exports = {
  content: [
    './pages/**/*.js',
    './components/**/*.jsx',

  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Nunito'],
        time: ['Alegreya Sans SC'],
        text: ['Noto Sans']

      },
      animation: {
        moving: "moving 9s infinite",
      },
      keyframes: {
        moving: {
          "0%": {
            transform: "translate(0px,0px) scale(1)",
          },
          "33%": {
            transform: "translate(-40px,-100px) scale(0.7)",
          },
          "65%": {
            transform: "translate(190px,150px) scale(0.8)",
          },
          "75%": {
            transform: "translate(60px,20px) scale(0.8)",
          },
          "100%": {
            transform: "translate(0px,0px) scale(1)",
          }
        },
      }
    },
  },
plugins: [], 
}

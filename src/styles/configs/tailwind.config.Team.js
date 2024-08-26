module.exports = {
  "mode": "jit",
  "content": [
    "./src/**/*.jsx"
  ],
  "theme": {
    "extend": {
      "colors": {
        "smoky": "#000000de",
        "accent": "#7B2D26",
        "destructive": "#c0392b",
        "input": "#ecf0f1"
      },
      "keyframes": {
        "slide-in-top": {
          "from": {
            "opacity": "0",
            "transform": "translate(0,-100%)"
          },
          "to": {
            "opacity": "1",
            "transform": "translate(0,0)"
          }
        },
        "slide-in-bottom": {
          "from": {
            "opacity": "0",
            "transform": "translate(0,100%)"
          },
          "to": {
            "opacity": "1",
            "transform": "translate(0,0)"
          }
        },
        "slide-out-top": {
          "from": {
            "opacity": "1",
            "transform": "translate(0,0)"
          },
          "to": {
            "opacity": "0",
            "transform": "translate(0,-100%)"
          }
        },
        "slide-out-bottom": {
          "from": {
            "opacity": "1",
            "transform": "translate(0,0)"
          },
          "to": {
            "opacity": "0",
            "transform": "translate(0,100%)"
          }
        }
      },
      "animation": {
        "slide-in-top": "slide-in-top 175ms ease-in-out forwards",
        "slide-in-bottom": "slide-in-bottom 175ms ease-in-out forwards",
        "slide-out-top": "slide-out-top 175ms ease-in-out forwards",
        "slide-out-bottom": "slide-out-bottom 175ms ease-in-out forwards"
      }
    }
  },
  "plugins": [],
  "purge": [
    "./src/components/Team.jsx"
  ]
};
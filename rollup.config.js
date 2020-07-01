// rollup.config.js
import babel from '@rollup/plugin-babel';

export default [{
  input: 'src/index.js',
  output: {
    file: 'build/bundle.js',
    format: 'iife',
    name: "cv"
  },
  plugins: [
    babel({ babelHelpers: 'bundled' })
  ]
},{
    input: 'src/demo/demo.js',
    output: {
      file: 'src/demo/bundle.js',
      format: 'cjs'
    },
    plugins: [
      babel({ babelHelpers: 'bundled' })
    ]
  }
];
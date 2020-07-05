// rollup.config.js
import babel from '@rollup/plugin-babel';

export default [{
  input: 'src/modules/vertexCull.js',
  output: {
    file: 'build/bundle.js',
    format: 'umd',
    name: "vc",
  },
  plugins: [
    babel({ babelHelpers: 'bundled' })
  ]
},{
    input: 'src/demo/demo.js',
    output: {
      file: 'src/demo/bundle.js',
      format: 'umd',
      name: "vc",
    },
    plugins: [
      babel({ babelHelpers: 'bundled' })
    ]
  }
];
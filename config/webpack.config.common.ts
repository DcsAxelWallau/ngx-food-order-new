const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { AngularCompilerPlugin } = require('@ngtools/webpack');
const { EnvironmentPlugin, NormalModuleReplacementPlugin, ProgressPlugin } = require('webpack');
const rxPaths = require('rxjs/_esm5/path-mapping');

const root = process.cwd();
const TS_VERSION = require('typescript').version;
const APP_ENV = process.env.APP_ENV || 'development';

const Environment = require(path.resolve(root, 'src', 'environments', APP_ENV)).default;
const environment = new Environment();

const extractSASS = new ExtractTextPlugin('application-sass.css');
const cssLoader = [
  {
    loader: 'raw-loader',
  },
  {
    loader: 'postcss-loader',
    options: {
      sourceMap: true,
      plugins: () => {
        let plugins = [require('autoprefixer')];
        if (APP_ENV === 'production') {
          plugins = [
            ...plugins,
            require('cssnano')({
              preset: 'default',
            }),
          ];
        }
        return plugins;
      },
    },
  },
  { loader: 'sass-loader', options: { sourceMap: true } },
];

module.exports = {
  resolve: {
    extensions: ['.ts', '.js'],
    mainFields: ['es2015', 'module', 'main'],
    alias: {
      ...rxPaths(),
      '@fortawesome/fontawesome-free-solid$': '@fortawesome/fontawesome-free-solid/shakable.es.js',
      'transit-immutable-js': path.resolve(root, 'config', 'resource-override.js'),
      'date-fns': path.resolve(root, 'config', 'resource-override.js'),
      // tslint:disable-next-line:object-literal-key-quotes
      ajv: path.resolve(root, 'config', 'resource-override.js'),
      // tslint:disable-next-line:object-literal-key-quotes
      validator: path.resolve(root, 'config', 'resource-override.js'),
    },
  },
  entry: {
    main: './src/main.ts',
    styles: './src/styles/application.scss',
  },

  output: {
    filename: '[name].[hash].bundle.js',
    chunkFilename: '[id].chunk.js',
    path: path.resolve(root, 'dist'),
  },

  module: {
    rules: [
      {
        test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
        use: [
          {
            loader: '@ngtools/webpack',
            options: { tsConfigPath: path.resolve(root, 'tsconfig.json') },
          },
        ],
      },
      { test: /\.(jpg|png|gif)$/, use: 'file-loader' },
      { test: /\.(eot|woff2?|svg|ttf)([\?]?.*)$/, use: 'file-loader' },
      { test: /\.css$/, use: 'raw-loader' },
      {
        test: /\.html$/,
        loader: 'raw-loader',
        include: [path.resolve(root, 'src', 'app')],
      },

      {
        test: /\.(scss)$/,
        use: extractSASS.extract({ fallback: 'style-loader', use: cssLoader }),
        include: [path.resolve(root, 'src', 'styles')],
      },
      {
        test: /\.(scss)$/,
        use: cssLoader,
        include: [path.resolve(root, 'src', 'app')],
      },

      {
        test: /\.js$/,
        parser: {
          system: true, // no warning
        },
      },
    ],
  },

  plugins: [
    new ProgressPlugin(),
    new CleanWebpackPlugin(['dist'], { root: path.resolve(root) }),

    new CopyWebpackPlugin([
      {
        from: '**/*',
        to: 'assets',
        context: 'src/assets',
      },
      {
        from: 'src/manifest.json',
        to: '',
      },
      { from: 'src/_redirects', to: '' },
    ]),

    new EnvironmentPlugin({
      TS_VERSION,
      APP_ENV,
    }),

    // load the configuration for the current environment (development, staging, production ...)
    new NormalModuleReplacementPlugin(
      /src[/\\]environment.ts/,
      path.resolve(root, 'src', 'environments', APP_ENV + '.ts')
    ),

    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      environment,
    }),

    new AngularCompilerPlugin({
      mainPath: 'src/main.ts',
      tsConfigPath: 'tsconfig.json',
      sourceMap: true,
    }),

    extractSASS,
  ],
};

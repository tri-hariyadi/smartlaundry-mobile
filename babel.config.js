module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['transform-inline-environment-variables'],
    [
      'module-resolver',
      {
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
          'index.tsx',
          'index.ts',
        ],
        root: ['.'],
        alias: {
          '@image': './src/assets',
          '@components': './src/components',
          '@parts': './src/parts',
          '@pages': './src/pages',
          '@routes': './src/routes',
          '@store': './src/store',
          '@utils': './src/utils',
          '@validates': './src/utils/validations',
          '@fonts': './src/utils/fonts',
          '@colors': './src/utils/colors',
          '@action': './src/store/action-creators',
          '@action/interface': './src/store/action-interfaces',
        },
      },
    ],
  ],
};

const config = {
  semi: false,
  quoteProps: 'consistent',
  singleQuote: true,
  trailingComma: 'es5',
  bracketSameLine: true,
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
}

export default config

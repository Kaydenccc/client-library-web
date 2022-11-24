module.exports = (ctx) => {
  const plugins = {
    tailwindcss: {},
    autoprefixer: {
      ...ctx.options.autoprefixer,
      flexbox: 'no-2009',
    },
  };
  return { plugins };
};

/** @type {import('next').NextConfig} */

module.exports = function override(def_config, env) {
  return {
    ...def_config,
    webpack: (config) => {
      config.resolve = {
        ...config.resolve,
        fallback: {
          "@mercadopago/sdk-react": false,
        }
      }
      return config
    },
  }
}

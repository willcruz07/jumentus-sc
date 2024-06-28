/** @type {import('next').NextConfig} */
const nextConfig = {
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*', // Ou o domínio específico que você deseja permitir
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups',
          },
        ],
      },
    ];
  },
  redirects: async () => [
    {
      source: '/',
      destination: '/sign-in',
      permanent: true,
    },
  ],
  // webpack: (config) => {
  //   if (!config.experiments) {
  //     config.experiments = {};
  //   }

  //   config.experiments.asyncWebAssembly = true;

  //   if (
  //     !config.module.rules.find(
  //       (rule) => rule.test && rule.test.toString() === '/\\.wasm$/'
  //     )
  //   ) {
  //     config.module.rules.push({
  //       test: /\.wasm$/,
  //       type: 'webassembly/async',
  //     });
  //   }

  //   return config;
  // },
};

export default nextConfig;

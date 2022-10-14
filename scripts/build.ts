import { build } from 'esbuild';
import pluginVue from 'esbuild-plugin-vue-next';
import svgrPlugin from 'esbuild-plugin-svgr';

type Environment = 'production' | 'development';

const BUILD_MODE = (process.env.BUILD_MODE as Environment) || 'development';
if (!BUILD_MODE || !['production', 'development'].includes(BUILD_MODE)) {
    throw new Error(`[Build] Cannot build with provided environment "${BUILD_MODE}".`);
}

/**
 * A builder function for the client package.
 */
export async function buildClient() {
    await build({
      entryPoints: ['packages/client/src/main.js'],
      bundle: true,
      outfile: 'packages/client/public/main.js',
      logLevel: "info",
      assetNames: 'assets/[name]-[hash]',
      loader: {
        '.png': 'file',
        '.ogg': 'file',
        '.svg': 'file',
        '.ico': 'file',
      },
      plugins: [svgrPlugin(), pluginVue()],
      minify: BUILD_MODE === 'production',
      sourcemap: BUILD_MODE === 'development',
      define: {
        'process.env.NODE_ENV': `"${process.env.BUILD_MODE}"`,
      },
      watch:
            BUILD_MODE === 'production'
                ? false
                : {
                      onRebuild: (error, result) => {
                          console.log(`[Client] Build finished at ${new Date().toISOString()}`);
                      },
                  },
    });

    console.log('[Build] Client built...');
}

/**
 * A builder function for the server package.
 */
export async function buildServer() {
    await build({
        entryPoints: ['packages/server/src/index.ts'],
        outfile: 'packages/server/dist/index.js',
        define: {
            'process.env.NODE_ENV': `"${BUILD_MODE}"`,
        },
        external: ['express', 'hiredis', 'default-gateway', 'cors'],
        platform: 'node',
        target: 'node16.15.1',
        bundle: true,
        minify: BUILD_MODE === 'production',
        sourcemap: BUILD_MODE === 'development',
        watch:
            BUILD_MODE === 'production'
                ? false
                : {
                      onRebuild: (error, result) => {
                          console.log(`[Server] Build finished at ${new Date().toISOString()}`);
                      },
                  },
    });

    console.log('[Build] Server built...');
}

/**
 * A builder function for the common package.
 */
 export async function buildCommon() {
  await build({
      entryPoints: ['packages/common/src/index.ts'],
      outfile: 'packages/common/dist/index.js',
      define: {
          'process.env.NODE_ENV': `"${BUILD_MODE}"`,
      },
      external: ['@lastolivegames/becsy', 'chalk', 'raf'],
      bundle: true,
      minify: BUILD_MODE === 'production',
      sourcemap: BUILD_MODE === 'development',
      watch:
          BUILD_MODE === 'production'
              ? false
              : {
                    onRebuild: (error, result) => {
                        console.log(`[Common] Build finished at ${new Date().toISOString()}`);
                    },
                },
  });

  console.log('[Build] Common built...');
}

/**
 * A builder function for all packages.
 */
async function buildAll() {
    console.log(`[Build] Building project in "${BUILD_MODE}" mode...`);

    await buildCommon();
    await buildClient();
    await buildServer();

    console.log('[Build] Building completed.');
    process.exit(0);
}

// This method is executed when we run the script from the terminal with ts-node
buildAll();

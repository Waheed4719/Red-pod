/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.module.rules.push({
          test: /\.(mp3)$/,
          use: [
            {
              loader: 'file-loader', // Use the file-loader to process MP3 files
              options: {
                name: '[name].[ext]', // Keep the original file name and extension
                publicPath: '/assets/music/', // Change this path as needed
                outputPath: 'static/sounds/', // Change this path as needed
              },
            },
          ],
        });
    
        return config;
      },
      images: {
        domains: ['upload.wikimedia.org'], // Add your allowed domains here
      },
}

module.exports = nextConfig

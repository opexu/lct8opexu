/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './index.html',
        './src/*.{html,js,css,vue}',
        './src/**/*.{html,js,css,vue}',
        "./node_modules/tw-elements/dist/js/**/*.js",
    ],
    mode: 'jit',
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient( 100% 100% at 50% 0%, var(--tw-gradient-stops) )',
            },
        },
    },
    plugins: [require("tw-elements/dist/plugin.cjs")],
}

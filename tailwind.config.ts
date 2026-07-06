import type { Config } from 'tailwindcss';
const config: Config = { content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'], theme: { extend: { colors: { cream: '#FFF7E6', mint: '#8EF6D0', pink: '#FF80BF', yellow: '#FFD84D', orange: '#FF9F1C', blue: '#5B8CFF', ink: '#000000' }, boxShadow: { brutal: '5px 5px 0px #000000', brutalSm: '3px 3px 0px #000000' } } }, plugins: [] };
export default config;

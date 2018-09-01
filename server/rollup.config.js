import babel from 'rollup-plugin-babel'

export default {
    input: "frontend/index.js",
    plugins: [
        babel({
            "presets": [
                [
                    "env",
                    {
                        "modules": false
                    }
                ]
            ],
            "babelrc": false,
        })
    ],
    output: [
    {
        name: "web-threads",
        format: "cjs",
        file: "public/index.js",
    },
    ]
}

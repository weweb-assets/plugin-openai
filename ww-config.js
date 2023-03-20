export default {
    editor: {
        settings: [
            {
                label: 'Configuration',
                icon: 'advanced',
                edit: () => import('./src/components/Configuration/SettingsEdit.vue'),
                summary: () => import('./src/components/Configuration/SettingsSummary.vue'),
                getIsValid(settings) {
                    return !!settings.privateData.apiKey;
                },
            },
        ],
    },
    actions: [
        {
            name: 'Create completion',
            code: 'createCompletion',
            parameters: [
                { name: 'model', type: 'string' },
                { name: 'prompt', type: 'array' },
                { name: 'suffix', type: 'string' },
                { name: 'max_tokens', type: 'number' },
                { name: 'temperature', type: 'number' },
                { name: 'top_p', type: 'number' },
                { name: 'n', type: 'number' },
                { name: 'stream', type: 'boolean' },
                { name: 'logprobs', type: 'number' },
                { name: 'echo', type: 'boolean' },
                { name: 'stop', type: 'array' },
                { name: 'presence_penalty', type: 'number' },
                { name: 'frequency_penalty', type: 'number' },
                { name: 'best_of', type: 'number' },
                { name: 'logit_bias', type: 'object' },
                { name: 'user', type: 'string' },
            ],
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/Test.vue'),
            /* wwEditor:end */
        },
        {
            name: 'Create chat completion',
            code: 'createChatCompletion',
            parameters: [
                { name: 'model', type: 'string' },
                { name: 'messages', type: 'array' },
                { name: 'temperature', type: 'number' },
                { name: 'top_p', type: 'number' },
                { name: 'n', type: 'number' },
                { name: 'stream', type: 'boolean' },
                { name: 'stop', type: 'array' },
                { name: 'max_tokens', type: 'number' },
                { name: 'presence_penalty', type: 'number' },
                { name: 'frequency_penalty', type: 'number' },
                { name: 'logit_bias', type: 'object' },
                { name: 'user', type: 'string' },
            ],
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/Test.vue'),
            /* wwEditor:end */
        },
        {
            name: 'Create edit',
            code: 'createEdit',
            parameters: [
                { name: 'model', type: 'string' },
                { name: 'input', type: 'string' },
                { name: 'instruction', type: 'string' },
                { name: 'n', type: 'integer' },
                { name: 'temperature', type: 'number' },
                { name: 'top_p', type: 'number' },
            ],
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/CreateEdit.vue'),
            /* wwEditor:end */
        },
        {
            name: 'Create image',
            code: 'createImage',
            parameters: [
                { name: 'prompt', type: 'string' },
                { name: 'n', type: 'number' },
                { name: 'size', type: 'string' },
            ],
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/CreateImage.vue'),
            /* wwEditor:end */
        },
        {
            name: 'Create image edit',
            code: 'createImageEdit',
            parameters: [],
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/Test.vue'),
            /* wwEditor:end */
        },
        {
            name: 'Create image variation',
            code: 'createImageVariation',
            parameters: [],
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/Test.vue'),
            /* wwEditor:end */
        },
        {
            name: 'Create embeddings',
            code: 'createEmbeddings',
            parameters: [],
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/Test.vue'),
            /* wwEditor:end */
        },
    ],
};

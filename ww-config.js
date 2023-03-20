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
            parameters: [],
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/Test.vue'),
            /* wwEditor:end */
        },
        {
            name: 'Create chat completion',
            code: 'createChatCompletion',
            parameters: [],
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/Test.vue'),
            /* wwEditor:end */
        },
        {
            name: 'Create edit',
            code: 'createEdit',
            parameters: [],
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/Test.vue'),
            /* wwEditor:end */
        },
        {
            name: 'Create image',
            code: 'createImage',
            parameters: [],
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/Test.vue'),
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

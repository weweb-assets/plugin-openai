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
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/Test.vue'),
            /* wwEditor:end */
        },
        {
            name: 'Create chat completion',
            code: 'createChatCompletion',
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/CreateChatCompletion.vue'),
            /* wwEditor:end */
        },
        {
            name: 'Create edit',
            code: 'createEdit',
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/CreateEdit.vue'),
            /* wwEditor:end */
        },
        {
            name: 'Create image',
            code: 'createImage',
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/CreateImage.vue'),
            /* wwEditor:end */
        },
        {
            name: 'Create image edit',
            code: 'createImageEdit',
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/Test.vue'),
            /* wwEditor:end */
        },
        {
            name: 'Create image variation',
            code: 'createImageVariation',
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/Test.vue'),
            /* wwEditor:end */
        },
        {
            name: 'Create embeddings',
            code: 'createEmbeddings',
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/Test.vue'),
            /* wwEditor:end */
        },
    ],
};

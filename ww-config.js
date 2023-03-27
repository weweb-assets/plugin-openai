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
            {
                label: 'Completion system prompt',
                icon: 'advanced',
                edit: () => import('./src/components/Completions/SettingsEdit.vue'),
                summary: () => import('./src/components/Completions/SettingsSummary.vue'),
                getIsValid(settings) {
                    return (settings.privateData.completionsPrompts || []).every(item => item.title && item.content);
                },
            },
            {
                label: 'Chat Completion system messages',
                icon: 'advanced',
                edit: () => import('./src/components/ChatCompletions/SettingsEdit.vue'),
                summary: () => import('./src/components/ChatCompletions/SettingsSummary.vue'),
                getIsValid(settings) {
                    return (settings.privateData.chatCompletionsMessages || []).every(
                        item => item.title && item.content
                    );
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
            edit: () => import('./src/components/Functions/CreateCompletion.vue'),
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
            name: 'Create image',
            code: 'createImage',
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/CreateImage.vue'),
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
    ],
};

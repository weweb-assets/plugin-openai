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
                label: 'Secured prompts',
                icon: 'auth',
                edit: () => import('./src/components/SecuredPrompts/SettingsEdit.vue'),
                summary: () => import('./src/components/SecuredPrompts/SettingsSummary.vue'),
                getIsValid(settings) {
                    return (settings.privateData.securedPrompts || []).every(item => item.title && item.content);
                },
            },
        ],
    },
    actions: [
        {
            name: 'Create chat completion',
            code: 'createChatCompletion',
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/CreateChatCompletion.vue'),
            getIsValid({ model, messages, securedPrompt }) {
                return !!model && (!!(messages || []).length || !!securedPrompt);
            },
            copilot: {
                description: 'Creates a chat completion using OpenAI\'s GPT models',
                returns: 'object',
                schema: {
                    model: {
                        type: 'string',
                        description: 'ID of the model to use',
                        bindable: true
                    },
                    messages: {
                        type: 'array',
                        description: 'Array of messages comprising the conversation',
                        bindable: true
                    },
                    temperature: {
                        type: 'number',
                        description: 'Sampling temperature between 0 and 2',
                        bindable: true
                    },
                    max_tokens: {
                        type: 'number',
                        description: 'Maximum number of tokens to generate',
                        bindable: true
                    },
                    stream: {
                        type: 'boolean',
                        description: 'Whether to stream back partial progress',
                        bindable: false
                    }
                }
            },
            /* wwEditor:end */
        },
        {
            name: 'Create image',
            code: 'createImage',
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/CreateImage.vue'),
            getIsValid({ prompt }) {
                return !!prompt;
            },
            copilot: {
                description: 'Creates an image using OpenAI\'s DALL-E models',
                returns: 'object',
                schema: {
                    prompt: {
                        type: 'string',
                        description: 'Text description of the desired image',
                        bindable: true
                    },
                    n: {
                        type: 'number',
                        description: 'Number of images to generate',
                        bindable: true
                    },
                    size: {
                        type: 'string',
                        description: 'Size of the generated images',
                        bindable: true
                    },
                    response_format: {
                        type: 'string',
                        description: 'Format of the generated images (url or b64_json)',
                        bindable: false
                    }
                }
            },
            /* wwEditor:end */
        },
        {
            name: 'Create completion (Legacy)',
            code: 'createCompletion',
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/CreateCompletion.vue'),
            getIsValid({ model, prompt, securedPrompt }) {
                return !!model && !!securedPrompt && (securedPrompt !== 'custom' || !!prompt);
            },
            copilot: {
                description: 'Creates a completion using OpenAI\'s legacy completion models',
                returns: 'object',
                schema: {
                    model: {
                        type: 'string',
                        description: 'ID of the model to use',
                        bindable: true
                    },
                    prompt: {
                        type: 'string',
                        description: 'The prompt to generate completions for',
                        bindable: true
                    },
                    max_tokens: {
                        type: 'number',
                        description: 'Maximum number of tokens to generate',
                        bindable: true
                    },
                    temperature: {
                        type: 'number',
                        description: 'Sampling temperature between 0 and 2',
                        bindable: true
                    },
                    stream: {
                        type: 'boolean',
                        description: 'Whether to stream back partial progress',
                        bindable: false
                    }
                }
            },
            /* wwEditor:end */
        },
    ],
};
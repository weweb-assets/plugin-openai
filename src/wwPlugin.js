/* wwEditor:start */
import './components/Configuration/SettingsEdit.vue';
import './components/Configuration/SettingsSummary.vue';
// import './components/Functions/CreateCompletion.vue';
import './components/Functions/CreateChatCompletion.vue';
import './components/Functions/CreateImage.vue';
import './components/Functions/CreateEdit.vue';
/* wwEditor:end */

import { Configuration, OpenAIApi } from 'openai';

export default {
    instance: null,
    models: null,
    /*=============================================m_ÔÔ_m=============================================\
        Plugin API
    \================================================================================================*/
    async onLoad(settings) {
        await this.load(settings.privateData.apiKey);
    },
    /*=============================================m_ÔÔ_m=============================================\
        OpenAI API
    \================================================================================================*/
    async load(apiKey) {
        if (!apiKey) return;
        const configuration = new Configuration({ apiKey });
        this.instance = new OpenAIApi(configuration);
        /* wwEditor:start */
        this.models = await this.fetchModels();
        /* wwEditor:end */
    },
    /* wwEditor:start */
    async fetchModels() {
        if (!this.instance) return [];
        const { data } = await this.instance.listModels();
        return data.data;
    },
    /* wwEditor:end */
    async createChatCompletion({
        model,
        messages,
        temperature,
        top_p,
        n,
        stream,
        stop,
        max_tokens,
        presence_penalty,
        frequency_penalty,
        logit_bias,
        user,
    }) {
        if (!this.instance) throw new Error('Invalid Supabase configuration.');
        return await openai.createChatCompletion({
            model,
            messages,
            messages,
            temperature,
            top_p,
            n,
            stream,
            stop,
            max_tokens,
            presence_penalty,
            frequency_penalty,
            logit_bias,
            user,
        });
    },
    async createCompletion({
        model,
        prompt,
        suffix,
        max_tokens,
        temperature,
        top_p,
        n,
        stream,
        logprobs,
        echo,
        stop,
        presence_penalty,
        frequency_penalty,
        best_of,
        logit_bias,
        user,
    }) {
        if (!this.instance) throw new Error('Invalid Supabase configuration.');
        return await openai.createCompletion({
            model,
            prompt,
            suffix,
            max_tokens,
            temperature,
            top_p,
            n,
            stream,
            logprobs,
            echo,
            stop,
            presence_penalty,
            frequency_penalty,
            best_of,
            logit_bias,
            user,
        });
    },
    async createEdit({ model, input, instruction, n, temperature, top_p }) {
        if (!this.instance) throw new Error('Invalid Supabase configuration.');
        return await this.instance.createEdit({ model, input, instruction, n, temperature, top_p });
    },
    async createImage({ prompt, n, size, response_format, user }) {
        if (!this.instance) throw new Error('Invalid Supabase configuration.');
        const { data } = await this.instance.createImage({ prompt, n, size, response_format, user });
        return data;
    },
};

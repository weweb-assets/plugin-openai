/* wwEditor:start */
import './components/Configuration/SettingsEdit.vue';
import './components/Configuration/SettingsSummary.vue';
import './components/Completions/SettingsEdit.vue';
import './components/Completions/SettingsSummary.vue';
import './components/ChatCompletions/SettingsEdit.vue';
import './components/ChatCompletions/SettingsSummary.vue';
import './components/Functions/CreateCompletion.vue';
import './components/Functions/CreateChatCompletion.vue';
import './components/Functions/CreateImage.vue';
import './components/Functions/CreateEdit.vue';
/* wwEditor:end */

export default {
    /*=============================================m_ÔÔ_m=============================================\
        OpenAI API
    \================================================================================================*/
    async createChatCompletion({
        model,
        messages,
        temperature,
        top_p,
        n,
        stop,
        max_tokens,
        presence_penalty,
        frequency_penalty,
        logit_bias,
        user,
        systemMessage,
    }) {
        const projectId = wwLib.wwWebsiteData.getInfo().id;
        logit_bias = (logit_bias || []).reduce((obj, item) => ({ ...obj, [item.key]: item.value }), {});
        if (!stop || !stop.length) stop = undefined;
        const data = {
            model,
            messages,
            messages,
            temperature,
            top_p,
            n,
            stop,
            max_tokens,
            presence_penalty,
            frequency_penalty,
            logit_bias,
            user,
            systemMessage,
        };
        try {
            let response = null;
            /* wwEditor:start */
            response = await wwAxios.post(
                `${wwLib.wwApiRequests._getPluginsUrl()}/designs/${projectId}/openai/chat/completions`,
                { data }
            );
            /* wwEditor:end */
            /* wwFront:start */
            response = await axios.post(
                `//${projectId}.${wwLib.wwApiRequests._getPreviewUrl()}/ww/openai/chat/completions`,
                { data }
            );
            /* wwFront:end */
            return response.data.data;
        } catch (err) {
            if (err.response && err.response.data) throw new Error(err.response.data);
            else throw err;
        }
    },
    async createCompletion({
        model,
        prompt,
        suffix,
        max_tokens,
        temperature,
        top_p,
        n,
        logprobs,
        echo,
        stop,
        presence_penalty,
        frequency_penalty,
        best_of,
        logit_bias,
        user,
        promptType,
        systemPrompt,
        systemPromptVariables,
    }) {
        const projectId = wwLib.wwWebsiteData.getInfo().id;
        logit_bias = (logit_bias || []).reduce((obj, item) => ({ ...obj, [item.key]: item.value }), {});
        if (!stop || !stop.length) stop = undefined;
        const data = {
            model,
            prompt,
            suffix,
            max_tokens,
            temperature,
            top_p,
            n,
            logprobs,
            echo,
            stop,
            presence_penalty,
            frequency_penalty,
            best_of,
            logit_bias,
            user,
            promptType,
            systemPrompt,
            systemPromptVariables,
        };
        try {
            let response = null;
            /* wwEditor:start */
            response = await wwAxios.post(
                `${wwLib.wwApiRequests._getPluginsUrl()}/designs/${projectId}/openai/completions`,
                { data }
            );
            /* wwEditor:end */
            /* wwFront:start */
            response = await axios.post(
                `//${projectId}.${wwLib.wwApiRequests._getPreviewUrl()}/ww/openai/completions`,
                {
                    data,
                }
            );
            /* wwFront:end */
            return response.data.data;
        } catch (err) {
            if (err.response && err.response.data) throw new Error(err.response.data);
            else throw err;
        }
    },
    async createEdit({ model, input, instruction, n, temperature, top_p }) {
        const projectId = wwLib.wwWebsiteData.getInfo().id;
        const data = { model, input, instruction, n, temperature, top_p };
        try {
            let response = null;
            /* wwEditor:start */
            response = await wwAxios.post(`${wwLib.wwApiRequests._getPluginsUrl()}/designs/${projectId}/openai/edits`, {
                data,
            });
            /* wwEditor:end */
            /* wwFront:start */
            response = await axios.post(`//${projectId}.${wwLib.wwApiRequests._getPreviewUrl()}/ww/openai/edits`, {
                data,
            });
            /* wwFront:end */
            return response.data.data;
        } catch (err) {
            if (err.response && err.response.data) throw new Error(err.response.data);
            else throw err;
        }
    },
    async createImage({ prompt, n, size = '1024x1024', response_format = 'url', user }) {
        const projectId = wwLib.wwWebsiteData.getInfo().id;
        if (!size) size = '1024x1024';
        if (!response_format) response_format = 'url';
        const data = { prompt, n, size, response_format, user };
        try {
            let response = null;
            /* wwEditor:start */
            response = await wwAxios.post(
                `${wwLib.wwApiRequests._getPluginsUrl()}/designs/${projectId}/openai/images/generations`,
                { data }
            );
            /* wwEditor:end */
            /* wwFront:start */
            response = await axios.post(
                `//${projectId}.${wwLib.wwApiRequests._getPreviewUrl()}/ww/openai/images/generations`,
                { data }
            );
            /* wwFront:end */
            return response.data.data;
        } catch (err) {
            if (err.response && err.response.data) throw new Error(err.response.data);
            else throw err;
        }
    },
};

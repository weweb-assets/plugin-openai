/* wwEditor:start */
import './components/Configuration/SettingsEdit.vue';
import './components/Configuration/SettingsSummary.vue';
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
    }) {
        const projectId = wwLib.wwWebsiteData.getInfo().id;
        logit_bias = logit_bias.reduce((obj, item) => ({ ...obj, [item.key]: item.value }), {});
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
        };
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
    }) {
        const projectId = wwLib.wwWebsiteData.getInfo().id;
        logit_bias = logit_bias.reduce((obj, item) => ({ ...obj, [item.key]: item.value }), {});
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
        };
        let response = null;
        /* wwEditor:start */
        response = await wwAxios.post(
            `${wwLib.wwApiRequests._getPluginsUrl()}/designs/${projectId}/openai/completions`,
            { data }
        );
        /* wwEditor:end */
        /* wwFront:start */
        response = await axios.post(`//${projectId}.${wwLib.wwApiRequests._getPreviewUrl()}/ww/openai/completions`, {
            data,
        });
        /* wwFront:end */
        return response.data.data;
    },
    async createEdit({ model, input = '', instruction, n = 1, temperature = 1, top_p = 1 }) {
        const projectId = wwLib.wwWebsiteData.getInfo().id;
        const data = { model, input, instruction, n, temperature, top_p };
        let response = null;
        /* wwEditor:start */
        response = await wwAxios.post(`${wwLib.wwApiRequests._getPluginsUrl()}/designs/${projectId}/openai/edits`, {
            data,
        });
        /* wwEditor:end */
        /* wwFront:start */
        response = await axios.post(`//${projectId}.${wwLib.wwApiRequests._getPreviewUrl()}/ww/openai/edits`, { data });
        /* wwFront:end */
        return response.data.data;
    },
    async createImage({ prompt, n = 1, size = '1024x1024', response_format = 'url', user }) {
        const projectId = wwLib.wwWebsiteData.getInfo().id;
        const data = { prompt, n, size, response_format, user };
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
    },
};

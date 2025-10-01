/* wwEditor:start */
import './components/Configuration/SettingsEdit.vue';
import './components/Configuration/SettingsSummary.vue';
import './components/SecuredPrompts/SettingsEdit.vue';
import './components/SecuredPrompts/SettingsSummary.vue';
import './components/Functions/CreateCompletion.vue';
import './components/Functions/CreateChatCompletion.vue';
import './components/Functions/CreateImage.vue';
// import './components/Functions/CreateEdit.vue';
/* wwEditor:end */

export default {
    /*=============================================m_ÔÔ_m=============================================\
        OpenAI API
    \================================================================================================*/
    /* wwEditor:start */
    async getModels() {
        try {
            const { data } = await axios.get(`https://api.openai.com/v1/models`, { 
                headers: { Authorization: `Bearer ${this.settings.privateData.apiKey}` } 
            });
            return data.data;
        } catch (err) {
            if (err.response && err.response.data) throw new Error(err.response.data);
            else throw err;
        }
    },
    /* wwEditor:end */
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
        securedPrompt,
        securedPromptVariables,
        stream,
        streamVariableId,
    }) {
        const projectId = wwLib.wwWebsiteData.getInfo().id;
        logit_bias = (logit_bias || []).reduce((obj, item) => ({ ...obj, [item.key]: item.value }), {});
        if (!stop || !stop.length) stop = undefined;
        if (stream) wwLib.wwVariable.updateValue(streamVariableId, [], { silent: true });
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
            securedPrompt,
            securedPromptVariables,
            stream,
        };
        try {
            let response = null;
            /* wwEditor:start */
            response = await fetch(
                `${wwLib.wwApiRequests._getPluginsUrl()}/designs/${projectId}/openai/chat/completions`,
                {
                    method: 'POST',
                    body: JSON.stringify({ data }),
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                }
            );
            /* wwEditor:end */
            /* wwFront:start */
            response = await fetch(
                `//${projectId}.${wwLib.wwApiRequests._getPreviewUrl()}/ww/openai/chat/completions`,
                { method: 'POST', body: JSON.stringify({ data }), headers: { 'Content-Type': 'application/json' } }
            );
            /* wwFront:end */
            if (!response.ok) throw new Error((await response.json()).message);
            return await handleStreamResponse(response, stream, streamVariableId);
        } catch (err) {
            if (err.response?.data) throw new Error(err.response.data);
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
        securedPrompt,
        securedPromptVariables,
        stream,
        streamVariableId,
    }) {
        const projectId = wwLib.wwWebsiteData.getInfo().id;
        logit_bias = (logit_bias || []).reduce((obj, item) => ({ ...obj, [item.key]: item.value }), {});
        if (!stop || !stop.length) stop = undefined;
        if (stream) wwLib.wwVariable.updateValue(streamVariableId, [], { silent: true });
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
            securedPrompt,
            securedPromptVariables,
        };
        try {
            let response = null;
            /* wwEditor:start */
            response = await fetch(`${wwLib.wwApiRequests._getPluginsUrl()}/designs/${projectId}/openai/completions`, {
                method: 'POST',
                body: JSON.stringify({ data }),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            /* wwEditor:end */
            /* wwFront:start */
            response = await fetch(`//${projectId}.${wwLib.wwApiRequests._getPreviewUrl()}/ww/openai/completions`, {
                method: 'POST',
                body: JSON.stringify({ data }),
                headers: { 'Content-Type': 'application/json' },
            });
            /* wwFront:end */
            if (!response.ok) throw new Error((await response.json()).message);
            return await handleStreamResponse(response, stream, streamVariableId);
        } catch (err) {
            if (err.response?.data) throw new Error(err.response.data);
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

async function handleStreamResponse(response, stream, streamVariableId) {
    let finalResult = {};
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let result = await reader.read();
    let text = '';
    while (!result.done) {
        text += decoder.decode(result.value);
        const lines = text.split('data: ').filter(line => line.trim() !== '');
        for (const message of lines) {
            if (message === '[DONE]') break;
            try {
                const parsed = JSON.parse(message);
                text = '';
                finalResult.id = parsed.id;
                finalResult.object = parsed.object;
                finalResult.created = parsed.created;
                finalResult.model = parsed.model;
                if (!finalResult.choices) finalResult.choices = [];
                for (const index in parsed.choices) {
                    if (parsed.choices[index].delta) {
                        parsed.choices[index].message = parsed.choices[index].delta;
                        delete parsed.choices[index].delta;
                    }
                    if (!finalResult.choices[parsed.choices[index].index])
                        finalResult.choices.push(parsed.choices[index]);
                    else if (parsed.choices[index].text) {
                        finalResult.choices[parsed.choices[index].index].text += parsed.choices[index].text;
                    } else if (parsed.choices[index].message) {
                        finalResult.choices[parsed.choices[index].index].message.content +=
                            parsed.choices[index].message.content || '';
                    }

                    finalResult.choices[parsed.choices[index].index].finish_reason =
                        parsed.choices[index].finish_reason;
                    finalResult.choices[parsed.choices[index].index].logprobs = parsed.choices[index].logprobs;

                    if (stream && streamVariableId) {
                        wwLib.wwVariable.updateValue(
                            streamVariableId,
                            finalResult.choices.map(choice => choice.text || choice.message?.content || ''),
                            { silent: true }
                        );
                    }
                }
            } catch {
                // If JSON.parse fails concact text result
                continue;
            }
        }
        result = await reader.read();
    }

    // After the stream completes, push one final non-silent update (if streaming was enabled)
    if (stream && streamVariableId && finalResult?.choices) {
        wwLib.wwVariable.updateValue(
            streamVariableId,
            finalResult.choices.map(choice => choice.text || choice.message?.content || '')
        );
    }

    return finalResult;
}

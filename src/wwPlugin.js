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
    }, wwUtils) {
        /* wwEditor:start */
        if (wwLib.editor?.isolatedCanvas) {
            if (stream) wwLib.wwVariable.updateValue(streamVariableId, [], { silent: true });
            return handleStreamResponse(await wwUtils.runPreviewAction(), stream, streamVariableId);
        }
        /* wwEditor:end */
        const projectId = wwLib.wwWebsiteData.getInfo().id;
        logit_bias = (logit_bias || []).reduce((obj, item) => ({ ...obj, [item.key]: item.value }), {});
        if (!stop || !stop.length) stop = undefined;
        if (stream) wwLib.wwVariable.updateValue(streamVariableId, [], { silent: true });
        const data = {
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
            response = await fetch(`${window.location.origin}/ww/openai/chat/completions`, {
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
    }, wwUtils) {
        /* wwEditor:start */
        if (wwLib.editor?.isolatedCanvas) {
            if (stream) wwLib.wwVariable.updateValue(streamVariableId, [], { silent: true });
            return handleStreamResponse(await wwUtils.runPreviewAction(), stream, streamVariableId);
        }
        /* wwEditor:end */
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
            response = await fetch(`${window.location.origin}/ww/openai/completions`, {
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
        /* wwEditor:start */
        if (wwLib.editor?.isolatedCanvas) throw Error('This action is unavailable in isolated preview.');
        /* wwEditor:end */
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
            response = await axios.post(`${window.location.origin}/ww/openai/edits`, {
                data,
            });
            /* wwFront:end */
            return response.data.data;
        } catch (err) {
            if (err.response && err.response.data) throw new Error(err.response.data);
            else throw err;
        }
    },
    async createImage({ prompt, n, size = '1024x1024', response_format = 'url', user }, wwUtils) {
        /* wwEditor:start */
        if (wwLib.editor?.isolatedCanvas) return wwUtils.runPreviewAction();
        /* wwEditor:end */
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
            response = await axios.post(`${window.location.origin}/ww/openai/images/generations`, {
                data,
            });
            /* wwFront:end */
            return response.data.data;
        } catch (err) {
            if (err.response && err.response.data) throw new Error(err.response.data);
            else throw err;
        }
    },
};

async function handleStreamResponse(response, stream, streamVariableId) {
    const finalResult = {};
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let pending = '';
    let complete = false;
    function accept(line) {
        if (!line.startsWith('data:')) return;
        const value = line.slice(5).trim();
        if (value === '[DONE]') {
            complete = true;
            return;
        }
        const { id, object, created, model, choices } = JSON.parse(value);
        Object.assign(finalResult, { id, object, created, model });
        finalResult.choices ||= [];
        for (const choice of choices || []) {
            if (!Number.isInteger(choice.index) || choice.index < 0 || choice.index >= 128) throw Error('Invalid completion choice');
            const previous = finalResult.choices[choice.index];
            if (choice.delta) {
                choice.message = choice.delta;
                delete choice.delta;
            }
            if (!previous) finalResult.choices[choice.index] = choice;
            else {
                if (choice.text) previous.text = (previous.text || '') + choice.text;
                if (choice.message) {
                    previous.message ||= {};
                    previous.message.content = (previous.message.content || '') + (choice.message.content || '');
                }
                previous.finish_reason = choice.finish_reason;
                previous.logprobs = choice.logprobs;
            }
        }
        if (stream && streamVariableId) wwLib.wwVariable.updateValue(streamVariableId, values(), { silent: true });
    }
    function values() {
        return finalResult.choices.map(choice => choice.text || choice.message?.content || '');
    }
    try {
        while (!complete) {
            const { done, value } = await reader.read();
            pending += decoder.decode(value, { stream: !done });
            const lines = pending.split('\n');
            pending = lines.pop();
            for (const line of lines) {
                accept(line);
                if (complete) break;
            }
            if (done) {
                if (pending && !complete) accept(pending);
                break;
            }
        }
    } finally {
        try {
            await reader.cancel();
        } finally {
            reader.releaseLock();
        }
    }
    if (stream && streamVariableId && finalResult.choices) wwLib.wwVariable.updateValue(streamVariableId, values());
    return finalResult;
}

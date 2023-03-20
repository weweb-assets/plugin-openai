/* wwEditor:start */
import './components/Configuration/SettingsEdit.vue';
import './components/Configuration/SettingsSummary.vue';
import './components/Functions/CreateImage.vue';
import './components/Functions/Test.vue';
/* wwEditor:end */

import { Configuration, OpenAIApi } from 'openai';

export default {
    instance: null,
    /*=============================================m_ÔÔ_m=============================================\
        Plugin API
    \================================================================================================*/
    onLoad(settings) {
        this.load(settings.privateData.apiKey);
    },
    /*=============================================m_ÔÔ_m=============================================\
        OpenAI API
    \================================================================================================*/
    load(apiKey) {
        if (!apiKey) return;
        const configuration = new Configuration({ apiKey });
        this.instance = new OpenAIApi(configuration);
    },
    async createImage({ prompt, n = 1, size = '1024x1024' }) {
        if (!this.instance) throw new Error('Invalid Supabase configuration.');
        const { data } = await this.instance.createImage({ prompt, n, size });
        return data;
    },
};

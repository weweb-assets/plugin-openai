/* wwEditor:start */
import './components/Configuration/SettingsEdit.vue';
import './components/Configuration/SettingsSummary.vue';
import './components/Functions/Test.vue';
/* wwEditor:end */

import { Configuration } from 'openai';

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
};

/***
 * Created by Simple on 2018/1/14 0014.
 * 收费员端接口模块
 */

import axios from './interceptor';
import mergedApis from './apis';

/* // const TEST_API = 'http://192.168.0.220';
const TEST_API = '/api';
// const TEST_API = 'http://1g9z518835.iok.la';
const PRODUCTION_API = 'https://api.pandaparking.cn';
const hasProduction = process.env.NODE_ENV === 'production';
const base = hasProduction ? PRODUCTION_API : TEST_API; */
const http = ({
    url = '/', // DEFAULT_URL
    method = 'get', // DEFAULT_METHOD
    ...rest // REST_CONFIGS { data, headers, ... }  [OPTIONAL]
}) => axios({
    // url: `${base}${url}`,
    url: `${url}`,
    method,
    ...rest
});

export default (() => {
    return Object
        .keys(mergedApis)
        .reduce((acc, apiKey) => {
            return {
                ...acc,
                [apiKey]: data => http(mergedApis[apiKey](data))
            };
        }, {});
})();
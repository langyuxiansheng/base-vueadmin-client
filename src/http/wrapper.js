/***
 * Created by Simple on 2018/1/14 0014.
 */

import axios from './interceptor';
import mergedApis from './apis';

const http = ({
    url = '/', // DEFAULT_URL
    method = 'get', // DEFAULT_METHOD
    ...rest // REST_CONFIGS { data, headers, ... }  [OPTIONAL]
}) => axios({
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

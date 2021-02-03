/**
 * Hot to extend external modules declared
 * https://github.com/microsoft/TypeScript/issues/10859#issuecomment-246496707
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as axios from 'axios';
declare module 'axios' {
  interface AxiosRequestConfig {
    withToken?: boolean;
  }
}

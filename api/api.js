import { baseUrl } from '@/api/config';
import { ENV } from '@/utils/index';
let uploadFileUrl = baseUrl + 'api/zuul/user/file/uploadFile'
if (ENV === 'test') {
	uploadFileUrl = uploadFileUrl.replace('api/', '');
}
export {
	uploadFileUrl
}
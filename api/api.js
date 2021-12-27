import { baseUrl } from '@/api/config';
let uploadFileUrl = baseUrl + 'api/zuul/user/file/uploadFile'
uploadFileUrl = uploadFileUrl.replace('api/', '');
export {
	uploadFileUrl
}
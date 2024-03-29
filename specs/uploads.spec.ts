import baseConfig from '../config/base.config';
import adminController from '../controller/admin.controller';
import controller from '../controller/fileUpload.controller';

describe('Upload File Tests', () => {
    let token;
    beforeAll(async () => {
        const data = { "email": baseConfig.email, "password": baseConfig.password };
        const res = await adminController.postAdminLogin(data);
        token = res.body.token;
        console.log('Auth token is ' + token);
    });

        it('POST /upload/single', async () => {
            const res = await controller
                .postUploadSingle('data/zoro.jpg')
                .set("Authorization", "Bearer " + token);
            console.log(JSON.stringify(res, null, 2));
            expect(res.statusCode).toBe(200);
          
        });

        it('POST /upload/multiple', async () => {
            const res = await controller
                .postUploadMultiple(['data/zoro.jpg','data/luffy.jpeg'])
                .set("Authorization", "Bearer " + token);
            console.log(JSON.stringify(res, null, 2));
            expect(res.statusCode).toBe(200);
          
        });
    });
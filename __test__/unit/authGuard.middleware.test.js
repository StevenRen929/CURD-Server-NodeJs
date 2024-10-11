const authGuardMiddleware = require('../../src/middleware/authGuard.middleware');
const {validateToken} = require('../../src/common/utils/jwt')
//通过这行让导入的函数变成jest。fn（）

// 这行代码使用 Jest 的 mock 功能，模拟 jwt 模块的所有导出，
// 使其成为可控的假对象。在测试中可以用来监控 validateToken 的调用。
//所有从../../src/common/utils/jwt 路径上导入的都可以被当作jest。fn（）使用
jest.mock('../../src/common/utils/jwt');

describe("authentication guard middlewalre", ()=>{

beforeEach(()=>{
    validateToken.mockReset();
})

    //test1
    it('should return 401 if authorization header is not defined',()=>{
        //setup
        const req = {
            header:jest.fn(),
        };
        const res = {
            formatResponse:  jest.fn(),
        };
        //const next = {};
        //jest.fn（） used to simulate function
        const next = jest.fn();

        //execute
        //no return value from authguardmiddleware function
        authGuardMiddleware(req,res,next)

        //compare
        expect(res.formatResponse).toHaveBeenCalledWith(
            'Missing authorization token',
            401
        )
        //toHaveBeenCalled()
    });
    it('should call next function if token is valid',()=>{
        //setup

        const token = 'any token';
        const req = {
            header:jest.fn(),
        };
        const res = {
            formatResponse:  jest.fn(),
        };
        //const next = {};
        //jest.fn（） used to simulate function
        const next = jest.fn();
        req.header.mockReturnValue(`Bearer ${token}`);
        validateToken.mockImplementation((token)=>{
            return {token};
        })


        //execute
        //no return value from authguardmiddleware function
        authGuardMiddleware(req,res,next);

        //compare
        //expect(req.user).toEqual({token});
    
        expect(next).toHaveBeenCalled();
        //toHaveBeenCalled()
        //expect(validateToken).toHaveBeenCalledWith(token);
    })

})




//test next, because the test2 and test3 will be reversed of test4




// function fn(){
//default will return undefined
//     return undefined
// }
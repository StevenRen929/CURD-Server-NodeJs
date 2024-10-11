
function sum(a,b){
    return a+b;
}

//h1
describe("sum",()=>{
    //test case it can be replace by  // test()
    it("should return correrct sum of two number",()=>{
        //setup(mock,initialize variables) 

        //execute
        const result = sum(1,2);

        //compare
        //expect (actual result) matching (expected result)
        expect(result).toBe(3);
    })

    //h2
 //describe("xxx",()=>{})
   

})
/**
 * Created by Toomy on 14.03.2015.
 */
describe('Test suite', function () {
    it('should run a test of test', function () {
        console.log('test 1');
        expect(1).toBeTruthy();
    });

    it('should run a test of test', function () {
        console.log('test 2');
        expect(2).not.toBe(1);
    });


});

describe('TestModule tests', function () {
    it('should find TestModule', function () {
        //new TestModule(1).print();
    });
});

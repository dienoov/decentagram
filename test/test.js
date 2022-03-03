const Decentagram = artifacts.require('./Decentagram.sol');

require('chai')
    .use(require('chai-as-promised'))
    .should();

contract('Decentagram', ([deployer, author, tipper]) => {
    let decentagram;

    before(async () => {
        decentagram = await Decentagram.deployed();
    });

    describe('deployment', async () => {
        it('should be deployed', async () => {
            const address = await decentagram.address;
            assert.notEqual(address, 0x0);
            assert.notEqual(address, '');
            assert.notEqual(address, null);
            assert.notEqual(address, undefined);
        });

        it('should have a name', async () => {
            const name = await decentagram.name();
            assert.equal(name, 'Decentagram');
        });
    });
});
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

    describe('images', async () => {
        let result;
        let imageCount;
        const hash = 'abc123';

        before(async () => {
            result = await decentagram.uploadImage(hash, 'Image Description', {from: author});
            imageCount = await decentagram.imageCount();
        });

        it('should create images', async () => {
            assert.equal(imageCount, 1);
            const event = result.logs[0].args;
            assert.equal(event.id.toNumber(), imageCount.toNumber(), 'id is correct');
            assert.equal(event.hash, hash, 'hash is correct');
            assert.equal(event.description, 'Image Description', 'description is correct');
            assert.equal(event.tipAmount, '0', 'tip amount is correct');
            assert.equal(event.author, author, 'author is correct');

            await decentagram.uploadImage('', 'Image Description', {from: author}).should.be.rejected;
            await decentagram.uploadImage('Image hash', '', {from: author}).should.be.rejected;
        });

        it('should list images', async () => {
            const image = await decentagram.images(imageCount);
            assert.equal(image.id.toNumber(), imageCount.toNumber(), 'id is correct');
            assert.equal(image.hash, hash, 'hash is correct');
            assert.equal(image.description, 'Image Description', 'description is correct');
            assert.equal(image.tipAmount, '0', 'tip amount is correct');
            assert.equal(image.author, author, 'author is correct');
        });

        it('should allow users to tip images', async () => {
            let oldAuthorBalance;
            oldAuthorBalance = await web3.eth.getBalance(author);
            oldAuthorBalance = new web3.utils.BN(oldAuthorBalance);

            result = await decentagram.tipImageOwner(imageCount, {
                from: tipper,
                value: web3.utils.toWei('1', 'ether'),
            });

            const event = result.logs[0].args;
            assert.equal(event.id.toNumber(), imageCount.toNumber(), 'id is correct');
            assert.equal(event.hash, hash, 'hash is correct');
            assert.equal(event.description, 'Image Description', 'description is correct');
            assert.equal(event.tipAmount, '1000000000000000000', 'tip amount is correct');
            assert.equal(event.author, author, 'author is correct');

            let newAuthorBalance;
            newAuthorBalance = await web3.eth.getBalance(author);
            newAuthorBalance = new web3.utils.BN(newAuthorBalance);

            let tipImageOwner;
            tipImageOwner = web3.utils.toWei('1', 'ether');
            tipImageOwner = new web3.utils.BN(tipImageOwner);

            const expectedBalance = oldAuthorBalance.add(tipImageOwner);

            assert.equal(newAuthorBalance.toString(), expectedBalance.toString());

            await decentagram.tipImageOwner(99, {
                from: tipper,
                value: web3.utils.toWei('1', 'ether'),
            }).should.be.rejected;
        });
    });
});
const{expect} = require('chai');
const { ethers } = require('hardhat');


describe('SampleContract',()=>{

    let Token,token,founder,buyer_1,buyer_2;

    beforeEach(async()=>{
        Token = await ethers.getContractFactory('Token');
        token = await Token.deploy();
        [founder, buyer_1,buyer_2,_] = await ethers.getSigners();
    });

    describe('Deployment', () => {
        it('should set the right owner/founder of the token', async()=>{
            expect(await token.founder()).to.equal(founder.address);    
        });
        it('should assign the total supply of tokens to the founder', async() =>{
            const founderBalance = await token.balanceOf(founder.address);
            expect(await token.totalSupply()).to.equal(founderBalance);
        });
    });

    describe('Transactions',() => {

        it('should transfer tokens between buyers account', async() =>{
            await token.transfer(buyer_1.address,100);
            const buyer_1_Balance = await token.balanceOf(buyer_1.address);
            expect(buyer_1_Balance).to.equal(100);
            
            await token.connect(buyer_1).transfer(buyer_2.address, 50);
            const buyer_2_Balance = await token.balanceOf(buyer_2.address);
            expect(buyer_2_Balance).to.equal(50);
        });

        it('should fail incase sender does not have enough tokens', async() =>{
            const initial_Founder_Balance = await token.balanceOf(founder.address);
            await expect(token.connect(buyer_1).transfer(founder.address,1)
            ).to.be.revertedWith('Not Enough Tokens');

            expect(await token.balanceOf(founder.address)).to.equal(initial_Founder_Balance);
        
        });

        it('should update balances after each transfer', async() =>{
            const initial_Founder_Balance = await token.balanceOf(founder.address);

            await token.transfer(buyer_1.address, 100);
            await token.transfer(buyer_2.address, 50);

            const updated_Founder_Balance = await token.balanceOf(founder.address);
            expect(updated_Founder_Balance).to.equal(initial_Founder_Balance-150);

            const buyer_1_Balance = await token.balanceOf(buyer_1.address);
            expect(buyer_1_Balance).to.equal(100);

            const buyer_2_Balance = await token.balanceOf(buyer_2.address);
            expect(buyer_2_Balance).to.equal(50);    
        });
    });
});

var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
var Verifier = artifacts.require('Verifier');

var proof = {
	"proof":
	{
		"A":["0x019f91f82b2048836c49ce1549ca41494124c2443bca8f72d3e6218757d51f74", "0x008a09f2edaed9d756f3792935b091d14765a42e277c941f658fe7147d6fa448"],
		"A_p":["0x161ba923d545961ce977961ed105d6e20909716ff1ee58fe53d87747cbcdb314", "0x117ac2e410851017186236d45a06242220890b513247a9af65ce7f1995906887"],
		"B":
			[["0x2a1d0ace73d286d1cf9328dedd26dc0eca0ca6219f7a057ccdf507919736b050", "0x004dec1b397218d2da48f6162437427e3f707080738cdc61b88395931dd2c270"], ["0x201f9e9af3bdc899906ff242ac5df99dea600ff2c8403103461fe9ff02be7487", "0x1271fc911e6a40e9fe408c7a41b1642e6ed65e0325448bc21ebc0506cb31b30e"]],
		
		"B_p":["0x18afaea602c3cdf6b916eaae527008c5e8e3c232bce70293ee941992ea1e95ec", "0x306310471893bbc38b782fb61fb03d8dee6954c2295588b20d1dabf2d4bbcf17"],
		"C":["0x0b58e00062a31354d50bfc23c65c9f2280622fa68a5350d19d760373b3e4fea9", "0x16c4e9c2463a3ba17777688271c8b4df82f1aea3f8414161b192238779d011b0"],
		"C_p":["0x189166f4898e5626c709bfa815f0201948324100ffaf2c601e5dee761c178c96", "0x30350d73412af4fd470cabfd49bf755ad724ec6aa7865150ff4354ed19f7ff23"],
		"H":["0x18a6122d5981790fee60f946ec3989468d16a24253a55689847454eb63b96f13", "0x277a4bbcf0a2a23385751da44c0a71b8d988288fabd173ba78bf0ec0606ba6f5"],
		"K":["0x0a14f10989ab2afc2684a624e69e8879d6906dc5d9f6d894a11bd1591c88e769", "0x094911f56131a78db95250038ea4540a8b2c5eed3e28ca61c731c130b0ba62a3"]
	},
	"input":[0000000000000000000000000000000000000000000000000000000000000004,0000000000000000000000000000000000000000000000000000000000000001]
};

contract('SolnSquareVerifier', accounts => {
	//read first account
    const account = accounts[0];
    const account2 = accounts[1];
    //read from proof json
    const A = proof["proof"]["A"];
    const A_p = proof["proof"]["A_p"];
    const B = proof["proof"]["B"];
    const B_p = proof["proof"]["B_p"];
    const C = proof["proof"]["C"];
    const C_p = proof["proof"]["C_p"];
    const H = proof["proof"]["H"];
    const K = proof["proof"]["K"];
    const correctProofInput = proof["input"];

    describe('Testing SolnSquareVerifier', function () {
        beforeEach(async function () {
        	const verifier = await Verifier.new({from: account});
            this.contract = await SolnSquareVerifier.new(verifier.address, {from: account});
        });
        // Test if an ERC721 token can be minted for contract and a new solution can be added for contract - SolnSquareVerifier
        it('Test if an ERC721 token can be minted for contract a new solution can be added for contract - SolnSquareVerifier', async function () {
            let canBeMinted = await this.contract.mintNewNFT(account2, 2, A, A_p, B, B_p, C, C_p, H, K, correctProofInput, {from: account});
            let owner = await this.contract.ownerOf(2);
            assert.equal(account2, owner, "Token was not minted.");
        });
        // Test if an already existing solution can not be added for contract - SolnSquareVerifier
        it('// Test if an already existing solution can not be added for contract - SolnSquareVerifier', async function () {
            //calling with the same proof
            let isAlreadyAdded = false;
            try{
                await this.contract.addSolution(account2, 2, A, A_p, B, B_p, C, C_p, H, K, correctProofInput);
                await this.contract.addSolution(account2, 3, A, A_p, B, B_p, C, C_p, H, K, correctProofInput); 
            } catch(e) {
                isAlreadyAdded = true;
            }
            assert.equal(isAlreadyAdded, true, "Solution was added");
        });
    });

})

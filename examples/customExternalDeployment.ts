import {
  bytesToHex,
  decodeFunctionResult,
  encodeFunctionData,
  hexToBytes,
} from "viem";
import {
  Faucet,
  HttpTransport,
  LocalECDSAKeySigner,
  PublicClient,
  convertEthToWei,
  externalDeploymentMessage,
  generateRandomPrivateKey,
  waitTillCompleted,
} from "../src";
import type { Abi } from "abitype";
import { ExternalMessageEnvelope } from "@nilfoundation/niljs";

const client = new PublicClient({
  transport: new HttpTransport({
    endpoint: "http://127.0.0.1:8529",
  }),
  shardId: 1,
});

const signer = new LocalECDSAKeySigner({
  privateKey: generateRandomPrivateKey(),
});

const pubkey = await signer.getPublicKey();

const faucet = new Faucet(client);

const chainId = await client.chainId();

const deploymentMessageRetailer = externalDeploymentMessage(
  {
    salt: BigInt(Math.floor(Math.random() * 10000)),
    shard: 1,
    bytecode:
      "0x6080604052348015600e575f80fd5b506108188061001c5f395ff3fe60806040526004361061002c575f3560e01c806320367b3f14610037578063796d7f561461005f57610033565b3661003357005b5f80fd5b348015610042575f80fd5b5061005d600480360381019061005891906102fd565b61009b565b005b34801561006a575f80fd5b50610085600480360381019061008091906104c5565b610169565b6040516100929190610539565b60405180910390f35b6101633333620186a05f620f424087876040516024016100bc92919061058e565b6040516020818303038152906040527f02ec06be000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050508973ffffffffffffffffffffffffffffffffffffffff16610174909695949392919063ffffffff16565b50505050565b5f6001905092915050565b5f6060610187898989898989878a610195565b915050979650505050505050565b5f8060fd73ffffffffffffffffffffffffffffffffffffffff16632495aa6d86888d8d8d8d8b8b6040518963ffffffff1660e01b81526004016101de9796959493929190610712565b60206040518083038185885af11580156101fa573d5f803e3d5ffd5b50505050506040513d601f19601f8201168201806040525081019061021f91906107b7565b90508091505098975050505050505050565b5f604051905090565b5f80fd5b5f80fd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f61026b82610242565b9050919050565b61027b81610261565b8114610285575f80fd5b50565b5f8135905061029681610272565b92915050565b5f80fd5b5f80fd5b5f80fd5b5f8083601f8401126102bd576102bc61029c565b5b8235905067ffffffffffffffff8111156102da576102d96102a0565b5b6020830191508360018202830111156102f6576102f56102a4565b5b9250929050565b5f805f604084860312156103145761031361023a565b5b5f61032186828701610288565b935050602084013567ffffffffffffffff8111156103425761034161023e565b5b61034e868287016102a8565b92509250509250925092565b5f819050919050565b61036c8161035a565b8114610376575f80fd5b50565b5f8135905061038781610363565b92915050565b5f80fd5b5f601f19601f8301169050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b6103d782610391565b810181811067ffffffffffffffff821117156103f6576103f56103a1565b5b80604052505050565b5f610408610231565b905061041482826103ce565b919050565b5f67ffffffffffffffff821115610433576104326103a1565b5b61043c82610391565b9050602081019050919050565b828183375f83830152505050565b5f61046961046484610419565b6103ff565b9050828152602081018484840111156104855761048461038d565b5b610490848285610449565b509392505050565b5f82601f8301126104ac576104ab61029c565b5b81356104bc848260208601610457565b91505092915050565b5f80604083850312156104db576104da61023a565b5b5f6104e885828601610379565b925050602083013567ffffffffffffffff8111156105095761050861023e565b5b61051585828601610498565b9150509250929050565b5f8115159050919050565b6105338161051f565b82525050565b5f60208201905061054c5f83018461052a565b92915050565b5f82825260208201905092915050565b5f61056d8385610552565b935061057a838584610449565b61058383610391565b840190509392505050565b5f6020820190508181035f8301526105a7818486610562565b90509392505050565b6105b981610261565b82525050565b6105c88161035a565b82525050565b5f81519050919050565b5f82825260208201905092915050565b5f819050602082019050919050565b6106008161035a565b82525050565b604082015f82015161061a5f8501826105f7565b50602082015161062d60208501826105f7565b50505050565b5f61063e8383610606565b60408301905092915050565b5f602082019050919050565b5f610660826105ce565b61066a81856105d8565b9350610675836105e8565b805f5b838110156106a557815161068c8882610633565b97506106978361064a565b925050600181019050610678565b5085935050505092915050565b5f81519050919050565b5f82825260208201905092915050565b8281835e5f83830152505050565b5f6106e4826106b2565b6106ee81856106bc565b93506106fe8185602086016106cc565b61070781610391565b840191505092915050565b5f60e0820190506107255f83018a61052a565b61073260208301896105b0565b61073f60408301886105b0565b61074c60608301876105b0565b61075960808301866105bf565b81810360a083015261076b8185610656565b905081810360c083015261077f81846106da565b905098975050505050505050565b6107968161051f565b81146107a0575f80fd5b50565b5f815190506107b18161078d565b92915050565b5f602082840312156107cc576107cb61023a565b5b5f6107d9848285016107a3565b9150509291505056fea26469706673582212206b33e8a17a5245171f6caf477c3a5b9f9ceffb2d2b6fa4b6a870163291fecfd864736f6c634300081a0033",
  },
  chainId,
);
const addrR = bytesToHex(deploymentMessageRetailer.to);
// biome-ignore lint/nursery/noConsole: <explanation>
console.log("Retailer address: ", addrR);
const faucetHash = await faucet.withdrawToWithRetry(addrR, convertEthToWei(1));
const receipts = await waitTillCompleted(client, 1, faucetHash);

const hash = await deploymentMessageRetailer.send(client);

await waitTillCompleted(client, 1, hash);

// biome-ignore lint/nursery/noConsole: <explanation>
console.log("Retailer deployed successfully");

const deploymentMessageManufacturer = externalDeploymentMessage(
  {
    salt: BigInt(Math.floor(Math.random() * 10000)),
    shard: 4,
    bytecode:
      "0x608060405260405161189a38038061189a83398181016040528101906100259190610222565b815f90816100339190610489565b508060015f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050610558565b5f604051905090565b5f80fd5b5f80fd5b5f80fd5b5f80fd5b5f601f19601f8301169050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b6100da82610094565b810181811067ffffffffffffffff821117156100f9576100f86100a4565b5b80604052505050565b5f61010b61007b565b905061011782826100d1565b919050565b5f67ffffffffffffffff821115610136576101356100a4565b5b61013f82610094565b9050602081019050919050565b8281835e5f83830152505050565b5f61016c6101678461011c565b610102565b90508281526020810184848401111561018857610187610090565b5b61019384828561014c565b509392505050565b5f82601f8301126101af576101ae61008c565b5b81516101bf84826020860161015a565b91505092915050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6101f1826101c8565b9050919050565b610201816101e7565b811461020b575f80fd5b50565b5f8151905061021c816101f8565b92915050565b5f806040838503121561023857610237610084565b5b5f83015167ffffffffffffffff81111561025557610254610088565b5b6102618582860161019b565b92505060206102728582860161020e565b9150509250929050565b5f81519050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f60028204905060018216806102ca57607f821691505b6020821081036102dd576102dc610286565b5b50919050565b5f819050815f5260205f209050919050565b5f6020601f8301049050919050565b5f82821b905092915050565b5f6008830261033f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82610304565b6103498683610304565b95508019841693508086168417925050509392505050565b5f819050919050565b5f819050919050565b5f61038d61038861038384610361565b61036a565b610361565b9050919050565b5f819050919050565b6103a683610373565b6103ba6103b282610394565b848454610310565b825550505050565b5f90565b6103ce6103c2565b6103d981848461039d565b505050565b5b818110156103fc576103f15f826103c6565b6001810190506103df565b5050565b601f82111561044157610412816102e3565b61041b846102f5565b8101602085101561042a578190505b61043e610436856102f5565b8301826103de565b50505b505050565b5f82821c905092915050565b5f6104615f1984600802610446565b1980831691505092915050565b5f6104798383610452565b9150826002028217905092915050565b6104928261027c565b67ffffffffffffffff8111156104ab576104aa6100a4565b5b6104b582546102b3565b6104c0828285610400565b5f60209050601f8311600181146104f1575f84156104df578287015190505b6104e9858261046e565b865550610550565b601f1984166104ff866102e3565b5f5b8281101561052657848901518255600182019150602085019450602081019050610501565b86831015610543578489015161053f601f891682610452565b8355505b6001600288020188555050505b505050505050565b611335806105655f395ff3fe60806040526004361061004d575f3560e01c806302ec06be146100585780634de91a6314610094578063796d7f56146100be5780637acc0b20146100fa578063c29b2f201461013757610054565b3661005457005b5f80fd5b348015610063575f80fd5b5061007e60048036038101906100799190610867565b610162565b60405161008b91906108cc565b60405180910390f35b34801561009f575f80fd5b506100a86102b6565b6040516100b591906108fd565b60405180910390f35b3480156100c9575f80fd5b506100e460048036038101906100df9190610995565b6102bc565b6040516100f191906108cc565b60405180910390f35b348015610105575f80fd5b50610120600480360381019061011b91906109f2565b61039b565b60405161012e929190610a8d565b60405180910390f35b348015610142575f80fd5b5061014b610441565b604051610159929190610c75565b60405180910390f35b5f61016b6105ec565b6101aa576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101a190610d1a565b60405180910390fd5b60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16036102ac576040518060400160405280600354815260200184848080601f0160208091040260200160405190810160405280939291908181526020018383808284375f81840152601f19601f8201169050808301925050505050505081525060025f60035481526020019081526020015f205f820151815f015560208201518160010190816102889190610f5f565b5090505060035f81548092919061029e9061105b565b9190505550600190506102b0565b5f90505b92915050565b60035481565b5f6103925f80546102cc90610d92565b80601f01602080910402602001604051908101604052809291908181526020018280546102f890610d92565b80156103435780601f1061031a57610100808354040283529160200191610343565b820191905f5260205f20905b81548152906001019060200180831161032657829003601f168201915b50505050508585858080601f0160208091040260200160405190810160405280939291908181526020018383808284375f81840152601f19601f820116905080830192505050505050506106f8565b90509392505050565b6002602052805f5260405f205f91509050805f0154908060010180546103c090610d92565b80601f01602080910402602001604051908101604052809291908181526020018280546103ec90610d92565b80156104375780601f1061040e57610100808354040283529160200191610437565b820191905f5260205f20905b81548152906001019060200180831161041a57829003601f168201915b5050505050905082565b6060805f60035467ffffffffffffffff81111561046157610460610d38565b5b60405190808252806020026020018201604052801561048f5781602001602082028036833780820191505090505b5090505f60035467ffffffffffffffff8111156104af576104ae610d38565b5b6040519080825280602002602001820160405280156104e257816020015b60608152602001906001900390816104cd5790505b5090505f5b6003548110156105df575f60025f8381526020019081526020015f209050805f015484838151811061051c5761051b6110a2565b5b60200260200101818152505080600101805461053790610d92565b80601f016020809104026020016040519081016040528092919081815260200182805461056390610d92565b80156105ae5780601f10610585576101008083540402835291602001916105ae565b820191905f5260205f20905b81548152906001019060200180831161059157829003601f168201915b50505050508383815181106105c6576105c56110a2565b5b60200260200101819052505080806001019150506104e7565b5081819350935050509091565b5f60605f8060ff73ffffffffffffffffffffffffffffffffffffffff16836040516106179190611113565b5f60405180830381855afa9150503d805f811461064f576040519150601f19603f3d011682016040523d82523d5f602084013e610654565b606091505b509150915081610699576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161069090611173565b60405180910390fd5b5f8151116106dc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106d390611201565b60405180910390fd5b808060200190518101906106f09190611249565b935050505090565b5f8084848460405160200161070f939291906112bc565b60405160208183030381529060405290505f80606060fe73ffffffffffffffffffffffffffffffffffffffff168460405161074a9190611113565b5f60405180830381855afa9150503d805f8114610782576040519150601f19603f3d011682016040523d82523d5f602084013e610787565b606091505b508092508194505050826107d0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107c790611173565b60405180910390fd5b5f815111156107f057808060200190518101906107ed9190611249565b91505b819450505050509392505050565b5f80fd5b5f80fd5b5f80fd5b5f80fd5b5f80fd5b5f8083601f84011261082757610826610806565b5b8235905067ffffffffffffffff8111156108445761084361080a565b5b6020830191508360018202830111156108605761085f61080e565b5b9250929050565b5f806020838503121561087d5761087c6107fe565b5b5f83013567ffffffffffffffff81111561089a57610899610802565b5b6108a685828601610812565b92509250509250929050565b5f8115159050919050565b6108c6816108b2565b82525050565b5f6020820190506108df5f8301846108bd565b92915050565b5f819050919050565b6108f7816108e5565b82525050565b5f6020820190506109105f8301846108ee565b92915050565b61091f816108e5565b8114610929575f80fd5b50565b5f8135905061093a81610916565b92915050565b5f8083601f84011261095557610954610806565b5b8235905067ffffffffffffffff8111156109725761097161080a565b5b60208301915083600182028301111561098e5761098d61080e565b5b9250929050565b5f805f604084860312156109ac576109ab6107fe565b5b5f6109b98682870161092c565b935050602084013567ffffffffffffffff8111156109da576109d9610802565b5b6109e686828701610940565b92509250509250925092565b5f60208284031215610a0757610a066107fe565b5b5f610a148482850161092c565b91505092915050565b5f81519050919050565b5f82825260208201905092915050565b8281835e5f83830152505050565b5f601f19601f8301169050919050565b5f610a5f82610a1d565b610a698185610a27565b9350610a79818560208601610a37565b610a8281610a45565b840191505092915050565b5f604082019050610aa05f8301856108ee565b8181036020830152610ab28184610a55565b90509392505050565b5f81519050919050565b5f82825260208201905092915050565b5f819050602082019050919050565b610aed816108e5565b82525050565b5f610afe8383610ae4565b60208301905092915050565b5f602082019050919050565b5f610b2082610abb565b610b2a8185610ac5565b9350610b3583610ad5565b805f5b83811015610b65578151610b4c8882610af3565b9750610b5783610b0a565b925050600181019050610b38565b5085935050505092915050565b5f81519050919050565b5f82825260208201905092915050565b5f819050602082019050919050565b5f82825260208201905092915050565b5f610bb582610a1d565b610bbf8185610b9b565b9350610bcf818560208601610a37565b610bd881610a45565b840191505092915050565b5f610bee8383610bab565b905092915050565b5f602082019050919050565b5f610c0c82610b72565b610c168185610b7c565b935083602082028501610c2885610b8c565b805f5b85811015610c635784840389528151610c448582610be3565b9450610c4f83610bf6565b925060208a01995050600181019050610c2b565b50829750879550505050505092915050565b5f6040820190508181035f830152610c8d8185610b16565b90508181036020830152610ca18184610c02565b90509392505050565b7f547279696e6720746f2063616c6c20696e7465726e616c2066756e6374696f6e5f8201527f20776974682065787465726e616c206d65737361676500000000000000000000602082015250565b5f610d04603683610a27565b9150610d0f82610caa565b604082019050919050565b5f6020820190508181035f830152610d3181610cf8565b9050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f6002820490506001821680610da957607f821691505b602082108103610dbc57610dbb610d65565b5b50919050565b5f819050815f5260205f209050919050565b5f6020601f8301049050919050565b5f82821b905092915050565b5f60088302610e1e7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82610de3565b610e288683610de3565b95508019841693508086168417925050509392505050565b5f819050919050565b5f610e63610e5e610e59846108e5565b610e40565b6108e5565b9050919050565b5f819050919050565b610e7c83610e49565b610e90610e8882610e6a565b848454610def565b825550505050565b5f90565b610ea4610e98565b610eaf818484610e73565b505050565b5b81811015610ed257610ec75f82610e9c565b600181019050610eb5565b5050565b601f821115610f1757610ee881610dc2565b610ef184610dd4565b81016020851015610f00578190505b610f14610f0c85610dd4565b830182610eb4565b50505b505050565b5f82821c905092915050565b5f610f375f1984600802610f1c565b1980831691505092915050565b5f610f4f8383610f28565b9150826002028217905092915050565b610f6882610a1d565b67ffffffffffffffff811115610f8157610f80610d38565b5b610f8b8254610d92565b610f96828285610ed6565b5f60209050601f831160018114610fc7575f8415610fb5578287015190505b610fbf8582610f44565b865550611026565b601f198416610fd586610dc2565b5f5b82811015610ffc57848901518255600182019150602085019450602081019050610fd7565b868310156110195784890151611015601f891682610f28565b8355505b6001600288020188555050505b505050505050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f611065826108e5565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036110975761109661102e565b5b600182019050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52603260045260245ffd5b5f81519050919050565b5f81905092915050565b5f6110ed826110cf565b6110f781856110d9565b9350611107818560208601610a37565b80840191505092915050565b5f61111e82846110e3565b915081905092915050565b7f507265636f6d70696c656420636f6e74726163742063616c6c206661696c65645f82015250565b5f61115d602083610a27565b915061116882611129565b602082019050919050565b5f6020820190508181035f83015261118a81611151565b9050919050565b7f2749535f494e5445524e414c5f4d455353414745272072657475726e7320696e5f8201527f76616c6964206461746100000000000000000000000000000000000000000000602082015250565b5f6111eb602a83610a27565b91506111f682611191565b604082019050919050565b5f6020820190508181035f830152611218816111df565b9050919050565b611228816108b2565b8114611232575f80fd5b50565b5f815190506112438161121f565b92915050565b5f6020828403121561125e5761125d6107fe565b5b5f61126b84828501611235565b91505092915050565b5f82825260208201905092915050565b5f61128e826110cf565b6112988185611274565b93506112a8818560208601610a37565b6112b181610a45565b840191505092915050565b5f6060820190508181035f8301526112d48186611284565b90506112e360208301856108ee565b81810360408301526112f58184611284565b905094935050505056fea26469706673582212206f794e1f64382b47c09ddadec6d210c5be9394087851bf18b5e54964eb88ad6064736f6c634300081a0033",
    abi: [
      {
        inputs: [
          { internalType: "bytes", name: "_pubkey", type: "bytes" },
          {
            internalType: "address",
            name: "_retailerContractAddress",
            type: "address",
          },
        ],
        stateMutability: "payable",
        type: "constructor",
      },
      {
        inputs: [{ internalType: "string", name: "name", type: "string" }],
        name: "createProduct",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "getProducts",
        outputs: [
          { internalType: "uint256[]", name: "", type: "uint256[]" },
          { internalType: "string[]", name: "", type: "string[]" },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "nextProductId",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        name: "products",
        outputs: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "string", name: "name", type: "string" },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "hash", type: "uint256" },
          { internalType: "bytes", name: "signature", type: "bytes" },
        ],
        name: "verifyExternal",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      { stateMutability: "payable", type: "receive" },
    ] as Abi,
    args: [bytesToHex(pubkey), addrR],
  },
  chainId,
);

const addrM = bytesToHex(deploymentMessageManufacturer.to);
// biome-ignore lint/nursery/noConsole: <explanation>
console.log("Manufacturer address: ", addrM);
const faucetHashM = await faucet.withdrawToWithRetry(addrM, convertEthToWei(1));

const hashM = await deploymentMessageManufacturer.send(client);

await waitTillCompleted(client, 4, hashM);

// biome-ignore lint/nursery/noConsole: <explanation>
console.log("Manufacturer deployed successfully");

const orderMessage = new ExternalMessageEnvelope({
  isDeploy: false,
  to: hexToBytes(addrR),
  chainId,
  seqno: await client.getMessageCount(addrR, "latest"),
  data: hexToBytes(
    encodeFunctionData({
      abi: [
        {
          inputs: [
            { internalType: "address", name: "dst", type: "address" },
            { internalType: "string", name: "productName", type: "string" },
          ],
          name: "orderProduct",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint256", name: "messageHash", type: "uint256" },
            { internalType: "bytes", name: "authData", type: "bytes" },
          ],
          name: "verifyExternal",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "view",
          type: "function",
        },
        { stateMutability: "payable", type: "receive" },
      ] as Abi,
      functionName: "orderProduct",
      args: [addrM, "new-product"],
    }),
  ),
  authData: new Uint8Array(0),
});

const encodedOrderMessage = orderMessage.encode();

const orderMessageHash = await client.sendRawMessage(
  bytesToHex(encodedOrderMessage),
);

await waitTillCompleted(client, 1, orderMessageHash);

const getProductsMessage = new ExternalMessageEnvelope({
  isDeploy: false,
  to: hexToBytes(addrM),
  chainId,
  seqno: await client.getMessageCount(addrM, "latest"),
  data: hexToBytes(
    encodeFunctionData({
      abi: [
        {
          inputs: [
            { internalType: "bytes", name: "_pubkey", type: "bytes" },
            {
              internalType: "address",
              name: "_retailerContractAddress",
              type: "address",
            },
          ],
          stateMutability: "payable",
          type: "constructor",
        },
        {
          inputs: [{ internalType: "string", name: "name", type: "string" }],
          name: "createProduct",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "getProducts",
          outputs: [
            { internalType: "uint256[]", name: "", type: "uint256[]" },
            { internalType: "string[]", name: "", type: "string[]" },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "nextProductId",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          name: "products",
          outputs: [
            { internalType: "uint256", name: "id", type: "uint256" },
            { internalType: "string", name: "name", type: "string" },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint256", name: "hash", type: "uint256" },
            { internalType: "bytes", name: "signature", type: "bytes" },
          ],
          name: "verifyExternal",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "view",
          type: "function",
        },
        { stateMutability: "payable", type: "receive" },
      ] as Abi,
      functionName: "getProducts",
      args: [],
    }),
  ),
  authData: new Uint8Array(0),
});

await getProductsMessage.updateAuthdata(signer);

// biome-ignore lint/nursery/noConsole: <explanation>
console.log(getProductsMessage);

const productsMessageHash = await client.sendRawMessage(
  bytesToHex(getProductsMessage.encode()),
);

await waitTillCompleted(client, 4, productsMessageHash);

// biome-ignore lint/nursery/noConsole: <explanation>
console.log(`Message hash: ${productsMessageHash}`);

const message = await client.getMessageByHash(productsMessageHash, 4);

// biome-ignore lint/nursery/noConsole: <explanation>
console.log(message);

const resultsCall = await client.call(
  {
    from: addrM,
    to: addrM,
    data: encodeFunctionData({
      abi: [
        {
          inputs: [
            { internalType: "bytes", name: "_pubkey", type: "bytes" },
            {
              internalType: "address",
              name: "_retailerContractAddress",
              type: "address",
            },
          ],
          stateMutability: "payable",
          type: "constructor",
        },
        {
          inputs: [{ internalType: "string", name: "name", type: "string" }],
          name: "createProduct",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "getProducts",
          outputs: [
            { internalType: "uint256[]", name: "", type: "uint256[]" },
            { internalType: "string[]", name: "", type: "string[]" },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "nextProductId",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          name: "products",
          outputs: [
            { internalType: "uint256", name: "id", type: "uint256" },
            { internalType: "string", name: "name", type: "string" },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint256", name: "hash", type: "uint256" },
            { internalType: "bytes", name: "signature", type: "bytes" },
          ],
          name: "verifyExternal",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "view",
          type: "function",
        },
        { stateMutability: "payable", type: "receive" },
      ] as Abi,
      functionName: "getProducts",
      args: [],
    }),
  },
  "latest",
);

// biome-ignore lint/nursery/noConsole: <explanation>
console.log(
  "getProducts",
  decodeFunctionResult({
    abi: [
      {
        inputs: [
          { internalType: "bytes", name: "_pubkey", type: "bytes" },
          {
            internalType: "address",
            name: "_retailerContractAddress",
            type: "address",
          },
        ],
        stateMutability: "payable",
        type: "constructor",
      },
      {
        inputs: [{ internalType: "string", name: "name", type: "string" }],
        name: "createProduct",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "getProducts",
        outputs: [
          { internalType: "uint256[]", name: "", type: "uint256[]" },
          { internalType: "string[]", name: "", type: "string[]" },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "nextProductId",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        name: "products",
        outputs: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "string", name: "name", type: "string" },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "hash", type: "uint256" },
          { internalType: "bytes", name: "signature", type: "bytes" },
        ],
        name: "verifyExternal",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      { stateMutability: "payable", type: "receive" },
    ] as Abi,
    functionName: "getProducts",
    data: resultsCall,
  }),
);
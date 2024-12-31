import web3 from './web3';

const {REACT_APP_CONTRACT_ABI,REACT_APP_CONTRACT_ADDRESS} = process.env;

export default new web3.eth.Contract(
    JSON.parse(REACT_APP_CONTRACT_ABI), 
    REACT_APP_CONTRACT_ADDRESS
);


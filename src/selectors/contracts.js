export default (contracts, {text}={}) => {
    return contracts.filter((contract)=> {
        const textMatch = contract.title.toLowerCase().includes(text.toLowerCase());
        return textMatch;
    })
}
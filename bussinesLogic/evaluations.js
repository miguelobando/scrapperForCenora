function shipInfo ({querySelector,document}){
    const records = [];
    // eslint-disable-next-line no-undef
    let uls = [...document.querySelectorAll(querySelector)];
    uls.forEach(UL => {
        const childrenArray = Array.from(UL.children)
        const record = childrenArray.reduce((accum, currVal) => {
           const [key, value] = currVal.innerText.split(': ');
           return {...accum, [key]: value};
        }, {})    
        records.push(record);
    });
    return records 
}

function getEvaluationById(key){
    switch (key) {
        case 'shipInfo':
            return shipInfo
        default:
            throw new Error('Function not found')    
    }
}

module.exports={getEvaluationById}
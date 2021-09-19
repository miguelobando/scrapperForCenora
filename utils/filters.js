function shipInfo(shipList){
    const shipListArr = Array.from(shipList);
    const records = [];
    
    shipListArr.forEach(UL => {
        const childrenArray = Array.from(UL.children)
        const record = childrenArray.reduce((accum, currVal) => {
           const [key, value] = currVal.innerText.split(': ');
           return {...accum, [key]: value};
        }, {})    
        records.push(record);
    })
    return records;
};
// function shipInfo(document){
//     const shipList = document.querySelectorAll('div.activity-result.ship-result ul');
//     const shipListArr = Array.from(shipList);
//     const records = [];
    
//     shipListArr.forEach(UL => {
//         const childrenArray = Array.from(UL.children)
//         const record = childrenArray.reduce((accum, currVal) => {
//            const [key, value] = currVal.innerText.split(': ');
//            return {...accum, [key]: value};
//         }, {})    
//         records.push(record);
//     })
//     return records;
// };

function shipTitle(){
    // eslint-disable-next-line no-undef
    let a = Array.from(document.querySelectorAll('h2.ccl-dsk > a')).map(e=> e.innerText.trim());
    return a;    
}

function merger(title,list){
    console.log(list.length)
    let mergedJson = [];
    title.forEach ((e,index)=>{
        let sailTo = list[index]["Sail To"].split(", ").map(s=> s.trim())
        // let sailFrom = list[index]["Sail From"].split(',')
        const partes = list[index]["Sail From"].split(',').map(x => x.trim());
        const sailFrom = partes.reduce((acc, cur, i) => {
            const index = Math.floor((i)/2)
            if (!acc[index]) acc[index] = ""
            acc[index] += (i+1)%2 === 0 ? ', ': '';
            acc[index] += cur;
            return acc
        }, [""])
        let duration = list[index]["Duration"].split(", ").map(s=>s.trim());
        let filtered = {
            title: e,
            sailTo: sailTo,
            sailFrom: sailFrom,
            duration:duration
        }
        mergedJson.push(filtered);
        
    })
    return mergedJson;
}

module.exports = {shipInfo,shipTitle,merger};



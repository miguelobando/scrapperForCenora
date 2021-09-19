const puppeteer = require('puppeteer');
const{ getEvaluationById } = require('./evaluations');
async function puppeteerScraper({pageUrl, optionWaitUntil,evaluationParams,evaluateId}){
    
    const browser = await puppeteer.launch();
    
    const page = await browser.newPage();
    await page.goto(  pageUrl,
                      {
                          waitUntil: optionWaitUntil 
                      }
    );
    let fun = getEvaluationById(evaluateId)
    await page.exposeFunction('fun',fun);
    let shipList = await page.evaluate(()=>{
       // eslint-disable-next-line no-undef
       let result = window.fun({...evaluationParams,document})
       return result;
    })
      await browser.close()
      return shipList
}    


module.exports={puppeteerScraper} 
  


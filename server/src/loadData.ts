import { Branch } from "./models/branch";


const fs=require('fs')
const csv=require('csv-parser')
const {Headquarter}=require('./models/headquarter')




export async function getData() {
  return new Promise<void>((resolve, reject) => {
    const headquarters: any[] = [];
    const branches: any[] = [];

    fs.createReadStream('./data.csv')
      .pipe(csv())
      .on('data', async (row: any) => {
        try {
          if (row['SWIFT CODE'] && row['SWIFT CODE'].endsWith('XXX')) {
            
           
            const h = new Headquarter({
              address:row['ADDRESS'],
              bankName:row['NAME'],
              countryISO2:row['COUNTRY ISO2 CODE'],
              countryName:row['COUNTRY NAME'],
              isHeadquarter:true,
              swiftCode: row['SWIFT CODE'],
        
            
              branches: [] 
            });

            headquarters.push(h); 
          } else {
            const branch = new Branch({
              address:row['ADDRESS'],
              bankName:row['NAME'],
              countryISO2:row['COUNTRY ISO2 CODE'],
              countryName:row['COUNTRY NAME'],
              isHeadquarter:false,
              swiftCode: row['SWIFT CODE'],
            });

            branches.push(branch); 
          }
        } catch (error) {
          console.error('Błąd zapisu:', error);
        }
      })
      .on('end', async () => {
        try {
          for (const h of headquarters) {
            await h.save();
            console.log('Saved Headquarter:', h);
          }

        
          for (const branch of branches) {
            await branch.save();
            const h = await Headquarter.findOne({
              swiftCode: branch.swiftCode?.slice(0, 8) + "XXX"
            });

            if (h) {
              if (!h.branches.includes(branch._id)) {
                h.branches.push(branch._id);
                await h.save();
                console.log('Added Branch to Headquarter:', branch);
              }
            }
          }

          console.log('CSV file successfully processed');
          
          resolve();
        } catch (error) {
          reject(error);
        }
      })
      .on('error', reject);
  });
}

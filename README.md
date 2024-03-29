<h1>Setup</h2>
Install packages: <br /> npm install --save-dev supertest<br />
                  npm install --save-dev ts-jest<br />
                  npm i @types/jest@29.4.0   (make sure to match with @types/jest dependency)<br />
                  npm install --save @types/jest <br />
                  npm install --save @types/supertest<br />

Package.json should look like below <br />
<br />
<img width="277" alt="image" src="https://github.com/Zahid-Automate/Playwright-API-Automation/assets/45691238/3e66ee34-64d7-4c71-a1d5-229a5c3cbaa0">
<h2>Add tsconfig.json file with below details</h2>
<img width="251" alt="image" src="https://github.com/Zahid-Automate/Playwright-API-Automation/assets/45691238/fcd8237f-2240-4835-b28c-467f426b3444">

<h2>Run test</h2>
npx jest {filename}

<h2>Reporting with jest using Junit</h2>
npm install jest-junit --save-dev<br/>
<br/>
  ==> Include the reporters in jest.config.js as per below <br/>
  <br/>
<img width="354" alt="image" src="https://github.com/Zahid-Automate/TypeScript-API-Automation/assets/45691238/a42b6675-264b-49f1-882b-1d715414a0d7">



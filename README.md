<h1>Setup</h2>
Install packages: <br /> npm install --save-dev supertest<br />
                  npm install --save-dev ts-jest<br />
                  npm i @types/jest@29.4.0   (make sure to match with @types/jest dependency)<br />
                  npm install --save @types/jest <br />
                  npm install --save @types/supertest<br />
<br/>
Package.json file should look like below after all the above commands are run <br />
<br />
<img width="277" alt="image" src="https://github.com/Zahid-Automate/Playwright-API-Automation/assets/45691238/3e66ee34-64d7-4c71-a1d5-229a5c3cbaa0">
<h2>Add tsconfig.json file with below details</h2>
<img width="251" alt="image" src="https://github.com/Zahid-Automate/Playwright-API-Automation/assets/45691238/fcd8237f-2240-4835-b28c-467f426b3444">

<h2>Run test</h2>
npx jest {filename}

<h2>Reporting with jest using Junit</h2>
npm install jest-junit --save-dev<br/>
<br/>
  ==> Include the reporters section in jest.config.js as per below <br/>
  <br/>
<img width="354" alt="image" src="https://github.com/Zahid-Automate/TypeScript-API-Automation/assets/45691238/a42b6675-264b-49f1-882b-1d715414a0d7">

</br>

Sample junit xml report will look like below
</br>

<img width="857" alt="image" src="https://github.com/Zahid-Automate/TypeScript-API-Automation/assets/45691238/dfe6a29b-9612-4f26-aaa0-71f8a4ac1e81">

</br>

Adding a Jest HTML report

</br>
  npm install jest-html-reporters --save-dev</br>
</br>
==> Include the jest-html-reporters in jest.config.js as per below </br>
</br>
<img width="408" alt="image" src="https://github.com/Zahid-Automate/TypeScript-API-Automation/assets/45691238/e64e4388-9f13-48ea-9d2f-d7bece0231e2">





const express = require('express');
const app = express();
const exec = require('child_process').exec;
const path = require('path');
let server
beforeAll( (done) => {
    const PORT = process.env.PORT || 4000;
   server = app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        done();
    });
});

afterAll( (done) => {
    server.close(done);
})

describe('Performance Testing', () => {
    const k6_path = path.join(__dirname,"k6_test.js")
    test('should run k6 performance test', (done) => {
        exec(`k6 run ${k6_path}`, (error, stdout, stderr) => {
            if (error) {
                console.log(error);
                return done(error);
            }
            if(stderr) {    
                console.warn(stderr);
            }
            console.log(stdout);
            done();
        });
    }, 60000);
   
});
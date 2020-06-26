// assertion library
const chai = require('chai');

// http request library
const axios = require('axios');

// serverless url to test against, passed in as an env var
const url = process.env.SERVERLESS_URL;

it('Serverless URL passed in as an environment variable', () => {
    chai.expect(url).to.be.a('string', 'Serverless URL not passed in as an env var');

    // serverless url strings look like this, can change if we somehow integrate our own domain
    chai.expect(url.startsWith('https')).to.be.true;
    chai.expect(url).to.have.string('.execute-api.us-east-1.amazonaws.com');
});


it('Gets Hello World Lambda Response', () => {
    // Make a request for a user with a given ID
    return axios.get(url + "/users/create")
        .then((response) => {
            // handle success
            chai.expect(response.status).to.equal(200);
            chai.expect(response.statusText).to.equal('OK');
            chai.expect(response.data.message).to.equal('Hello World');
        })
        .catch((error) => {
            // fail and show the error
            chai.assert.fail(error.toString());
            chai.expect(1).to.equal(2);
        });
});


it('Get List of Items', () => {
    // Make a request for a user with a given ID
    return axios.get(url + "/items/list")
        .then((response) => {
            // handle success
            chai.expect(response.status).to.equal(200);

            // checks the message and items field
            chai.expect(response.data.message).to.equal('Successfully Retreived Items');
            const itemsList = response.data.items;
            chai.expect(itemsList).to.be.an('array');

            // for each item, check if the expected fields exist
            for(let item of itemsList) {
                chai.expect(item.name).to.not.equal(null);
                chai.expect(item.category).to.not.equal(null);
                chai.expect(item.image).to.not.equal(null);
                chai.expect(item.description).to.not.equal(null);
                chai.expect(item.price).to.not.equal(null);

                // check if the cost of the item is in the correct format
                const cost = item.price;
                chai.expect(cost.charAt(cost.length-3)).to.equal('.');
            }
            
        })
        .catch((error) => {
            // fail and show the error
            chai.assert.fail(error.toString());
        });
});
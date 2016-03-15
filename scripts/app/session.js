var fastn = require('^fastn');

var sessionModel = new fastn.Model({
  loginID: '',
  gfcToken: '709eea4591e6cac410babb5eba9a283f',
  firstName: 'Sholto',
  surname: 'Maud'
});

// debugging
sessionModel.on('.|**', function(sessionData){
  console.log(sessionData);
});


module.exports = {
  model: sessionModel,
  setSession: function(sessionData){
    sessionModel.update(sessionData);
  },
  getToken: fastn.binding('gfcToken').attach(sessionModel),
  getFirstname: fastn.binding('firstName').attach(sessionModel),
  getSurname: fastn.binding('surname').attach(sessionModel)
};
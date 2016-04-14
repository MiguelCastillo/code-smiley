var testLivereloadPortNumber = 42833; //generatePortNumber();
var siteLivereloadPortNumber = 42834; //generatePortNumber();
var testKeepalivePortNumber = 42835; //generatePortNumber();
var siteKeepalivePortNumber = 42836; //generatePortNumber();
var testPortNumber = 42837; //generatePortNumber();

module.exports = {
  "testLivereloadPortNumber": testLivereloadPortNumber,
  "siteLivereloadPortNumber": siteLivereloadPortNumber,
  "testKeepalivePortNumber": testKeepalivePortNumber,
  "siteKeepalivePortNumber": siteKeepalivePortNumber,
  "testPortNumber": testPortNumber
};

function generatePortNumber() {
  return (Math.floor((Math.random() * 10000)) + 10000) % 65535;
}

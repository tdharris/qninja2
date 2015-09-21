
var exports = module.exports = {

	getServiceRequests: require('./js/getServiceRequests'),
	requestHandler: require('./js/requestHandler')

};


// Where to put utility?
String.prototype.isEmpty = function() {
   return (this.length === 0 || !this.trim());
}

Array.prototype.appendStringToElementAtIndex = function(index, str) {
    if(typeof this[index] === 'undefined' || typeof this[index] !== 'string') return false;
    this[index] += ' ' + str;
};
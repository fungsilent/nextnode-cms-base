var nextnode = require('next-nodecms'),
	Types = nextnode.Field.Types;

/**
 * AuditTrail Model
 * ==========
 */

var AuditTrailModel = new nextnode.List('AuditTrail',{
  nodelete: true,
  noedit: true,
  nocreate: true,
  defaultSort: '-createDate'
});

AuditTrailModel.add({
	userId: { type: Types.Text, initial: true, index: true },
	createDate: { type: Types.Datetime, default: Date.now },
	targetModel: { type: Types.Text, initial: true },
	trackAction: { type: Types.Text, initial: true },
	data: { type: Types.Textarea, initial: true }
});


/**
 * Registration
 */

AuditTrailModel.defaultColumns = 'userId,  createDate, targetModel, trackAction';
AuditTrailModel.register();


/**
 * Public Class and functions
 */

function AuditTrail(){

}

AuditTrail.prototype.addNewAuditTrail = function(id,model,action,body){
	var newAuditTrail = new AuditTrailModel.model({
	    userId: id,
	    targetModel: model,
	    trackAction: action,
	    data: body,
	});
	newAuditTrail.save(function(err) {
	    // console.log(err);
	});
}


module.exports = AuditTrail;
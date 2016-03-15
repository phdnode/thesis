var fastn = require('^fastn'),
    app = require('^app'),
    tuteModel = app.tute.tuteModel;

module.exports = function( activityModel ){
    // console.log(activityModel.get('item.values._id'), fastn.binding('.')());
    return  fastn('div', {class: 'page'},
        fastn('div',  {class: 'tutes'}, 
            fastn('div',  {class: 'tute-container'},fastn.binding('currentTute.title'), ' - ',fastn.binding('currentTute.courseId') ),
            fastn('div',  {class: 'tute-timer'},fastn.binding('currentTute.startDate'), ' - ', fastn.binding('currentTute.endTime') ),
            fastn('div',  {class: 'tute-tutor'},fastn.binding('currentTute.tutor'), ' - ', fastn.binding('currentTute.tutorId') ),
            fastn('div',  {class: 'tute-tutor-email'},fastn.binding('currentTute.email'))
            
            
        )       
    ).attach(tuteModel);
}
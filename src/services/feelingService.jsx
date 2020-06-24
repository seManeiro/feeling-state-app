
let feeling='';

function sendFeelingToUpdate (f) {
    feeling = f; 
  };

function fetchFeelingToUpdate(){
 return feeling;
}

export default {
    sendFeelingToUpdate, fetchFeelingToUpdate
}



/**
* State Machine class.
* @constructor
*/
StateMachine = function(){
  this.states = [],
  this.current = "",
  this.last = "",
  this.add = function(name){
    if(!this.find(name))this.states.push(name);
    else console.log("There is already an state with that name.");
  },
  this.remove = function(name){
     if(this.find(name)) this.states.splice(this.states.indexOf(name),1);
     else console.log("No state with that name.");
  },
  this.set = function(name){
    if(this.find(name)){
      this.last = this.current;
      this.current = name;
    }else{
      console.log("No state with that name.");
    }
  },
  this.find = function(name){
    var exists = false;
    var i = 0;
    while(i < this.states.length && !exists){
      if(this.states[i] == name){
        exists = true;
      }
      i++;
    }
    return exists;
  }
}
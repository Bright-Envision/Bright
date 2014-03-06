bright.extend(bright.fn, {
    /*
    *
    * @param: prop = {object} || {string} the css element's you want to change, this can be either a string or an element depending on the the user
    * @param: value = {string} || {int} the value you want to set the css property.
    */
   css: function(prop, value){
       var self = this;
       if (typeof prop == 'string'){
           self.each(self.elements, function(){
              if (this.style && this.style.hasOwnProperty(prop)){
                  if (!value){
                      return this.style[prop];
                  } else {
                      if (typeof value == 'number'){
                          this.style[prop] = value + 'px';
                      } else {
                          this.style[prop] = value;
                      }
                  }
              }
           });
       } else {
           //loops through the properties object and sets all the css.
           self.each(self.elements, function(){
               var el = this;
               self.each(prop, function(i, value){
                   if (el.style && el.style.hasOwnProperty(i)){
                       if (typeof value == 'number'){
                           el.style[i] = value + 'px';
                       } else {
                           el.style[i] = value;
                       }
                   }
               });
           });
       }
       return self;
   }
});

/**
 * Generates type error based on most used the keyboard layouts in Portugal,
 * Spain, France, Germany and the USA which is also the default layout.
 * This code is ported from the Perl modul Lingua::TypoGenerator written by
 * Ivan Tubert-Brohman {@literal &lt;itub&#64;cpan.org&gt;}, only the keyboard layouts different from
 * the US layout have been added.
 * @author Christoph Zurnieden
 * @param keyb the keyboard layout (default is US)
 *{@literal 
 *<table class="comptable" summary="Entries of the return array" >
 *<tr><th>Layout</th><th>Description</th></tr>
 *<tr><td>en</td><td>US layout, the default</td></tr>
 *<tr><td>de</td><td>German layout</td></tr>
 *<tr><td>fr</td><td>French layout</td></tr>
 *<tr><td>es</td><td>Spanish (europe) layout</td></tr>
 *<tr><td>pt</td><td>Portugese (europe) layout</td></tr> 
 *</table>
 *}
 * @return an array with a sorted list of the type errors
 * @since 0.0.2
 * @version 0.0.1
 * @license GPL
*/
String.prototype.typeerrors = function(keyb){

  var c = '';
  var t = "";
  var s = this.toLowerCase();

  var ret = new Array();
  var boards = [" qwertyuiop asdfghjkl zxcvbnm",
                " qwertzuiop\u00fc asdfghjkl\u00f6\u00e4 yxcvbnm",
		" azertyuiop qsdfghjklm wxcvbn",
		" qwertyuiop asdfghjkl\u00f1 zxcvbnm",
		" qwertyuiop asdfghjkl\u00f7 zxcvbnm",
		];

  switch(keyb){
    case 'pt': keyboard = boards[4];break;
    case 'es': keyboard = boards[3];break;
    case 'fr': keyboard = boards[2];break;
    case 'de': keyboard = boards[1];break;
    default: keyboard = boards[0];break;
  }
  
  for(var i=0;i < s.length; i++){
    c = this.charAt(i);
    t = this;
    t = t.substring(0,i) + t.substring(i+1,t.length);
    ret.push(t);
    
    var regex = new RegExp("(.)" + c + "(.)");
    if(regex.exec(keyboard)){
      if(RegExp.$1 != ' '){
        t = this;
	t = t.substring(0,i) + RegExp.$1 + t.substring(i+1,t.length);
	ret.push(t);
      }
       if(RegExp.$2 != ' '){
        t = this;
	t = t.substring(0,i) + RegExp.$2 + t.substring(i+1,t.length);
	ret.push(t);
      }     
    }
  }

  for(var i = 1;i < s.length; i++){
   
    regex = /\w\w/;
    if(!regex.exec(t.substring(i-1,i+1)))
      continue;
  
    t = this;
    c = t.charAt(i);
    t = t.substring(0,i-1) + c + t.charAt(i-1) + t.substring(i+1,t.length);
    ret.push(t);
    
    t = this;
    t = t.substring(0,i) + t.charAt(i-1) + t.substring(i+1,t.length);
    ret.push(t);  

    t = this;
    t = t.substring(0,i) + t.charAt(i-1) + t.substring(i,t.length+1);
    ret.push(t);
  }
  return ret.sort(); 
};

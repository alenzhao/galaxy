define([],function(){return Backbone.Model.extend({initialize:function(a){this.app=a},refresh:function(){this.dict={};this.xml=$("<div/>");if(!this.app.section){return{}}this._iterate(this.app.section.$el,this.dict,this.xml)},finalize:function(){var a=this;this.job_def={};this.job_ids={};function c(f,e,d){a.job_def[f]=d;a.job_ids[f]=e}function b(k,l){for(var f in l){var d=l[f];if(d.input){var m=d.input;var h=k;if(k!=""){h+="|"}h+=m.name;switch(m.type){case"repeat":var g=0;for(var e in d){if(e.indexOf("section")!=-1){b(h+"_"+g++,d[e])}}break;case"conditional":var n=a.app.field_list[m.id].value();c(h+"|"+m.test_param.name,m.id,n);for(var e in m.cases){if(m.cases[e].value==n){b(h,l[m.id+"-section-"+e]);break}}break;case"data":var n={id:a.app.field_list[m.id].value(),src:"hda"};c(h,m.id,n);break;case"boolean":var n=a.app.field_list[m.id].value();if(n==="true"){n=m.truevalue}else{n=m.falsevalue}c(h,m.id,n);break;default:c(h,m.id,a.app.field_list[m.id].value())}}}}b("",this.dict);return this.job_def},match:function(c){var a={};var b=this;function d(j,h){if(typeof h==="string"){var f=b.app.tree.job_ids[j];if(f){a[f]=h}}else{for(var g in h){var e=g;if(j!==""){e=j+"|"+e}d(e,h[g])}}}d("",c);return a},references:function(c,e){var g=[];var b=this;function d(h,j){var i=$(j).children();var l=[];var k=false;i.each(function(){var o=this;var n=$(o).attr("id");if(n!==c){var m=b.app.input_list[n];if(m){if(m.name==h){k=true;return false}if(m.data_ref==h&&m.type==e){l.push(n)}}}});if(!k){g=g.concat(l);i.each(function(){d(h,this)})}}var f=this.xml.find("#"+c);if(f.length>0){var a=this.app.input_list[c];if(a){d(a.name,f.parent())}}return g},_iterate:function(d,e,b){var a=this;var c=$(d).children();c.each(function(){var i=this;var h=$(i).attr("id");if($(i).hasClass("section-row")||$(i).hasClass("tab-pane")){e[h]={};var f=a.app.input_list[h];if(f){e[h]={input:f}}var g=$('<div id="'+h+'"/>');b.append(g);a._iterate(i,e[h],g)}else{a._iterate(i,e,b)}})}})});
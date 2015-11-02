/*!
 * CSVParser.js
 * Mr-Data-Converter
 *
 * Input CSV or Tab-delimited data and this will parse it into a Data Grid Javascript object
 */
function DataConverter(n){this.nodeId=n;this.node=$("#"+n);this.outputDataType="json";this.rowDelimiter="\n";this.inputText="";this.outputText="";this.indent="  ";this.tableName="MrDataConverter";this.headersProvided=!0;this.downcaseHeaders=!1;this.upcaseHeaders=!1;this.includeWhiteSpace=!0;this.useTabsForIndent=!1}var isDecimalRe=/^\s*(\+|-)?((\d+([,\.]\d+)?)|([,\.]\d+))\s*$/,CSVParser={escapeText:function(n,t){return n===undefined?"":(t==="xml"&&(n=n.replace(/&/g,"&amp;"),n=n.replace(/'/g,"&apos;")),n=n.replace(/</g,"&lt;"),n=n.replace(/>/g,"&gt;"),n=n.replace(/–/g,"&ndash;"),n=n.replace(/—/g,"&mdash;"),n=n.replace(/¡/g,"&iexcl;"),n=n.replace(/¿/g,"&iquest;"),n=n.replace(/“/g,"&ldquo;"),n=n.replace(/”/g,"&rdquo;"),n=n.replace(/‘/g,"&lsquo;"),n=n.replace(/’/g,"&rsquo;"),n=n.replace(/«/g,"&laquo;"),n=n.replace(/»/g,"&raquo;"),n=n.replace(/ /g,"&nbsp;"),n=n.replace(/¢/g,"&cent;"),n=n.replace(/©/g,"&copy;"),n=n.replace(/÷/g,"&divide;"),n=n.replace(/µ/g,"&micro;"),n=n.replace(/·/g,"&middot;"),n=n.replace(/¶/g,"&para;"),n=n.replace(/±/g,"&plusmn;"),n=n.replace(/€/g,"&euro;"),n=n.replace(/£/g,"&pound;"),n=n.replace(/®/g,"&reg;"),n=n.replace(/§/g,"&sect;"),n=n.replace(/™/g,"&trade;"),n=n.replace(/¥/g,"&yen;"),n=n.replace(/°/g,"&deg;"),n=n.replace(/á/g,"&aacute;"),n=n.replace(/Á/g,"&Aacute;"),n=n.replace(/à/g,"&agrave;"),n=n.replace(/À/g,"&Agrave;"),n=n.replace(/â/g,"&acirc;"),n=n.replace(/Â/g,"&Acirc;"),n=n.replace(/å/g,"&aring;"),n=n.replace(/Å/g,"&Aring;"),n=n.replace(/ã/g,"&atilde;"),n=n.replace(/Ã/g,"&Atilde;"),n=n.replace(/ä/g,"&auml;"),n=n.replace(/Ä/g,"&Auml;"),n=n.replace(/æ/g,"&aelig;"),n=n.replace(/Æ/g,"&AElig;"),n=n.replace(/ç/g,"&ccedil;"),n=n.replace(/Ç/g,"&Ccedil;"),n=n.replace(/é/g,"&eacute;"),n=n.replace(/É/g,"&Eacute;"),n=n.replace(/è/g,"&egrave;"),n=n.replace(/È/g,"&Egrave;"),n=n.replace(/ê/g,"&ecirc;"),n=n.replace(/Ê/g,"&Ecirc;"),n=n.replace(/ë/g,"&euml;"),n=n.replace(/Ë/g,"&Euml;"),n=n.replace(/í/g,"&iacute;"),n=n.replace(/Í/g,"&Iacute;"),n=n.replace(/ì/g,"&igrave;"),n=n.replace(/Ì/g,"&Igrave;"),n=n.replace(/î/g,"&icirc;"),n=n.replace(/Î/g,"&Icirc;"),n=n.replace(/ï/g,"&iuml;"),n=n.replace(/Ï/g,"&Iuml;"),n=n.replace(/ñ/g,"&ntilde;"),n=n.replace(/Ñ/g,"&Ntilde;"),n=n.replace(/ó/g,"&oacute;"),n=n.replace(/Ó/g,"&Oacute;"),n=n.replace(/ò/g,"&ograve;"),n=n.replace(/Ò/g,"&Ograve;"),n=n.replace(/ô/g,"&ocirc;"),n=n.replace(/Ô/g,"&Ocirc;"),n=n.replace(/ø/g,"&oslash;"),n=n.replace(/Ø/g,"&Oslash;"),n=n.replace(/õ/g,"&otilde;"),n=n.replace(/Õ/g,"&Otilde;"),n=n.replace(/ö/g,"&ouml;"),n=n.replace(/Ö/g,"&Ouml;"),n=n.replace(/ß/g,"&szlig;"),n=n.replace(/ú/g,"&uacute;"),n=n.replace(/Ú/g,"&Uacute;"),n=n.replace(/ù/g,"&ugrave;"),n=n.replace(/Ù/g,"&Ugrave;"),n=n.replace(/û/g,"&ucirc;"),n=n.replace(/Û/g,"&Ucirc;"),n=n.replace(/ü/g,"&uuml;"),n=n.replace(/Ü/g,"&Uuml;"),n=n.replace(/ÿ/g,"&yuml;"),n=n.replace(/´/g,"&acute;"),n.replace(/`/g,"&#96;"))},isNumber:function(n){return!(n===""||isNaN(+n)||/^0\d+/.test(n))},parse:function(n,t,i,r,u,f){var o=[],l=new RegExp("[^,]","gi"),k=n.replace(l,"").length,y,a,c,nt,w,tt,e,v,h;for(l=new RegExp("[^\t]","gi"),y=n.replace(l,"").length,a=",",y>k&&(a="\t"),i==="comma"?a=",":i==="tab"&&(a="\t"),(k>0||y>0)&&(l=new RegExp("^"+d.rowDelimiter+"+","gi"),n=n.replace(l,""),l=new RegExp(d.rowDelimiter+"+$","gi"),n=n.replace(l,"")),o=this.CSVToArray(n,a),e=o.length-1;e>=0;--e)for(c=o[e].length-1;c>=0;--c)o[e][c]=o[e][c].replace("\t","\\t"),o[e][c]=o[e][c].replace("\n","\\n"),o[e][c]=o[e][c].replace("\r","\\r");var s=[],p=[],g=o[0].length,ut=o.length;if(t)s=o.splice(0,1)[0],ut=o.length;else for(e=0;e<g;++e)s.push("val"+e),p.push("");for(e=s.length-1;e>=0;--e)s[e]=$.trim(s[e]),s[e]=s[e].replace(/[^\w -]|&quot;/g,""),s[e]=s[e].replace(/ +/g,"_"),/^[^a-z]/i.test(s[e])&&(s[e]="col"+s[e]),u&&(s[e]=s[e].toUpperCase()),r&&(s[e]=s[e].toLowerCase());for(e=0,v=o.length;e<v;++e)nt=o[e].length,nt!==g&&this.log("Error parsing row "+e+". Wrong number of columns.");for(w=o.length,tt=.9,e=0,v=s.length;e<v;++e){var it=0,b=0,rt=0;for(h=0;h<w;++h)o[h]&&(f==="comma"&&isDecimalRe.test(o[h][e])&&(o[h][e]=o[h][e].replace(",",".")),CSVParser.isNumber(o[h][e])?(++b,(o[h][e]+"").indexOf(".")>-1&&++rt):o[h][e]!==""&&++it);p[e]=b/w>tt||it===0&&b>0?rt===0?"int":"float":"string"}return{dataGrid:o,headerNames:s,headerTypes:p,errors:this.getLog()}},errorLog:[],resetLog:function(){this.errorLog=[]},log:function(n){this.errorLog.push(n)},getLog:function(){var t="",n,i;if(this.errorLog.length>0){for(n=0,i=this.errorLog.length;n<i;++n)t+="!!"+this.errorLog[n]+"!!\n";t+="\n"}return t},CSVToArray:function(n,t){var u,f;t=t||",";var e=new RegExp("(\\"+t+'|\\r?\\n|\\r|^)(?:"([^"]*(?:""[^"]*)*)"|([^"\\'+t+"\\r\\n]*))","gi"),r=[[]],i=null;for(t==="\t"&&(n=n.replace(/(\t|\r?\n|\r|^)(".+?")([\t\n\r])/g,function(n,t,i,r){return t+i.replace(/\t/g,"\\t")+r}),n=n.replace(/(\t|\r?\n|\r|^)([^\t"][^\t]+)/g,function(n,t,i){return t+i.replace(/"/g,"&quot;")}));i=e.exec(n);)u=i[1],u.length&&u!==t&&r.push([]),f=i[2]?i[2].replace(/""/g,"&quot;"):i[3],r[r.length-1].push(f);return r}},DataGridRenderer,d;
/*!
 * DataGridRenderer.js
 * Part of Mr-Data-Converter
 *
 * Created by Shan Carter on 2010-10-18.
 */
DataGridRenderer={asp:function(n,t,i,r,u){var o="",c=n.length,l=t.length,e,s,f,h;for(u=u||":",e=0;e<c;++e)for(s=n[e],f=0;f<l;++f)h=i[f]==="int"||i[f]==="float"?s[f]||"Empty":'"'+(s[f]||"")+'"',o+="myArray("+f+","+e+") = "+h+u;return o="Dim myArray("+(f-1)+","+(e-1)+")"+u+o,o.replace(/&quot;/g,'""')},csharp:function(n,t,i,r,u){var e="",c=n.length,s=t.length,o,h,f;for(e+="DataTable "+d.tableName+" = new DataTable();"+u,f=0;f<s;++f)e+=d.tableName+'.Columns.Add("'+t[f]+'", typeof('+(i[f]==="int"||i[f]==="float"?i[f]:"string")+"));"+u;for(o=0;o<c;++o){for(h=n[o],e+=d.tableName+".Rows.Add(",f=0;f<s;++f)e+=i[f]==="int"||i[f]==="float"?h[f]||"null":'"'+(h[f]||"")+'"',f<s-1&&(e+=", ");e+=");"+u}return e.replace(/&quot;/g,'\\"')},cfml:function(n,t,i,r,u){for(var c,e,l,f="[",s=n.length,h=t.length,o=0;o<s;++o){for(c=n[o],f+="{",e=0;e<h;++e)l='"'+(c[e]||"")+'"',f+='"'+t[e]+'"='+l,e<h-1&&(f+=",");f+="}";o<s-1&&(f+=","+u)}return f+="]"+u,f.replace(/&quot;/g,'\\"')},go:function(n,t,i,r,u){var e="",c=n.length,s=t.length,f,h,o;for(e+="type rows struct{",f=0;f<s;++f)e+=t[f]+" "+(i[f]==="int"||i[f]==="float"?i[f]+"64":"string"),f<s-1&&(e+="; ");for(e+="}"+(u||";")+d.tableName+" := []rows{"+u,f=0;f<c;++f){for(h=n[f],e+=r+"{",o=0;o<s;++o)e+=i[o]==="int"||i[o]==="float"?h[o]||"nil":'"'+(h[o]||"")+'"',o<s-1&&(e+=", ");e+="},"+u}return e+="}"+u,e.replace(/&quot;/g,'\\"')},html:function(n,t,i,r,u){var e="",h=n.length,c=t.length,o,l,s,f;for(e+="<table>"+u+r+"<thead>"+u+r+r+"<tr>"+u,f=0;f<c;++f)e+=r+r+r+'<th class="cell-'+t[f].replace(/_/g,"-").toLowerCase()+'">'+t[f]+"</th>"+u;for(e+=r+r+"</tr>"+u+r+"</thead>"+u+r+"<tbody>"+u,o=0;o<h;++o){for(l=n[o],s="",o===h-1?s=' class="last-row"':o===0&&(s=' class="first-row"'),e+=r+r+"<tr"+s+">"+u,f=0;f<c;++f)e+=r+r+r+'<td class="cell-'+t[f].replace(/_/g,"-").toLowerCase()+'">'+CSVParser.escapeText(l[f])+"</td>"+u;e+=r+r+"</tr>"+u}return e+=r+"</tbody>"+u+"</table>"+u,e.replace(/&quot;/g,'"')},json:function(n,t,i,r,u){for(var s,f,l,e="[",h=n.length,c=t.length,o=0;o<h;++o){for(s=n[o],e+="{",f=0;f<c;++f)l=i[f]==="int"||i[f]==="float"?s[f]||"undefined":'"'+(s[f]||"")+'"',e+='"'+t[f]+'":'+l,f<c-1&&(e+=",");e+="}";o<h-1&&(e+=","+u)}return e+="]"+u,e.replace(/&quot;/g,'\\"')},jsonArrayCols:function(n,t,i,r,u){for(var o,e="{"+u,s=n.length,h=t.length,f=0;f<h;++f){for(e+=r+'"'+t[f]+'":[',o=0;o<s;++o)e+=i[f]==="int"||i[f]==="float"?n[o][f]||"undefined":'"'+(n[o][f]||"")+'"',o<s-1&&(e+=",");e+="]";f<h-1&&(e+=","+u)}return e+=u+"}"+u,e.replace(/&quot;/g,'\\"')},jsonArrayRows:function(n,t,i,r,u){for(var f,e="["+u,s=n.length,h=t.length,o=0;o<s;++o){for(e+=r+"[",f=0;f<h;++f)e+=i[f]==="int"||i[f]==="float"?n[o][f]||"undefined":'"'+(n[o][f]||"")+'"',f<h-1&&(e+=",");e+="]";o<s-1&&(e+=","+u)}return e+=u+"]"+u,e.replace(/&quot;/g,'\\"')},jsonDict:function(n,t,i,r,u){function c(t,r){return i[r]==="int"||i[r]==="float"?n[t][r]||"undefined":'"'+(n[t][r]||"")+'"'}for(var o,f="{"+u,s=n.length,h=t.length,e=0;e<s;++e){if(f+=r+'"'+n[e][0]+'":',h===2)f+=c(e,1);else{for(f+="{",o=1;o<h;++o)o>1&&(f+=","),f+='"'+t[o]+'":'+c(e,o);f+="}"}e<s-1&&(f+=","+u)}return f+=u+"}"+u,f.replace(/&quot;/g,'\\"')},luaDict:function(n,t,i,r,u){function c(t,r){return i[r]==="int"||i[r]==="float"?n[t][r]||"nil":'"'+(n[t][r]||"")+'"'}for(var o,f="{"+u,s=n.length,h=t.length,e=0;e<s;++e){if(f+=r+'["'+n[e][0]+'"]=',h===2)f+=c(e,1);else{for(f+="{",o=1;o<h;++o)o>1&&(f+=","),f+='["'+t[o]+'"]='+c(e,o);f+="}"}e<s-1&&(f+=","+u)}return f+=u+"}"+u,f.replace(/&quot;/g,'\\"')},luaArray:function(n,t,i,r,u){for(var s,f,l,e="{"+u,h=n.length,c=t.length,o=0;o<h;++o){for(s=n[o],e+=r+"["+(o+1)+"]={",f=0;f<c;++f)l=i[f]==="int"||i[f]==="float"?s[f]||"nil":'"'+(s[f]||"")+'"',e+='["'+t[f]+'"]='+l,f<c-1&&(e+=",");e+="}";o<h-1&&(e+=","+u)}return e+=u+"}"+u,e.replace(/&quot;/g,'\\"')},mysql:function(n,t,i,r,u){var e="",c=n.length,s=t.length,h,o,f;for(e+="CREATE TABLE "+d.tableName+" ("+u+r+"id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,"+u,f=0;f<s;++f)h="VARCHAR(255)",(i[f]==="int"||i[f]==="float")&&(h=i[f].toUpperCase()),e+=r+t[f]+" "+h,f<s-1&&(e+=","),e+=u;for(e+=");"+u+"INSERT INTO "+d.tableName+" "+u+r+"(",f=0;f<s;++f)e+=t[f].replace(/\W/g,""),f<s-1&&(e+=",");for(e+=") "+u+"VALUES "+u,o=0;o<c;++o){for(e+=r+"(",f=0;f<s;++f)i[f]==="int"||i[f]==="float"?e+=n[o][f]||"NULL":(n[o][f]=n[o][f]?n[o][f].replace(/'/g,"''"):"",e+="'"+n[o][f]+"'"),f<s-1&&(e+=",");e+=")";o<c-1&&(e+=","+u)}return e+=";"+u,e.replace(/&quot;/g,'"')},perl:function(n,t,i,r,u){for(var s,f,l,e="(",h=n.length,c=t.length,o=0;o<h;++o){for(s=n[o],e+="{",f=0;f<c;++f)l=i[f]==="int"||i[f]==="float"?s[f]||"undef":'"'+(s[f]||"")+'"',e+='"'+t[f]+'"=>'+l,f<c-1&&(e+=",");e+="}";o<h-1&&(e+=","+u)}return e+=")"+u,e.replace(/&quot;/g,'\\"')},php:function(n,t,i,r,u){for(var s,f,l,e="array("+u,h=n.length,c=t.length,o=0;o<h;++o){for(s=n[o],e+=r+"array(",f=0;f<c;++f)l=i[f]==="int"||i[f]==="float"?s[f]||"NULL":'"'+(s[f]||"")+'"',e+='"'+t[f]+'"=>'+l,f<c-1&&(e+=",");e+=")";o<h-1&&(e+=","+u)}return e+=u+")"+u,e.replace(/&quot;/g,'\\"')},python:function(n,t,i,r,u){for(var s,f,l,e="[",h=n.length,c=t.length,o=0;o<h;++o){for(s=n[o],e+="{",f=0;f<c;++f)l=i[f]==="int"||i[f]==="float"?s[f]||"None":'"'+(s[f]||"")+'"',e+='"'+t[f]+'":'+l,f<c-1&&(e+=",");e+="}";o<h-1&&(e+=","+u)}return e+="]"+u,e.replace(/&quot;/g,'\\"')},ruby:function(n,t,i,r,u){for(var s,f,l,e="[",h=n.length,c=t.length,o=0;o<h;++o){for(s=n[o],e+="{",f=0;f<c;++f)l=i[f]==="int"||i[f]==="float"?s[f]||"nil":'"'+(s[f]||"")+'"',e+='"'+t[f]+'"=>'+l,f<c-1&&(e+=",");e+="}";o<h-1&&(e+=","+u)}return e+="]"+u,e.replace(/&quot;/g,'\\"')},wiki:function(n,t,i,r,u){var e="",h=n.length,s=t.length,o,c,f;for(e+='{| class="wikitable"'+u+"! ",f=0;f<s;++f)e+='scope="col" | '+t[f],f<s-1&&(e+=" || ");for(e+=u+"|-"+u,o=0;o<h;++o){for(c=n[o],e+="| ",f=0;f<s;++f)e+=(i[f]==="int"||i[f]==="float"?'style="text-align:right" | ':"")+CSVParser.escapeText(c[f]).replace(/\|/g,"&#124;"),f<s-1&&(e+=" || ");o<h-1&&(e+=u+"|-"+u)}return e+=u+"|}"+u,e.replace(/&quot;/g,'"')},xmlProperties:function(n,t,i,r,u){var f="",h=n.length,c=t.length,o,s,e;for(f+='<?xml version="1.0" encoding="UTF-8"?>'+u+"<rows>"+u,o=0;o<h;++o){for(s=n[o],f+=r+"<row ",e=0;e<c;++e)f+=t[e]+'="'+CSVParser.escapeText(s[e],"xml")+'" ';f+="/>"+u}return f+="</rows>"+u,f.replace(/&amp;quot;/g,"&quot;")},xml:function(n,t,i,r,u){var e="",h=n.length,c=t.length,s,o,f;for(e+='<?xml version="1.0" encoding="UTF-8"?>'+u+"<rows>"+u,s=0;s<h;++s){for(o=n[s],e+=r+"<row>"+u,f=0;f<c;++f)o[f]=o[f]?CSVParser.escapeText(o[f],"xml"):"",t[f]=t[f].replace(/\W/g,""),e+=r+r+"<"+t[f]+">"+o[f]+"</"+t[f]+">"+u;e+=r+"</row>"+u}return e+="</rows>"+u,e.replace(/&amp;quot;/g,"&quot;")},xmlIllustrator:function(n,t,i,r,u){var f="",c=n.length,h=t.length,e,s,o;for(f+='<?xml version="1.0" encoding="utf-8"?>'+u+'<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20001102//EN" "http://www.w3.org/TR/2000/CR-SVG-20001102/DTD/svg-20001102.dtd" ['+u+r+'<!ENTITY ns_graphs "http://ns.adobe.com/Graphs/1.0/">'+u+r+'<!ENTITY ns_vars "http://ns.adobe.com/Variables/1.0/">'+u+r+'<!ENTITY ns_imrep "http://ns.adobe.com/ImageReplacement/1.0/">'+u+r+'<!ENTITY ns_custom "http://ns.adobe.com/GenericCustomNamespace/1.0/">'+u+r+'<!ENTITY ns_flows "http://ns.adobe.com/Flows/1.0/">'+u+r+'<!ENTITY ns_extend "http://ns.adobe.com/Extensibility/1.0/">'+u+"]>"+u+"<svg>"+u+r+'<variableSets xmlns="&ns_vars;">'+u+r+r+'<variableSet varSetName="binding1" locked="none">'+u+r+r+r+"<variables>"+u,e=0;e<h;++e)f+=r+r+r+r+'<variable varName="'+t[e]+'" trait="textcontent" category="&ns_flows;"></variable>'+u;for(f+=r+r+r+"</variables>"+u+r+r+r+'<v:sampleDataSets xmlns:v="http://ns.adobe.com/Variables/1.0/" xmlns="http://ns.adobe.com/GenericCustomNamespace/1.0/">'+u,e=0;e<c;++e){for(s=n[e],f+=r+r+r+r+'<v:sampleDataSet dataSetName="'+s[0]+'">'+u,o=0;o<h;++o)t[o]=t[o].replace(/\W/g,""),f+=r+r+r+r+r+"<"+t[o]+"><p>"+CSVParser.escapeText(s[o],"xml")+"</p></"+t[o]+">"+u;f+=r+r+r+r+"</v:sampleDataSet>"+u}return f+=r+r+r+"</v:sampleDataSets>"+u+r+r+"</variableSet>"+u+r+"</variableSets>"+u+"</svg>"+u,f.replace(/&amp;quot;/g,"&quot;")}};
/*!
 * Converter.js
 * Mr-Data-Converter
 *
 * Created by Shan Carter on 2010-09-01.
 */
DataConverter.prototype.init=function(){var n=this;this.inputTextArea=$("#data-input");this.outputTextArea=$("#data-output");this.dataSelector=$("#data-selector");$("#converter > .wrapper").append('<div class="loader">  <span class="loader-text">Loading...</span>  <i class="loader-icon"></i></div>');this.outputTextArea.val()&&(n.outputDataType=this.dataSelector.children("option:selected").val(),n.convert());this.inputTextArea.add(this.outputTextArea).click(function(){this.select()});$("#insert-sample").click(function(t){t.preventDefault();n.insertSampleData();n.convert();ga("send","event","SampleData","InsertGeneric")});this.inputTextArea.on({change:function(){n.convert();ga("send","event","DataType",n.outputDataType)},keyup:function(){var t=$(this);t.data("wait")||(t.data("wait",!0),n.convert(),setTimeout(function(){t.data("wait",!1)},500))}});this.dataSelector.change(function(){n.outputDataType=$(this).val();n.convert()});$(".loader").remove();this.node.addClass("loaded")};DataConverter.prototype.convert=function(){if(this.inputText=this.inputTextArea.val(),this.inputText.length>0){this.includeWhiteSpace?this.newLine="\n":(this.indent="",this.newLine="");CSVParser.resetLog();var n=CSVParser.parse(this.inputText,this.headersProvided,this.delimiter,this.downcaseHeaders,this.upcaseHeaders,this.decimal),t=n.dataGrid,i=n.headerNames,r=n.headerTypes,u=n.errors;this.outputText=DataGridRenderer[this.outputDataType](t,i,r,this.indent,this.newLine);this.outputTextArea.val(u+this.outputText)}};DataConverter.prototype.insertSampleData=function(){this.inputTextArea.val('NAME\tVALUE\tCOLOR\tDATE\nAlan\t12\tblue\tSep. 25, 2009\nShan\t13\t"green\tblue"\tSep. 27, 2009\nJohn\t45\torange\tSep. 29, 2009\nMinna\t27\tteal\tSep. 30, 2009')};
/*!
 * Controller.js
 */
$(document).ready(function(){function n(n){if(n&&ga("send","event","Settings",n.currentTarget.id),d.includeWhiteSpace=$("#includeWhiteSpaceCB").prop("checked"),d.includeWhiteSpace){$("input[name=indentType]").removeAttr("disabled");switch($("input[name=indentType]:checked").val()){case"spaces":d.indent="  ";break;case"tabs":d.indent="\t"}}else $("input[name=indentType]").prop("disabled",!0);if(d.headersProvided=$("#headersProvidedCB").prop("checked"),d.headersProvided){$("input[name=headerModifications]").removeAttr("disabled");switch($("input[name=headerModifications]:checked").val()){case"none":d.downcaseHeaders=!1;d.upcaseHeaders=!1;break;case"downcase":d.downcaseHeaders=!0;d.upcaseHeaders=!1;break;case"upcase":d.downcaseHeaders=!1;d.upcaseHeaders=!0}}else $("input[name=headerModifications]").prop("disabled",!0);d.delimiter=$("input[name=delimiter]:checked").val();d.decimal=$("input[name=decimal]:checked").val();d.convert()}d=new DataConverter("converter");d.init();$(".settings-element").change(n);n()});
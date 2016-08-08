var obj = {"prop1": "a_string",
           "prop2": [null, "null", 123456, ["hernan", {"i_prop1": "a_value",
                                                       "i_prop2": 3,
                                                       "i_prop3": -3,
                                                       "i_prop4": -123456}]],
           "prop3": [true, false],
           "prop4": [],
           "prop5": [-1, -1.0, 1, 1.0, -0.0, 0.0, -12345.6789, 98765.4321]};
           
console.log(toErlString(Inaka.Jem.encode(obj)));

var bytes = [131,116,0,0,0,5,109,0,0,0,2,107,49,108,0,0,0,3,100,0,4,
             110,117,108,108,100,0,5,102,97,108,115,101,100,0,4,116,
             114,117,101,106,109,0,0,0,2,107,50,116,0,0,0,2,109,0,0,
             0,4,107,101,121,49,109,0,0,0,4,118,97,108,49,109,0,0,0,
             4,107,101,121,50,98,0,18,214,135,109,0,0,0,2,107,51,108,
             0,0,0,7,70,191,240,0,0,0,0,0,0,98,255,255,255,255,70,0,
             0,0,0,0,0,0,0,70,0,0,0,0,0,0,0,0,97,1,70,63,240,0,0,0,0,
             0,0,70,64,200,28,214,230,49,248,161,106,109,0,0,0,2,107,
             52,108,0,0,0,7,98,255,237,41,121,97,0,97,126,97,127,97,
             128,97,129,98,0,135,210,114,106,109,0,0,0,2,107,53,106];
var buffer = new ArrayBuffer(bytes.length);
var view = new DataView(buffer);
bytes.forEach((n, i) => view.setUint8(i, n));

console.log(Inaka.Jem.decode(buffer));

function toErlString(buffer)
{
  var dv = new DataView(buffer);
  var a = [];
  for (var i = 0; i < dv.byteLength; i++)
    a[i] = dv.getUint8(i);
  return "<<" + a.join(",") + ">>";
}
// Create a js object
var obj = {"prop1": "a_string",
           "prop2": [null, "null", 123456, ["anotherString",
                                            {"i_prop1": "a_value",
                                             "i_prop2": 3}]],
           "prop3": [true, false],
           "prop4": []};
// Encode it:
console.log(formatAsErlBin(Inaka.Jem.encode(obj)));

// Get an erlang binary and decode it:
console.log(Inaka.Jem.decode([131,116,0,0,0,4,109,0,0,0,2,107,49,108,0,0,0,3,100,0,4,
                              110,117,108,108,100,0,5,102,97,108,115,101,100,0,4,116,
                              114,117,101,106,109,0,0,0,2,107,52,116,0,0,0,2,109,0,0,
                              0,4,107,101,121,49,109,0,0,0,4,118,97,108,49,109,0,0,0,
                              4,107,101,121,50,98,0,18,214,135,109,0,0,0,2,107,53,97,
                              3,109,0,0,0,2,107,54,98,0,0,125,141]));

// Small function to pretty print the enconded object
function formatAsErlBin(a)
{
  return "<<" + a.join(",") + ">>";
}